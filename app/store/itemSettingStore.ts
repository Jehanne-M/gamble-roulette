import { create } from "zustand";
import { Items } from "../types/Items";

export type State = {
  items: Items[] | undefined;
  name: string;
  bg?: string;
  color?: string;
  weight?: number;
};

export type Action = {
  updateName: (name: State["name"]) => void;
  updateBg: (bg: State["bg"]) => void;
  updateColor: (color: State["color"]) => void;
  updateWeight: (weight: State["weight"]) => void;
  updateItems: (items: State["items"]) => void;
  addItem: (item: Items) => void; // 追加
  removeItem: (id: number) => void; // 削除
  updateItem: (id: number, newItem: Items) => void; // 一部更新
};
export const useStore = create<State & Action>((set) => ({
  items: [],
  name: "",
  bg: undefined,
  color: undefined,
  weight: undefined,
  updateName: (name) => set(() => ({ name })),
  updateBg: (bg) => set(() => ({ bg })),
  updateColor: (color) => set(() => ({ color })),
  updateWeight: (weight) => set(() => ({ weight })),
  updateItems: (items) => set(() => ({ items })),
  addItem: (item) =>
    set((state) => ({ items: [...(state.items || []), item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items?.filter((item) => item.id !== id) })),
  updateItem: (id, newItem) =>
    set((state) => ({
      items: state.items?.map((item) => (item.id === id ? newItem : item)),
    })),
}));
