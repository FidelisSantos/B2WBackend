import { Request, Response } from "express";
import  IScriptService  from "../interfaces/services/IScriptService";
import  IScriptRepository  from "../interfaces/repository/IScriptRepository";
import  IMapping  from '../interfaces/mapping/IMapping';
import ScriptRepository from "../repository/ScriptRepository";
import Mapping from "../mapping/Mapping";
import Storage from "../firebase/storage/storage";
import IStorage from "../interfaces/storage/IStorage";
import { BadRequestError } from '../error/BadRequestError';
import { ConflictError } from '../error/ConflictError';
import Script from "../models/Script";

class ScriptService implements IScriptService {

  constructor(private scriptRepository: IScriptRepository,
              private mapping: IMapping,
              private storage: IStorage) {
    this.scriptRepository = scriptRepository;
    this.mapping = mapping;
    this.storage = storage;
  }

  async create(req: Request, path: string) {
      const erroValidate = this.validateBody(req);
      if(erroValidate) throw new BadRequestError(erroValidate);

      if(await this.scriptRepository.existsQuestion(req.body.question, path))
        throw new ConflictError('Já existe essa pergunta');

      if(req.file) {
        req.body.imgAnswer = await this.storage.upload(path, req.file)
      }

      if(!req.body.imgAnswer) req.body.imgAnswer = "";

      const newScript = this.mapping.convertToScript(req.body);
      await this.scriptRepository.create(newScript, path);
  }

  async findAll(path: string) {
    return await this.scriptRepository.findAll(path) as Script[];
  }

  async delete(req: Request, path: string) {
    const script = await this.findOne(req.params.id, path);
    if(!script)
      throw new BadRequestError("Script não encontrado");

    await this.storage.delete(script.imgAnswer)
    await this.scriptRepository.delete(req.params.id, path);
  }

  async update(req: Request, path: string) {

      const erroValidate = this.validateBody(req);
      if(erroValidate) throw new BadRequestError(erroValidate);

      const script = await this.findOne(req.params.id, path);
      if(!script) throw new BadRequestError("Script não encontrado");

      if(script.question != req.body.question && await this.scriptRepository.existsQuestion(req.body.question, path))
        throw new ConflictError('Já existe essa pergunta');

      if(req.file){
        req.body.imgAnswer = await this.storage.upload(path, req.file);
        await this.storage.delete(script.imgAnswer);
      }

      script.question = req.body.question;
      script.answer = req.body.answer;
      script.imgAnswer = req.body.imgAnswer;
      await this.scriptRepository.update(script, req.params.id, path);

  }

  private async findOne(id: string, path: string) {
    return await this.scriptRepository.findOne(id, path) as Script | undefined;
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

export default ScriptService;
