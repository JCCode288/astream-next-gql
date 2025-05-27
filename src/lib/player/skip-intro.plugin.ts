import Artplayer from "artplayer";
import { ISkipIntroParams } from "../stores/interfaces/anime.interfaces";

export default function skipIntroPlugin({
   intro,
   outro,
   skipIntro,
}: ISkipIntroParams) {
   return (art: Artplayer) => {
      if (!skipIntro) return;

      art.on("video:timeupdate", (ev) => {
         if (
            intro &&
            art.currentTime >= intro.start &&
            art.currentTime < intro.end
         ) {
            art.seek = intro.end;
            return;
         }

         if (
            outro &&
            art.currentTime >= outro.start &&
            art.currentTime < outro.end
         ) {
            art.seek = outro.end;
            return;
         }
      });
   };
}
