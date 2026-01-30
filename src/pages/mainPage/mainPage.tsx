import { Link } from "react-router"
import { listsRoute, loginRoute, regRoute } from "../../consts/routes"
import { useUsers } from "../../store/userStore"
import styles from "./mainPage.module.css"

export const MainPage = () => {
    const { isAuth } = useUsers((s) => s)

    return (
        <div className={styles.mainPage}>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>Планируйте. Делитесь. Исполняйте.</div>
                    <h1 className={styles.title}>Ваши желания — в одном месте</h1>
                    <p className={styles.subtitle}>
                        Собирайте списки, добавляйте желания с описанием и картинкой, делитесь с близкими и
                        сохраняйте порядок в мечтах.
                    </p>

                    <div className={styles.actions}>
                        {isAuth ? (
                            <Link to={listsRoute} className={styles.primaryBtn}>
                                Перейти к спискам
                            </Link>
                        ) : (
                            <>
                                <Link to={regRoute} className={styles.primaryBtn}>
                                    Создать аккаунт
                                </Link>
                                <Link to={loginRoute} className={styles.secondaryBtn}>
                                    Войти
                                </Link>
                            </>
                        )}
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>1</div>
                            <div className={styles.statLabel}>Создайте список</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>2</div>
                            <div className={styles.statLabel}>Добавьте желания</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statValue}>3</div>
                            <div className={styles.statLabel}>Отслеживайте прогресс</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroMock}>
                    <div className={styles.mockCard}>
                        <div className={styles.mockHeader}>
                            <div className={styles.dot} />
                            <div className={styles.dot} />
                            <div className={styles.dot} />
                        </div>
                        <div className={styles.mockTitle}>Пример списка</div>
                        <div className={styles.mockRow}>
                            <div className={styles.mockPill}>Путешествия</div>
                            <div className={styles.mockTag}>3 желания</div>
                        </div>
                        <div className={styles.mockList}>
                            <div className={styles.mockItem}>
                                <div className={styles.mockImg} />
                                <div className={styles.mockText}>
                                    <div className={styles.mockLineStrong} />
                                    <div className={styles.mockLine} />
                                </div>
                            </div>
                            <div className={styles.mockItem}>
                                <div className={styles.mockImg} />
                                <div className={styles.mockText}>
                                    <div className={styles.mockLineStrong} />
                                    <div className={styles.mockLine} />
                                </div>
                            </div>
                            <div className={styles.mockItem}>
                                <div className={styles.mockImg} />
                                <div className={styles.mockText}>
                                    <div className={styles.mockLineStrong} />
                                    <div className={styles.mockLine} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.mockFooter}>
                            <div className={styles.mockBtn} />
                            <div className={styles.mockBtnOutline} />
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Что умеет приложение</h2>
                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <h3 className={styles.featureTitle}>Списки</h3>
                        <p className={styles.featureText}>Создавайте и храните подборки желаний по темам.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3 className={styles.featureTitle}>Желания</h3>
                        <p className={styles.featureText}>Добавляйте описание, картинку и категорию.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3 className={styles.featureTitle}>Поиск</h3>
                        <p className={styles.featureText}>Быстро находите нужные списки и желания.</p>
                    </div>
                </div>
            </section>

            <section className={styles.cta}>
                <div className={styles.ctaInner}>
                    <h2 className={styles.ctaTitle}>Готовы собрать свой список?</h2>
                    <p className={styles.ctaText}>
                        Начните с пары желаний — дальше станет проще поддерживать порядок.
                    </p>
                    <div className={styles.actions}>
                        {isAuth ? (
                            <Link to={listsRoute} className={styles.primaryBtn}>
                                Открыть мои списки
                            </Link>
                        ) : (
                            <>
                                <Link to={regRoute} className={styles.primaryBtn}>
                                    Регистрация
                                </Link>
                                <Link to={loginRoute} className={styles.secondaryBtn}>
                                    Войти
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}