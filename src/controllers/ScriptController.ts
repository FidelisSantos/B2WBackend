import { Request, Response } from "express";
import  IScriptService  from "../interfaces/services/IScriptService";
import ScriptService from "../services/ScriptService";

class ScriptController {

  constructor(private scriptService: IScriptService) {
    this.scriptService = scriptService;
  }

  async findAll(res: Response, path: string) {
    return await this.scriptService.findAll(res, path);
  }

  async create(req: Request, res: Response, path: string) {
    return await this.scriptService.create(req, res, path);
  }

  async delete(req: Request, res: Response, path: string) {
    return await this.scriptService.delete(req, res, path);
  }

  async update(req: Request, res: Response, path: string) {
    return await this.scriptService.update(req, res, path);
  }
}

export default new ScriptController(ScriptService);
