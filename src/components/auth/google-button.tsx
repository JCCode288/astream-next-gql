"use client";

import authStore from "@/lib/stores/auth.store";
import { Button } from "../ui/button";

export default function GoogleButton() {
   const googleLogin = authStore().googleLogin;
   const handleLogin = () => googleLogin();

   return <Button onClick={handleLogin}>Login with Google</Button>;
}
