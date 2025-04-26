"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
   IFirebaseData,
   IFirestoreStore,
} from "./interfaces/firebase.interfaces";

const APP_FIREBASE_NAME = "astream-firebase";

const initialState: IFirebaseData = {
   name: APP_FIREBASE_NAME,
   app: null,
   auth: null,
   firestore: null,
};

const firebaseStore = create<IFirestoreStore>()(
   persist(
      (set, get) => ({
         ...initialState,
         getFirebaseFirestore() {
            let firestore = get().firestore;
            if (firestore) return firestore;

            let app = get().app;
            if (!app) app = getApp(APP_FIREBASE_NAME);

            firestore = getFirestore(app);

            return firestore;
         },
         getFirebaseAuth() {
            let auth = get().auth;
            if (auth) return auth;

            let app = get().app;
            if (!app) app = getApp(APP_FIREBASE_NAME);

            auth = getAuth(app);

            return auth;
         },
      }),
      {
         name: "firebase-data",
         onRehydrateStorage(state) {
            const app = initializeApp(
               {
                  apiKey: process.env.NEXT_PUBLIC_FBS_API_KEY,
                  projectId: process.env.NEXT_PUBLIC_FBS_PROJECT_ID,
                  authDomain: process.env.NEXT_PUBLIC_FBS_AUTH_DOMAIN,
                  databaseURL: process.env.NEXT_PUBLIC_FBS_DB_URL,
                  storageBucket:
                     process.env.NEXT_PUBLIC_FBS_STORAGE_BUCKET,
                  messagingSenderId:
                     process.env.NEXT_PUBLIC_FBS_STORAGE_BUCKET,
                  appId: process.env.NEXT_PUBLIC_FBS_APP_ID,
                  measurementId: process.env.NEXT_PUBLIC_FBS_MEAS_ID,
               },
               APP_FIREBASE_NAME
            );
            const auth = getAuth(app);
            const firestore = getFirestore(app);

            state.app = app;
            state.auth = auth;
            state.firestore = firestore;
         },
         partialize(state) {
            const { app, auth, firestore, ...rest } = state;

            return rest;
         },
      }
   )
);

export default firebaseStore;
