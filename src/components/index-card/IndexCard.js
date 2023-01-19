import "./IndexCard.css"
import React from "react";


// When a recipe is clicked the index of clicked recipe is passed to the parent element using setRecipeIndex
// then the function inside the useEffect in RecipesList runs when recipe index is updated upon click
const IndexCard = ({ title, image, index, setRecipeIndex}) => {
    return(
        <div className="container-search-card" onClick={() => setRecipeIndex(index)}>
            <div className="recipe-image" >
                <img src={image} alt={title}/>
                <div className="overlay"></div>
            </div>

            <div className="recipe-title">
                <p>{formatRecipeTitle(title)}</p>
            </div>
        </div>
    )
}

// Formatting recipe title if title length is more than 18 (11 in mobile screen) characters replace additional characters with ".."
// to avoid messing up the recipe container design
const formatRecipeTitle = (title) => {
    const screenWidth = document.body.offsetWidth;
    const titleLength = title.length;

    if ((screenWidth > 1024 && titleLength <= 18) ||
        (screenWidth <= 769 && titleLength <= 11))
    {
        return title;
    }

    return screenWidth > 769 ?
        title.substring(0, 17) + ".." :
        title.substring(0, 10) + "..";
}

export default IndexCard;