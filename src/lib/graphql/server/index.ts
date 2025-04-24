import typeDefs from "./type.defs";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { ApolloError } from "@apollo/client";

const server = new ApolloServer({
   typeDefs,
   resolvers,
   cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 2) * 100, // ~100 mb caching
      ttl: 180, // 3 minutes
   }),
   csrfPrevention: true,
});

export default startServerAndCreateNextHandler(server, {
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
