import hlsBuilder from "@/lib/hls.builder";
import customAutoPlayback from "@/lib/player/playback.plugin";
import playerConfig from "@/lib/player/player.config";
import historyStore from "@/lib/stores/history.store";
import { IPlayerProps } from "@/lib/stores/interfaces/vid-player.interfaces";
import videoStore from "@/lib/stores/video.store";
import Artplayer from "artplayer";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function Player({ animeId, epsId, save }: IPlayerProps) {
   const [art, setArt] = useState<Artplayer>();
   const [hlsInst, setHls] = useState<Hls>();

   const streamDiv = useRef<HTMLDivElement>(null);
   const currentSource = videoStore().currentSource;
   const qualities = videoStore().qualities;
   const currentSubs = videoStore().currentSubs;
   const referer = videoStore().headers?.Referer;
   const intro = videoStore().intro;
   const outro = videoStore().outro;
   const getCurrent = historyStore().getCurrent;

   useEffect(() => {
      if (!art) return;

      art.on("resize", () => {
         art.subtitle.style({
            fontSize: art.height * 0.05 + "px",
         });
      });

      art.on("destroy", () => {
         if (art) art.hls?.destroy();
      });

      art.on("ready", () => {
         if (streamDiv.current)
            streamDiv.current.scrollTo({ behavior: "smooth" });
      });

      return () => {
         if (art) {
            art?.destroy(true);
            art?.hls?.destroy();
            setArt(undefined);
         }

         if (hlsInst) {
            hlsInst.removeAllListeners();
            hlsInst.detachMedia();
            hlsInst.destroy();
         }
      };
   }, [art, hlsInst]);

   useEffect(() => {
      if (!streamDiv.current || !currentSource || !animeId || !epsId)
         return;
      if (art) art.destroy(true);

      const hls = hlsBuilder(animeId, epsId);
      const config = playerConfig({
         currentSource,
         referer,
         qualities,
         currentSubs: currentSubs?.url,
         div: streamDiv.current,
         hls,
         intro,
         outro,
      });

      Artplayer.MOBILE_CLICK_PLAY = true;
      const artPlayer = new Artplayer(config);
      const current = getCurrent(animeId, epsId);

      artPlayer.plugins.add(
         customAutoPlayback({
            save,
            current: current ?? {},
         })
      );

      setHls(() => hls);
      setArt(() => artPlayer);

      return () => {
         artPlayer?.destroy(true);
         artPlayer?.hls?.destroy();
      };
   }, [currentSource, qualities, currentSubs, animeId, epsId]);

   return (
      <div
         id="artplayer-app"
         ref={streamDiv}
         className="artplayer-app relative my-8 aspect-video md:max-h-[60lvh] w-auto max-w-screen rounded-sm bg-primary-700 shadow-sm ring-2 ring-pink-800 ring-offset-pink-700 md:ring-offset-[0.5rem]"
      />
   );
}
