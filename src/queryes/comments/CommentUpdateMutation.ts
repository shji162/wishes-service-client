import { useMutation } from "@tanstack/react-query"
import { commentsMethods } from "../../api/endpoints/comments"
import { useComments } from "../../store/commentsStore"

const CommentsMethods = new commentsMethods()

interface data {
    id: string
    text: string
}

export const useCommentUpdateMutation = () => {
    const {updateComment} = useComments((state) => state)
    const mutation = useMutation({
        mutationFn: async (data: data) => {
            const res = await CommentsMethods.updateComment(data.id, data.text)
            updateComment(data.id, res.data)
            return res.data
    }})

    return mutation
}