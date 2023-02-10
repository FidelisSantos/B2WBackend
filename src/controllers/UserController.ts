import { Request, Response } from "express";
import  IUserService  from '../interfaces/services/IUserService';
import  UserService  from "../services/UserService";
import  UserRoleEnum from "../enum/UserRoleEnum";

class UserController {

  constructor(private userService: IUserService) {
     this.userService = userService;
    }

  async create(req: Request, res: Response) {
    return await this.userService.create(req, res);
  }

  async findAll(res: Response) {
    return await this.userService.findAll(res);
  }

  async delete(req: Request, res: Response) {
    return await this.userService.delete(req, res);
  }

  async updateToAdmin(req: Request, res: Response) {
    return await this.userService.updateRole(req, res, UserRoleEnum.ADMIN);
  }

  async removeAdmin(req: Request, res: Response) {
    return await this.userService.updateRole(req, res, UserRoleEnum.USER);
  }

  async resetPassword(req: Request, res: Response) {
    return await this.userService.resetPassword(req, res);
  }

  async newPassword(req: Request, res: Response) {
    return await this.userService.newPassword(req, res);
  }

  async validUser(req: Request, res: Response) {
    return await this.userService.validUser(req, res);
  }

  async update(req: Request, res: Response) {
    return await this.userService.update(req, res);
  }

}

export default new UserController(UserService)
