export interface IAuthData {
   userId: string;
   token: string | null;
   isLoggedIn: boolean;
}

export interface IAuthStore extends IAuthData {
   setUserId(uid: string): void;
   setToken(token: string): void;
   setIsLoggedIn(isLoggedIn: boolean): void;
}
