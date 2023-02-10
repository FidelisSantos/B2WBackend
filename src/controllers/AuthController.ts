import { Request, Response } from "express";

import  IAuthService  from '../interfaces/services/IAuthService';
import AuthService from "../services/AuthService";

class AuthController {

  constructor(private authService: IAuthService) {
     this.authService = authService;
  }

  async login(req: Request, res: Response) {
    return await this.authService.authenticate(res,req.body.email, req.body.password);
  }

}

export default new AuthController(AuthService)
