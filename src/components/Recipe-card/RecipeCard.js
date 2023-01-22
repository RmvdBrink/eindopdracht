import React from 'react';
import "./RecipeCard.css"
import AddToFavorites from '../add-to-favorite/AddToFavorites';
import roundCalories from "../../helpers/roundCalories";



const RecipeCard = ({ recipe }) => {

    return (
        <div >
            <div className="recipe-card">

                <img src={recipe.image} alt={recipe.name}/>
                <div className="info">
                    <h6 className="title">{recipe.name}</h6>
                    <p className="name">Preparation time :</p>

                    {/* show prep time if more than 0 */}
                    <p className="description">{recipe.prepTime > 0 ? `${recipe.prepTime} minute(s)` : '-'}</p>

                    <p className="name">Cuisine :</p>
                    <p className="description">{recipe.cuisineType}</p>


                    <p className="name">Meal Type :</p>
                    <p className="description">{recipe.mealType}</p>


                    <p className="name">Dish Type :</p>
                    <p className="description">{recipe.dishType}</p>


                    {
                        recipe.ingredients.map((ingredient, i) => {
                            return <p key={i} className="li-items"> {ingredient}</p>
                        })
                    }
                    {/*<p className="name">Calories</p>*/}
                    {/*<p className="description">{roundCalories(recipe.calories)}</p>*/}
                    <div className="add-to-favorite-container">
                    <AddToFavorites recipe={recipe} />
                    </div>
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