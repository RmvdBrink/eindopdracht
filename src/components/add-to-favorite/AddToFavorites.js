import React, {useContext, useState, useEffect, useCallback} from 'react';
import {FavoritesContext} from '../../context/Favorites'
import "./AddToFavorites.css"
import {AuthContext} from "../../context/AuthContext";

// eslint-disable-next-line react-hooks/rules-of-hooks


const AddToFavorites = ({recipe}) => {

    const [addToFavorites, setAddToFavorites] = useState(true);
    console.log(recipe)
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

        favorites.length !== updatedFavoriteRecipes.length ?
            setAddToFavorites(false) :
            setAddToFavorites(true)
    }, [favorites.length, getFavoritesWithoutThisRecipe])

    const addFavorite = () => {
        const updatedFavoriteRecipes = [...favorites, recipe];
        setFavoriteRecipes(updatedFavoriteRecipes)
        setAddToFavorites(false);
    }

    const removeFavorite = () => {
        const updatedFavoriteRecipes = getFavoritesWithoutThisRecipe();
        setFavoriteRecipes(updatedFavoriteRecipes)
        setAddToFavorites(true);
    }

    useEffect(() => {
        checkIfAFavoriteRecipe()
    }, [checkIfAFavoriteRecipe])

    return (
        <>


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
            <p>Please log in to add to favorites</p>
            )}
            </React.Fragment>

        </>
    )
}

export default AddToFavorites;