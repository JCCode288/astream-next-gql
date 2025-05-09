import hlsBuilder from "@/lib/hls.builder";
import playerConfig from "@/lib/player.config";
import videoStore from "@/lib/stores/video.store";
import Artplayer from "artplayer";
import { useEffect, useRef, useState } from "react";

export default function Player({
   animeId,
   epsId,
}: {
   animeId?: string;
   epsId?: string;
}) {
   const [art, setArt] = useState<Artplayer>();

   const streamDiv = useRef<HTMLDivElement>(null);
   const currentSource = videoStore().currentSource;
   const qualities = videoStore().qualities;
   const currentSubs = videoStore().currentSubs;
   const referer = videoStore().headers?.Referer;
   console.log({
      currentSource,
      qualities,
      currentSubs,
      referer,
   });

   useEffect(() => {
      if (!streamDiv.current) return;
      if (!currentSource) return;
      if (!currentSubs?.url) return;

      const hls = hlsBuilder(animeId, epsId);

      const config = playerConfig({
         currentSource,
         referer,
         qualities,
         currentSubs: currentSubs.url,
         div: streamDiv.current,
         hls,
      });

      Artplayer.MOBILE_CLICK_PLAY = true;
      const artPlayer = new Artplayer(config);

      artPlayer.on("resize", () => {
         artPlayer.subtitle.style({
            fontSize: artPlayer.height * 0.05 + "px",
         });
      });

      artPlayer.on("destroy", () => {
         artPlayer?.hls?.destroy();
      });

      artPlayer.on("ready", () => {
         if (streamDiv.current)
            streamDiv.current.scrollTo({ behavior: "smooth" });
      });

      setArt(artPlayer);

      return () => {
         artPlayer.destroy();
         artPlayer?.hls?.destroy();
      };
   }, [currentSource, qualities, currentSubs]);

   return (
      <div
         ref={streamDiv}
         className="artplayer-app relative my-8 aspect-video md:max-h-[60lvh] w-auto max-w-screen rounded-sm bg-primary-700 shadow-sm ring-2 ring-pink-800 ring-offset-pink-700 md:ring-offset-[0.5rem]"
      />
   );
}
