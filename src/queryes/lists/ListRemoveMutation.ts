import { useMutation } from "@tanstack/react-query"
import { listsMethods } from "../../api/endpoints/lists"
import { useLists } from "../../store/listsStore"

const listMethods = new listsMethods()

export const useListDeleteMutation = () => {

    const {deleteList} = useLists((state) => state)
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            deleteList(id)
            return await listMethods.deleteById(id)
    }})

    return mutation
}