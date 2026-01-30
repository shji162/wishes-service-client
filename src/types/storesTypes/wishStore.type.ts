import type { Wish } from "../wish.type"


export type wishStoreType = {
    Wishes: Wish[] | null
    selectedWish: Wish | null
    search: string
    setSearch: (search: string) => void
    setWishes: (wishes: Wish[]) => void
    setSelectedWish: (wish: Wish) => void
    addWish: (wish: Wish) => void
    updateWish: (id: string, wish: Wish) => void
    deleteWish: (id: string) => void
}