import { useMutation } from "@tanstack/react-query"
import { listsMethods } from "../../api/endpoints/lists"
import { useLists } from "../../store/listsStore"

const listMethods = new listsMethods()

interface list{
    userId: string
    description: string
    name: string
}

export const useListCreateMutation = () => {
    const {addList} = useLists((state) => state)

    const mutation = useMutation({
        mutationFn: async (list: list) => {
            const data = await listMethods.createList(list)
            addList(data.data)
            return data
        }
    })

    return mutation
}