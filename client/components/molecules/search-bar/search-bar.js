import { useRef } from "react"
import styles from "./search-bar.module.css"

export default function SearchBar({
    handleSearch = ()=>{},
    handleSort = ()=>{}
}){

    const intervalRef = useRef(null)

    const debounce = function(fn, delay) {
        return function(...args){
            if(intervalRef?.current){
                clearTimeout(intervalRef.current)
            }
            intervalRef.current = setTimeout(fn(...args),delay)
        }
    }
    const debouncedHandleSearch = debounce(handleSearch, 300);

    return(
        <div className={styles.wrapper}>
            <div className={styles.searchBar}>
                <p>Search : </p>
                <input
                    className={styles.input}
                    placeholder="Search..."
                    onChange={(e)=>debouncedHandleSearch(e.target.value)}
                />
            </div>
            <div className={styles.searchBar}>
                <p>Sort By :</p>
                <select className={styles.dropDown} onChange={(e)=>handleSort(e.target.value)}>
                    <option value='descending'>Recent</option>
                    <option value='ascending'>Oldest</option>
                </select>
            </div>
        </div>
    )
}