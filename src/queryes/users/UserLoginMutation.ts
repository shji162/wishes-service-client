import { useMutation } from "@tanstack/react-query"
import { authMethods,  } from "../../api/endpoints/auth"
import { useUsers } from "../../store/userStore"

const auth = new authMethods()

interface data{
    password: string
    email: string 
}


export const useUserLoginMutations = () => {
    const {setUser, setAuth, setAdmin} = useUsers((state) => state)
    const mutation = useMutation({
        mutationFn: async (data: data) => {
            const res = await auth.login(data)
            setUser(res.data.user)
            setAuth(true)
            setAdmin(res.data.user.role === 'ADMIN' ? true : false)
            localStorage.setItem('accessToken', res.data.accessToken)
            return data
    }})

    return mutation
}