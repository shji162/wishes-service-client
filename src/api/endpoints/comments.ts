import type { AxiosResponse } from "axios";
import { $CommentsHost } from "..";
import type { Comment } from "../../types/comment.type";


interface inputComment{
    wishId: string
    text: string
}

export class commentsMethods {
    async createComment(comment: inputComment){
        return await $CommentsHost.post("", comment)
    }

    async findByWishId(wishId: string): Promise<AxiosResponse<Comment[]>> {
        return await $CommentsHost.get(wishId)
    }

    async findById(id: string): Promise<Comment> {
        return await $CommentsHost.get(id)
    }

    async updateComment(id: string, text: string){
        return await $CommentsHost.patch(id, text)
    }

    async deleteById(id: string) {
        return await $CommentsHost.delete(id)
    }
}