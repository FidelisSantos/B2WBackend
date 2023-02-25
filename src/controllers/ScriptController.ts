import { Request, Response } from "express";
import  IScriptService  from "../interfaces/services/IScriptService";
import ScriptService from "../services/ScriptService";
import ScriptRepository from "../repository/ScriptRepository";
import Mapping from "../mapping/Mapping";
import Storage from "../firebase/storage/storage";
import HttpException from "../middlewares/HttpException";
import { ApiError } from "../error/ApiError";

class ScriptController {

  constructor(private scriptService: IScriptService) {
    this.scriptService = scriptService;
  }

  async findAll(res: Response, path: string) {
    try {
      const scripts =  await this.scriptService.findAll(path);
      return res.status(200).send(scripts);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }

  }

  async create(req: Request, res: Response, path: string) {
    try {
      await this.scriptService.create(req, path);
      res.sendStatus(201);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async delete(req: Request, res: Response, path: string) {
    try {
      await this.scriptService.delete(req, path);
      res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }

  async update(req: Request, res: Response, path: string) {
    try {
      await this.scriptService.update(req, path);
      res.sendStatus(200);
    } catch (err) {
      HttpException.filter(err as Error & Partial<ApiError>, res);
    }
  }
}

export default new ScriptController(new ScriptService(ScriptRepository, Mapping, Storage));
