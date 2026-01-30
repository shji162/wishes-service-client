import { useForm } from "react-hook-form"
import { useWishesByNameQuery } from "../../queryes/wishes/WishByName"
import { useWishes } from "../../store/wishesStore"
import styles from "./searchForm.module.css"

interface SearchFormFields {
    name: string    
}

export const SearchWishesForm = () => {
    const { register, handleSubmit } = useForm<SearchFormFields>()

    const { setSearch, search } = useWishes((state) => state)

    useWishesByNameQuery(search)

    const onSubmit = (data: SearchFormFields) => {
        setSearch(data.name.trim())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
            <input
                type="text"
                {...register("name")}
                className={styles.searchInput}
                placeholder="Поиск желаний по названию"
                autoComplete="off"
            />
            <button type="submit" className={styles.searchButton}>
                Найти
            </button>
        </form>
    )
} 