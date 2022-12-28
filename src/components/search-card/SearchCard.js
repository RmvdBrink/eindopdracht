import React from 'react';
import SearchCardCss from "./SearchCard.css"
import RoundCalories from "../../helpers/roundCalories";

function SearchCard({title, calories, image}) {
    return (
        <div className= "container-search-card">
            <h6>{title}</h6>
            <p>{RoundCalories(calories)} Kcal</p>
            <img src={image} alt={title} />
        </div>
    );
}

export default SearchCard;