import React from 'react';
import SearchCardCss from "./SearchCard.css"
import RoundCalories from "../../helpers/roundCalories";

function SearchCard({title, calories, image}) {
    return (
        <div className= "container-search-card">
            <p>{title}</p>
            <p>{RoundCalories(calories)} Kcal</p>
            <img src={image} alt={title} />
        </div>
    );
}

export default SearchCard;