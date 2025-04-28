"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EpisodeCard from "@/components/details/episode-card";
import SimilarAnimeCard from "@/components/details/similar-card";
import { useParams } from "next/navigation";
import useDetailAnime from "@/components/hooks/useDetail";
import Loading from "./loading";
import { useMemo } from "react";
import BackHomeButton from "@/components/back-home-button";

export default function AnimeDetailPage() {
   // In a real app, you would fetch the anime data based on the ID
   const { id } = useParams();

   const { loading, error, detail } = useDetailAnime(id as string);

   const firstEps = useMemo(() => {
      if (!detail?.episodes?.length) return null;

      const splitted = detail.episodes[0].id.split("$");
      return splitted[splitted.length - 1];
   }, [detail]);

   if (loading) return <Loading />;

   return (
      <div className="min-h-screen bg-black text-white flex flex-col px-4">
         {/* Hero Section with Anime Cover */}
         <div className="relative">
            {/* Back Button */}
            <BackHomeButton />

            {/* Hero Container */}
            <div className="container relative z-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-12">
               {/* Anime Poster */}
               <div className="flex flex-col gap-4">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-zinc-800 shadow-xl">
                     <Image
                        src={detail?.cover ?? detail?.image!}
                        alt="Anime Poster"
                        className="object-cover"
                        height={450}
                        width={300}
                     />
                  </div>
                  <div className="flex gap-2">
                     {firstEps && (
                        <Link
                           href={`/anime/${id}/watch/${firstEps}`}
                           className="flex-1 flex gap-2"
                        >
                           <Button className="bg-rose-500 hover:bg-rose-600 flex-1 cursor-pointer">
                              <Play className="h-4 w-4" />
                              Watch
                           </Button>
                        </Link>
                     )}
                     {/* <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-rose-500 hover:border-rose-500"
                     >
                        <Heart className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white hover:border-zinc-500"
                     >
                        <Plus className="h-4 w-4" />
                     </Button> */}
                     {/* <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white hover:border-zinc-500"
                     >
                        <Share2 className="h-4 w-4" />
                     </Button> */}
                  </div>
               </div>

               {/* Anime Details */}
               <div className="flex flex-col justify-end">
                  <div className="space-y-2">
                     {/* Badges */}
                     <div className="flex flex-wrap gap-2">
                        <Badge className="bg-rose-500 hover:bg-rose-600">
                           {detail?.type}
                        </Badge>
                        {detail?.isAdult && (
                           <Badge className="bg-rose-500 hover:bg-rose-600">
                              NSFW
                           </Badge>
                        )}
                        {detail?.hasDub && (
                           <Badge className="bg-rose-500 hover:bg-rose-600">
                              DUB
                           </Badge>
                        )}{" "}
                        {detail?.hasSub && (
                           <Badge className="bg-rose-500 hover:bg-rose-600">
                              SUB
                           </Badge>
                        )}
                     </div>

                     <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {detail?.title as string}
                     </h1>

                     {/* Anime Infos */}
                     <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                           <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                           <span className="font-medium">4.9</span>
                           <span className="text-zinc-400 ml-1">
                              (12.8k)
                           </span>
                        </div>
                        <div className="text-zinc-400">
                           {detail?.startDate?.year}
                        </div>
                        <div className="text-zinc-400">
                           {detail?.totalEpisodes} Episodes
                        </div>
                     </div>

                     {/* Genres */}
                     <div className="flex flex-wrap gap-2 pt-1">
                        {detail?.genres?.map((genre, idx) => (
                           <Link
                              href={"/genre/" + genre}
                              key={"genre-" + idx}
                              className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded"
                           >
                              {genre}
                           </Link>
                        ))}
                     </div>
                  </div>

                  {/* Descriptions */}
                  <div className="mt-6">
                     <p className="text-zinc-300">{detail?.description}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-6 text-sm">
                     {detail?.studios?.length && (
                        <div>
                           <div className="text-zinc-400 mb-1">Studio</div>
                           <div>{detail?.studios?.join(" | ")}</div>
                        </div>
                     )}
                     {detail?.status && (
                        <div>
                           <div className="text-zinc-400 mb-1">Status</div>
                           <div>{detail?.status}</div>
                        </div>
                     )}
                     {detail?.releaseDate && (
                        <div>
                           <div className="text-zinc-400 mb-1">
                              Released
                           </div>
                           <div>{detail?.releaseDate}</div>
                        </div>
                     )}
                     {detail?.season && (
                        <div>
                           <div className="text-zinc-400 mb-1">Season</div>
                           <div>{detail?.season}</div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Content Tabs */}
         <div className="container py-8">
            {/* <Tabs defaultValue="episodes" className="w-full">
               <TabsList className="w-full justify-start bg-zinc-900 p-0 h-auto">
                  <TabsTrigger
                     value="episodes"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent px-4 py-3 text-zinc-400 data-[state=active]:text-white"
                  >
                     Episodes
                  </TabsTrigger>
                  <TabsTrigger
                     value="details"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent px-4 py-3 text-zinc-400 data-[state=active]:text-white"
                  >
                     Details
                  </TabsTrigger>
                  <TabsTrigger
                     value="characters"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent px-4 py-3 text-zinc-400 data-[state=active]:text-white"
                  >
                     Characters
                  </TabsTrigger>
                  <TabsTrigger
                     value="related"
                     className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent px-4 py-3 text-zinc-400 data-[state=active]:text-white"
                  >
                     Related
                  </TabsTrigger>
               </TabsList> */}
            {/* <TabsContent value="episodes" className="mt-6"> */}
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h2 className="text-xl font-bold">Episodes</h2>
                  <p className="text-sm text-zinc-400">
                     Total {detail?.totalEpisodes} episodes{" "}
                     {detail?.relations?.length && (
                        <>in {detail.relations.length} Season</>
                     )}
                  </p>
               </div>

               {detail?.relations?.length && (
                  <div className="flex gap-2">
                     {detail.relations.map((anime) => (
                        <Link href={"/anime/" + anime.id}>
                           <Button
                              variant="outline"
                              className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                           >
                              {anime.title as string}
                           </Button>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
            <div className="grid gap-4">
               {detail?.episodes?.map((eps, i) => {
                  if (detail.episodes && i === detail.episodes.length - 1)
                     return (
                        <EpisodeCard
                           key={`episode-${i}`}
                           episode={eps}
                           latest
                           watched={false}
                        />
                     );

                  return (
                     <EpisodeCard
                        key={`episode-${i}`}
                        episode={eps}
                        latest={false}
                        watched={false}
                     />
                  );
               })}
            </div>
            {/* </TabsContent> */}
            {/* 
            <TabsContent value="details" className="mt-6">
               <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                  <div>
                     <h2 className="text-xl font-bold mb-4">Synopsis</h2>
                     <div className="prose prose-invert max-w-none">
                        <p>{detail?.description}</p>
                     </div>

                     <h2 className="text-xl font-bold mt-8 mb-4">
                        Background
                     </h2>
                     <div className="prose prose-invert max-w-none">
                        <p>
                           Kimetsu no Yaiba is based on Koyoharu Gotouge's
                           manga series of the same title. The manga was
                           serialized in Weekly Shounen Jump from February
                           2016 to May 2020, with its chapters collected in
                           twenty-three tankobon volumes. The series has
                           sold over 150 million copies, including digital
                           versions, making it one of the best-selling
                           manga series of all time.
                        </p>
                     </div>
                  </div>

                  <div>
                     <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-6">
                           <h3 className="font-medium mb-4">
                              Information
                           </h3>
                           <div className="space-y-4">
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Type
                                 </span>
                                 <span>TV</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Episodes
                                 </span>
                                 <span>48</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Status
                                 </span>
                                 <span>Finished Airing</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Aired
                                 </span>
                                 <span>Apr 6, 2019 to Sep 28, 2023</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Premiered
                                 </span>
                                 <span>Spring 2019</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Broadcast
                                 </span>
                                 <span>Saturdays at 23:30 (JST)</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Producers
                                 </span>
                                 <span>Aniplex, Shueisha</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Studios
                                 </span>
                                 <span>ufotable</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Source
                                 </span>
                                 <span>Manga</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Duration
                                 </span>
                                 <span>24 min. per ep.</span>
                              </div>
                              <Separator className="bg-zinc-800" />
                              <div className="flex justify-between">
                                 <span className="text-zinc-400">
                                    Rating
                                 </span>
                                 <span>
                                    R - 17+ (violence & profanity)
                                 </span>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     <Card className="bg-zinc-900 border-zinc-800 mt-6">
                        <CardContent className="p-6">
                           <h3 className="font-medium mb-4">Statistics</h3>
                           <div className="space-y-4">
                              <div>
                                 <div className="flex justify-between mb-2">
                                    <span className="text-zinc-400">
                                       Score
                                    </span>
                                    <span className="font-medium">
                                       4.9/5
                                    </span>
                                 </div>
                                 <Progress
                                    value={98}
                                    className="h-2 bg-zinc-800"
                                    indicatorClassName="bg-rose-500"
                                 />
                              </div>

                              <div>
                                 <div className="flex justify-between mb-2">
                                    <span className="text-zinc-400">
                                       Ranked
                                    </span>
                                    <span className="font-medium">#5</span>
                                 </div>
                              </div>

                              <div>
                                 <div className="flex justify-between mb-2">
                                    <span className="text-zinc-400">
                                       Popularity
                                    </span>
                                    <span className="font-medium">#3</span>
                                 </div>
                              </div>

                              <div>
                                 <div className="flex justify-between mb-2">
                                    <span className="text-zinc-400">
                                       Members
                                    </span>
                                    <span className="font-medium">
                                       2.8M
                                    </span>
                                 </div>
                              </div>

                              <div>
                                 <div className="flex justify-between mb-2">
                                    <span className="text-zinc-400">
                                       Favorites
                                    </span>
                                    <span className="font-medium">
                                       124.5K
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </TabsContent> */}
            {/* <TabsContent value="characters" className="mt-6">
               <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                     <CharacterCard key={i} index={i} />
                  ))}
               </div>
            </TabsContent>

            <TabsContent value="related" className="mt-6">
               <h2 className="text-xl font-bold mb-6">Related Anime</h2>
               <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                     <RelatedAnimeCard key={i} index={i} />
                  ))}
               </div>

               <h2 className="text-xl font-bold mt-12 mb-6">
                  Recommendations
               </h2>
               <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                     <RelatedAnimeCard key={i} index={i + 5} />
                  ))}
               </div>
            </TabsContent> */}
            {/* </Tabs> */}
         </div>

         {/* Comments Section */}
         {/* <div className="container py-8 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold">Comments</h2>
               <Button
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
               >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Write a Comment
               </Button>
            </div>

            <div className="space-y-6">
               {Array.from({ length: 3 }).map((_, i) => (
                  <CommentCard key={i} index={i} />
               ))}
            </div>

            <div className="mt-8 text-center">
               <Button
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
               >
                  Load More Comments
               </Button>
            </div>
         </div> */}

         {/* Similar Anime Section */}
         {!!detail?.recommendations?.length && (
            <div className="container justify-center px-4 py-12 border-t border-zinc-800">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">You May Also Like</h2>
                  <Button
                     variant="link"
                     className="text-rose-500 hover:text-rose-400 p-0"
                  >
                     See All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
               </div>

               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {detail.recommendations.map((rec, i) => (
                     <SimilarAnimeCard key={i} rec={rec} />
                  ))}
               </div>
            </div>
         )}

         {/* Footer would go here - reusing from main page */}
      </div>
   );
}
