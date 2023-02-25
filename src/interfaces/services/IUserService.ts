import { Request } from "express";
import  UserRoleEnum  from "../../enum/UserRoleEnum";
import { UserResponse } from "../../types/UserResponse";

interface IUserService  {
  create(req: Request): Promise<void>;
  findAll(): Promise<UserResponse[]>;
  delete (req: Request): Promise<void>;
  updateRole(req:Request, role: UserRoleEnum): Promise<void>;
  validUser(req: Request): Promise<void>;
  resetPassword(req: Request): Promise<void>;
  newPassword(req: Request): Promise<void>;
  update(req: Request): Promise<void>;
}

export default IUserService
