import React from 'react';
import "./InputComponent.css"

function InputComponent({inputId,children, inputName, value, changeHandler, inputType, validationRules,inputPlaceholder, register, errors,  }) {
    return (
        <>
            <label htmlFor={`${inputId}-field`}>
                {children}
                <input
                    type={inputType}
                    id={`${inputId}-field`}
                    name={inputName}
                    placeholder={inputPlaceholder}
                    value={value}
                    onChange={changeHandler}
                    {...register(inputName, validationRules)}
                />
            </label>
                {errors[inputName] && <p className="errors">{errors[inputName].message}</p>}

        </>
    );
}

export default InputComponent;

