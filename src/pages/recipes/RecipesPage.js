import React,  { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from "../../components/Recipe-card/RecipeCard";
import   { Link, useParams } from 'react-router-dom';
import "./RecipesPage.css"


const APP_ID = "08659f69"
const APP_KEY = "13cd3b413ae7c5546cc09ef8a8590c71"
//load dynamic recipes on to the recipes page


function RecipesPage() {
    const [recipe, setRecipe] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const { id } = useParams();

    console.log(id)

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);

            try {
                toggleError(false);
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2/edamam.owl%23recipe_${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`,{signal: controller.signal})
                console.log(response.data)
                setRecipe(response.data)

            } catch (e) {

                if (axios.isCancel(e)) {
                    console.log("The axios request was cancelled")
                }  else {
                    console.error(e)
                    toggleError(true)
                }
            }
            toggleLoading(false)
        }
        fetchData()

        return function cleanup() {
            controller.abort();
        }
    }, [id]);

    return (
        <>

            <main className="outer-content-container-recipe">
            <section className="inner-content-container-recipe">
                <article className="content-container-recipe1">
                    <h1>Hier moeten de recepten worden in geladen </h1>
                </article>
                {error && <p>Something went wrong while retrieving the data</p>}
                {loading && <p>we are loading the data for you</p>}
                <article className="content-container-recipe2">
                    <div className="inner-content-container-recipe2">
                    {Object.keys(recipe).length > 0 &&
                        <>

                            <RecipeCard
                            title={recipe.recipe.label}
                            image={recipe.recipe.image}
                            calories={recipe.recipe.calories}
                            cuisineType={recipe.recipe.cuisineType}
                            mealType={recipe.recipe.mealType}
                            dishType={recipe.recipe.dishType}
                            ingredients={recipe.recipe.ingredients}
                            />


                        </>
                    }

                    </div>
                </article>

                <article className="content-container-recipe3"></article>
            </section>
            </main>

        </>
    );
}

export default RecipesPage;
// <h5>{recipe.recipe.label}</h5>
// <img src={recipe.recipe.image} alt={recipe.recipe.label}/>
// <p>{recipe.recipe.calories}</p>
// <p>{recipe.recipe.cuisineType}</p>
// <p>{recipe.recipe.mealType}</p>
// <p>{recipe.recipe.dishType}</p>
//
// {recipe.recipe.ingredients.map((recipe) => {
//     return (<li key={recipe.text
//         }>{recipe.text}</li>
//     )
// })}
