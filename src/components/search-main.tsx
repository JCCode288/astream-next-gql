import { IAnimeResult, ISearch } from "@consumet/extensions";
import AnimeCard from "./main/anime-card";
import BackHomeButton from "./back-home-button";

export default function SearchMain({
   search,
}: {
   search: ISearch<IAnimeResult>;
}) {
   return (
      <div className="flex flex-1 flex-col bg-black text-white justify-center items-center">
         <main>
            {/* Hero Section */}

            {/* Content Sections */}
            <section className="py-12">
               <div className="container">
                  <div className="mb-12">
                     <div className="flex flex-col gap-1">
                        <BackHomeButton />
                        <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold">Search</h2>
                        </div>
                     </div>

                     <div className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {search?.results?.map((anime, i) => (
                              <AnimeCard key={i} anime={anime} />
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
}
