import { useMutation } from "@tanstack/react-query"
import { listsMethods } from "../../api/endpoints/lists"
import { useLists } from "../../store/listsStore"

const listMethods = new listsMethods()

interface data {
    id: string
    description: string
    name: string
}

export const useListCreateMutation = () => {
    const {updateList} = useLists((state) => state)
    const mutation = useMutation({
        mutationFn: async (data: data) => {
            const res = await listMethods.changeList(data.id, {name: data.name, description: data.description})
            updateList(data.id, res.data)
            return res
    }})

    return mutation
}