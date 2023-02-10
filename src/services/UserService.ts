import  IUserService  from '../interfaces/services/IUserService';
import  IUserRepository  from '../interfaces/repository/IUserRepository';
import UserRepository from '../repository/UserRepository';
import { Request, Response } from 'express';
import  IMapping  from '../interfaces/mapping/IMapping';
import Mapping from '../Mapping/Mapping';
import  UserRoleEnum  from '../enum/UserRoleEnum';


class UserService implements IUserService{

  constructor(private userRepository: IUserRepository, private mapping: IMapping) {
     this.userRepository = userRepository;
     this.mapping = mapping;
  }

  async update(req: Request, res: Response) {
    const erroValidate = this.validateBodyUpdate(req);
    if(erroValidate)
        return res.status(400).send(erroValidate);

    try{
      const user  = await this.findOne(req.params.id);
      if(!user)
        return res.sendStatus(404);

      if(user.email !== req.body.email && await this.userRepository.exists(req.body.email))
          return res.status(409).send(`Já existe usuário com email ${req.body.email}`);

      user.email = req.body.email;
      user.name = req.body.name;

      await this.userRepository.update(req.params.id, user);
      return res.sendStatus(200)
    } catch {
      return res.sendStatus(500);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      await this.userRepository.changePassword(req.params.id, 'reset123');
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }

  async newPassword(req: Request, res: Response) {
    try {
      if(!await this.userRepository.exists(req.params.id))
        return res.sendStatus(404);

      await this.userRepository.changePassword(req.params.id, req.body.password);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }

  async validUser(req: Request, res: Response) {
    try{
      if(!await this.userRepository.exists(req.params.id))
        return res.sendStatus(404);

      await this.userRepository.validUser(req.params.id);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }

  async updateRole(req: Request, res: Response, role: UserRoleEnum) {
    try{
      if(!await this.userRepository.exists(req.params.id))
        return res.sendStatus(404);

      await this.userRepository.updateRole(req.params.id, role);
      return res.sendStatus(200);

    } catch {
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try{
      if(!await this.userRepository.exists(req.params.id))
        return res.sendStatus(404);

      await this.userRepository.delete(req.params.id);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }

  private async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if(!user) return ;
    else return this.mapping.convertToUser(user);
  }

  async findAll(res: Response) {
    try{
      const response =  await this.userRepository.findAll();
      response.forEach((user: any) => {
        delete user.password;
      });
      return res.status(200).send(response);
    } catch {
      return res.status(500);
    }
  }

  async create(req: Request, res: Response) {
    const erroValidate = this.validateBodyCreate(req);
    if(erroValidate)
      return res.status(400).send({message: erroValidate});

      try {
        if(await this.userRepository.existsEmail(req.body.email))
          return res.status(409).send({message: 'Já existe usuário com esse email'});

        const newUser = this.mapping.newUser(req.body);
        await this.userRepository.create(newUser);
        return res.sendStatus(201);
      } catch {
        return res.sendStatus(500);
      }
  }

  validateBodyCreate(req: Request) {
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

  validateBodyUpdate(req: Request) {
    const regexName = new RegExp(/^[a-zA-Z ]{2,30}$/);
    const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
    if(!req.body) return 'Dados Vazios';
    if(!req.body.name) return 'Campo nome obrigatório';
    if(!regexName.test(req.body.name)) return 'Nome inválido';
    if(!req.body.email) return 'Campo email obrigatório';
    if(!regexEmail.test(req.body.email)) return 'Email inválido';
  }
}

export default new UserService(UserRepository, Mapping);
