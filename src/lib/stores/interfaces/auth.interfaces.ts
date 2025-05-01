import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";

export interface IUserConfig {
   theme: "dark" | "light";
   autoplay: boolean;
}

export interface IAuthData {
   browserId: string | null;
   userId: string | null;
   token: string | null;
   isLoggedIn: boolean;
   config: IUserConfig;
}

export interface IAuthStore extends IAuthData {
   googleLogin(): void;
   setUserId(uid: string): void;
   setToken(token: string): void;
   setIsLoggedIn(isLoggedIn: boolean): void;
}
