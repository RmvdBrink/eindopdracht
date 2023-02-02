import React, {useContext, useState} from 'react';
// import Logo from "./assets/logo-og.png"
import {NavLink} from "react-router-dom";
import "./Header.css"
import "../../App.css"
import {AuthContext} from "../../context/AuthContext";
import Button from "../button/Button";


function Header() {

    const [ mobileMenu, toggleMobileMenu ] = useState( true );

    function showMobileMenu() {
        toggleMobileMenu( prev => !prev )
    };

    //context subscription to context to use it throughout the page

    const {isAuth, logout, user} = useContext(AuthContext);

    return (
        <>

            <header className="outer-content-container">

                <div className="inner-content-containers-header ">

                    <button className="toggle-menu" type="button" onClick={ showMobileMenu }>
                        {
                            mobileMenu
                                ? <span className="material-symbols-outlined">menu</span>
                                : <span className="material-symbols-outlined">close</span>
                        }

                    </button>

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
                    <ul className={ mobileMenu ? "menu" : "mobile-menu" }>
                        <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }  to="/">Home</NavLink></li>
                        <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to="/search">Recipes</NavLink></li>
                        <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to="/kcal-calculator">Calculator</NavLink></li>
                        <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to="/contact">Contact</NavLink></li>
                        {/*conditional rendering whether user can see favorites if they are logged in */}
                        {isAuth ?
                            <li>< NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to="/favorite-page">Favorite </NavLink></li>
                            : ""}
                    </ul>
                </nav>
            </div>

        </>
    );
}

export default Header;