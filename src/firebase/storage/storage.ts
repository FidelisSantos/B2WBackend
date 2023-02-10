import { FirebaseStorage, deleteObject, getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from '../firebase';
import IStorage from "../../interfaces/storage/IStorage";

class Storage implements IStorage{
  constructor(private storage: FirebaseStorage){}

  async  upload(path: string, file: Express.Multer.File) {
    const imageName = Date.now() + "."+ file.originalname;
    const imageReference = ref(this.storage, `${path}/${imageName}`);
    const upload = await uploadBytes(imageReference, file.buffer, {contentType: file.mimetype});
    return await getDownloadURL(upload.ref);
  }

  async delete(imageLink: string|undefined) {
    try{
      await deleteObject(ref(this.storage, imageLink))
    }catch {
      null
    }

  }
}

export default new Storage(storage)
