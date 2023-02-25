import  IAuthService  from "../interfaces/services/IAuthService";
import { BadRequestError } from '../error/BadRequestError';
import jwt from 'jsonwebtoken';
import  IAuthRepository  from '../interfaces/repository/IAuthRepository';
import * as env from 'dotenv'
import User from "../models/User";
import IMapping from '../interfaces/mapping/IMapping';
import { AuthResponse } from "../types/AuthResponse";

env.config()
class AuthService implements IAuthService {

  constructor(private readonly authRepository: IAuthRepository, private readonly mapper: IMapping) {
    this.authRepository = authRepository;
    this.mapper = mapper;
  }

  async authenticate(email: string, password: string) {
    if(!email || !password)
      throw new BadRequestError("Login ou senha incorretos");
     const user = await this.authRepository.findByEmail(email) as User | undefined;

     if(!user || user.password != password)
      throw new BadRequestError("Login ou senha incorretos")

    if(!user.isValid)
      throw new BadRequestError('Usuário não foi validado pelos administradores');

    const token =  jwt.sign({ role: user.role, isValid: user.isValid }, process.env.JWTKEY as string, {expiresIn: '1d'});

    const userResponse = this.mapper.convertToUserAuthResponse(user);

    return { user: userResponse, token } as AuthResponse;
  }

}

export default AuthService;
