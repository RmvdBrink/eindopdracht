import React, { useContext, useState, useEffect } from 'react';
import "./FavoritePage.css"
import { FavoritesContext } from '../../context/Favorites'
import RecipeCard from '../../components/Recipe-card/RecipeCard';
import { Link } from 'react-router-dom';
import NoFavoritesFound from "../../components/no-favorite-found/NoFavoriteFound";
import SearchCard from "../../components/search-card/SearchCard";


const FavoritePage= () => {

    const [favoritesFound, setFavoritesFound] = useState(null);
    const { favorites } = useContext(FavoritesContext);

    useEffect(() => {
        favorites.length > 0 ? setFavoritesFound(true) : setFavoritesFound(false);
    }, [favorites.length])

    return (
        <div className="background-container">

            <div className="outer-content-container-favorite">
                <div className="content-container-search2">
                    <h2>My favorite recipes</h2>
                    <p>Welcome to our favorite recipes page! Here, you'll find a collection of dishes that we have tried and loved. From hearty main courses to delicious desserts, we have something for every occasion. Whether you're a seasoned home cook or just starting out, we hope you'll find inspiration in these recipes.</p>
                </div>

                <section className="inner-content-container-favorite4">
                    <NoFavoritesFound favoritesFound={favoritesFound} />
                    <SearchCard recipes={favorites}/>

                </section>

            </div>
        </div>
    );
}

export default FavoritePage;