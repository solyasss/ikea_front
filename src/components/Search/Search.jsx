import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import classes from './Search.module.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!query.trim()) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`https://localhost:7290/api/products/search?name=${encodeURIComponent(query)}`);
                if (!res.ok) throw new Error('Ошибка поиска');
                const data = await res.json();
                setSuggestions(data);
            } catch (err) {
                console.error('Ошибка поиска:', err);
                setSuggestions([]);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (productId) => {
        setQuery('');
        setSuggestions([]);
        setIsActive(false);
        navigate(`/productsDetails/${productId}`);
    };

    const handleOutsideClick = (e) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const showModal = isActive && suggestions.length > 0;

    return (
        <>
            {showModal && <div className={classes.overlay}></div>}

            <div className={showModal ? classes.modalSearchWrapper : classes.inlineWrapper} ref={wrapperRef}>
                <div className={classes.inputGroup}>
                    <FaSearch className={classes.searchIcon} />
                    <input
                        type="text"
                        className={classes.searchInput}
                        placeholder="Поиск"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsActive(true)}
                    />
                </div>
              
                    {showModal && (

                        <ul className={classes.suggestionsList}>
                            {suggestions.map((item) => (
                                <li
                                    key={item.id}
                                    className={classes.suggestionItem}
                                    onMouseDown={() => handleSelect(item.id)}
                                >
                                    <div className={classes.suggestionText}>{item.name}</div>
                                </li>
                            ))}
                        </ul>

                    )}
                </div>
           
        </>
    );
};

export default Search;
