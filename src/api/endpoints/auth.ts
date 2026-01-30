import type { AxiosResponse } from "axios";
import { $authhost} from "..";
import { loginRoute, registrationRoute } from "../../consts/backendRoutes";
import { Roles } from "../../types/enums/userRolesEnum"
import type { User } from "../../types/user.type";

interface data {
    password: string
    email: string
}

interface inputUser {
    email: string
    password: string
    role: Roles
}

interface res {
    accessToken: string
    user: User
}

export class authMethods{
    async registration (user: inputUser): Promise<AxiosResponse<res>> {
        return await $authhost.post(registrationRoute, user)
    }

    async login(data: data): Promise<AxiosResponse<res>> { 
        return await $authhost.post(loginRoute, data)
    }
}
