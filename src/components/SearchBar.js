import React from "react";


export default function SearchBar(props) {

  function handleSearch () {
    props.searchAlbum()
  }
  return (
    <div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
