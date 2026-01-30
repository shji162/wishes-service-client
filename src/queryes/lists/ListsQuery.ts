import { useQuery } from "@tanstack/react-query"
import { listsMethods } from "../../api/endpoints/lists"
import { useLists } from "../../store/listsStore"
import type { List } from "../../types/list.type"

const listMethods = new listsMethods()

export const useListsQuery = (userId: string) => {
    const {setLists} = useLists((state) => state)

    const mutation = useQuery({
        queryKey: ['lists', userId],
        queryFn: async (): Promise<List[]> => {
            const data = await listMethods.findByUserId(userId)
            setLists(data.data)
            return data.data
    }})

    return mutation
}