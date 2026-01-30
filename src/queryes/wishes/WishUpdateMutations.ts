import { useMutation } from "@tanstack/react-query"
import { wishesMethods } from "../../api/endpoints/wishes"
import { useWishes } from "../../store/wishesStore"

const wishMethods = new wishesMethods()

interface data {
    name: string
    description: string
    img: string
    category: string
    id: string
    likes: number
}

export const useWishUpdateMutation = () => {
    const {updateWish} = useWishes((state) => state)
    const mutation = useMutation({
        mutationFn: async (data: data) => {
            const res = await wishMethods.updateWish(data.id, data)
            updateWish(data.id, res.data)
            return res
    }})

    return mutation
}