import typeDefs from "./type.defs";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";

const server = new ApolloServer({
   typeDefs,
   resolvers,
   cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 2) * 100, // ~100 mb caching
      ttl: 180, // 3 minutes
   }),
});

export default startServerAndCreateNextHandler(server, {
   context: async (request) => {
      const token = request.headers.authorization;
      let provider = request.headers["x-ani-provider"];

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
