import { useMutation } from "@tanstack/react-query"
import { commentsMethods } from "../../api/endpoints/comments"
import type { Comment } from "../../types/comment.type"
import { useComments } from "../../store/commentsStore"

const CommentsMethods = new commentsMethods()

export const useCommentCreateMutation = () => {
    const {addComment} = useComments((state) => state)
    const mutation = useMutation({
        mutationFn: async (comment: Comment) => {
            const data = await CommentsMethods.createComment(comment)
            addComment(data.data)
            return data.data
    }})

    return mutation
}