"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Hls from "hls.js";
import {
   Play,
   Pause,
   Volume2,
   VolumeX,
   Maximize,
   Minimize,
   SkipBack,
   SkipForward,
   Settings,
   X,
   ChevronLeft,
   ChevronRight,
   Check,
   ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data - in a real app, this would come from an API
const getAnimeData = (animeId: string) => {
   return {
      id: animeId,
      title: "Demon Slayer: Kimetsu no Yaiba",
      episodes: 26,
      image: "/placeholder.svg?height=450&width=300",
   };
};

const getEpisodeData = (animeId: string, episodeId: string) => {
   const episodeNumber = Number.parseInt(episodeId);
   return {
      id: episodeId,
      animeId,
      number: episodeNumber,
      title:
         episodeNumber === 1
            ? "Cruelty"
            : episodeNumber === 2
            ? "Trainer Sakonji Urokodaki"
            : `Episode ${episodeNumber}`,
      description:
         "Tanjiro Kamado is a kind-hearted boy who sells charcoal for a living. His peaceful life is shattered when he returns home to find his family slaughtered by demons.",
      thumbnail: `/placeholder.svg?height=1080&width=1920&text=Episode ${episodeNumber}`,
      duration: 24 * 60, // 24 minutes in seconds
      streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Example m3u8 stream
      nextEpisode:
         episodeNumber < 26 ? (episodeNumber + 1).toString() : null,
      prevEpisode:
         episodeNumber > 1 ? (episodeNumber - 1).toString() : null,
   };
};

export default function WatchPage({
   params,
}: {
   params: { animeId: string; episodeId: string };
}) {
   const { animeId, episodeId } = params;
   const anime = getAnimeData(animeId);
   const episode = getEpisodeData(animeId, episodeId);

   const videoRef = useRef<HTMLVideoElement>(null);
   const videoContainerRef = useRef<HTMLDivElement>(null);
   const hlsRef = useRef<Hls | null>(null);
   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

   const [isPlaying, setIsPlaying] = useState(false);
   const [volume, setVolume] = useState(1);
   const [isMuted, setIsMuted] = useState(false);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [showControls, setShowControls] = useState(true);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedQuality, setSelectedQuality] = useState("Auto");
   const [showInfo, setShowInfo] = useState(true);
   const [showNextEpisode, setShowNextEpisode] = useState(false);

   // Initialize HLS.js for m3u8 streaming
   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      setIsLoading(true);

      // Check if HLS is supported
      if (Hls.isSupported()) {
         const hls = new Hls({
            startLevel: -1, // Auto quality by default
            capLevelToPlayerSize: true,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
         });

         hlsRef.current = hls;

         hls.loadSource(episode.streamUrl);
         hls.attachMedia(video);

         hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            // Auto play when ready
            video.play().catch(() => {
               console.log(
                  "Playback prevented by browser. Interaction needed."
               );
               setIsPlaying(false);
            });
         });

         hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
               switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                     console.error("Network error, trying to recover...");
                     hls.startLoad();
                     break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                     console.error("Media error, trying to recover...");
                     hls.recoverMediaError();
                     break;
                  default:
                     console.error("Unrecoverable error");
                     hls.destroy();
                     break;
               }
            }
         });

         return () => {
            if (hls) {
               hls.destroy();
            }
         };
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
         // For Safari which has native HLS support
         video.src = episode.streamUrl;
         video.addEventListener("loadedmetadata", () => {
            setIsLoading(false);
            video.play().catch(() => {
               console.log(
                  "Playback prevented by browser. Interaction needed."
               );
               setIsPlaying(false);
            });
         });

         return () => {
            video.removeEventListener("loadedmetadata", () => {});
         };
      } else {
         console.error(
            "HLS is not supported in this browser and no native support"
         );
         setIsLoading(false);
      }
   }, [episode.streamUrl]);

   // Handle video events
   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      const onVolumeChange = () => {
         setVolume(video.volume);
         setIsMuted(video.muted);
      };
      const onTimeUpdate = () => setCurrentTime(video.currentTime);
      const onLoadedMetadata = () => setDuration(video.duration);
      const onEnded = () => {
         setIsPlaying(false);
         if (episode.nextEpisode) {
            setShowNextEpisode(true);
         }
      };

      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
      video.addEventListener("volumechange", onVolumeChange);
      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("ended", onEnded);

      return () => {
         video.removeEventListener("play", onPlay);
         video.removeEventListener("pause", onPause);
         video.removeEventListener("volumechange", onVolumeChange);
         video.removeEventListener("timeupdate", onTimeUpdate);
         video.removeEventListener("loadedmetadata", onLoadedMetadata);
         video.removeEventListener("ended", onEnded);
      };
   }, [episode.nextEpisode]);

   // Handle fullscreen changes
   useEffect(() => {
      const handleFullscreenChange = () => {
         setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener(
         "fullscreenchange",
         handleFullscreenChange
      );

      return () => {
         document.removeEventListener(
            "fullscreenchange",
            handleFullscreenChange
         );
      };
   }, []);

   // Auto-hide controls after inactivity
   useEffect(() => {
      const handleMouseMove = () => {
         setShowControls(true);

         if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
         }

         controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
               setShowControls(false);
            }
         }, 3000);
      };

      const container = videoContainerRef.current;
      if (container) {
         container.addEventListener("mousemove", handleMouseMove);
         container.addEventListener("touchstart", handleMouseMove, {
            passive: true,
         });
      }

      return () => {
         if (container) {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("touchstart", handleMouseMove);
         }

         if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
         }
      };
   }, [isPlaying]);

   // Auto-hide episode info after a few seconds
   useEffect(() => {
      if (showInfo) {
         const timeout = setTimeout(() => {
            setShowInfo(false);
         }, 5000);

         return () => clearTimeout(timeout);
      }
   }, [showInfo]);

   // Video control functions
   const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
         video.pause();
      } else {
         video
            .play()
            .catch((err) => console.error("Error playing video:", err));
      }
   };

   const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;

      video.muted = !video.muted;
   };

   const handleVolumeChange = (value: number[]) => {
      const video = videoRef.current;
      if (!video) return;

      const newVolume = value[0];
      video.volume = newVolume;

      if (newVolume === 0) {
         video.muted = true;
      } else if (video.muted) {
         video.muted = false;
      }
   };

   const handleSeek = (value: number[]) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = value[0];
   };

   const toggleFullscreen = () => {
      const container = videoContainerRef.current;
      if (!container) return;

      if (!document.fullscreenElement) {
         container.requestFullscreen().catch((err) => {
            console.error(
               `Error attempting to enable fullscreen: ${err.message}`
            );
         });
      } else {
         document.exitFullscreen();
      }
   };

   const changeQuality = (quality: string) => {
      setSelectedQuality(quality);

      const hls = hlsRef.current;
      if (!hls || !hls.levels || hls.levels.length === 0) return;

      if (quality === "Auto") {
         hls.currentLevel = -1; // Auto quality
      } else {
         // Find the level that matches the selected quality
         const levelIndex = hls.levels.findIndex(
            (level) => `${level.height}p` === quality
         );

         if (levelIndex !== -1) {
            hls.currentLevel = levelIndex;
         }
      }
   };

   // Format time (seconds to MM:SS)
   const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds
         .toString()
         .padStart(2, "0")}`;
   };

   // Get available qualities from HLS
   const getAvailableQualities = () => {
      const hls = hlsRef.current;
      if (!hls || !hls.levels || hls.levels.length === 0) {
         return ["Auto"];
      }

      return ["Auto", ...hls.levels.map((level) => `${level.height}p`)];
   };

   // Navigate to next/previous episode
   const navigateToEpisode = (episodeId: string) => {
      window.location.href = `/watch/${animeId}/${episodeId}`;
   };

   return (
      <div className="min-h-screen bg-black text-white flex flex-col">
         {/* Video Player Container */}
         <div
            ref={videoContainerRef}
            className="relative w-full aspect-video bg-black"
            onClick={togglePlay}
         >
            {/* Video Element */}
            <video ref={videoRef} className="w-full h-full" playsInline />

            {/* Loading Spinner */}
            {isLoading && (
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
               </div>
            )}

            {/* Episode Info Overlay - Shows briefly when episode starts */}
            {showInfo && (
               <div
                  className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent"
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="flex items-start gap-4">
                     <Link href={`/anime/${animeId}`} className="shrink-0">
                        <Image
                           src={anime.image || "/placeholder.svg"}
                           alt={anime.title}
                           width={80}
                           height={120}
                           className="rounded object-cover"
                        />
                     </Link>
                     <div>
                        <Link
                           href={`/anime/${animeId}`}
                           className="text-sm text-zinc-400 hover:text-white"
                        >
                           {anime.title}
                        </Link>
                        <h1 className="text-xl font-bold">
                           Episode {episode.number}: {episode.title}
                        </h1>
                        <p className="text-sm text-zinc-300 line-clamp-2 mt-1">
                           {episode.description}
                        </p>
                     </div>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        onClick={() => setShowInfo(false)}
                     >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                     </Button>
                  </div>
               </div>
            )}

            {/* Video Controls */}
            <div
               className={cn(
                  "absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/80 transition-opacity duration-300",
                  showControls
                     ? "opacity-100"
                     : "opacity-0 pointer-events-none"
               )}
               onClick={(e) => e.stopPropagation()}
            >
               {/* Top Controls */}
               <div className="flex items-center justify-between">
                  <Link
                     href={`/anime/${animeId}`}
                     className="flex items-center gap-2 text-white/80 hover:text-white"
                  >
                     <ArrowLeft className="h-5 w-5" />
                     <span className="font-medium">Back to Anime</span>
                  </Link>

                  <Button
                     variant="ghost"
                     size="icon"
                     className="text-white/80 hover:text-white"
                     onClick={() => setShowInfo(!showInfo)}
                  >
                     <Info className="h-5 w-5" />
                     <span className="sr-only">Episode Info</span>
                  </Button>
               </div>

               {/* Center Play/Pause Button */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isPlaying && (
                     <Button
                        size="icon"
                        className="h-16 w-16 rounded-full bg-rose-500/80 hover:bg-rose-500 pointer-events-auto"
                        onClick={togglePlay}
                     >
                        <Play className="h-8 w-8" />
                        <span className="sr-only">Play</span>
                     </Button>
                  )}
               </div>

               {/* Bottom Controls */}
               <div className="space-y-2">
                  {/* Progress Bar */}
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-white/80 w-12 text-right">
                        {formatTime(currentTime)}
                     </span>
                     <Slider
                        value={[currentTime]}
                        min={0}
                        max={duration || 100}
                        step={1}
                        onValueChange={handleSeek}
                        className="flex-1"
                     />
                     <span className="text-xs text-white/80 w-12">
                        {formatTime(duration)}
                     </span>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        {/* Play/Pause */}
                        <Button
                           variant="ghost"
                           size="icon"
                           className="text-white/80 hover:text-white"
                           onClick={togglePlay}
                        >
                           {isPlaying ? (
                              <Pause className="h-5 w-5" />
                           ) : (
                              <Play className="h-5 w-5" />
                           )}
                           <span className="sr-only">
                              {isPlaying ? "Pause" : "Play"}
                           </span>
                        </Button>

                        {/* Previous Episode */}
                        <Button
                           variant="ghost"
                           size="icon"
                           className="text-white/80 hover:text-white"
                           disabled={!episode.prevEpisode}
                           onClick={() =>
                              episode.prevEpisode &&
                              navigateToEpisode(episode.prevEpisode)
                           }
                        >
                           <SkipBack className="h-5 w-5" />
                           <span className="sr-only">
                              Previous Episode
                           </span>
                        </Button>

                        {/* Next Episode */}
                        <Button
                           variant="ghost"
                           size="icon"
                           className="text-white/80 hover:text-white"
                           disabled={!episode.nextEpisode}
                           onClick={() =>
                              episode.nextEpisode &&
                              navigateToEpisode(episode.nextEpisode)
                           }
                        >
                           <SkipForward className="h-5 w-5" />
                           <span className="sr-only">Next Episode</span>
                        </Button>

                        {/* Volume Control */}
                        <div className="flex items-center gap-1">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="text-white/80 hover:text-white"
                              onClick={toggleMute}
                           >
                              {isMuted || volume === 0 ? (
                                 <VolumeX className="h-5 w-5" />
                              ) : (
                                 <Volume2 className="h-5 w-5" />
                              )}
                              <span className="sr-only">
                                 {isMuted ? "Unmute" : "Mute"}
                              </span>
                           </Button>

                           <Slider
                              value={[isMuted ? 0 : volume]}
                              min={0}
                              max={1}
                              step={0.01}
                              onValueChange={handleVolumeChange}
                              className="w-24"
                           />
                        </div>
                     </div>

                     <div className="flex items-center gap-2">
                        {/* Quality Selector */}
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="ghost"
                                 size="sm"
                                 className="text-white/80 hover:text-white text-xs"
                              >
                                 <Settings className="h-4 w-4 mr-1" />
                                 {selectedQuality}
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent
                              align="end"
                              className="bg-zinc-900 border-zinc-800"
                           >
                              {getAvailableQualities().map((quality) => (
                                 <DropdownMenuItem
                                    key={quality}
                                    onClick={() => changeQuality(quality)}
                                    className={cn(
                                       "flex items-center justify-between",
                                       selectedQuality === quality &&
                                          "bg-zinc-800"
                                    )}
                                 >
                                    {quality}
                                    {selectedQuality === quality && (
                                       <Check className="h-4 w-4 ml-2" />
                                    )}
                                 </DropdownMenuItem>
                              ))}
                           </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Fullscreen Toggle */}
                        <Button
                           variant="ghost"
                           size="icon"
                           className="text-white/80 hover:text-white"
                           onClick={toggleFullscreen}
                        >
                           {isFullscreen ? (
                              <Minimize className="h-5 w-5" />
                           ) : (
                              <Maximize className="h-5 w-5" />
                           )}
                           <span className="sr-only">
                              {isFullscreen
                                 ? "Exit Fullscreen"
                                 : "Fullscreen"}
                           </span>
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Next Episode Overlay */}
            {showNextEpisode && episode.nextEpisode && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="max-w-md p-6 bg-zinc-900 rounded-lg text-center">
                     <h2 className="text-xl font-bold mb-2">
                        Episode Finished
                     </h2>
                     <p className="text-zinc-300 mb-6">
                        Ready to continue watching?
                     </p>

                     <div className="flex justify-center gap-4">
                        <Button
                           variant="outline"
                           className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                           onClick={() => setShowNextEpisode(false)}
                        >
                           Stay Here
                        </Button>
                        <Button
                           className="bg-rose-500 hover:bg-rose-600"
                           onClick={() =>
                              navigateToEpisode(episode.nextEpisode!)
                           }
                        >
                           Next Episode
                        </Button>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Episode Information Section */}
         <div className="container py-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h1 className="text-xl font-bold">
                     Episode {episode.number}: {episode.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                     <span>{formatTime(duration)}</span>
                     <span>•</span>
                     <span>HD</span>
                     <span>•</span>
                     <span>SUB</span>
                  </div>
               </div>

               <div className="flex gap-2">
                  {episode.prevEpisode && (
                     <Button
                        variant="outline"
                        className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        onClick={() =>
                           navigateToEpisode(episode.prevEpisode!)
                        }
                     >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                     </Button>
                  )}

                  {episode.nextEpisode && (
                     <Button
                        className="bg-rose-500 hover:bg-rose-600"
                        onClick={() =>
                           navigateToEpisode(episode.nextEpisode!)
                        }
                     >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                     </Button>
                  )}
               </div>
            </div>

            <p className="text-zinc-300 mb-6">{episode.description}</p>

            <Separator className="bg-zinc-800 mb-6" />

            {/* Episode List */}
            <div>
               <h2 className="text-lg font-bold mb-4">Episodes</h2>

               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 10 }).map((_, i) => {
                     const epNumber = i + 1;
                     const isCurrentEpisode = epNumber === episode.number;

                     return (
                        <Link
                           key={i}
                           href={`/watch/${animeId}/${epNumber}`}
                           className={cn(
                              "group relative aspect-video overflow-hidden rounded-md border-2",
                              isCurrentEpisode
                                 ? "border-rose-500"
                                 : "border-transparent hover:border-zinc-700"
                           )}
                        >
                           <Image
                              src={`/placeholder.svg?height=1080&width=1920&text=Episode ${epNumber}`}
                              alt={`Episode ${epNumber}`}
                              fill
                              className="object-cover"
                           />

                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                              <span className="text-sm font-medium">
                                 Episode {epNumber}
                              </span>
                              {isCurrentEpisode && (
                                 <Badge className="absolute top-2 right-2 bg-rose-500">
                                    Current
                                 </Badge>
                              )}
                           </div>
                        </Link>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
}

// Custom Info icon component
function Info(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <circle cx="12" cy="12" r="10" />
         <path d="M12 16v-4" />
         <path d="M12 8h.01" />
      </svg>
   );
}
