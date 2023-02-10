import Script from "../../models/Script";

interface IScriptRepository {
  create(script: Script, path: string):Promise<void>;
  update(script: Script, id: string, path: string):Promise<void>;
  delete(id: string, path: string):Promise<void>;
  findAll(path: string): Promise<any>
  findOne(id: string, path: string): Promise<any>;
  exists(id: string, path: string): Promise<boolean>;
  existsQuestion(question: string, path: string): Promise<boolean>;
}

export default IScriptRepository;
