import { useMutation } from "@tanstack/react-query"
import { wishesMethods } from "../../api/endpoints/wishes"
import { useWishes } from "../../store/wishesStore"

const wishMethods = new wishesMethods()

export const useWishRemoveMutation = () => {
    const {deleteWish} = useWishes((state) => state)
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            deleteWish(id)
            return await wishMethods.removeWish(id)
    }})

    return mutation
}