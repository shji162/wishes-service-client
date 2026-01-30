import { useParams } from "react-router"
import { SingleWish } from "../../components/SingleWish/SingleWish"
import { useWishByIdQuery } from "../../queryes/wishes/WishesByIdQuery"
import { useWishes } from "../../store/wishesStore"

export const WishPage = () => {
    const { listId, wishId } = useParams<{ listId: string; wishId: string }>()
    const { data: wish, isLoading } = useWishByIdQuery(wishId || "")

    const {selectedWish} = useWishes((state) => state)

    if (isLoading) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>Загрузка...</p>
            </div>
        )
    }

    if (!wish) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>Желание не найдено</p>
            </div>
        )
    }

    return (
        <SingleWish
            listId={listId || selectedWish!.listId}
            wishId={wishId || selectedWish!.id}
            name={selectedWish!.name}
            description={selectedWish!.description}
            img={selectedWish!.img || "https://via.placeholder.com/800x600"}
            status="Доступно"
            category={selectedWish!.category}
        />
    )
}