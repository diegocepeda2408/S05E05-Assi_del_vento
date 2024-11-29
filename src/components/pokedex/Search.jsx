import { useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";

function Search ({handleSearch}) {
    const inputRef = useRef()

    const onSearch = () => {
        handleSearch(inputRef.current.value)
        inputRef.current.value = ''
    }

    return (
        <div className="search">
            <div className="search__input-container">
                <IoSearchOutline className="search__icon" />
                <input 
                    type="text" 
                    placeholder="Search Pokémon" 
                    ref={inputRef} 
                    className="search__input" 
                />
            </div>
            <button 
                onClick={onSearch} 
                className="search__button"
            >
                SEARCH
            </button>
        </div>
    )
};

export default Search;