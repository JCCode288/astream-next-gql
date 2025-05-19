"use client";
import useMainAnimes from "@/hooks/useAnimes";
import MainHero from "@/components/main/main-hero";
import MainTabs from "@/components/main/main-tabs";
import animeStore from "@/lib/stores/animes.store";
import { useEffect } from "react";

// these configs was needed to force page to be dynamically loaded for gql

export default function HomePage() {
   const { error, animes, loading } = useMainAnimes();

   const resetPagination = animeStore().resetPagination;
   useEffect(() => {
      resetPagination();
   }, []);

   return (
      <div className="flex flex-1 flex-col bg-black text-white justify-center items-center">
         <main>
            {/* Hero Section */}
            {!!animes?.datas?.highlighted && (
               <section className="relative h-[70dvh] overflow-hidden">
                  <MainHero
                     highlighted={animes.datas?.highlighted?.results[0]}
                  />
               </section>
            )}

            {/* Content Sections */}
            <section className="py-12">
               <div className="container">
                  <MainTabs
                     loading={loading}
                     animes={animes}
                     error={error}
                  />
                  {/* Continue Watching Section */}
                  {/* <MainContinue histories={histories} /> */}

                  {/* Genres Section */}
                  {/* <MainGenres genres={genres} /> */}

                  {/* Upcoming Releases */}
                  {/* <MainUpcoming upcomings={upcomings} /> */}
               </div>
            </section>
         </main>
      </div>
   );
}
