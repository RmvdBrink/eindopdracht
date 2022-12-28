import React from 'react';
import "./Button.css"
function Button({type, name, children, clickHandler,  }) {
    return (
        <div>
            <button
                className={name}
                type={type}
                onClick={clickHandler}

            >{children}</button>
        </div>
    );
}

export default Button;