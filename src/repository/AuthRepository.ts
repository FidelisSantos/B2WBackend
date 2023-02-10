import { CollectionReference, getDocs, query, where } from "firebase/firestore";
import  IAuthRepository  from "../interfaces/repository/IAuthRepository";
import { userCollection } from "../firebase/firebase";

class AuthRepository implements IAuthRepository {

  constructor (private userCollection: CollectionReference) {
    this.userCollection = userCollection;
  }

  async findByEmail(email: string) {
    const queryUser = query(this.userCollection, where("email", "==", email));
    const getUser =  await getDocs(queryUser);
    const user = getUser.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return user[0];
 }

}

export default new AuthRepository(userCollection)
