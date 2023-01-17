import React, {useEffect, useState} from 'react';
import "./SearchCard.css"

import RecipeCard from "../Recipe-card/RecipeCard";

const SearchCard = ({ recipes, title}) => {
    const [recipeIndex, setRecipeIndex] = useState('');
    const [clickedRecipe, setCLickedRecipe] = useState('');
    const [showClickedRecipe, setShowClickedRecipe] = useState(false);
    console.log(clickedRecipe)
    // recipe index is returned form the clicked recipe
    // recipe is fetched from recipes array using returned index
    // recipe opens in full view and the returned recipeIndex resets
    useEffect(() => {
        if (recipeIndex !== '') {
            const recipe = recipes.find((recipe, i) => i === recipeIndex)
            setCLickedRecipe(recipe);
            setShowClickedRecipe(true);
            setRecipeIndex('')
        }
    }, [recipeIndex, recipes]);
    console.log(clickedRecipe)
    return (
        <>
            <div >
            <section className="content-container-search3">
                {
                    recipes.map((recipe, i) => {
                        return(
                            <Recipe
                                key={i}
                                index={i}
                                image={recipe.image}
                                title={recipe.name}
                                setRecipeIndex={setRecipeIndex}
                            />
                        )

                    })

                }

            </section>
            <section className="content-container-search4">
            {
                // renders RecipeFullView when setShowClickedRecipe() is set to True
                showClickedRecipe && <RecipeCard
                    recipe={clickedRecipe}
                    setShowClickedRecipe={setShowClickedRecipe}
                />
            }
            </section>
            </div>

        </>
    )
}

// When a recipe is clicked the index of clicked recipe is passed to the parent element using setRecipeIndex
// then the function inside the useEffect in RecipesList runs when recipe index is updated upon click
const Recipe = ({ title, image, index, setRecipeIndex}) => {
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


export default SearchCard;