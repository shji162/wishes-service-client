import { useQuery } from "@tanstack/react-query"
import { listsMethods } from "../../api/endpoints/lists"
import { useLists } from "../../store/listsStore"
import type { List } from "../../types/list.type"

const listMethods = new listsMethods()

export const useListByIdQuery = (id: string) => {
    const {setSelectedList} = useLists((state) => state)
    const mutation = useQuery({
        queryKey: ['lists', id],
        queryFn: async (): Promise<List> => {
            const data = await listMethods.findById(id)
            setSelectedList(data.data)
            return data.data
    }})

    return mutation
}