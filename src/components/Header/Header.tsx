import { Link } from "react-router"
import { mainRoute, regRoute, loginRoute, adminRoute, listsRoute } from "../../consts/routes"
import { useUsers } from "../../store/userStore"
import styles from "./Header.module.css"

export const Header = () => {
    const { isAuth, isAdmin } = useUsers((state) => state)
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    <Link to={mainRoute} className={styles.brand}>
                        WishList
                    </Link>
                    <span className={styles.brandSub}>Списки желаний</span>
                </div>

                <div className={styles.right}>
                    <Link to={mainRoute} className={styles.navLink}>
                        главная
                    </Link>

                    <Link to={isAuth ? listsRoute : loginRoute} className={styles.navLink}>
                        списки
                    </Link>

                    {!isAuth && (
                        <>
                            <Link to={loginRoute} className={styles.navLink}>
                                вход
                            </Link>
                            <Link to={regRoute} className={styles.primaryLink}>
                                регистрация
                            </Link>
                        </>
                    )}

                    {isAdmin && (
                        <Link to={adminRoute} className={styles.navLink}>
                            админ
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

