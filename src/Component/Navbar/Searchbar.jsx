import React, { useState } from 'react';
import './Searchbar.css';

const SearchBar = () => {

    const [query, setQuery] = useState("")

    function search(e){
        e.preventDefault()
        setQuery(e.target.value)
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search"
                onChange={search}
                value={query}
            />
        </div>
    );
};

export default SearchBar;