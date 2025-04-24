import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <div className="min-h-screen bg-black text-white">
         {/* Hero Section Skeleton */}
         <div className="relative">
            <div className="absolute inset-0 z-0 bg-zinc-900" />

            <div className="container relative z-10 pt-8">
               <Skeleton className="h-4 w-24 bg-zinc-800" />
            </div>

            <div className="container relative z-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-12">
               {/* Anime Poster Skeleton */}
               <div className="flex flex-col gap-4">
                  <Skeleton className="aspect-[2/3] w-full bg-zinc-800" />
                  <div className="flex gap-2">
                     <Skeleton className="h-10 flex-1 bg-zinc-800" />
                     <Skeleton className="h-10 w-10 bg-zinc-800" />
                     <Skeleton className="h-10 w-10 bg-zinc-800" />
                     <Skeleton className="h-10 w-10 bg-zinc-800" />
                  </div>
               </div>

               {/* Anime Details Skeleton */}
               <div className="flex flex-col justify-end">
                  <div className="space-y-4">
                     <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 bg-zinc-800" />
                        <Skeleton className="h-6 w-16 bg-zinc-800" />
                        <Skeleton className="h-6 w-16 bg-zinc-800" />
                     </div>

                     <Skeleton className="h-12 w-3/4 bg-zinc-800" />

                     <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-5 w-24 bg-zinc-800" />
                        <Skeleton className="h-5 w-24 bg-zinc-800" />
                        <Skeleton className="h-5 w-24 bg-zinc-800" />
                     </div>

                     <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20 bg-zinc-800" />
                        <Skeleton className="h-6 w-20 bg-zinc-800" />
                        <Skeleton className="h-6 w-20 bg-zinc-800" />
                        <Skeleton className="h-6 w-20 bg-zinc-800" />
                     </div>
                  </div>

                  <div className="mt-6">
                     <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
                     <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
                     <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-6">
                     <Skeleton className="h-12 w-24 bg-zinc-800" />
                     <Skeleton className="h-12 w-24 bg-zinc-800" />
                     <Skeleton className="h-12 w-24 bg-zinc-800" />
                     <Skeleton className="h-12 w-24 bg-zinc-800" />
                  </div>
               </div>
            </div>
         </div>

         {/* Content Tabs Skeleton */}
         <div className="container py-8">
            <div className="flex gap-4 mb-6">
               <Skeleton className="h-10 w-24 bg-zinc-800" />
               <Skeleton className="h-10 w-24 bg-zinc-800" />
               <Skeleton className="h-10 w-24 bg-zinc-800" />
               <Skeleton className="h-10 w-24 bg-zinc-800" />
            </div>

            <div className="mt-6">
               <div className="flex justify-between items-center mb-6">
                  <Skeleton className="h-8 w-32 bg-zinc-800" />
                  <div className="flex gap-2">
                     <Skeleton className="h-10 w-24 bg-zinc-800" />
                     <Skeleton className="h-10 w-24 bg-zinc-800" />
                     <Skeleton className="h-10 w-24 bg-zinc-800" />
                  </div>
               </div>

               <div className="grid gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                     <Skeleton
                        key={i}
                        className="h-32 w-full bg-zinc-800"
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
