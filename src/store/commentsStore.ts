import { create } from "zustand";
import type { CommentStoreType } from "../types/storesTypes/commentStoreType";


export const useComments = create<CommentStoreType>((set, get) => ({
    comments: [],
    selectedComment: null,
    setComments: (comments) => set({comments: comments}),
    setSelectedComment: (comment) => set({selectedComment: comment}),
      addComment: (comment) => {
        const newComment = [...(get().comments ?? []), comment]
        set({comments: newComment})
    },

    updateComment: (id, comment) => {
        const newComments = get().comments?.filter(comment => comment.id !== id)

        set({comments: [...(newComments ?? []), comment]})
    },

    deleteComment: (id) => {
        const newComments = get().comments?.filter(comment => comment.id !== id)

        set({comments: newComments})
    }
}))