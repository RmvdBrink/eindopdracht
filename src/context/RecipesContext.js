import { createContext, useState } from 'react';

//function is used to create a context object that can be used to share state between components in a React application.
// By passing in an empty array as the default value, the context is initialized with an empty array.

export const RecipesContext = createContext([]);


//functional component called RecipesProvider that takes in a single prop called children which is the content that the
// component will render.

//setRecipes function to update the data stored in the context. It also allows the children to access the recipes
// state variable and the setRecipes function via context.

export const RecipesProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);

    return (
        <RecipesContext.Provider value={{
            recipes,
            setRecipes,
        }}>
            {children}
        </RecipesContext.Provider>
    );
}