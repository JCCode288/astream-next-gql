import {
   IZoroMain,
   IZoroPagination,
   ProviderEnum,
} from "@/lib/anime-provider/provider.interfaces";
import {
   IAnimeInfo,
   IAnimeResult,
   ISearch,
   ISource,
} from "@consumet/extensions";

export interface IHistoryData {
   watch_list: ISource[];
   recent: ISource | null;
   current: ISource | null;
}

export interface IHistoryStore extends IHistoryData {
   addToWatchList(anime: ISource): void;
   setRecent(anime: ISource): void;
   setCurrent(source: ISource | null): void;
}

export interface IAnimeData extends IZoroPagination {
   search: ISearch<IAnimeResult> | null;
   main: IZoroMain<ISearch<IAnimeResult>> | null;
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
