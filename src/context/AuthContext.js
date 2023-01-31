import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // retrieve the JWT from Local Storage
        const token = localStorage.getItem( 'token' );

        // if there IS a token, get the user data again
        if ( token ) {
            void fetchData( token );
        } else {
            // if there is NO token we do nothing, and set the status to 'done'
            toggleIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }, [] );

    //function called login that takes in one argument, jwt. The function uses the localStorage.setItem() method
    // to store the jwt token in the browser's local storage. This allows the user to remain logged in even after the
    // browser is closed or the page is refreshed.
    function login(jwt) {
        localStorage.setItem("token", jwt)
        // console.log(jwt)
        console.log("gebruiker is ingelogd")
        void fetchData(jwt)
        // navigate("/search")
    }
    // used to log a user out of the application. The function first uses the removeItem to remove te token.
    function logout() {
        localStorage.removeItem("token");
        toggleIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );

        console.log( 'Gebruiker is uitgelogd!' );
        navigate( '/' );
    }


    //function calls toggleIsAuth and passed an object with isAuth:false, user:null and status:'done'
    //navigate function to navigate to the root route '/'homepage
    async function fetchData(token) {
        try {
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(result.data);

            // put the data in the state
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


        } catch ( e ) {
            console.error( e );
            // did something go wrong? We do not place any data in the state
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

