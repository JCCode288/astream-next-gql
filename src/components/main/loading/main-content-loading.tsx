import { Skeleton } from "@/components/ui/skeleton";

export function MainContentLoading() {
   return Array.from({ length: 40 }, (_, i) => (
      <div
         className="flex w-full h-full justify-center items-center"
         key={`sk-card-${i}`}
      >
         <Skeleton className="aspect-[3.2/5] w-full bg-zinc-800 sm:h-[30lvw] max-h-[42lvh]" />
      </div>
   ));
}
