import { startServerAndCreateNextHandler } from "@as-integrations/next";
import server from "@/lib/graphql/server";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
import { ApolloError } from "@apollo/client";
import { IContextBody } from "@/lib/graphql/server/interfaces/context.interface";
import { NextRequest, NextResponse } from "next/server";
import { getBrowserID } from "@/lib/id.action";
import { cookies } from "next/headers";

const handler = startServerAndCreateNextHandler(server, {
   context: async (request: NextRequest) => {
      const headers: any = request.headers;
      const token = headers.get("authorization");
      let provider = headers.get("x-ani-provider") ?? ProviderEnum.ZORO;
      const origin = headers.get("origin");
      const referer = headers.get("referer");
      const clientId = request.cookies.get("SecBrowserID")!.value;

      if (!origin)
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });

      const payload: IContextBody = {
         token,
         provider,
         clientId: clientId ?? "",
      };

      if (!referer) return payload;

      const refererURL = new URL(referer);
      const originURL = new URL(origin);
      if (originURL.origin !== refererURL.origin) {
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });
      }
      provider = ProviderEnum.ZORO;

      return payload;
   },
});

export const POST = async function (req: NextRequest) {
   const cookie = await cookies();
   let clientId = cookie.get("SecBrowserID")?.value;

   if (!clientId) {
      let ip = req.headers.get("x-forwarded-for");
      if (!ip) ip = req.headers.get("ip");
      if (!ip) ip = "";

      ip = ip?.replace(/:(.*):/, "");

      clientId = await getBrowserID(ip);
      req.cookies.set("SecBrowserID", clientId);
      cookie.set("SecBrowserID", clientId, {
         sameSite: "lax",
         httpOnly: true,
         priority: "high",
      });
   }

   const handlerRes = await handler(req as any);
   const res = new NextResponse(handlerRes.body, {
      headers: handlerRes.headers,
   });

   res.cookies.set({
      name: "SecBrowserID",
      value: clientId,
      sameSite: "lax",
      httpOnly: true,
      priority: "high",
   });

   return res;
};
