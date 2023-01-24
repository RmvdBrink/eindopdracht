import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./NotFound.css"

function NotFound() {



        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => {
                navigate('/');
            }, 4000);
        }, []);

        return (
            <main className="outer-content-container-not-found">
        <div className="inner-content-container-not-found ">
            <p className="redirect">This page will be displayed for 4 seconds before redirecting to the homepage.</p>
            <h1 className="errors">Page not found</h1>
            <p className="not-found-p">
                "Oops! It looks like the page you were trying to access doesn't exist or has been moved. We're sorry for the inconvenience.
                But don't worry, you're not lost. Just follow the breadcrumbs back to our homepage or try searching for what you're looking for.
                And remember, if at first you don't succeed, redefine success."</p>


        </div>
            </main>
    );
}

export default NotFound;