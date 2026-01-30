import type { AxiosResponse } from "axios";
import { $wishHost } from "..";
import type { Wish } from "../../types/wish.type";

interface inputWish{
    listId: string
    name: string
    description: string
    img: string
    category: string
    likes: number
}

interface inputUpdateWish{
    id: string
    name: string
    description: string
    img: string
    category: string
    likes: number
}

export class wishesMethods{
   
    async createWish(wish: inputWish){ 
        return await $wishHost.post("", wish)
    }

     async findByName(name: string, listId: string): Promise<AxiosResponse<Wish[]>> {
            return await $wishHost.get(`?name=${name}&listId=${listId}`)
        }

    async findWishByListId(listId: string): Promise<AxiosResponse<Wish[]>> {
        return await $wishHost.get(listId)
    }
    
    async findById(id: string): Promise<AxiosResponse<Wish>> {
        return await $wishHost.get(`findOne/${id}`)
    }

    async updateWish(id: string, newWish: inputUpdateWish) {
        return await $wishHost.put(id, newWish)
    }

    async removeWish(id: string) {
        return await $wishHost.delete(id)
    }

}