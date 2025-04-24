import { PropsWithChildren } from "react";
import GraphQLProvider from "./graphql-provider";

export default function MainProvider({ children }: PropsWithChildren) {
   return <GraphQLProvider>{children}</GraphQLProvider>;
}
