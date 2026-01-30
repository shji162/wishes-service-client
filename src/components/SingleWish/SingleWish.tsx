import { Link } from "react-router"
import { useEffect, useState } from "react"
import styles from "./SingleWish.module.css"
import { useComments } from "../../store/commentsStore"
import { useCommentsQuery } from "../../queryes/comments/CommentsQuery"
import { useCommentCreateMutation } from "../../queryes/comments/CommentCreateMutaiton"
import { useCommentUpdateMutation } from "../../queryes/comments/CommentUpdateMutation"
import { useCommentDeleteMutation } from "../../queryes/comments/CommentRemoveMutation"
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    VKShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    VKIcon,
    EmailIcon,
} from "react-share"

interface SingleWishProps {
    listId: string 
    wishId: string
    name: string
    description: string
    img: string
    status: string
    category: string
}

export const SingleWish = ({ listId, wishId, name, description, img, status, category }: SingleWishProps) => {
    const { comments, setComments } = useComments((state) => state)
    const [commentText, setCommentText] = useState("")
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
    const [showShareModal, setShowShareModal] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)

    const { isLoading: commentsLoading } = useCommentsQuery(String(wishId))
    const createCommentMutation = useCommentCreateMutation()
    const updateCommentMutation = useCommentUpdateMutation()
    const deleteCommentMutation = useCommentDeleteMutation()

    useEffect(() => {
        if (!editingCommentId) {
            setCommentText("")
        }
    }, [editingCommentId])

    const handleSubmitComment = (e: any) => {
        e.preventDefault()
        const trimmed = commentText.trim()
        if (!trimmed) return

        if (editingCommentId) {
            updateCommentMutation.mutate(
                { id: editingCommentId, text: trimmed },
                {
                    onSuccess: () => {
                        if (comments) {
                            setComments(
                                comments.map((c) =>
                                    c.id === editingCommentId ? { ...c, text: trimmed } : c
                                )
                            )
                        }
                        setEditingCommentId(null)
                        setCommentText("")
                    },
                }
            )
        } else {
            createCommentMutation.mutate(
                { wishId: String(wishId), text: trimmed } as any,
                {
                    onSuccess: (created: any) => {
                        if (comments) {
                            setComments([...comments, created])
                        } else {
                            setComments([created])
                        }
                        setCommentText("")
                    },
                }
            )
        }
    }

    const handleEditClick = (id: string, text: string) => {
        setEditingCommentId(id)
        setCommentText(text)
    }

    const handleDeleteClick = (id: string) => {
        deleteCommentMutation.mutate(id, {
            onSuccess: () => {
                if (comments) {
                    setComments(comments.filter((c) => c.id !== id))
                }
                if (editingCommentId === id) {
                    setEditingCommentId(null)
                    setCommentText("")
                }
            },
        })
    }

    const wishUrl = `${window.location.origin}/${listId}/${wishId}`
    const shareTitle = `Посмотрите на это желание: ${name}`
    const shareDescription = description

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(wishUrl)
            setCopySuccess(true)
            setTimeout(() => {
                setCopySuccess(false)
                setShowShareModal(false)
            }, 1500)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    const handleCloseModal = () => {
        setShowShareModal(false)
        setCopySuccess(false)
    }

        return (
        <div className={styles.singleWishPage}>
            <div className={styles.singleWishContainer}>
                <div className={styles.singleWishImageSection}>
                    <img src={img} alt={name} className={styles.singleWishImage} />
                </div>
                <div className={styles.singleWishDetails}>
                    <div className={styles.singleWishHeader}>
                        <h1 className={styles.singleWishName}>{name}</h1>
                        <span className={`${styles.singleWishStatus} ${status}`}>
                            {status}
                        </span>
                    </div>
                    <div className={styles.singleWishMeta}>
                        <span className={styles.singleWishCategory}>{category}</span>
                    </div>
                    <div className={styles.singleWishDescriptionSection}>
                        <h2 className={styles.singleWishSectionTitle}>Описание</h2>
                        <p className={styles.singleWishDescription}>{description}</p>
                    </div>
                    <div className={styles.singleWishActions}>
                        <Link to={`/${listId}`} className={styles.singleWishBackLink}>
                            ← Назад к списку
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowShareModal(true)}
                            className={styles.shareButtonMain}
                        >
                            📤 Поделиться
                        </button>
                    </div>
                    <div className={styles.commentsSection}>
                        <div className={styles.commentsHeader}>
                            <h2 className={styles.commentsTitle}>Комментарии</h2>
                            {!commentsLoading && (
                                <span className={styles.commentsCount}>
                                    {comments?.length || 0} шт.
                                </span>
                            )}
                        </div>
                        <form className={styles.commentForm} onSubmit={handleSubmitComment}>
                            <textarea
                                className={styles.commentInput}
                                placeholder={
                                    editingCommentId
                                        ? "Измените комментарий и нажмите «Сохранить»"
                                        : "Напишите комментарий к этому желанию..."
                                }
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button
                                type="submit"
                                className={styles.commentSubmitButton}
                                disabled={createCommentMutation.isPending || updateCommentMutation.isPending}
                            >
                                {editingCommentId ? "Сохранить" : "Добавить"}
                            </button>
                        </form>
                        <div className={styles.commentsList}>
                            {commentsLoading ? (
                                <span className={styles.emptyCommentsText}>Загрузка комментариев...</span>
                            ) : !comments || comments.length === 0 ? (
                                <span className={styles.emptyCommentsText}>
                                    Пока нет комментариев. Будьте первым!
                                </span>
                            ) : (
                                comments?.map((comment) => (
                                    <div key={comment.id} className={styles.commentItem}>
                                        <span className={styles.commentText}>{comment.text}</span>
                                        <div className={styles.commentActions}>
                                            <button
                                                type="button"
                                                className={styles.commentActionButton}
                                                onClick={() => handleEditClick(comment.id, comment.text)}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                type="button"
                                                className={`${styles.commentActionButton} ${styles.commentActionButtonDelete}`}
                                                onClick={() => handleDeleteClick(comment.id)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showShareModal && (
                <div className={styles.shareModalOverlay} onClick={handleCloseModal}>
                    <div className={styles.shareModalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.shareModalHeader}>
                            <h2 className={styles.shareModalTitle}>Поделиться желанием</h2>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className={styles.shareModalClose}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.shareModalBody}>
                            <div className={styles.shareButtonsGrid}>
                                <div className={styles.shareButtonItem}>
                                    <FacebookShareButton
                                        url={wishUrl}
                                        hashtag="#wish"
                                    >
                                        <div className={styles.shareButtonContent}>
                                            <FacebookIcon size={40} round />
                                            <span>Facebook</span>
                                        </div>
                                    </FacebookShareButton>
                                </div>

                                <div className={styles.shareButtonItem}>
                                    <TwitterShareButton
                                        url={wishUrl}
                                        title={shareTitle}
                                    >
                                        <div className={styles.shareButtonContent}>
                                            <TwitterIcon size={40} round />
                                            <span>Twitter</span>
                                        </div>
                                    </TwitterShareButton>
                                </div>

                                <div className={styles.shareButtonItem}>
                                    <VKShareButton
                                        url={wishUrl}
                                        title={shareTitle}
                                    >
                                        <div className={styles.shareButtonContent}>
                                            <VKIcon size={40} round />
                                            <span>ВКонтакте</span>
                                        </div>
                                    </VKShareButton>
                                </div>

                                <div className={styles.shareButtonItem}>
                                    <TelegramShareButton
                                        url={wishUrl}
                                        title={shareTitle}
                                    >
                                        <div className={styles.shareButtonContent}>
                                            <TelegramIcon size={40} round />
                                            <span>Telegram</span>
                                        </div>
                                    </TelegramShareButton>
                                </div>

                                <div className={styles.shareButtonItem}>
                                    <WhatsappShareButton
                                        url={wishUrl}
                                        title={shareTitle}
                                        separator=" - "
                                    >
                                        <div className={styles.shareButtonContent}>
                                            <WhatsappIcon size={40} round />
                                            <span>WhatsApp</span>
                                        </div>
                                    </WhatsappShareButton>
                                </div>

                                <div className={styles.shareButtonItem}>
                                    <EmailShareButton
                                        url={wishUrl}
                                        subject={shareTitle}
                                        body={shareDescription}
                                    >
                                        <div className={styles.shareButtonContent}>
                                            <EmailIcon size={40} round />
                                            <span>Email</span>
                                        </div>
                                    </EmailShareButton>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className={`${styles.shareButtonItem} ${styles.copyLinkButton}`}
                                >
                                    <div className={styles.shareButtonContent}>
                                        <div className={styles.copyIcon}>
                                            {copySuccess ? "✓" : "🔗"}
                                        </div>
                                        <span>{copySuccess ? "Скопировано!" : "Копировать ссылку"}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

