import type { Comment } from "../comment.type"



export type CommentStoreType = {
    comments: Comment[] | null,
    selectedComment: Comment | null,
    setComments: (comments: Comment[]) => void
    setSelectedComment: (comment: Comment) => void
    addComment: (comment: Comment) => void
    updateComment: (id: string, comment: Comment) => void
    deleteComment: (id: string) => void
}