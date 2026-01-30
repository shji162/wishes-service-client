import { useQuery } from "@tanstack/react-query"
import { listsMethods } from "../../api/endpoints/lists"
import { useLists } from "../../store/listsStore"
import type { List } from "../../types/list.type"
import { useUsers } from "../../store/userStore"

const listMethods = new listsMethods()

export const useListsByNameQuery = (name: string) => {
    const {setLists} = useLists((state) => state)
    const {user} = useUsers((state) => state)

    const mutation = useQuery({
        queryKey: ['lists', name],
        queryFn: async (): Promise<List[]> => {
            const data = await listMethods.findByName(name, user!.id)
            setLists(data.data)
            return data.data
    }})

    return mutation
}