import React from 'react';
import "./SearchCard.css"
// import RoundCalories from "../../helpers/roundCalories";
import {Link} from "react-router-dom";

function SearchCard({title, image, id}) {
    return (
        <div className= "container-search-card">
            <h6><Link to= {`/recipes-page/${id}`}>{title}</Link></h6>
            {/*<p>{RoundCalories(calories)} Kcal</p>*/}
            <img src={image} alt={title} />
        </div>
    );
}

export default SearchCard;