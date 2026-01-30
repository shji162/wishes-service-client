import { useMutation } from "@tanstack/react-query"
import { commentsMethods } from "../../api/endpoints/comments"
import { useComments } from "../../store/commentsStore"

const CommentsMethods = new commentsMethods()

export const useCommentDeleteMutation = () => {
    const {deleteComment} = useComments((state) => state)
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            deleteComment(id)
            return await CommentsMethods.deleteById(id)
    }})

    return mutation
}