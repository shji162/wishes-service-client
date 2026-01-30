import { useQuery } from "@tanstack/react-query"
import { useComments } from "../../store/commentsStore"
import type { Comment } from "../../types/comment.type"
import { commentsMethods } from "../../api/endpoints/comments"

const CommentsMethods = new commentsMethods()

export const useCommentByIdQuery = (id: string) => {
    const {setSelectedComment} = useComments((state) => state)
    const mutation = useQuery({
        queryKey: ['comments', id],
        queryFn: async (): Promise<Comment> => {
            const data = await CommentsMethods.findById(id)
            setSelectedComment(data)
            return data
    }})

    return mutation
}