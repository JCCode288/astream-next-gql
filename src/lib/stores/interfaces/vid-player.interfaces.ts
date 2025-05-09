import { ISubtitle, IVideo } from "@consumet/extensions";
import Hls from "hls.js";

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
   div?: HTMLDivElement;
}

export interface IPlayerData {
   headers: Record<string, any> | null;
   currentSource: IVideo | null;
   qualities: IVideoQuality[];
   currentSubs: ISubtitle | null;
   subs: ISubtitle[];
}

export interface IPlayerStore extends IPlayerData {
   setHeaders(headers: Record<string, any>): void;
   setCurrentSource(source: IVideo): void;
   setQualities(qualities: IVideoQuality[]): void;
   setCurrentSubs(lang: ISubtitle): void;
   setSubs(subs: ISubtitle[]): void;
}
