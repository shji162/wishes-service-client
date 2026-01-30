import { useMutation } from "@tanstack/react-query"
import { authMethods,  } from "../../api/endpoints/auth"
import { useUsers } from "../../store/userStore"
import { Roles } from "../../types/enums/userRolesEnum"

const auth = new authMethods()

interface data{
    password: string
    email: string 
}

export const useUserRegMutations = () => {
    const {setUser, setAuth, setAdmin} = useUsers((state) => state)
    const mutation = useMutation({
        mutationFn: async (data: data) => {
            const res = await auth.registration({...data, role: Roles.USER})
            setUser(res.data.user)
            setAuth(true)
            setAdmin(res.data.user.role === 'ADMIN' ? true : false)
            localStorage.setItem('accessToken', res.data.accessToken)
            return data
    }})

    return mutation
}