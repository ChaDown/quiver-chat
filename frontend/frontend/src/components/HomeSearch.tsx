import React, { useEffect, useState } from 'react';
import SearchResults from './SearchResults';

const HomeSearch = () => {
  const [queryText, setQueryText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQueryText(e.target.value);

  useEffect(() => {
    if (!queryText) {
      setSearchResults([]);
      return;
    }
    fetch(`http://localhost:3000/api/search?term=${queryText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      });
  }, [queryText]);

  return (
    <div className='searchContainer'>
      <h1>Quiver Chat</h1>
      <h2>Let's Talk Surfboards</h2>
      <div className='searchInfo'>
        <input
          className='searchInput'
          type='text'
          placeholder='Search Models'
          value={queryText}
          onChange={handleChange}
          tabIndex={1}
        />
        <SearchResults searchResults={searchResults} />
      </div>
    </div>
  );
};

export default HomeSearch;
