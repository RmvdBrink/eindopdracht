import React from 'react';
import "./Button.css"

//component created for general button
function Button({type, name, children, clickHandler,}) {
    return (
        <>
            <button
                className={name}
                type={type}
                onClick={clickHandler}

            >{children}</button>
        </>
    );
}

export default Button;