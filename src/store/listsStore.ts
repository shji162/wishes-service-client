import { create } from "zustand";
import type { listStoreType } from "../types/storesTypes/listStore.type";


export const useLists = create<listStoreType>((set, get) => ({
    lists: [],
    selectedList: null,
    search: "",
    setSearch: (search) => set({search: search}),
    setLists: (lists) => set({lists: lists}),
    setSelectedList: (list) => set({selectedList: list}),
    addList: (list) => {
        const newLists = [...(get().lists ?? []), list]
        set({lists: newLists})
    },

    updateList: (id, list) => {
        const newLists = get().lists?.filter(list => list.id !== id)

        set({lists: [...(newLists ?? []), list]})
    },

    deleteList: (id) => {
        const newLists = get().lists?.filter(list => list.id !== id)

        set({lists: newLists})
    }
}))