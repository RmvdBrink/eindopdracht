import React from 'react';
import "./SignUp.css"
import "../../App.css"
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button";
import {Link} from "react-router-dom";
import InputComponent from "../../components/input component/InputComponent";

function SignUp() {

    const { handleSubmit, formState: { errors },register  } = useForm();


    function handleFormSubmit(data) {
        console.log(data)
    }



    return (

    <>

        <div  className="outer-content-container-sign-up">
            <section className="inner-content-container-sign-up">
                <article className="content-container-sign-up">

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="sign-up-form">
                        <h5><strong>Sign Up</strong> </h5>
                        <p>please enter your emailadres, username and password</p>
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
                            inputId="username"
                            children="username:"
                            inputType="text"
                            inputName="username:"
                            inputPlaceholder="FitFoodie"
                            validationRules={{
                                required: {
                                    value: true,
                                    message:"this field is required",
                                },
                                minLength: {
                                    value: 8,
                                    message:"username must be at least 8 characters long",
                                },
                                maxLength: {
                                    value: 35,
                                    message:"username cannot be more than 35 characters long",
                                },
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


                        <p>if you already have an account click on <Link to="/sign-in">sign in</Link> to log in</p>
                        <p>forgot you password</p>
                    </form>
                </article>


            </section>
            </div>
        </>
    );
}

export default SignUp;