import React from 'react';
import { Link } from 'react-router-dom';
import { SearchResult } from './interfaces';

const SearchResults = (props: {
  searchResults: Array<SearchResult>;
  clearInput: () => void;
}) => {
  return (
    <div>
      {props.searchResults.map((item: SearchResult, index: number) => {
        return (
          <Link
            tabIndex={index + 2}
            className='search-link'
            to={`/surfboard-model/${item.urlString}`}
          >
            <li className='search-item' onClick={props.clearInput}>
              {`${item.shaper} - ${item.title}`}
            </li>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
