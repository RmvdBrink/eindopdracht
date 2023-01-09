import React from 'react';
import "./CheckboxComponent.css"

function CheckboxComponent({type, checkBoxId, name, value, changeHandler, children, label }) {
    return (
        <div className="checkbox-search2-box">
            <input type={type} id={`${checkBoxId}-free`} name={name} value={`health=${value}-free`} onChange={changeHandler} />
            <label htmlFor={`${label}-free`}>{children}</label>

        </div>
    );
}

export default CheckboxComponent;



// {`checkbox-search2-box${classBox}`}