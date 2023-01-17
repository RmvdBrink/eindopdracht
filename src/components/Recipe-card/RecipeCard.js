import React from 'react';
import RoundCalories from "../../helpers/roundCalories";
import "./RecipeCard.css"
import AddToFavorites from './AddToFavorites';

const CLASS_NAME = "full-view-recipe";

const RecipeCard = ({ recipe, setShowClickedRecipe }) => {

    // Closes recipe full view when user click anywhere except the recipe container
    const handleClick = (e) => {
        if (CLASS_NAME === e.target.classList[0]){
            setShowClickedRecipe(false);
        }
    }

    return (
        <div className={CLASS_NAME} onClick={handleClick}>
            <div className="close-button" onClick={() => setShowClickedRecipe(false)}>

            </div>

            <div className="recipe-container">
                <div className="image" ></div>
                <img src={recipe.image} alt={recipe.name}/>
                <div className="info">
                    <h3 className="title">{recipe.name}</h3>
                    <p className="name">Preparation time</p>

                    {/* show prep time if more than 0 */}
                    <p className="description">{recipe.prepTime > 0 ? `${recipe.prepTime} minute(s)` : '-'}</p>

                    <p className="name">Ingredients</p>
                    {
                        recipe.ingredients.map((ingredient, i) => {
                            return <p key={i} className="description">~ {ingredient}</p>
                        })
                    }
                    <p className="name">Calories</p>
                    <p className="description">{recipe.calories}</p>

                    <AddToFavorites recipe={recipe} />
                </div>
            </div>
        </div>
    )
}

export default RecipeCard

//
// function RecipeCard({title, calories, image, cuisineType, mealType, dishType, ingredients}) {
//     return (
//         <>
//         <div className="recipe-card">
//             <h4>{title}</h4>
//             <img src={image} alt={title} />
//             <p>Calories : {RoundCalories(calories)} Kcal</p>
//             <p>Cuisine : {cuisineType}</p>
//             <p>Meal type :{mealType}</p>
//             <p>DishType :{dishType}</p>
//             <div className="recipe-card-li">
//             {ingredients.map((ingredient) => {
//                 return (<li className="li-items" key={ingredient.text
//                 }>{ingredient.text}</li>
//                     )
//             })}
//             </div>
//         </div>
//         </>
//     );
// }
//
// export default RecipeCard;