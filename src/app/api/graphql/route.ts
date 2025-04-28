import { startServerAndCreateNextHandler } from "@as-integrations/next";
import server from "@/lib/graphql/server";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
import { ApolloError } from "@apollo/client";

const handler = startServerAndCreateNextHandler(server, {
   context: async (request) => {
      const headers: any = request.headers;
      const token = headers.get("authorization");
      let provider = headers.get("x-ani-provider");
      const origin = headers.get("origin");
      const referer = headers.get("referer");

      console.log({
         token,
         provider,
         origin,
         referer,
         whitelist: process.env.WHITELIST,
      });

      if (!origin || !referer)
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });

      const refererURL = new URL(referer);
      const originURL = new URL(origin);

      if (originURL.origin !== process.env.WHITELIST) {
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });
      }

      if (originURL.origin !== refererURL.origin) {
         throw new ApolloError({
            networkError: new Error("cannot access"),
         });
      }

      if (!provider) {
         provider = ProviderEnum.ZORO;

         return {
            token,
            provider,
         };
      }
      if (typeof provider !== "string") {
         provider = ProviderEnum.ZORO;

         return {
            token,
            provider,
         };
      }
      if (!Object.values(ProviderEnum).includes(provider as any)) {
         provider = ProviderEnum.ZORO;

         return {
            token,
            provider,
         };
      }

      return {
         token,
         provider,
      };
   },
});

export const GET = handler as any;
export const POST = handler as any;
