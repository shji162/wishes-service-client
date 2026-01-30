import { Wish_ } from "../Wish/Wish"
import styles from "./ListWithWishes.module.css"
import { useWishes } from "../../store/wishesStore"
import { useLists } from "../../store/listsStore"

export const ListWithWishes = () => {
    const {selectedList} = useLists((state) => state)
    const {Wishes} = useWishes((state) => state)

    return (
        <div className={styles.listWithWishes}>
            <div className={styles.listHeader}>
                <h1 className={styles.listTitle}>{selectedList?.name}</h1>
                <p className={styles.listDescriptionText}>{selectedList?.description}</p>
            </div>
            <div className={styles.wishesContainer}>
                {Wishes?.map((wish) => (
                    <Wish_
                       id={wish.id}
                       listId={wish.listId}
                       name={wish.name}
                       description={wish.description}
                       img={wish.img}
                       category={wish.category}
                       likes={wish.likes}
                    />
                ))}
            </div>
        </div>
    )
}

