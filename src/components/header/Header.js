import React, {useContext} from 'react';
// import Logo from "./assets/logo-og.png"
import {NavLink} from "react-router-dom";
import "./Header.css"
import "../../App.css"
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";


function Header() {

    //context subscription to context to use it throughout the page

    const {isAuth, logout, user} = useContext(AuthContext);

    return (
        <>

            <header className="outer-content-container">

                <div className="inner-content-containers-header ">
                    <ul className="ulh">
                        {/*isAuth checks if use is authorized to see this item conditional rendering */}
                        {isAuth ?
                            <>
                                <div className="logout-box">
                                    <Button
                                        name="button-logout"
                                        type="onclick"
                                        clickHandler={logout}
                                        children="log out"
                                        logout
                                    />
                                    {/*show the credentials at the top of the header*/}
                                    <span>{user.username}</span>
                                    <span>{user.email}</span>
                                </div>
                            </>
                            :
                            <li><NavLink to="/sign-in">Sign in</NavLink></li>

                        }
                    </ul>
                    <h1>Healthy Recipes</h1>
                </div>
            </header>
            <div className="outer-content-container">
                <nav className="inner-content-containers-nav">
                    <ul className="nav-container">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/search">Recipes</NavLink></li>
                        <li><NavLink to="/kcal-calculator">Calculator</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        {/*conditional rendering whether user can see favorites if they are logged in */}
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