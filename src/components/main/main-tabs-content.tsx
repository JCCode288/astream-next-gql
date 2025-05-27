import { IAnimeResult, ISearch } from "@consumet/extensions";
import MainPagination, { IPagination } from "./main-pagination";
import AnimeCard from "./anime-card";
import { TabsContent } from "../ui/tabs";
import { MainContentLoading } from "./loading/main-content-loading";

export interface ITabsContentProps {
   tab: string;
   animes: ISearch<IAnimeResult>;
   loading: boolean;
   pagination: { func: () => void; current: number };
}
export default function MainTabsContent({
   tab,
   animes,
   loading,
   pagination,
}: ITabsContentProps) {
   return (
      <TabsContent value={tab} className="mt-0">
         <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {loading && <MainContentLoading />}
            {!loading &&
               animes?.results.map((anime: any, i: number) => (
                  <AnimeCard key={`anime-${i}`} anime={anime} />
               ))}
         </div>
         <MainPagination
            pageFunc={pagination?.func}
            hasNextPage={animes?.hasNextPage}
            current={pagination?.current}
            totalPages={animes.totalPages}
         />
      </TabsContent>
   );
}
