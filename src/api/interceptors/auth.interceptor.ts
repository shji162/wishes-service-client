

export const requestInterceptor = (config: any) => { 
    try {
        const accessToken = localStorage.getItem('accessToken')

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
    
        return config
    } catch (error) {
        return config
    }
}