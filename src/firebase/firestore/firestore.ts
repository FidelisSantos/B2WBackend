import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import IFirestore from "../../interfaces/firestore/IFirestore";
import Script from "../../models/Script";
import { firestore } from "../firebase";

class FirestoreApp implements IFirestore {
  constructor(private firestore: Firestore){
    this.firestore = firestore;
  }

  async create(path: string, script: Script) {
    await addDoc(collection(this.firestore, path), {
      question: script.question,
      answer: script.answer,
      imgAnswer: script.imgAnswer
    });
  }

  async update(path: string, script: Script, id: string){
    await updateDoc(doc(collection(this.firestore, path), id), {
      'question': script.question,
      'answer': script.answer,
      'imgAnswer': script.imgAnswer
    });
  }

  async delete(path: string, id: string) {
    await deleteDoc(doc(collection(this.firestore, path), id))
  }

  async findAll(path: string) {
    const query = await getDocs(collection(this.firestore, path));
    return query.docs.map((doc) => ({...doc.data(), id: doc.id}));
  }

  async findOne(path: string, id: string): Promise<any> {
    const query = await getDoc(doc(collection(this.firestore, path), id));
    const script:any = query.data();
    return script;
  }

  async exists(path: string, id: string) {
    const query = await getDoc(doc(collection(this.firestore, path), id))
    return query.exists();
  }

  async existsQuestion(path: string, question: string) {
    const queryUser = query(collection(this.firestore, path), where("question", "==", question));
    const getScript =  await getDocs(queryUser);
    const scripts = getScript.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return scripts.length > 0;
  }

}

export default new FirestoreApp(firestore);
