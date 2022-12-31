import React from 'react';
import "./InputComponent.css"

function InputComponent({inputId,children, inputName, inputType, validationRules,inputPlaceholder, register, errors,  }) {
    return (
        <>
            <label htmlFor={`${inputId}-field`}>
                {children}
                <input
                    type={inputType}
                    id={`${inputId}-field`}
                    name={inputName}
                    placeholder={inputPlaceholder}
                    {...register(inputName, validationRules)}
                />
            </label>
                {errors[inputName] && <p className="errors">{errors[inputName].message}</p>}

        </>
    );
}

export default InputComponent;

// value={email}
// onChange={(e) => setEmail(e.target.value)}