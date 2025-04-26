import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";

export interface IFirebaseData {
   name: "astream-firebase";
   app: FirebaseApp | null;
   auth: Auth | null;
   firestore: Firestore | null;
}

export interface IFirestoreStore extends IFirebaseData {
   getFirebaseAuth(): Auth;
   getFirebaseFirestore(): Firestore;
}
