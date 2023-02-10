import { Request, Response } from "express";
import  UserRoleEnum  from "../../enum/UserRoleEnum";

interface IUserService  {
  create(req: Request, res: Response):Promise<Response>;
  findAll(res: Response):Promise<Response>;
  delete (req: Request, res: Response):Promise<Response>;
  updateRole(req:Request, res: Response, role: UserRoleEnum):Promise<Response>;
  validUser(req: Request, res: Response):Promise<Response>;
  resetPassword(req: Request, res: Response):Promise<Response>;
  newPassword(req: Request, res: Response):Promise<Response>;
  update(req: Request, res: Response):Promise<Response>;
}

export default IUserService
