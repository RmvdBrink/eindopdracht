import React from 'react';
import RoundCalories from "../../helpers/roundCalories";
import "./RecipeCard.css"


function RecipeCard({title, calories, image, cuisineType, mealType, dishType, ingredients}) {
    return (
        <>
        <div className="recipe-card">
            <h4>{title}</h4>
            <img src={image} alt={title} />
            <p>Calories : {RoundCalories(calories)} Kcal</p>
            <p>Cuisine : {cuisineType}</p>
            <p>Meal type :{mealType}</p>
            <p>DishType :{dishType}</p>
            <div className="recipe-card-li">
            {ingredients.map((ingredient) => {
                return (<li className="li-items" key={ingredient.text
                }>{ingredient.text}</li>
                    )
            })}
            </div>
        </div>
        </>
    );
}

export default RecipeCard;