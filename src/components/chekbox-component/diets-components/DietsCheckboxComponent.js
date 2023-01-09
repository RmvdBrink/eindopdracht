import React from 'react';
import "../CheckboxComponent.css"

function DietsCheckboxComponent({type, checkBoxId, name, value, changeHandler, children, label }) {
    return (
        <div className="checkbox-search2-box">
            <input type={type} id={checkBoxId}
                   name={name} value={value}
                   onChange={changeHandler} />
            <label htmlFor={label}>{children}</label>

        </div>
    );
}

export default DietsCheckboxComponent;
