import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config/firebaseConfig";
import { getStorage } from "@firebase/storage";

const firebase =  initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);
export const userCollection =  collection(firestore, 'Users');








