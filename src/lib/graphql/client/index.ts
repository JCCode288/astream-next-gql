import {
   ApolloClient,
   createHttpLink,
   InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import authStore from "@/lib/stores/auth.store";
import animeStore from "@/lib/stores/animes.store";

function buildLink(uri: string) {
   const BASE_URL = process.env.BASE_URL;
   uri = `${BASE_URL}${uri}`;
   const baseLink = createHttpLink({
      uri,
   });
   const contextLink = setContext(async (_, context) => {
      const token = authStore.getState().token;
      const provider = animeStore.getState().provider;
      const headers = context.headers;
      // console.log(context, "[Request Headers]");

      return {
         headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
            "x-ani-provider": provider,
            origin: BASE_URL,
         },
      };
   });

   const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
         graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
               `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                  locations,
                  null,
                  3
               )}, Path: ${path}`
            );
         });
      }
      if (networkError) {
         console.error(`[Network error]: ${networkError}`);
      }
   });

   return errorLink.concat(contextLink).concat(baseLink);
}

export function createClient() {
   return new ApolloClient({
      ssrMode: typeof window === "undefined",
      cache: new InMemoryCache(),
      credentials: "same-site",
      link: buildLink("/api/graphql"),
   });
}

export default createClient();
