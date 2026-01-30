import axios from "axios";
import { authRoute, commentsRoute, listsRoute, usersRoute, wishRoute } from "../consts/backendRoutes.ts";
import { requestInterceptor } from "./interceptors/auth.interceptor";


export const $listsHost = axios.create({
    baseURL: listsRoute
})

export const $wishHost = axios.create({
    baseURL: wishRoute
})

export const $authhost = axios.create({
    baseURL: authRoute,
})

export const $CommentsHost = axios.create({
    baseURL: commentsRoute
})

export const $usersHost = axios.create({
    baseURL: usersRoute
})

$authhost.interceptors.request.use(requestInterceptor)
$listsHost.interceptors.request.use(requestInterceptor)
$wishHost.interceptors.request.use(requestInterceptor)
$CommentsHost.interceptors.request.use(requestInterceptor)

