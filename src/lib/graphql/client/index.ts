"use client";

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
   const baseLink = createHttpLink({ uri });
   const contextLink = setContext(async (_, context) => {
      const token = authStore.getState().token;
      const provider = animeStore.getState().provider;
      const headers = context.headers;
      console.log(context, "[Request Headers]");

      return {
         headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
            "x-ani-provider": provider,
            origin: process.env.NEXT_PUBLIC_URL,
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

const client = new ApolloClient({
   ssrMode: true,
   cache: new InMemoryCache({
      resultCaching: false,
   }),
   credentials: "same-site",
   link: buildLink("/api/graphql"),
});

export default client;
