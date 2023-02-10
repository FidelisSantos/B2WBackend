import Script from "../../models/Script";

interface IFirestore {
  create(path:string,script: Script):Promise<void>;
  update(path:string,script: Script, id: string):Promise<void>;
  delete(path:string,id: string):Promise<void>;
  findAll(path:string): Promise<any>
  findOne(path:string, id: string): Promise<any>;
  exists(path:string, id: string): Promise<boolean>;
  existsQuestion(path:string, question: string): Promise<boolean>;
}

export default IFirestore;
