"use client";
import client from "@/lib/graphql/client";
import { ApolloProvider } from "@apollo/client/react";
import type { PropsWithChildren } from "react";

export default function GraphQLProvider({ children }: PropsWithChildren) {
   return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
