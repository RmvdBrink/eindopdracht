import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import floorExpDate from "../helpers/floorExpDate";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {


    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    // console.log(isAuth)
    const navigate = useNavigate();

    useEffect(() => {

        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            const decodedToken = jwtDecode(storedToken)

            if ( Math.floor( Date.now() / 1000 ) < decodedToken.exp )
                console.log( "De gebruiker is NOG STEEDS ingelogd 🔓" )

            void fetchData(storedToken, decodedToken.sub)
            console.log(decodedToken)
        }
        else {
            console.log( "De gebruiker is UITGELOGD 🔒" )
            localStorage.removeItem("token")
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
            })
        }


    }, [])

    function signIn(jwt) {
        toggleIsAuth({isAuth: true});
        localStorage.setItem("token", jwt)
        const deCodeToken = jwtDecode(jwt)
        navigate("/search")
        console.log(deCodeToken)
        console.log(jwt)
        console.log("gebruiker is ingelogd")

        void fetchData(jwt, deCodeToken.sub)
    }
    // ${id}
    async function fetchData(token) {
        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response)

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email ,
                    id: response.data.id,
                    // roles:data.roles[0].name
                },
                status: "done"
            });


        } catch (e) {
            console.error(e)
        }

    }


    function signOut() {
        localStorage.removeItem("token")
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: "done"
        });

        console.log("De gebruiker is uitgelogd")
        navigate("/")
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: signIn,
        logout: signOut,

    }

    return (
        <AuthContext.Provider value={data}>
            {/*{isAuth.status === "done" ? children : <p>Loading...</p> }*/}
            {children}
        </AuthContext.Provider>


    );
}

export default AuthContextProvider;