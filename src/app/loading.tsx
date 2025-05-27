import { MainContentLoading } from "@/components/main/loading/main-content-loading";
import Spinner from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <div className="flex flex-1 flex-col bg-black text-white justify-center items-center">
         <main>
            {/* Content Tabs Skeleton */}
            <section className="py-12">
               {/* <div className="container">
                  <div className="mb-12">
                     <div className="flex items-center flex-col md:flex-row gap-2 justify-between mb-6">
                        <Skeleton className="w-48 h-8 bg-zinc-700" />
                        <Skeleton className="w-72 h-12 bg-zinc-800" />
                     </div>

                     <div className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           <MainContentLoading />
                        </div>
                     </div>
                  </div>
               </div> */}
               <Spinner dim={48} />
            </section>
            {/* <div className="container py-8">
               <div className="flex flex-wrap gap-4 mb-6">
                  {Array.from({ length: 12 }, (_, i) => (
                     <Skeleton
                        key={`sk-card-${i}`}
                        className="aspect-[3/5] h-[32lvh] bg-zinc-800"
                     />
                  ))}
               </div>
            </div> */}
         </main>
      </div>
   );
}
