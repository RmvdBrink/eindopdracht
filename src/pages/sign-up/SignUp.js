import React, {useContext, useState} from 'react';
import "./SignUp.css"
import "../../App.css"
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button";
import {Link, useNavigate} from "react-router-dom";
import InputComponent from "../../components/input component/InputComponent";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Loader from "../../components/loader-compenent/LoaderComponent";

function SignUp() {

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const { handleSubmit, formState: { errors },register  } = useForm();

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();


    async function handleFormSubmit(data, e) {
        e.preventDefault(e);
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`, {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user", "admin"]


            })

            console.log(response)
            // login(response.data.accessToken)
            navigate("/search")

        } catch (e) {
            console.error(e.response)
            toggleError(true);
        }
        toggleLoading(false);
    }


    return (

    <>

        <div  className="outer-content-container-sign-up">
            <section className="inner-content-container-sign-up">
                <article className="content-container-sign-up">
                    {loading && Loader}
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="sign-up-form">
                        <h5><strong>Sign Up</strong> </h5>
                        <p>please enter your emailadres, username and password</p>
                        <InputComponent
                            inputId="email"
                            children="E-mailadres:"
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
                            children="Username:"
                            inputType="text"
                            inputName="username"
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
                            children="Password"
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
                            children="Sign up"
                        />
                        </span>

                        {error && <p className="errors">This account already exists. Try another email address.</p>}
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