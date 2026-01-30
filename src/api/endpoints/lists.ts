import type { AxiosResponse } from "axios";
import { $listsHost } from "..";
import type { List } from "../../types/list.type";


interface inputList{
    userId: string
    description: string
    name: string
}

interface inputListUpdate{
    description: string
    name: string
}

export class listsMethods {
    async createList(list: inputList){
        return await $listsHost.post("", list)
    }

    async findByUserId(userId: string): Promise<AxiosResponse<List[]>> {
        return await $listsHost.get(userId)
    }

    async findByName(name: string, userId: string): Promise<AxiosResponse<List[]>> {
        return await $listsHost.get(`?name=${name}&userId=${userId}`)
    }

    async findById(id: string): Promise<AxiosResponse<List>> {
        return await $listsHost.get('findById/' + id)
    }

    async changeList(id: string, data: inputListUpdate){
        return await $listsHost.patch(id, data)
    }

    async deleteById(id: string) {
        return await $listsHost.delete(id)
    }
}