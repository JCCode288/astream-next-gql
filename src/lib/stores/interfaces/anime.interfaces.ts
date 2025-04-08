import {
   IZoroMain,
   IZoroPagination,
   ProviderEnum,
} from "@/lib/anime-provider/provider.interfaces";
import { IAnimeResult, ISearch } from "@consumet/extensions";

export interface IHistoryData {
   watch_list: IAnimeResult[];
   recent: IAnimeResult | null;
}

export interface IHistoryStore extends IHistoryData {
   addToWatchList(anime: IAnimeResult): void;
   setRecent(anime: IAnimeResult): void;
}

export interface IAnimeData extends IZoroPagination {
   main: IZoroMain<ISearch<IAnimeResult>> | null;
   detail: IAnimeResult | null;
   page: number;
   provider: ProviderEnum;
}

export interface IAnimeStore extends IAnimeData {
   setMain(main: any): void;
   setDetail(detail: IAnimeResult): void;
   setPage(page: number): void;
   setRecentPage(page: number): void;
   setTopPage(page: number): void;
   setMoviePage(page: number): void;
   setPopularPage(page: number): void;
   resetPagination(): void;
}
