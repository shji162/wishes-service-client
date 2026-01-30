import { useQuery } from "@tanstack/react-query"
import { wishesMethods } from "../../api/endpoints/wishes"
import { useWishes } from "../../store/wishesStore"
import type { Wish } from "../../types/wish.type"

const wishMethods = new wishesMethods()

export const useWishesQuery = (listId: string) => {
    const {setWishes} = useWishes((state) => state)
    const mutation = useQuery({
        queryKey: ['wishes', listId],
        queryFn: async (): Promise<Wish[]> => {
            const data = await wishMethods.findWishByListId(listId)
            setWishes(data.data ? data.data : [])
            return data.data
    }})

    return mutation
}