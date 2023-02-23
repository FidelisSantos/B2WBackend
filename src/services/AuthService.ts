import  IAuthService  from "../interfaces/services/IAuthService";
import { BadRequestError } from '../error/BadRequestError';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import  IAuthRepository  from '../interfaces/repository/IAuthRepository';
import AuthRepository from '../repository/AuthRepository';
import * as env from 'dotenv'

env.config()
class AuthService implements IAuthService {

  constructor(private authReposuory: IAuthRepository) {
    this.authReposuory = authReposuory;
  }

  async authenticate(res: Response, email: string, password: string) {
    if(!email || !password)
      return res.status(401).send({ message: 'Login ou senha incorretos'})
     const user = await this.authReposuory.findByEmail(email);

     if(!user || user.password != password)
      throw new BadRequestError("Login ou senha incorretos")

    if(!user.isValid)
      throw new BadRequestError('Usuário não foi validado pelos administradores');

    const token =  jwt.sign({ role: user.role, isValid: user.isValid }, process.env.JWTKEY as string, {expiresIn: '1d'});

    delete user.password;
    delete user.isValid;
    return { user, token };
  }

}

export default new AuthService(AuthRepository)
