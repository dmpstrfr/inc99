import React from 'react';

const SearchInput = ({ placeholder, searchValue, setSearchValue }) => {
  return (
    <div class='form-group has-search'>
      <span class='fa fa-search form-control-feedback'></span>
      <input
        type='text'
        class='form-control'
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
