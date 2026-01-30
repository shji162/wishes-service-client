import type { List } from "../list.type"


export type listStoreType = {
    lists: List[] | null,
    selectedList: List | null,
    search: string,
    setSearch: (search: string) => void
    setLists: (lists: List[]) => void
    setSelectedList: (list: List) => void
    addList: (list: List) => void
    updateList: (id: string, list: List) => void
    deleteList: (id: string) => void
}