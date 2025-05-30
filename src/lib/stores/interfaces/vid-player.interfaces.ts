import { Intro, ISubtitle, IVideo } from "@consumet/extensions";
import { ComponentOption } from "artplayer/types/component";
import Hls from "hls.js";
import { SavePlayback } from "./anime.interfaces";

export interface IVideoQuality {
   default: boolean;
   html: string;
   url: string;
}

export interface IGenerateOpts {
   currentSource: IVideo | null;
   hls: Hls;
   referer?: string;
   qualities: IVideoQuality[];
   currentSubs?: string;
   div: HTMLDivElement | null;
   intro?: Intro;
   outro?: Intro;
   controls?: ComponentOption[];
}

export interface IPlayerProps {
   animeId: string;
   epsId: string;
   nextFunc: () => void;
   save: (data: SavePlayback) => void;
}

export interface IPlayerData {
   autoplay: boolean;
   skipIntro: boolean;
   headers: Record<string, any> | null;
   currentSource: IVideo | null;
   qualities: IVideoQuality[];
   currentSubs: ISubtitle | null;
   subs: ISubtitle[];
   intro?: Intro;
   outro?: Intro;
}

export interface IPlayerStore extends IPlayerData {
   setHeaders(headers: Record<string, any>): void;
   setAutoplay(autoplay: boolean): void;
   setSkipIntro(skipIntro: boolean): void;
   setCurrentSource(source: IVideo): void;
   setQualities(qualities: IVideoQuality[]): void;
   setCurrentSubs(lang: ISubtitle): void;
   setSubs(subs: ISubtitle[]): void;
   setIntro(intro: Intro): void;
   setOutro(outro: Intro): void;
   reset(): void;
}
