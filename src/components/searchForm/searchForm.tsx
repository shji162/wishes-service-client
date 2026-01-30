import { useForm } from "react-hook-form"
import { useLists } from "../../store/listsStore"
import { useListsByNameQuery } from "../../queryes/lists/ListByNameQuery"
import styles from "./searchForm.module.css"

interface SearchFormFields {
    name: string    
}

export const SearchForm = () => {
    const { register, handleSubmit } = useForm<SearchFormFields>()

    const { setSearch, search } = useLists((state) => state)

    useListsByNameQuery(search)

    const onSubmit = (data: SearchFormFields) => {
        setSearch(data.name.trim())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.searchForm}>
            <input
                type="text"
                {...register("name")}
                className={styles.searchInput}
                placeholder="Поиск списка по названию"
                autoComplete="off"
            />
            <button type="submit" className={styles.searchButton}>
                Найти
            </button>
        </form>
    )
} 