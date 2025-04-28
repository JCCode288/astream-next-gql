"use client";

import authStore from "@/lib/stores/auth.store";
import { Button } from "../ui/button";
import GoogleIcon from "./google-icon";

export default function GoogleButton() {
   const googleLogin = authStore().googleLogin;
   const handleLogin = () => googleLogin();

   return (
      <Button onClick={handleLogin}>
         <GoogleIcon />
      </Button>
   );
}
