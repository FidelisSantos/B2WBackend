import { Request, Response } from "express";

import  IAuthService  from '../interfaces/services/IAuthService';
import AuthService from "../services/AuthService";
import { ApiError } from "../error/ApiError";
import HttpException from "../middlewares/HttpException";
import AuthRepository from "../repository/AuthRepository";
import Mapping from "../mapping/Mapping";

class AuthController {

  constructor(private readonly authService: IAuthService) {
     this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try{
      const { user, token } = await this.authService.authenticate(req.body.email, req.body.password);
      res.status(200).send({ user, token});
    } catch(err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

}

export default new AuthController(new AuthService(AuthRepository, Mapping))
