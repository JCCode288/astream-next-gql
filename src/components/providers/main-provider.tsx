import { PropsWithChildren } from "react";
import GraphQLProvider from "./graphql-provider";

export default function MainProvider({ children }: PropsWithChildren) {
   return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
         <GraphQLProvider>{children}</GraphQLProvider>
      </div>
   );
}
