"use client";

import Image from "next/image";
import { Play, Star, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AnimeCard from "@/components/main/anime-card";
import UpcomingCard from "@/components/main/upcoming-card";
import GenreCard from "@/components/main/main-card";
import ContinueWatchingCard from "@/components/main/continue-card";
import useMainAnimes from "@/components/hooks/useAnimes";
import { Suspense } from "react";

export default function HomePage() {
   const { loading, error, animes } = useMainAnimes();

   return (
      <Suspense fallback={<>Loading..</>}>
         <div className="flex flex-col min-h-screen bg-black text-white justify-center items-center">
            <main>
               {/* Hero Section */}
               <section className="relative h-[70dvh] overflow-hidden">
                  <div className="absolute inset-0 z-0">
                     <Image
                        src="/placeholder.svg?height=1080&width=1920"
                        alt="Featured Anime"
                        fill
                        className="object-cover brightness-50"
                        priority
                     />
                  </div>
                  <div className="container relative z-10 flex h-full flex-col justify-end pb-16 pt-24">
                     <Badge className="mb-4 w-fit bg-rose-500 hover:bg-rose-600">
                        New Release
                     </Badge>
                     <h1 className="mb-2 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Demon Slayer: Kimetsu no Yaiba
                     </h1>
                     <p className="mb-6 max-w-xl text-zinc-300">
                        Tanjiro sets out to become a demon slayer to avenge
                        his family and cure his sister.
                     </p>
                     <div className="flex flex-wrap gap-3">
                        <Button className="gap-2 bg-rose-500 hover:bg-rose-600">
                           <Play className="h-4 w-4" />
                           Watch Now
                        </Button>
                        <Button
                           variant="outline"
                           className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           + Add to My List
                        </Button>
                     </div>
                     <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center">
                           <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                           <span className="ml-1 text-sm font-medium">
                              4.9
                           </span>
                        </div>
                        <div className="text-sm text-zinc-400">2023</div>
                        <div className="text-sm text-zinc-400">TV-14</div>
                        <div className="text-sm text-zinc-400">
                           24 Episodes
                        </div>
                     </div>
                  </div>
               </section>

               {/* Content Sections */}
               <section className="py-12">
                  <div className="container">
                     <Tabs defaultValue="trending" className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold">
                              Browse Anime
                           </h2>
                           <TabsList className="bg-zinc-900">
                              <TabsTrigger
                                 value="trending"
                                 className="data-[state=active]:bg-rose-500"
                              >
                                 Trending
                              </TabsTrigger>
                              <TabsTrigger
                                 value="new"
                                 className="data-[state=active]:bg-rose-500"
                              >
                                 New Releases
                              </TabsTrigger>
                              <TabsTrigger
                                 value="popular"
                                 className="data-[state=active]:bg-rose-500"
                              >
                                 Popular
                              </TabsTrigger>
                           </TabsList>
                        </div>

                        <TabsContent value="trending" className="mt-0">
                           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {Array.from({ length: 10 }).map((_, i) => (
                                 <AnimeCard key={i} index={i} />
                              ))}
                           </div>
                        </TabsContent>

                        <TabsContent value="new" className="mt-0">
                           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {Array.from({ length: 10 }).map((_, i) => (
                                 <AnimeCard key={i} index={i + 10} />
                              ))}
                           </div>
                        </TabsContent>

                        <TabsContent value="popular" className="mt-0">
                           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {Array.from({ length: 10 }).map((_, i) => (
                                 <AnimeCard key={i} index={i + 20} />
                              ))}
                           </div>
                        </TabsContent>
                     </Tabs>

                     {/* Continue Watching Section */}
                     <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold">
                              Continue Watching
                           </h2>
                           <Button
                              variant="link"
                              className="text-rose-500 hover:text-rose-400 p-0"
                           >
                              See All{" "}
                              <ChevronRight className="h-4 w-4 ml-1" />
                           </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                           {Array.from({ length: 4 }).map((_, i) => (
                              <ContinueWatchingCard key={i} index={i} />
                           ))}
                        </div>
                     </div>

                     {/* Genres Section */}
                     <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold">
                              Top Genres
                           </h2>
                           <Button
                              variant="link"
                              className="text-rose-500 hover:text-rose-400 p-0"
                           >
                              Browse All{" "}
                              <ChevronRight className="h-4 w-4 ml-1" />
                           </Button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                           {[
                              "Action",
                              "Romance",
                              "Comedy",
                              "Fantasy",
                              "Sci-Fi",
                              "Slice of Life",
                           ].map((genre, i) => (
                              <GenreCard key={i} genre={genre} index={i} />
                           ))}
                        </div>
                     </div>

                     {/* Upcoming Releases */}
                     <div>
                        <div className="flex items-center justify-between mb-6">
                           <h2 className="text-2xl font-bold">
                              Upcoming Releases
                           </h2>
                           <Button
                              variant="link"
                              className="text-rose-500 hover:text-rose-400 p-0"
                           >
                              View Calendar{" "}
                              <ChevronRight className="h-4 w-4 ml-1" />
                           </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {Array.from({ length: 4 }).map((_, i) => (
                              <UpcomingCard key={i} index={i} />
                           ))}
                        </div>
                     </div>
                  </div>
               </section>
            </main>
         </div>
      </Suspense>
   );
}
