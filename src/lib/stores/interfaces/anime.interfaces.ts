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
   episode?: IAnimeEpisode;
   timestamp: number;
   duration: number;
}

export type CurrentWatch = IWatchEpisodes & {
   animeId: string;
   aniName: string;
};

export interface IWatchList {
   animeId: string;
   aniName: string;
   episodes: IWatchEpisodes[];
}

export interface IHistoryData {
   watch_list: IWatchList[];
   current: CurrentWatch | null;
}

export interface IHistoryStore extends IHistoryData {
   addToWatchList(anime: IWatchList): void;
   setCurrent(source: CurrentWatch): void;
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
