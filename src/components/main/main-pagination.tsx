import { useMemo } from "react";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "../ui/pagination";

export interface IPagination {
   current: number;
   totalPages: number;
   hasNextPage: boolean;
   pageFunc: (page: number) => void;
}

export default function MainPagination({
   current,
   totalPages,
   hasNextPage,
   pageFunc,
}: IPagination) {
   const hasPrevPage = current > 1;

   /**
    * @description width of 5 pages including current
    */
   const middlePages = useMemo(() => {
      if (current < 5) return Array.from({ length: 5 }, (_, i) => i + 1);

      const mid = [];

      // subtract by 4 to get last 5 pages
      if (current >= totalPages - 4) {
         for (let i = totalPages - 4; i <= totalPages; i++) {
            mid.push(i);
         }

         return mid;
      }

      for (let i = current - 2; i <= current + 2; i++) {
         mid.push(i);
      }

      return mid;
   }, [current, totalPages]);

   const handlePrev = () => {
      if (!hasPrevPage) return;

      pageFunc(current - 1);
   };

   const handleNext = () => {
      if (!hasNextPage) return;

      pageFunc(current + 1);
   };

   return (
      <Pagination className="my-4">
         <PaginationContent>
            {hasPrevPage && (
               <PaginationItem>
                  <PaginationPrevious onClick={handlePrev} />
               </PaginationItem>
            )}

            {middlePages.map((p) => (
               <PaginationItem key={`pgn-${p}`}>
                  <PaginationLink
                     onClick={() => pageFunc(p)}
                     isActive={p === current}
                  >
                     {p}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {hasNextPage && (
               <PaginationItem>
                  <PaginationNext onClick={handleNext} />
               </PaginationItem>
            )}
         </PaginationContent>
      </Pagination>
   );
}
