import useMainAnimes from "@/components/hooks/useAnimes";
import MainHero from "@/components/main/main-hero";
import MainTabs from "@/components/main/main-tabs";

export default async function HomePage() {
   const { error, animes } = await useMainAnimes();

   if (!animes || error)
      return (
         <div
            className="flex flex-1 bg-black text-white text-center
   "
         >
            Server had trouble. Please comeback again later
         </div>
      );

   return (
      <div className="flex flex-1 flex-col bg-black text-white justify-center items-center">
         <main>
            {/* Hero Section */}
            {animes?.datas?.highlighted && (
               <section className="relative h-[70dvh] overflow-hidden">
                  <MainHero
                     highlighted={animes.datas?.highlighted?.results[0]}
                  />
               </section>
            )}

            {/* Content Sections */}
            <section className="py-12">
               <div className="container">
                  <MainTabs animes={animes} />
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
