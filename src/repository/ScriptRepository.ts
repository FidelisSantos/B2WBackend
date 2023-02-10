import  IScriptRepository  from '../interfaces/repository/IScriptRepository';
import Script from '../models/Script';
import IFirestore from '../interfaces/firestore/IFirestore';
import FirestoreApp from "../firebase/firestore/firestore"

class ScriptRepository implements IScriptRepository {

  constructor(private firestore: IFirestore) {
    this.firestore = firestore;
  }

  async existsQuestion(question: string, path: string) {
    return await this.firestore.existsQuestion(path, question);
  }

  async exists(id: string, path: string) {
    return await this.firestore.exists(path, id);
  }

  async findOne(id: string, path: string) {
    return await this.firestore.findOne( path, id);
  }

  async findAll(path: string) {
    return await this.firestore.findAll( path);
  }

  async delete(id: string, path: string) {
    return await this.firestore.delete(path, id);
  }

  async update(script: Script, id: string, path: string){
    return this.firestore.update(path, script, id)
  }

  async create(script: Script, path: string) {
    return this.firestore.create(path, script)
  }

}

export default new ScriptRepository(FirestoreApp);

