import { create } from "zustand";
import { Items } from "../types/Items";

export type State = {
  items: Items[] | [];
};

export type Action = {
  updateItems: (items: State["items"]) => void;
};
export const useStore = create<State & Action>((set) => ({
  items: [
    { id: 1, name: "1,000円" },
    { id: 2, name: "2,000円" },
    { id: 3, name: "3,000円" },
    { id: 4, name: "5,000円" },
    { id: 5, name: "10,000円" },
  ],
  updateItems: (items) => set(() => ({ items })),
}));
