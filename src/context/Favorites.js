import { createContext, useState } from 'react';


//defines a function called getStoredFavorites that retrieves the data from local storage stored under the key 'favorites'.
//uses the localStorage.getItem() method to get the data stored under the key "favorites".
//The function checks if the favorites variable is truthy, if it is the function parse the string from
// localstorage to a JSON object, and returns it. If the favorites variable is not truthy, the function returns an
// empty array. This allows to retrieve the stored data as an array.

const getStoredFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : []
}
//initialState which is set to the return value of the getStoredFavorites
const initialState = getStoredFavorites();
// function. It retrieves the data stored in the local storage under the key 'favorites'. It then defines
// a constant called FAVORITES which is set to the string "favorites".
const FAVORITES = "favorites";
//FavoritesContext which is created by invoking the createContext
//y passing in the initialState as the default value, the context is initialized with the data stored in the local storage
export const FavoritesContext = createContext(initialState);

//functional component called FavoritesProvider that takes in a single prop called children which is the content that the component will render.
//create a state variable called favorites and a function called setFavorites that updates the value of the state

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