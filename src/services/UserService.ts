import  IUserService  from '../interfaces/services/IUserService';
import  IUserRepository  from '../interfaces/repository/IUserRepository';
import { Request, Response } from 'express';
import  IMapping  from '../interfaces/mapping/IMapping';
import  UserRoleEnum  from '../enum/UserRoleEnum';
import { BadRequestError } from '../error/BadRequestError';
import { ConflictError } from '../error/ConflictError';
import User from '../models/User';


class UserService implements IUserService{

  constructor(private userRepository: IUserRepository, private mapping: IMapping) {
     this.userRepository = userRepository;
     this.mapping = mapping;
  }

  async update(req: Request) {
    const erroValidate = this.validateBodyUpdate(req);
    if(erroValidate)
        throw new BadRequestError(erroValidate);

    const user  = await this.findOne(req.params.id);
    if(!user)
      throw new BadRequestError("Usuário não encontrado");

    if(user.email !== req.body.email && await this.userRepository.exists(req.body.email))
      throw new ConflictError(`Já existe usuário com email ${req.body.email}`);

    user.email = req.body.email;
    user.name = req.body.name;

    await this.userRepository.update(req.params.id, user);
  }

  async resetPassword(req: Request) {
    await this.userRepository.changePassword(req.params.id, 'reset123');
  }

  async newPassword(req: Request) {
    if(!await this.userRepository.exists(req.params.id))
      throw new BadRequestError("Usuário não encontrado");

    await this.userRepository.changePassword(req.params.id, req.body.password);
  }

  async validUser(req: Request) {
    if(!await this.userRepository.exists(req.params.id))
      throw new BadRequestError("Usuário não encontrado");

    await this.userRepository.validUser(req.params.id);
  }

  async updateRole(req: Request, role: UserRoleEnum) {
    if(!await this.userRepository.exists(req.params.id))
      throw new BadRequestError("Usuário não encontrado");

    await this.userRepository.updateRole(req.params.id, role);
  }

  async delete(req: Request) {
    if(!await this.userRepository.exists(req.params.id))
      throw new BadRequestError("Usuário não encontrado");

    await this.userRepository.delete(req.params.id);
  }

  private async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if(!user) return ;
    else return this.mapping.convertToUser(user);
  }

  async findAll() {
    const response =  await this.userRepository.findAll() as User[];
    const users = this.mapping.convertToListUserResponse(response);
    return users;
  }

  async create(req: Request) {
    const erroValidate = this.validateBodyCreate(req);
    if(erroValidate)
    throw new BadRequestError(erroValidate);

    if(await this.userRepository.existsEmail(req.body.email))
      throw new ConflictError(`Já existe usuário com email ${req.body.email}`);

    const newUser = this.mapping.newUser(req.body);
    await this.userRepository.create(newUser);
  }

  private validateBodyCreate(req: Request) {
    const regexName = new RegExp(/^[a-zA-Z ]{2,30}$/);
    const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    if(!req.body) return 'Dados Vazios';
    if(!req.body.name) return 'Campo nome obrigatório';
    if(!regexName.test(req.body.name)) return 'Nome inválido';
    if(!req.body.email) return 'Campo email obrigatório';
    if(!regexEmail.test(req.body.email)) return 'Email inválido';
    if(!req.body.password) return 'Campo senha obrigatório';
    if(req.body.password.length < 6) return 'Senha tem que ter no minimo 6 digitos';
  }

  private validateBodyUpdate(req: Request) {
    const regexName = new RegExp(/^[a-zA-Z ]{2,30}$/);
    const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    if(!req.body) return 'Dados Vazios';
    if(!req.body.name) return 'Campo nome obrigatório';
    if(!regexName.test(req.body.name)) return 'Nome inválido';
    if(!req.body.email) return 'Campo email obrigatório';
    if(!regexEmail.test(req.body.email)) return 'Email inválido';
  }
}

export default UserService;
