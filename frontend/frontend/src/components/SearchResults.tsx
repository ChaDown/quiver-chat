import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = (props: {
  searchResults: Array<{ shaper: String; title: String; _id: String }>;
}) => {
  console.log(props);
  return (
    <div>
      {props.searchResults.map(
        (
          item: { shaper: String; title: String; _id: String },
          index: number
        ) => {
          return (
            <Link
              tabIndex={index + 2}
              className='search-link'
              to={`/surfboard-model:${item._id}`}
            >
              <li className='search-item'>{`${item.shaper} - ${item.title}`}</li>
            </Link>
          );
        }
      )}
    </div>
  );
};

export default SearchResults;
