import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import styles from "./loginPage.module.css"
import { useUserLoginMutations } from "../../queryes/users/UserLoginMutation"
import { listsRoute } from "../../consts/routes"

interface LoginForm {
    email: string
    password: string
}

export const LoginPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
    const {mutate} = useUserLoginMutations()

    const onSubmit = (data: LoginForm) => {
        mutate(data, {
            onSuccess: () => {
                navigate(listsRoute)
            },
            onError: (error) => {
                console.error("Login error:", error)
            }
        })
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <h1 className={styles.loginTitle}>Добро Пожаловать</h1>
                <p className={styles.loginSubtitle}>Войдите в свой аккаунт</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel}>E-mail</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email обязателен",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Неверный адрес email"
                                }
                            })}
                            className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                            placeholder="Введите ваш email"
                        />
                        {errors.email && (
                            <span className={styles.errorMessage}>{errors.email.message}</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.formLabel}>Пароль</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Пароль обязателен"
                            })}
                            className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
                            placeholder="Введите ваш пароль"
                            
                        />
                        {errors.password && (
                            <span className={styles.errorMessage}>{errors.password.message}</span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}