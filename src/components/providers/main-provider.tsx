import { PropsWithChildren } from "react";
import GraphQLProvider from "./graphql-provider";
import InitProvider from "./init-provider";

export default function MainProvider({ children }: PropsWithChildren) {
   return (
      <GraphQLProvider>
         <InitProvider>
            <div className="flex flex-col flex-1">{children}</div>
         </InitProvider>
      </GraphQLProvider>
   );
}
