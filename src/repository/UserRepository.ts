import  UserRoleEnum  from "../enum/UserRoleEnum";
import { userCollection } from "../firebase/firebase";
import  IUserRepository  from "../interfaces/repository/IUserRepository";
import User from "../models/User";
import {doc, CollectionReference, getDoc, getDocs, deleteDoc, updateDoc, addDoc, query, where } from "firebase/firestore"


class UserRepository implements IUserRepository{

  constructor (private userCollection: CollectionReference) {
    this.userCollection = userCollection;
  }

  async exists(id: string) {
    const query = await getDoc(doc(this.userCollection, id))
    return query.exists();
  }

  async update(id: string, user: User) {
   await updateDoc(doc(this.userCollection, id), {
      'name':user.name,
      'email': user.email,
    });
  }

  async changePassword(id: string, password: string) {
    await updateDoc(doc(this.userCollection, id), {
      "password": password
    })
  }

  async validUser(id: string) {
    await updateDoc(doc(this.userCollection, id), {
      "isValid": true
    })
  }

  async updateRole(id: string, role: UserRoleEnum) {
    await updateDoc(doc(this.userCollection, id), {
      "role": role
    })
  }

  async delete(id: string)  {
    await deleteDoc(doc(this.userCollection, id));
  }

  async findAll() {
    const query = await getDocs(this.userCollection);
    return query.docs.map((doc) => ({...doc.data(), id: doc.id}));
  }

  async create(user: User) {
    await addDoc(this.userCollection, {
      name: user.name,
      email: user.email,
      isValid: user.isValid,
      password: user.password,
      role: user.role
      });
  }

  async findOne(id: string) {
     const query = await getDoc(doc(this.userCollection, id));
     const user:any = query.data();
     return user;
  }

  async existsEmail(email: string) {
    const queryUser = query(this.userCollection, where("email", "==", email));
    const getUser =  await getDocs(queryUser);
    const user = getUser.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return user.length > 0;
  }

}

export default new UserRepository(userCollection);
