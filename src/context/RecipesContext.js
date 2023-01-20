import { createContext, useState } from 'react';

export const RecipesContext = createContext([]);

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    console.log(recipes)
    return (
        <RecipesContext.Provider value={{
            recipes,
            setRecipes,
        }}>
            {children}
        </RecipesContext.Provider>
    );
}