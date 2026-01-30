import { Link } from "react-router"
import styles from "./List.module.css"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useListCreateMutation } from "../../queryes/lists/ListChangeNameMutation"
import { useListDeleteMutation } from "../../queryes/lists/ListRemoveMutation"

interface ListProps {
    id: string
    name: string
    description: string
}

interface ListForm {
    name?: string
    description?: string
}

export const List = ({ id, name, description }: ListProps) => {
    

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

     const { register, handleSubmit, formState: { errors }, reset } = useForm<ListForm>()
    
    const {mutate} = useListCreateMutation()
    const ListDeleteMutation = useListDeleteMutation()

    
        const onSubmit = (data: ListForm) => {
            
                mutate({
                    name: data.name || name, 
                    description: data.description || description, 
                    id: id
                }
                    
                , {
                    onSuccess: () => {
                        reset()
                        setShowUpdateModal(false)
                    },
                  
                })
            
        }

        const onDeleteSubmit = () => {
            ListDeleteMutation.mutate(id, {
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
        <div className={styles.listCard}>
            <div className={styles.listContent}>
                <h3 className={styles.listName}>{name}</h3>
                {description && <p className={styles.listDescription}>{description}</p>}
            </div>
            <div className={styles.listButtons}>
                 <button onClick={() => setShowUpdateModal(true)}>
                        обновить лист
                    </button>
                     <button  onClick={() => setShowDeleteModal(true)}>
                        удалить лист
                    </button>
            </div>
            

            {showUpdateModal && (
                <div className={styles.modalOverlay} onClick={handleCancel} onMouseLeave={() => setShowUpdateModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>Изменить список</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="list-name" className={styles.formLabel}>Название:</label>
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
                                    placeholder="Введите название"
                                />
                                {errors.name && (
                                    <span className={styles.errorMessage}>{errors.name.message}</span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="list-description" className={styles.formLabel}>Описание:</label>
                                <textarea
                                    id="wish-description"
                                    {...register("description")}
                                    className={styles.formTextarea}
                                    placeholder="Введите описание"
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
                                    Изменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className={styles.modalOverlay} onClick={handleCancel} onMouseLeave={() => setShowDeleteModal(false)}>
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
           
            <Link to={`/${id}`} className={styles.listLink}>
                Просмотреть список
            </Link>
        </div>
    )
}

