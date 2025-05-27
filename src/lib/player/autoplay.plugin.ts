import Artplayer from "artplayer";
import { IAutoplayParams } from "../stores/interfaces/anime.interfaces";

export default function autoplayPlugin({ nextFunc }: IAutoplayParams) {
   return (art: Artplayer) => {
      art.on("video:durationchange", () => {
         if (Math.floor(art.duration) > Math.floor(art.currentTime))
            return;

         nextFunc();
      });
   };
}
