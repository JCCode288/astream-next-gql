"use server";

import { createHmac } from "crypto";

export async function getBrowserID(ip: string) {
   const hmac = createHmac(
      process.env.SECRET_ALG!,
      process.env.APP_SECRET!
   );

   hmac.update(Buffer.from(ip));
   hmac.update(Buffer.from(new Date().getTime() + ""));

   return hmac.digest().toString("base64url");
}
