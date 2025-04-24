import Link from "next/link";
import Image from "next/image";
import {
   Play,
   Star,
   MessageSquare,
   Share2,
   Heart,
   Plus,
   ChevronLeft,
   ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import EpisodeCard from "@/components/details/episode-card";
import CharacterCard from "@/components/details/character-card";
import RelatedAnimeCard from "@/components/details/related-card";
import CommentCard from "@/components/details/comment-card";
import SimilarAnimeCard from "@/components/details/similar-card";

export default async function AnimeDetailPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   // In a real app, you would fetch the anime data based on the ID
   const { id } = await params;

   return (
      <div className="min-h-screen bg-black text-white">
         {/* Hero Section with Anime Cover */}
         <div className="relative">
            <div className="absolute inset-0 z-0">
               <Image
                  src="/placeholder.svg?height=1080&width=1920"
                  alt="Anime Cover"
                  fill
                  className="object-cover brightness-[0.3]"
                  priority
               />
            </div>

            {/* Back Button */}
            <div className="container relative z-10 pt-8">
               <Link
                  href="/"
                  className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
               >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Home
               </Link>
            </div>

            <div className="container relative z-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-12">
               {/* Anime Poster */}
               <div className="flex flex-col gap-4">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg border-2 border-zinc-800 shadow-xl">
                     <Image
                        src="/placeholder.svg?height=450&width=300"
                        alt="Anime Poster"
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="flex gap-2">
                     <Button className="flex-1 gap-2 bg-rose-500 hover:bg-rose-600">
                        <Play className="h-4 w-4" />
                        Watch
                     </Button>
                     <Button
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
                     </Button>
                     <Button
                        variant="outline"
                        size="icon"
                        className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white hover:border-zinc-500"
                     >
                        <Share2 className="h-4 w-4" />
                     </Button>
                  </div>
               </div>

               {/* Anime Details */}
               <div className="flex flex-col justify-end">
                  <div className="space-y-2">
                     <div className="flex flex-wrap gap-2">
                        <Badge className="bg-rose-500 hover:bg-rose-600">
                           TV
                        </Badge>
                        <Badge
                           variant="outline"
                           className="border-zinc-700 text-zinc-400"
                        >
                           HD
                        </Badge>
                        <Badge
                           variant="outline"
                           className="border-zinc-700 text-zinc-400"
                        >
                           SUB
                        </Badge>
                        <Badge
                           variant="outline"
                           className="border-zinc-700 text-zinc-400"
                        >
                           DUB
                        </Badge>
                     </div>

                     <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Demon Slayer: Kimetsu no Yaiba
                     </h1>

                     <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                           <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                           <span className="font-medium">4.9</span>
                           <span className="text-zinc-400 ml-1">
                              (12.8k)
                           </span>
                        </div>
                        <div className="text-zinc-400">2019 - 2023</div>
                        <div className="text-zinc-400">TV-14</div>
                        <div className="text-zinc-400">24 min/ep</div>
                        <div className="text-zinc-400">48 Episodes</div>
                     </div>

                     <div className="flex flex-wrap gap-2 pt-1">
                        <Link
                           href="#"
                           className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded"
                        >
                           Action
                        </Link>
                        <Link
                           href="#"
                           className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded"
                        >
                           Adventure
                        </Link>
                        <Link
                           href="#"
                           className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded"
                        >
                           Fantasy
                        </Link>
                        <Link
                           href="#"
                           className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded"
                        >
                           Supernatural
                        </Link>
                     </div>
                  </div>

                  <div className="mt-6">
                     <p className="text-zinc-300 max-w-3xl">
                        Tanjiro Kamado is a kind-hearted and intelligent
                        boy who lives with his family in the mountains.
                        After his father's death, he became his family's
                        breadwinner, making trips to the nearby village to
                        sell charcoal. Everything changed when he came home
                        one day to discover that his family was attacked
                        and slaughtered by a demon. Tanjiro and his sister
                        Nezuko were the sole survivors of the incident,
                        with Nezuko being transformed into a demon, but
                        still surprisingly showing signs of human emotion
                        and thought.
                     </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-6 text-sm">
                     <div>
                        <div className="text-zinc-400 mb-1">Studio</div>
                        <div>ufotable</div>
                     </div>
                     <div>
                        <div className="text-zinc-400 mb-1">Status</div>
                        <div>Ongoing</div>
                     </div>
                     <div>
                        <div className="text-zinc-400 mb-1">Released</div>
                        <div>Apr 6, 2019</div>
                     </div>
                     <div>
                        <div className="text-zinc-400 mb-1">Season</div>
                        <div>Spring 2019</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Content Tabs */}
         <div className="container py-8">
            <Tabs defaultValue="episodes" className="w-full">
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
               </TabsList>

               <TabsContent value="episodes" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                     <div>
                        <h2 className="text-xl font-bold">Episodes</h2>
                        <p className="text-sm text-zinc-400">
                           Total 48 episodes in 3 seasons
                        </p>
                     </div>

                     <div className="flex gap-2">
                        <Button
                           variant="outline"
                           className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           Season 1
                        </Button>
                        <Button
                           variant="outline"
                           className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           Season 2
                        </Button>
                        <Button
                           variant="outline"
                           className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           Season 3
                        </Button>
                     </div>
                  </div>

                  <div className="grid gap-4">
                     {Array.from({ length: 10 }).map((_, i) => (
                        <EpisodeCard key={i} episodeNumber={i + 1} />
                     ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                     <div className="flex items-center gap-2">
                        <Button
                           variant="outline"
                           size="icon"
                           className="h-8 w-8 border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                           variant="outline"
                           className="h-8 w-8 border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           1
                        </Button>
                        <Button
                           variant="outline"
                           className="h-8 w-8 border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           2
                        </Button>
                        <Button
                           variant="outline"
                           className="h-8 w-8 border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           3
                        </Button>
                        <span className="text-zinc-400">...</span>
                        <Button
                           variant="outline"
                           className="h-8 w-8 border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           5
                        </Button>
                        <Button
                           variant="outline"
                           size="icon"
                           className="h-8 w-8 border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        >
                           <ChevronRight className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>
               </TabsContent>

               <TabsContent value="details" className="mt-6">
                  <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                     <div>
                        <h2 className="text-xl font-bold mb-4">
                           Synopsis
                        </h2>
                        <div className="prose prose-invert max-w-none">
                           <p>
                              Ever since the death of his father, the
                              burden of supporting the family has fallen
                              upon Tanjirou Kamado's shoulders. Though
                              living impoverished on a remote mountain, the
                              Kamado family are able to enjoy a relatively
                              peaceful and happy life. One day, Tanjirou
                              decides to go down to the local village to
                              make a little money selling charcoal. On his
                              way back, night falls, forcing Tanjirou to
                              take shelter in the house of a strange man,
                              who warns him of the existence of
                              flesh-eating demons that lurk in the woods at
                              night.
                           </p>
                           <p>
                              When he finally arrives back home the next
                              day, he is met with a horrifying sight—his
                              whole family has been slaughtered. Worse
                              still, the sole survivor is his sister
                              Nezuko, who has been turned into a
                              bloodthirsty demon. Consumed by rage and
                              hatred, Tanjirou swears to avenge his family
                              and stay by his only remaining sibling.
                              Alongside the mysterious group calling
                              themselves the Demon Slayer Corps, Tanjirou
                              will do whatever it takes to slay the demons
                              and protect the remnants of his beloved
                              sister's humanity.
                           </p>
                        </div>

                        <h2 className="text-xl font-bold mt-8 mb-4">
                           Background
                        </h2>
                        <div className="prose prose-invert max-w-none">
                           <p>
                              Kimetsu no Yaiba is based on Koyoharu
                              Gotouge's manga series of the same title. The
                              manga was serialized in Weekly Shounen Jump
                              from February 2016 to May 2020, with its
                              chapters collected in twenty-three tankobon
                              volumes. The series has sold over 150 million
                              copies, including digital versions, making it
                              one of the best-selling manga series of all
                              time.
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
                                    <span>
                                       Apr 6, 2019 to Sep 28, 2023
                                    </span>
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
                              <h3 className="font-medium mb-4">
                                 Statistics
                              </h3>
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
                                       <span className="font-medium">
                                          #5
                                       </span>
                                    </div>
                                 </div>

                                 <div>
                                    <div className="flex justify-between mb-2">
                                       <span className="text-zinc-400">
                                          Popularity
                                       </span>
                                       <span className="font-medium">
                                          #3
                                       </span>
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
               </TabsContent>

               <TabsContent value="characters" className="mt-6">
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
               </TabsContent>
            </Tabs>
         </div>

         {/* Comments Section */}
         <div className="container py-8 border-t border-zinc-800">
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
         </div>

         {/* Similar Anime Section */}
         <div className="container py-12 border-t border-zinc-800">
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
               {Array.from({ length: 6 }).map((_, i) => (
                  <SimilarAnimeCard key={i} index={i} />
               ))}
            </div>
         </div>

         {/* Footer would go here - reusing from main page */}
      </div>
   );
}
