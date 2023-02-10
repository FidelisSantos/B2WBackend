import { Request, Response } from "express";
import  IScriptService  from "../interfaces/services/IScriptService";
import  IScriptRepository  from "../interfaces/repository/IScriptRepository";
import  IMapping  from '../interfaces/mapping/IMapping';
import ScriptRepository from "../repository/ScriptRepository";
import Mapping from "../Mapping/Mapping";
import Storage from "../firebase/storage/storage";
import IStorage from "../interfaces/storage/IStorage";

class ScriptService implements IScriptService {

  constructor(private scriptRepository: IScriptRepository,
              private mapping: IMapping,
              private storage: IStorage) {
    this.scriptRepository = scriptRepository;
    this.mapping = mapping;
    this.storage = storage;
  }

  async create(req: Request, res: Response, path: string) {
    try{
      const erroValidate = this.validateBody(req);
      if(erroValidate)
        return res.status(400).send(erroValidate);

      if(await this.scriptRepository.existsQuestion(req.body.question, path))
        return res.status(409).send('Já existe essa pergunta');

      if(req.file) {
        req.body.imgAnswer = await this.storage.upload(path, req.file)
      }

      if(!req.body.imgAnswer) req.body.imgAnswer = "";

      const newScript = this.mapping.convertToScript(req.body);
      await this.scriptRepository.create(newScript, path);
      return res.sendStatus(200);
    }catch (e:any) {
      return res.status(500).send(e.message);
    }
  }

  async findAll(res: Response, path: string) {
    try {
      const scripts = await this.scriptRepository.findAll(path);
      return res.status(200).send(scripts);
    } catch {
      return res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response, path: string) {
   try {
      const script = await this.findOne(req.params.id, path);
      if(!script)
        return res.sendStatus(404);

        await this.storage.delete(script.imgAnswer)
      await this.scriptRepository.delete(req.params.id, path);
      return res.sendStatus(200);
   } catch {
      return res.sendStatus(500);
   }
  }

  async update(req: Request, res: Response, path: string) {
    try{
      const erroValidate = this.validateBody(req);
      if(erroValidate)
      return res.status(400).send(erroValidate);

      const script = await this.findOne(req.params.id, path);
      if(!script)
        return res.sendStatus(404);

      if(script.question != req.body.question && await this.scriptRepository.existsQuestion(req.body.question, path))
        return res.status(409).send('Já existe essa pergunta');

      if(req.file){
        req.body.imgAnswer = await this.storage.upload(path, req.file);
        await this.storage.delete(script.imgAnswer);
      }

      script.question = req.body.question;
      script.answer = req.body.answer;
      script.imgAnswer = req.body.imgAnswer;
      await this.scriptRepository.update(script, req.params.id, path);
      return res.sendStatus(200);
    }catch (e: any){
      return res.sendStatus(500);
    }
  }

  private async findOne(id: string, path: string) {
    const script = await this.scriptRepository.findOne(id, path);
    if(!script)
      return;
    return this.mapping.convertToScript(script);
  }

  private validateBody(req: Request) {
    const http = 'http://';
    const https = 'https://';
    if(!req.body) return 'Dados Vazios';
    if(!req.body.question) return 'Campo pergunta obrigatório';
    if(!req.body.answer) return 'Campo resposta obrigatório';
    if(req.body.imgAnswer)
      if(!req.body.imgAnswer.includes(http) && !req.body.imgAnswer.includes(https))
        return 'Imagem inválida';
  }
}

export default new ScriptService(ScriptRepository, Mapping, Storage)
