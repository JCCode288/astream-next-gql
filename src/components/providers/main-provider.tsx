import { PropsWithChildren } from "react";
import GraphQLProvider from "./graphql-provider";

export default function MainProvider({ children }: PropsWithChildren) {
   return (
      <GraphQLProvider>
         <div className="flex flex-col flex-1">{children}</div>
      </GraphQLProvider>
   );
}
