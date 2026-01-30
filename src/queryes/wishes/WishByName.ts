import { useQuery } from "@tanstack/react-query"
import { useLists } from "../../store/listsStore"
import { useWishes } from "../../store/wishesStore"
import { wishesMethods } from "../../api/endpoints/wishes"
import type { Wish } from "../../types/wish.type"

const WishesMethods = new wishesMethods()

export const useWishesByNameQuery = (name: string) => {
    const {setWishes} = useWishes((state) => state)
    const {selectedList} = useLists((state) => state)

    const mutation = useQuery({
        queryKey: ['wishes', name],
        queryFn: async (): Promise<Wish[]> => {
            const data = await WishesMethods.findByName(name, selectedList!.id)
            setWishes(data.data)
            return data.data
    }})

    return mutation
}