import React, {useContext} from 'react';
// import Logo from "./assets/logo-og.png"
import {NavLink} from "react-router-dom";
import "./Header.css"
import "../../App.css"
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";



function Header() {

    const { isAuth, logout, user} = useContext(AuthContext);
    // const navigate = useNavigate();
    console.log(user)
    return (
       <>

           <header className="outer-content-container">

               <div className="inner-content-containers-header ">
               <ul className="ulh">
                   {isAuth ?
                       <>
                       {/*<span>{user.email}</span>*/}
                       <Button
                           name="button-logout"
                           type="onclick"
                           clickHandler={logout}
                           children="log out"
                           logout
                       />

                       </>
                           :
                       <li><NavLink to="/sign-in">Sign in</NavLink></li>


                   }
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
                   {isAuth ?
                   <li>< NavLink to="/favorite-page">Favorite </NavLink></li>
                       : ""}
               </ul>
           </nav>
           </div>

       </>
    );
}

export default Header;