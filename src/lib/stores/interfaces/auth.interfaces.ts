import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";

export interface IAuthData {
   userId: string;
   token: string | null;
   isLoggedIn: boolean;
}

export interface IAuthStore extends IAuthData {
   googleLogin(): void;
   setUserId(uid: string): void;
   setToken(token: string): void;
   setIsLoggedIn(isLoggedIn: boolean): void;
}
