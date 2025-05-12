import { Binary } from "mongodb";

export interface IStreamData {
   animeId: string;
   episodeId: string;
   segment: string;
   data: string; // Buffer to base64
   headers: Record<string, string>;
}

export interface ISubsFilter {
   animeId: string;
   episodeId: string;
}

export interface ISubsData extends ISubsFilter {
   data: string; // Buffer to base64
   headers: Record<string, string>;
}

export interface IKeyInterface {
   animeId?: string;
   episodeId?: string;
   segment?: string;
   data?: string;
}
