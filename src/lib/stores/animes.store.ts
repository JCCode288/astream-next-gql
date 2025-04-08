"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAnimeData, IAnimeStore } from "./interfaces/anime.interfaces";
import {
   IZoroPagination,
   ProviderEnum,
} from "../anime-provider/provider.interfaces";

const pagination: IZoroPagination = {
   recent_page: 1,
   top_page: 1,
   popular_page: 1,
   movie_page: 1,
   search_page: 1,
};

const initialData: IAnimeData = {
   main: null,
   detail: null,
   provider: ProviderEnum.ZORO,
   page: 1,
   search: null,
   query: null,
   ...pagination,
};

const animeStore = create<IAnimeStore>()(
   persist(
      (set, get) => ({
         ...initialData,

         setMain(main) {
            set((state) => ({ ...state, main }));
         },
         setDetail(detail) {
            set((state) => ({ ...state, detail }));
         },
         setSearch(search) {
            set((state) => ({ ...state, search }));
         },
         setQuery(query) {
            set((state) => ({ ...state, query }));
         },
         setPage(page) {
            set((state) => ({ ...state, page }));
         },
         setRecentPage(page) {
            set((state) => ({ ...state, recent_page: page }));
         },
         setTopPage(page) {
            set((state) => ({ ...state, top_page: page }));
         },
         setMoviePage(page) {
            set((state) => ({ ...state, movie_page: page }));
         },
         setPopularPage(page) {
            set((state) => ({ ...state, popular_page: page }));
         },
         setSearchPage(page) {
            set((state) => ({ ...state, search_page: page }));
         },
         resetPagination() {
            set((state) => ({ ...state, ...pagination }));
         },
         resetStore() {
            set((state) => ({ ...state, ...initialData }));
         },
      }),
      {
         name: "anime-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default animeStore;
