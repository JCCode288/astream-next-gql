import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <div className="min-h-screen bg-black text-white">
         {/* Video Player Skeleton */}
         <div className="relative w-full aspect-video bg-zinc-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
         </div>

         {/* Episode Information Skeleton */}
         <div className="container py-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <Skeleton className="h-8 w-64 bg-zinc-800" />
                  <div className="flex items-center gap-2 mt-1">
                     <Skeleton className="h-4 w-16 bg-zinc-800" />
                     <Skeleton className="h-4 w-8 bg-zinc-800" />
                     <Skeleton className="h-4 w-12 bg-zinc-800" />
                  </div>
               </div>

               <div className="flex gap-2">
                  <Skeleton className="h-10 w-24 bg-zinc-800" />
                  <Skeleton className="h-10 w-24 bg-zinc-800" />
               </div>
            </div>

            <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
            <Skeleton className="h-4 w-3/4 bg-zinc-800 mb-6" />

            <Skeleton className="h-px w-full bg-zinc-800 mb-6" />

            {/* Episode List Skeleton */}
            <Skeleton className="h-7 w-32 bg-zinc-800 mb-4" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton
                     key={i}
                     className="aspect-video w-full bg-zinc-800 rounded-md"
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
