import {
   IMainResult,
   IZoroPagination,
   ProviderEnum,
} from "@/lib/anime-provider/provider.interfaces";
import {
   IAnimeEpisode,
   IAnimeInfo,
   IAnimeResult,
   ISearch,
} from "@consumet/extensions";

export interface IWatchEpisodes {
   episode: IAnimeEpisode;
   timestamp: number;
   duration: number;
   finished: boolean;
   started: boolean;
}

export interface IWatchData {
   animeId: string;
   aniName: string;
   img?: string;
}

export type CurrentWatch = IWatchEpisodes & IWatchData;

export interface IWatchList extends IWatchData {
   episodes: {
      [k: string]: IWatchEpisodes;
   };
}

export interface IHistoryData {
   watch_list: IWatchList[];
}

export interface IHistoryStore extends IHistoryData {
   getCurrent(animeId: string, episodeId: string): CurrentWatch | null;
   addToWatchList(source: CurrentWatch): void;
}

export interface IAnimeData extends IZoroPagination {
   search: ISearch<IAnimeResult> | null;
   main: IMainResult<Record<string, ISearch<IAnimeResult>>> | null;
   detail: IAnimeInfo | null;
   page: number;
   query: string | null;
   provider: ProviderEnum;
}

export interface IAnimeStore extends IAnimeData {
   setMain(main: any | null): void;
   setDetail(detail: IAnimeResult | null): void;
   setSearch(search: ISearch<IAnimeResult> | null): void;
   setQuery(query: string | null): void;
   setPage(page: number): void;
   setRecentPage(page: number): void;
   setTopPage(page: number): void;
   setMoviePage(page: number): void;
   setPopularPage(page: number): void;
   setSearchPage(page: number): void;
   resetPagination(): void;
   resetStore(): void;
}
