import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthData, IAuthStore } from "./interfaces/auth.interfaces";
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import firebaseStore from "./firebase.store";

const initialData: IAuthData = {
   browserId: null,
   userId: null,
   token: null,
   isLoggedIn: false,
   config: {
      theme: "dark",
      autoplay: false,
   },
};

const authStore = create<IAuthStore>()(
   persist(
      (set, get) => ({
         ...initialData,

         async googleLogin() {
            let auth = firebaseStore.getState().getFirebaseAuth();

            const provider = new GoogleAuthProvider();

            const login = await signInWithPopup(auth, provider);
            const token = await login.user.getIdToken();

            set((state) => ({
               ...state,
               token,
               isLoggedIn: true,
               userId: login.user.uid,
            }));
         },
         setFirebase(app: FirebaseApp) {
            set((state) => ({ ...state, app }));
         },
         setUserId(uid: string) {
            set((state) => ({ ...state, userId: uid }));
         },
         setToken(token) {
            set((state) => ({ ...state, token }));
         },
         setIsLoggedIn(isLoggedIn: boolean) {
            set((state) => ({ ...state, isLoggedIn }));
         },
      }),
      {
         name: "auth-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default authStore;
