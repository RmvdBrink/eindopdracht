import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import {RecipesProvider} from "./context/RecipesContext";
import {FavoritesProvider} from "./context/Favorites";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <AuthContextProvider>
              <RecipesProvider>
                  <FavoritesProvider>
              <App/>
              </FavoritesProvider>
              </RecipesProvider>
          </AuthContextProvider>
      </Router>
  </React.StrictMode>
);


