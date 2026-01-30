import { useQuery } from "@tanstack/react-query"
import { commentsMethods } from "../../api/endpoints/comments"
import type { Comment } from "../../types/comment.type"
import { useComments } from "../../store/commentsStore"

const CommentsMethods = new commentsMethods()

export const useCommentsQuery = (wishId: string) => {
    const {setComments} = useComments((state) => state)

    const mutation = useQuery({
        queryKey: ['comments', wishId],
        queryFn: async (): Promise<Comment[]> => {
            const data = await CommentsMethods.findByWishId(wishId)
            setComments(data.data)
            return data.data
    }})

    return mutation
}