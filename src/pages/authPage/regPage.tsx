import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import styles from "./regPage.module.css"
import { useUserRegMutations } from "../../queryes/users/UserRegMutation"
import { listsRoute } from "../../consts/routes"

interface RegistrationForm {
    email: string
    password: string
}

export const RegPage = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationForm>()
    const {mutate}  = useUserRegMutations()

    const onSubmit = (data: RegistrationForm) => {
        mutate(data, {
            onSuccess: () => {
                navigate(listsRoute)
            },
            onError: (error) => {
                console.error("Registration error:", error)
            }
        })
    }

    return (
        <div className={styles.regPage}>
            <div className={styles.regContainer}>
                <h1 className={styles.regTitle}>Добро пожаловать</h1>
                <p className={styles.regSubtitle}>Создайте аккаунт</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className={styles.regForm}>
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
                                required: "Пароль обязателен",
                                minLength: {
                                    value: 6,
                                    message: "Пароль должен содержать не менее 6 символов"
                                }
                            })}
                            className={`${styles.formInput} ${errors.password ? styles.inputError : ""}`}
                            placeholder="Введите ваш пароль"
                        />
                        {errors.password && (
                            <span className={styles.errorMessage}>{errors.password.message}</span>
                        )}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    )
}