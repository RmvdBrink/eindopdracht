import { createContext, useState } from 'react';

const getStoredFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : []
}

const initialState = getStoredFavorites();
const FAVORITES = "favorites";

export const FavoritesContext = createContext(initialState);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(initialState);

    const setFavoriteRecipes = (newFavorites) => {
        localStorage.setItem(FAVORITES, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    }

    return (
        <FavoritesContext.Provider value={{
            favorites,
            setFavoriteRecipes
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}