import React from "react";

export default function SearchResult({ images, name, release_date }) {
  return (
    <div>
      <img src={images[0].url} alt={name} />
      <div>
        <h1>{name}</h1>
        <p>Release date: {release_date}</p>
      </div>
    </div>
  );
}
