import React from 'react';
import "./SignIn.css"
import "../../App.css"
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button";
import {Link} from "react-router-dom";
import InputComponent from "../../components/input component/InputComponent";


function SignIn() {

    const { handleSubmit, formState: { errors },register  } = useForm();


    function handleFormSubmit(data) {
        console.log(data)
    }



    return (
        <>

            <div  className="outer-content-container-sign-in">
                <div className="inner-content-container-sign-in">
                    <fieldset className="content-container-sign-in">

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="sign-in-form">
                        <h5><strong>Sign In</strong> </h5>
                        <p>please enter your emailadres and password</p>

                        <InputComponent
                            inputId="email"
                            children="e-mailadres:"
                            inputType="text"
                            inputName="email"
                            inputPlaceholder="....@novi-education.nl"
                            validationRules={{
                                required: {
                                    value: true,
                                    message:"this field is required",
                                },
                                minLength: {
                                    value: 8,
                                    message:"Email must be at least 8 characters long",
                                },
                                maxLength: {
                                    value: 35,
                                    message:"Email cannot be more than 35 characters long",
                                },
                                validate: (value) => value.includes("@")
                                    || 'Email must contain a @',
                            }}
                            register={register}
                            errors={errors}
                        />
                        <InputComponent
                            inputId="password"
                            children="password"
                            inputType="password"
                            inputName="password"
                            inputPlaceholder="password"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "this field is required",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Input moet minstens 8 karakters bevatten",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Input moet maximaal 30 karakters bevatten",
                                },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'}

                            }}
                            register={register}
                            errors={errors}
                        />

                        <span className="button-field">
                        <Button
                        type="submit"
                        name="sign-in-button"
                        children="Sign in"
                        />
                        </span>


                        <p>no account yet click on <Link to="/sign-up">sign up</Link> to create a new one</p>
                        <p>forgot you password</p>
                    </form>
                    </fieldset>
                        {/*<p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>*/}


                </div>
            </div>






        </>
    );
}

export default SignIn;