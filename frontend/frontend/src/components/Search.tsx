import React, { useEffect, useState } from 'react';
import SearchResults from './SearchResults';

const Search = (props: { isHomePage: boolean }) => {
  const [queryText, setQueryText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQueryText(e.target.value);

  const clearInput = () => {
    setQueryText('');
  };

  useEffect(() => {
    if (!queryText) {
      setSearchResults([]);
      return;
    }
    fetch(`https://quiver-chat-api.onrender.com/api/search?term=${queryText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, [queryText]);

  return (
    <div
      className={props.isHomePage ? 'search-info-home' : 'search-info-navbar'}
    >
      <input
        className={props.isHomePage ? 'search-input-home' : 'search-input-nav'}
        type='text'
        placeholder='Search Models'
        value={queryText}
        onChange={handleChange}
        tabIndex={1}
      />
      <SearchResults searchResults={searchResults} clearInput={clearInput} />
    </div>
  );
};

export default Search;
