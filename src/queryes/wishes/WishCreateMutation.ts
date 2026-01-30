import { useMutation } from "@tanstack/react-query"
import { wishesMethods } from "../../api/endpoints/wishes"
import { useWishes } from "../../store/wishesStore"

const wishMethods = new wishesMethods()

interface inputWish{
    listId: string
    name: string
    description: string
    img: string
    category: string
    likes: number
}

export const useWishCreateMutation = () => {
    const {addWish} = useWishes((state) => state)
    const mutation = useMutation({
        mutationFn: async (wish: inputWish) => {
            const res = await wishMethods.createWish(wish)
            addWish(res.data)
            return res
    }})

    return mutation
}