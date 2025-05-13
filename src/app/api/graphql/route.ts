import { startServerAndCreateNextHandler } from "@as-integrations/next";
import server from "@/lib/graphql/server";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
import { ApolloError } from "@apollo/client";

const handleOpts = {
   context: async (request: Request) => {
      const headers: any = request.headers;
      const token = headers.get("authorization");
      let provider = headers.get("x-ani-provider");
      const origin = headers.get("origin");
      const referer = headers.get("referer");
      let ip = headers.get("x-forwarded-for");
      if (!ip) ip = headers.get("ip");
      ip = ip?.replace(/^:(.*):/, "");
      console.log({
         token,
         provider,
         origin,
         referer,
         ip,
      });
      if (!origin || !ip)
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });
      if (process.env.NODE_ENV !== "development" && ip === "127.0.0.1")
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });

      const refererURL = new URL(referer);
      const originURL = new URL(origin);
      if (originURL.origin !== refererURL.origin) {
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });
      }
      provider = ProviderEnum.ZORO;
      return {
         token,
         provider,
         ip,
      };
   },
};

const handler = startServerAndCreateNextHandler(server, handleOpts);

export const GET = handler as any;
export const POST = handler as any;
