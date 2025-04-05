import { FaSearch } from 'react-icons/fa'; 
import classes from './Search.module.css'; 

const Search = () => {
    return (
        <div className={classes.inputGroup}>
            <input
                type="text"
                className={classes.searchInput} 
                placeholder="Поиск"
                aria-label="Search"
                aria-describedby="basic-addon1"
            />
        </div>
    );
}

export default Search; 
