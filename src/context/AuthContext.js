import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });

    // console.log(isAuth)
    const navigate = useNavigate();

    // const email = {data: {email}}

    function signIn(jwt, email) {
        toggleIsAuth({isAuth: true, user: email});
        localStorage.setItem("token", jwt)
        const deCodeToken = jwtDecode(jwt)
        navigate("/search")
        console.log(deCodeToken)
        console.log(jwt)
        console.log("gebruiker is ingelogd")

        fetchData(jwt, deCodeToken.sub)
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
            });


        } catch (e) {
            console.error(e)
        }

    }


    function signOut() {
        localStorage.clear()
        toggleIsAuth({isAuth: false, user: null});
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
            {children}
        </AuthContext.Provider>


    );
}

export default AuthContextProvider;