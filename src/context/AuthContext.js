import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const [ isAuth, toggleIsAuth ] = useState( {
        isAuth: false,
        user: null,
        status: 'pending',
    } );
    const navigate = useNavigate();

    // MOUNTING EFFECT
    useEffect( () => {
        // haal de JWT op uit Local Storage
        const token = localStorage.getItem( 'token' );

        // als er WEL een token is, haal dan opnieuw de gebruikersdata op
        if ( token ) {
            void fetchData( token );
        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }, [] );


    function login(jwt) {
        // toggleIsAuth({isAuth: true});
        localStorage.setItem("token", jwt)
        console.log(jwt)
        console.log("gebruiker is ingelogd")
        fetchData(jwt)
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );

        console.log( 'Gebruiker is uitgelogd!' );
        navigate( '/' );
    }

    // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
    async function fetchData(token) {
        try {
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(result.data);

            // zet de gegevens in de state
            toggleIsAuth( {
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            } );

            // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernnaartoe door
            // als we de history.push in de login-functie zouden zetten, linken we al door voor de gebuiker is opgehaald!

        } catch ( e ) {
            console.error( e );
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

// import React, {createContext, useEffect, useState} from 'react';
// import {useNavigate} from "react-router-dom";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
// import floorExpDate from "../helpers/floorExpDate";
//
// export const AuthContext = createContext({});
//
// function AuthContextProvider({children}) {
//
//
//     const [isAuth, toggleIsAuth] = useState({
//         isAuth: false,
//         user: null,
//         status: "pending"
//     });
//
//     // console.log(isAuth)
//     const navigate = useNavigate();
//
//     useEffect(() => {
//
//         const storedToken = localStorage.getItem("token")
//
//         if (storedToken) {
//             const decodedToken = jwtDecode(storedToken)
//
//             if ( Math.floor( Date.now() / 1000 ) < decodedToken.exp )
//                 console.log( "De gebruiker is NOG STEEDS ingelogd 🔓" )
//
//             void fetchData(storedToken, decodedToken.sub)
//             console.log(decodedToken)
//         }
//         else {
//             console.log( "De gebruiker is UITGELOGD 🔒" )
//             localStorage.removeItem("token")
//             toggleIsAuth({
//                 isAuth: false,
//                 user: null,
//                 status: "done",
//             })
//         }
//
//
//     }, [])
//
//     function signIn(jwt) {
//         toggleIsAuth({isAuth: true});
//         localStorage.setItem("token", jwt)
//         const deCodeToken = jwtDecode(jwt)
//         // navigate("/search")
//         console.log(deCodeToken)
//         console.log(jwt)
//         console.log("gebruiker is ingelogd")
//
//         void fetchData(jwt, deCodeToken.sub)
//     }
//     // ${id}
//     async function fetchData(token) {
//         try {
//             const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 }
//             })
//             console.log(response)
//
//             toggleIsAuth({
//                 ...isAuth,
//                 isAuth: true,
//                 user: {
//                     username: response.data.username,
//                     email: response.data.email ,
//                     id: response.data.id,
//                     // roles:data.roles[0].name
//                 },
//                 status: "done"
//             });
//
//
//         } catch (e) {
//             console.error(e)
//         }
//
//     }
//
//
//     function signOut() {
//         localStorage.removeItem("token")
//         toggleIsAuth({
//             isAuth: false,
//             user: null,
//             status: "done"
//         });
//
//         console.log("De gebruiker is uitgelogd")
//         navigate("/")
//     }
//
//     const data = {
//         isAuth: isAuth.isAuth,
//         user: isAuth.user,
//         login: signIn,
//         logout: signOut,
//
//     }
//
//     return (
//         <AuthContext.Provider value={data}>
//             {/*{isAuth.status === "done" ? children : <p>Loading...</p> }*/}
//             {children}
//         </AuthContext.Provider>
//
//
//     );
// }
//
// export default AuthContextProvider;