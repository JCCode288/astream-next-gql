"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ICounterData {
   counter: number;
}

interface ICounterStore extends ICounterData {
   increment(): void;
   decrement(): void;
   reset(): void;
}

const initialData: ICounterData = {
   counter: 0,
};

const counterStore = create<ICounterStore>()(
   persist(
      (set, get) => ({
         ...initialData,
         increment() {
            console.log(get().counter);
            set((state) => ({ ...state, counter: state.counter + 1 }));
         },
         decrement() {
            set((state) => {
               console.log(get().counter);
               if (state.counter < 1) return state;
               return { ...state, counter: state.counter - 1 };
            });
         },
         reset() {
            set(() => initialData);
         },
      }),
      {
         name: "counter-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default counterStore;
