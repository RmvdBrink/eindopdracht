import React, {useEffect, useState} from 'react';
import "./SearchCard.css"
import RecipeCard from "../Recipe-card/RecipeCard";
import IndexCard from "../index-card/IndexCard";
import Recipe from "../index-card/IndexCard";

const SearchCard = ({recipes}) => {
    const [recipeIndex, setRecipeIndex] = useState('');
    const [clickedRecipe, setCLickedRecipe] = useState('');
    const [showClickedRecipe, setShowClickedRecipe] = useState(false);

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

    return (
        <>
            <div>
                {/*    iterate over the data from recipes that comes from the context and display this in image and title*/}
                <section className="content-container-search3">
                    {
                        recipes.map((recipe, i) => {
                            return (
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
                <section className="content-container-search4 ">
                    {
                        // renders RecipeCard when setShowClickedRecipe() is set to True
                        showClickedRecipe && <RecipeCard recipe={clickedRecipe}
                                                         setShowClickedRecipe={setShowClickedRecipe}
                        />
                    }
                </section>
            </div>

        </>
    )
}

<IndexCard/>


export default SearchCard;