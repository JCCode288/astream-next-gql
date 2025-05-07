import typeDefs from "./type-defs/type.defs";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";

const server = new ApolloServer({
   typeDefs,
   resolvers,
   cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 2) * 100, // ~100 mb caching
      ttl: 180, // 3 minutes
   }),
   csrfPrevention: true,
});

export default server;
