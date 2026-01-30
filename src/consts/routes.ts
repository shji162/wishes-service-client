import { AdminPage } from "../pages/adminPage/adminPage"
import { LoginPage } from "../pages/authPage/loginPage"
import { RegPage } from "../pages/authPage/regPage"
import { ListPage } from "../pages/listPage/listPage"
import { ListsPage } from "../pages/listsPage/listsPage"
import { MainPage } from "../pages/mainPage/mainPage"
import { WishPage } from "../pages/wishPage/wishPage"

export const mainRoute = "/"
export const regRoute = "/reg"
export const loginRoute = "/login"
export const listsRoute= "/lists"
export const listRoute = "/:id"
export const wishRoute = "/:listId/:wishId"
export const adminRoute = "/admin"

export const publicRoutes = [
    {
        route: mainRoute,
        element: MainPage
    },
     {
        route: regRoute,
        element: RegPage
    },
     {
        route: loginRoute,
        element: LoginPage
    },
]

export const privateRoutes = [
    {
        route: listsRoute,
        element: ListsPage
    },
    {
        route: listRoute,
        element: ListPage
    },
     {
        route: wishRoute,
        element: WishPage
    },
     
]

export const adminRoutes = [
    {
        route: adminRoute,
        element: AdminPage
    }
]