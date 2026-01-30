import type { AxiosResponse } from "axios";
import { $usersHost} from "..";
import type { User } from "../../types/user.type";



export class usersMethods{
    async findByEmail (email: string): Promise<AxiosResponse<User>> {
        return await $usersHost.get(`?email=${email}`)
    }

    
}