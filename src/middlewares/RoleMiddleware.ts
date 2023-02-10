import  UserRoleEnum  from "../enum/UserRoleEnum";
import { Request, NextFunction, Response } from 'express';

class RoleMiddlware {

  roleAdmin(user: any, req: Request, res: Response, next: NextFunction ) {
    if(user.role !== UserRoleEnum.ADMIN && user.role !== UserRoleEnum.OWNER)
      res.sendStatus(403);
    else next();
  }

  roleOwner(user: any, req: Request, res: Response, next:NextFunction) {
    if(user.role !== UserRoleEnum.OWNER)
      res.sendStatus(403);
    else next();
  }
}

export default new RoleMiddlware()
