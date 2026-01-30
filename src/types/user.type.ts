import { Roles } from "./enums/userRolesEnum"

export type User = {
    email: string
    password: string
    id: string
    role: Roles
}