import { Route, Routes } from "react-router"
import { adminRoutes, privateRoutes, publicRoutes } from "../consts/routes"
import { useUsers } from "../store/userStore"
import { useEffect } from "react"
import { usersMethods } from "../api/endpoints/users"

const userMethods = new usersMethods()


export const AppRouter = () => {

    const {isAuth, isAdmin, setUser, setAuth, setAdmin} = useUsers((state) => state)

    useEffect(() => {
        const fetch = async() => {
            const email = JSON.parse(atob(localStorage.getItem("accessToken")!.split(".")[1])).email

            const res = await userMethods.findByEmail(email)

            if(res){
                setUser(res.data)
                setAuth(true)
                setAdmin(res.data.role === 'ADMIN' ? true : false)
            }
        }
        fetch()
    }, [])

    return (
        <>
            <Routes>
                {publicRoutes.map(el => {
                    return(
                        <Route path={el.route} element = {<el.element/>}/>
                    )
                })}
                 { isAuth ? privateRoutes.map(el => {
                    return(
                        <Route path={el.route} element = {<el.element/>}/>
                    )
                }) : ''
                }
                { isAdmin ? adminRoutes.map(el => {
                    return(
                        <Route path={el.route} element = {<el.element/>}/>
                    )
                }) : ''
                }
            </Routes>
        </>
    )
}