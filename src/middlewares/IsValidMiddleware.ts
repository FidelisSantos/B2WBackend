import { NextFunction, Request, Response } from "express";

class IsValidMiddleware {

  roleValid(user: any, req: Request, res: Response, next:NextFunction) {
    if(!user.isValid)
      res.status(403).send('Usuário não foi validado pelos administradores');
    else next();
  }
}

export default new IsValidMiddleware();
