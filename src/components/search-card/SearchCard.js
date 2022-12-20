import React from 'react';

function SearchCard({title, calories, image}) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{calories}</p>
            <img src={image} alt={title} />
        </div>
    );
}

export default SearchCard;