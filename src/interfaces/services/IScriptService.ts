import { Request } from "express";
import Script from '../../models/Script';

interface IScriptService {
  create(req: Request, path: string): Promise<void>;
  findAll(path: string): Promise<Script[]>;
  delete (req: Request, path: string): Promise<void>;
  update(req: Request, path: string): Promise<void>;
}

export default IScriptService;
