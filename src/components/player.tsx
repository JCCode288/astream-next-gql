import playerConfig from "@/lib/player.config";
import videoStore from "@/lib/stores/video.store";
import Artplayer from "artplayer";
import { useEffect, useRef, useState } from "react";

export default function Player() {
   const [art, setArt] = useState<Artplayer>();

   const streamDiv = useRef<HTMLDivElement>(null);
   const currentSource = videoStore().currentSource;
   const qualities = videoStore().qualities;
   const currentSubs = videoStore().currentSubs?.url;
   const referer = videoStore().headers?.Referer;

   useEffect(() => {
      if (!streamDiv.current) return;
      if (!currentSource) return;

      const config = playerConfig({
         currentSource,
         referer,
         qualities,
         currentSubs,
         div: streamDiv.current,
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
