import hlsBuilder from "@/lib/hls.builder";
import autoplayPlugin from "@/lib/player/autoplay.plugin";
import customAutoPlayback from "@/lib/player/playback.plugin";
import playerConfig from "@/lib/player/player.config";
import skipIntroPlugin from "@/lib/player/skip-intro.plugin";
import historyStore from "@/lib/stores/history.store";
import { IPlayerProps } from "@/lib/stores/interfaces/vid-player.interfaces";
import videoStore from "@/lib/stores/video.store";
import Artplayer from "artplayer";
import { useEffect, useRef } from "react";

export default function Player({
   animeId,
   epsId,
   save,
   nextFunc,
}: IPlayerProps) {
   const streamDiv = useRef<HTMLDivElement>(null);
   const currentSource = videoStore().currentSource;
   const autoplay = videoStore().autoplay;
   const skipIntro = videoStore().skipIntro;
   const qualities = videoStore().qualities;
   const currentSubs = videoStore().currentSubs;
   const referer = videoStore().headers?.Referer;
   const intro = videoStore().intro;
   const outro = videoStore().outro;
   const getCurrent = historyStore().getCurrent;

   useEffect(() => {
      console.log({
         streamDiv: streamDiv.current,
         currentSource,
         animeId,
         epsId,
         subs: currentSubs?.url,
      });

      if (!streamDiv.current || !currentSource || !animeId || !epsId)
         return;

      const hls = hlsBuilder(animeId, epsId);
      if (!hls) return;

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
      artPlayer.plugins.add(autoplayPlugin({ nextFunc, autoplay }));
      artPlayer.plugins.add(skipIntroPlugin({ intro, outro, skipIntro }));

      artPlayer.on("resize", () => {
         artPlayer.subtitle.style({
            fontSize: artPlayer.height * 0.05 + "px",
         });
      });

      artPlayer.on("destroy", () => {
         artPlayer.hls?.destroy();
      });

      artPlayer.on("ready", () => {
         if (streamDiv.current)
            streamDiv.current.scrollTo({ behavior: "smooth" });
      });

      return () => {
         artPlayer.destroy(true);
         artPlayer.hls?.destroy();

         hls.removeAllListeners();
         hls.detachMedia();
         hls.destroy();
      };
   }, [
      currentSource,
      qualities,
      currentSubs,
      animeId,
      epsId,
      streamDiv.current,
   ]);

   return (
      <div
         id="artplayer-app"
         ref={streamDiv}
         className="artplayer-app relative my-8 aspect-video md:max-h-[60lvh] w-auto max-w-screen rounded-sm bg-primary-700 shadow-sm ring-2 ring-pink-800 ring-offset-pink-700 md:ring-offset-[0.5rem]"
      />
   );
}
