import { create } from "zustand";
import type { wishStoreType } from "../types/storesTypes/wishStore.type";


export const useWishes = create<wishStoreType>((set, get) => ({
    Wishes: [],
    selectedWish: null,
    search: "",
    setSearch: (search) => set({search: search}),
    setWishes: (wishes) => set({Wishes: wishes}),
    setSelectedWish: (wish) => set({selectedWish: wish}),
     addWish: (wish) => {
        const newWishes = [...(get().Wishes ?? []), wish]
        set({Wishes: newWishes})
    },

    updateWish: (id, wish) => {
        const newWishes = get().Wishes?.filter(wish => wish.id !== id)

        set({Wishes: [...(newWishes ?? []), wish]})
    },

    deleteWish: (id) => {
        const newWishes = get().Wishes?.filter(wish => wish.id !== id)

        set({Wishes: newWishes})
    }
}))