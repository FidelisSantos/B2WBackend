import { Request, Response } from "express";
import  IUserService  from '../interfaces/services/IUserService';
import  UserService  from "../services/UserService";
import  UserRoleEnum from "../enum/UserRoleEnum";
import UserRepository from "../repository/UserRepository";
import Mapping from "../mapping/Mapping";
import { ApiError } from "../error/ApiError";
import HttpException from "../middlewares/HttpException";

class UserController {

  constructor(private readonly userService: IUserService) {
     this.userService = userService;
    }

  async create(req: Request, res: Response) {
    try {
      await this.userService.create(req);
      return res.sendStatus(201);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async findAll(res: Response) {
    try {
      const users =  await this.userService.findAll();
      return res.status(200).send(users);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.userService.delete(req);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async updateToAdmin(req: Request, res: Response) {
    try {
      await this.userService.updateRole(req, UserRoleEnum.ADMIN);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async removeAdmin(req: Request, res: Response) {
    try {
      await this.userService.updateRole(req, UserRoleEnum.USER);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      await this.userService.resetPassword(req);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async newPassword(req: Request, res: Response) {
    try {
      await this.userService.newPassword(req);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async validUser(req: Request, res: Response) {
    try {
      await this.userService.validUser(req);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      await this.userService.update(req);
      return res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }
}

export default new UserController(new UserService(UserRepository, Mapping))
