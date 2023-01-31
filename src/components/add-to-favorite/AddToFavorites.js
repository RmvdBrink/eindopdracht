import React, {useContext, useState, useEffect, useCallback} from 'react';
import {FavoritesContext} from '../../context/Favorites'
import "./AddToFavorites.css"
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";


// function that allows to save recipes using context

const AddToFavorites = ({recipe}) => {
    //state
    const [addToFavorites, setAddToFavorites] = useState(true);
    const {favorites, setFavoriteRecipes} = useContext(FavoritesContext);

    const {isAuth} = useContext(AuthContext);

    // Returns favorite recipes excluding current recipe
    const getFavoritesWithoutThisRecipe = useCallback(() => {
        return favorites.filter(favoriteRecipe => {
            return favoriteRecipe.ingredients.toString() !== recipe.ingredients.toString()
        })
    }, [favorites, recipe.ingredients])

    // checks if current recipe is a favorite
    const checkIfAFavoriteRecipe = useCallback(() => {
        let updatedFavoriteRecipes = getFavoritesWithoutThisRecipe();
        //using a ternary operator to check if the length of the "favorites" array is not equal to the length of "updatedFavoriteRecipes" array
        favorites.length !== updatedFavoriteRecipes.length ?
            setAddToFavorites(false) :
            setAddToFavorites(true)
    }, [favorites.length, getFavoritesWithoutThisRecipe])
    // is used to add a recipe to the list of favorite recipes. It first creates a new array.
    //Then it calls the "setFavoriteRecipes" function from the "FavoritesContext" and passes in the "updatedFavoriteRecipes
    //setAddToFavorites" function with the value "false" to update the state of the "addToFavorites.
    //to indicate that the recipe has been added to the favorites list.
    const addFavorite = () => {
        const updatedFavoriteRecipes = [...favorites, recipe];
        setFavoriteRecipes(updatedFavoriteRecipes)
        setAddToFavorites(false);
    }
    //removes recipes from the favorite list and resets addToFavorits to true
    const removeFavorite = () => {
        const updatedFavoriteRecipes = getFavoritesWithoutThisRecipe();
        setFavoriteRecipes(updatedFavoriteRecipes)
        setAddToFavorites(true);
    }
    //"checkIfAFavoritesRecipe" function. So every time the component re-renders and the "checkIfAFavoritesRecipe"
    // function updates, this effect will run.
    useEffect(() => {
        checkIfAFavoriteRecipe()
    }, [checkIfAFavoriteRecipe])

    return (
        <>
            {/*This code is using JSX to render some content conditionally, based on the value of the "isAuth"
            "addToFavorites", if it's true it will show "Add to favorites" otherwise it will show "Remove from favorites"
            is only possible to use if someone is logged in*/}

            <React.Fragment>
                {isAuth ? (
                    <React.Fragment>
                        <i className="material-icons">favorite</i>
                        <p className="add-favorite" onClick={addToFavorites ? addFavorite : removeFavorite}>
                            {
                                addToFavorites ?
                                    <span>Add to favorites</span> :
                                    <span>Remove from favorites</span>
                            }
                        </p>
                    </React.Fragment>
                ) : (
                    <Link to="/sign-in"><p>Please log in to add to favorites</p></Link>
                )}
            </React.Fragment>

        </>
    )
}

export default AddToFavorites;