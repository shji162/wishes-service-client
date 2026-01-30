import { Link } from "react-router"
import styles from "./Wish.module.css"
import { useState } from "react"
import { useWishUpdateMutation } from "../../queryes/wishes/WishUpdateMutations"
import { useForm } from "react-hook-form"
import { useWishRemoveMutation } from "../../queryes/wishes/WishDeleteMutation"

interface propsData{
    name: string
    description: string
    img: string
    category: string
    id: string
    listId: string
    likes: number
}

interface WishForm{
    name?: string
    description?: string
    img?: string
    category?: string
    
}


export const Wish_ = ({name, description, img, category, id, listId, likes} : propsData) => {

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

 
    const { register, handleSubmit, formState: { errors }, reset } = useForm<WishForm>()

    const {mutate} = useWishUpdateMutation()
    const wishRemoveMutation = useWishRemoveMutation()
    
        const onSubmit = (data: WishForm) => {
                mutate({
                    name: data.name || name, 
                    description: data.description || description, 
                    img: data.img || img,
                    category: data.category || category,
                    id: id,
                    likes: likes
                }
                , {
                    onSuccess: () => {
                        reset()
                        setShowUpdateModal(false)
                    },
                  
                })
            
        }

        const onDeleteSubmit = () => {
            wishRemoveMutation.mutate(id, {
                onSuccess: () => {
                    setShowDeleteModal(false)
                }
            })

        }
    
        const handleCancel = () => {
            reset()
            setShowUpdateModal(false)
        }

    
         const handleDeleteCancel = () => {
            reset()
            setShowDeleteModal(false)
        }
    
    return (
        <>
         {showUpdateModal && (
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
                                    type="text"
                                    
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


               { showDeleteModal && (  <div className={styles.modalOverlay} onClick={handleCancel} onMouseLeave={() => setShowDeleteModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>вы уверены, что хотите удалить список?</h2>
                        
                    
                            <div className={styles.modalActions}>
                                <button 
                                    type="button"
                                    className={`${styles.modalButton} ${styles.cancelButton}`} 
                                    onClick={handleDeleteCancel}
                                >
                                    Отмена
                                </button>
                                <button 
                                    type="submit"
                                    className={`${styles.modalButton} ${styles.submitButton}`}
                                    onClick={onDeleteSubmit}
                                >
                                    удалить список
                                </button>
                            </div>
            
                    </div>
                </div>
            )}
        <div className={styles.wishCard}>
            <div className={styles.wishImageContainer}>
                <img src={img} className={styles.wishImage} />
            </div>
            <div className={styles.wishContent}>
                <div className={styles.wishHeader}>
                    <h3 className={styles.wishName}>{name}</h3>
                </div>
                <p className={styles.wishDescription}>{description}</p>
                <div className={styles.wishMeta}>
                    <span className={styles.wishCategory}>{category}</span>
                </div>
                <div className={styles.listButtons}>
                 <button onClick={() => setShowUpdateModal(true)}>
                        обновить лист
                    </button>
                     <button  onClick={() => setShowDeleteModal(true)}>
                        удалить лист
                    </button>
            </div>
                <Link to={`/${listId}/${id}`} className={styles.wishLink}>
                    Просмотреть желание
                </Link>
            </div>
        </div>
        </>
    )
}

