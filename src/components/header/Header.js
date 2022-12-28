import React from 'react';
// import Logo from "./assets/logo-og.png"
import {NavLink} from "react-router-dom";
import "./Header.css"
import "../../App.css"


function Header() {
    return (
       <>

           <header className="outer-content-container">

               <div className="inner-content-containers-header ">
               <ul className="ulh">
                   <li><NavLink to="/sign-in">Sign in</NavLink></li>

               </ul>
                        <h1>Healthy Recepis</h1>
           </div>
           </header>
               <div className="outer-content-container">
           <nav className="inner-content-containers-nav">
               <ul className="nav-container">
                   <li><NavLink to="/">Home</NavLink></li>
                   <li><NavLink to="/search">Recipes</NavLink></li>
                   <li><NavLink to="/kcal-calculator">Calculator</NavLink></li>
                   <li><NavLink to="/contact">Contact</NavLink></li>
                   <li><NavLink to="/favourite">Favourite</NavLink></li>
               </ul>
           </nav>
           </div>

       </>
    );
}

export default Header;