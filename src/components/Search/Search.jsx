import { FaSearch } from 'react-icons/fa';
import classes from './Search.module.css';

const Search = () => {
    return (
        <div className={classes.inputGroup}>
            <FaSearch className={classes.searchIcon} />
            <input
                type="text"
                className={classes.searchInput}
                placeholder="Поиск"
                aria-label="Search"
            />
        </div>
    );
};

export default Search;
