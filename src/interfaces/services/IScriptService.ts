import { Request, Response } from "express";

interface IScriptService {
  create(req: Request, res: Response, path: string):Promise<Response>;
  findAll(res: Response, path: string):Promise<Response>;
  delete (req: Request, res: Response, path: string):Promise<Response>;
  update(req: Request, res: Response, path: string):Promise<Response>;
}

export default IScriptService;
