import { useParams } from "react-router"
import { ListWithWishes } from "../../components/ListWithWishes/ListWithWishes"
import { useListByIdQuery } from "../../queryes/lists/ListByIdQuery"
import { useWishesQuery } from "../../queryes/wishes/WishesQuery"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./listPage.module.css"
import { useWishCreateMutation } from "../../queryes/wishes/WishCreateMutation"
import { SearchWishesForm } from "../../components/searchForm/searchWishesForm"

interface WishForm{
    name: string
    description: string
    img: any
    category: string
    
}

export const ListPage = () => {
    const { id } = useParams<{ id: string }>()
    const [showModal, setShowModal] = useState(false)
    const [result, setResult] = useState("")
    const listId = id || ""

    const { data: list, isLoading: listLoading } = useListByIdQuery(listId)
    const { isLoading: wishesLoading } = useWishesQuery(listId)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<WishForm>()

    const {mutate} = useWishCreateMutation()

    
        const onSubmit = (data: WishForm) => {
            
            const image = data.img[0]
             const reader = new FileReader();

            reader.onloadend = () => {
                setResult(reader.result as string)
            }

             reader.readAsDataURL(image);

            
            if (listId) {
                console.log(result)
                mutate({...data, likes: 0, listId: listId,  img: result}
                    
                , {
                    onSuccess: () => {
                        reset()
                        setShowModal(false)
                    },
                  
                })
            }
        }
    
        const handleCancel = () => {
            reset()
            setShowModal(false)
        }

    

    if (listLoading || wishesLoading) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>Загрузка...</p>
            </div>
        )
    }

    if (!list) {
        return (
            <div style={{ textAlign: "center" }}>
                <p>Список не найден</p>
            </div>
        )
    }
    



    

    return (
        <div>
            <div className={styles.listsPage}>
            <div className={styles.listsContainer}>
                <div className={styles.listsHeader}>
                    <h1 className={styles.listsTitle}>Мои желания:</h1>
                    <button className={styles.addListButton} onClick={() => setShowModal(true)}>
                        Создать новое желание
                    </button>
                    <SearchWishesForm/>
                </div>
            </div>
        </div>
            {showModal && (
                <div className={styles.modalOverlay} onClick={handleCancel}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>Создать новое желание</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="list-name" className={styles.formLabel}>Название желания</label>
                                <input
                                    id="wish-name"
                                    type="text"
                                    {...register("name", {
                                        required: "Название желания обязательно",
                                        minLength: {
                                            value: 2,
                                            message: "Название должно содержать не менее 2 символов"
                                        }
                                    })}
                                    className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
                                    placeholder="Введите название желания"
                                />
                                {errors.name && (
                                    <span className={styles.errorMessage}>{errors.name.message}</span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="list-description" className={styles.formLabel}>Описание</label>
                                <textarea
                                    id="wish-description"
                                    {...register("description")}
                                    className={styles.formTextarea}
                                    placeholder="Введите описание желания"
                                    rows={4}
                                />
                            </div>
                             <div className={styles.formGroup}>
                                <label htmlFor="list-description" className={styles.formLabel}>картинка</label>
                                <input
                                    id="wish-img"
                                    {...register("img")}
                                    className={styles.formInput}
                                    type="file"
                            
                                />
                            </div>
                             <div className={styles.formGroup}>
                                <label htmlFor="list-description" className={styles.formLabel}>категория</label>
                                <input
                                    id="wish-img"
                                    {...register("category")}
                                    className={styles.formInput}
                                    type="text"
                                    
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
                                    Добавить желание
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ListWithWishes />
        </div>
    )
}