import { useQuery } from "@tanstack/react-query"
import { wishesMethods } from "../../api/endpoints/wishes"
import { useWishes } from "../../store/wishesStore"
import type { Wish } from "../../types/wish.type"

const wishMethods = new wishesMethods()

export const useWishByIdQuery = (id: string) => {
    const {setSelectedWish} = useWishes((state) => state)
    const mutation = useQuery({
        queryKey: ['wishes', id],
        queryFn: async (): Promise<Wish> => {
            const data = await wishMethods.findById(id)
            setSelectedWish(data.data)
            console.log(data)
            return data.data
    }})

    return mutation
}