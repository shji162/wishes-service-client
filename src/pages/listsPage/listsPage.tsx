import { useState } from "react"
import { useForm } from "react-hook-form"
import { List } from "../../components/List/List"
import styles from "./listsPage.module.css"
import { useListsQuery } from "../../queryes/lists/ListsQuery"
import { useListCreateMutation } from "../../queryes/lists/ListCreateMutation"
import { useUsers } from "../../store/userStore"
import { useLists } from "../../store/listsStore"
import { SearchForm } from "../../components/searchForm/searchForm"

interface ListForm {
    name: string
    description: string
}

export const ListsPage = () => {
    const { user } = useUsers((state) => state)
    const userId = user?.id || ""
    const { isLoading } = useListsQuery(userId)
    const createListMutation = useListCreateMutation()
    const {lists} = useLists((state) => state)

    const [showModal, setShowModal] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ListForm>()

    const onSubmit = (data: ListForm) => {
        if (userId) {
            createListMutation.mutate({
                userId: userId,
                description: data.description,
                name: data.name.trim()
            }, {
                onSuccess: () => {
                    reset()
                    setShowModal(false)
                },
                onError: (error) => {
                    console.error("Error creating list:", error)
                }
            })
        }
    }

    const handleCancel = () => {
        reset()
        setShowModal(false)
    }

    if (isLoading) {
        return (
            <div className={styles.listsPage}>
                <div className={styles.listsContainer}>
                    <p>Загрузка...</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.listsPage}>
            <div className={styles.listsContainer}>
                <div className={styles.listsHeader}>
                    <h1 className={styles.listsTitle}>Мои листы желаний:</h1>
                    <button className={styles.addListButton} onClick={() => setShowModal(true)}>
                        Создать новый лист
                    </button>

                    <SearchForm/>
                </div>
                <div className={styles.listsGrid}>
                    {lists?.length === 0 ? (
                        <p style={{ textAlign: "center", gridColumn: "1 / -1", padding: "2rem" }}>
                            У вас пока нет списков. Создайте первый список!
                        </p>
                    ) : (
                        lists?.map((list) => (
                            <List
                                key={list.id}
                                id={list.id}
                                name={list.name}
                                description={list.description}
                            />
                        ))
                    )}
                </div>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={handleCancel}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>Создать новый лист</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="list-name" className={styles.formLabel}>Название списка</label>
                                <input
                                    id="list-name"
                                    type="text"
                                    {...register("name", {
                                        required: "Название списка обязательно",
                                        minLength: {
                                            value: 2,
                                            message: "Название должно содержать не менее 2 символов"
                                        }
                                    })}
                                    className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
                                    placeholder="Введите название списка"
                                />
                                {errors.name && (
                                    <span className={styles.errorMessage}>{errors.name.message}</span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="list-description" className={styles.formLabel}>Описание</label>
                                <textarea
                                    id="list-description"
                                    {...register("description")}
                                    className={styles.formTextarea}
                                    placeholder="Введите описание списка"
                                    rows={4}
                                />
                            </div>
                            <div className={styles.modalActions}>
                                <button 
                                    type="button"
                                    className={`${styles.modalButton} ${styles.cancelButton}`} 
                                    onClick={handleCancel}
                                >
                                    Отмена
                                </button>
                                <button 
                                    type="submit"
                                    className={`${styles.modalButton} ${styles.submitButton}`}
                                >
                                    Добавить список
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
        </div>
    )
}