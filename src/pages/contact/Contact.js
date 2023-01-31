import React from 'react';
import Button from "../../components/button/Button";
import {Link} from "react-router-dom";
import "./Contact.css"
import "../../App.css"
import {useForm} from "react-hook-form";
import InputComponent from "../../components/input component/InputComponent";


function Contact() {

    const {handleSubmit, formState: {errors}, register} = useForm();


    function handleFormSubmit(data) {
        console.log(data)
    }

    return (
        <>


            <div className="outer-content-container-contact">
                <section className="inner-content-container-contact">
                    <article className="content-container-contact">

                        <form onSubmit={handleSubmit(handleFormSubmit)} className="contact-form">
                            <h5><strong>Contact us</strong></h5>
                            <p>Welcome to our healthy recipes website! If you have any questions or suggestions, </p>
                            <p> please don't hesitate to reach out to us using the contact form below.</p>
                            <p> We are always looking
                                for ways to improve and bring you the best healthy recipes and tips. Thank you for
                                visiting!</p>


                            <InputComponent
                                inputId="firstname"
                                children="Name:"
                                inputType="text"
                                inputName="name"
                                inputPlaceholder="Enter your name here."
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "this field is required",
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "name must be at least 2 characters long",
                                    },
                                    maxLength: {
                                        value: 35,
                                        message: "username cannot be more than 35 characters long",
                                    },

                                }}
                                register={register}
                                errors={errors}
                            />

                            <InputComponent
                                inputId="last-name"
                                children="Lastname:"
                                inputType="text"
                                inputName="lastname"
                                inputPlaceholder="Enter your last name here."
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "this field is required",
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "lastname must be at least 8 characters long",
                                    },
                                    maxLength: {
                                        value: 35,
                                        message: "lastname cannot be more than 35 characters long",
                                    },

                                }}
                                register={register}
                                errors={errors}
                            />

                            <InputComponent
                                inputId="phone-number"
                                children="Phone number:"
                                inputType="tel"
                                inputName="number"
                                inputPlaceholder="Enter your phone number here."
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "this field is required",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "phone number  must be at least 10 characters long",
                                    },
                                    maxLength: {
                                        value: 18,
                                        message: "phone number cannot be more than 16 characters long",
                                    },

                                }}
                                register={register}
                                errors={errors}
                            />

                            <InputComponent
                                inputId="email"
                                children="E-mailadres:"
                                inputType="text"
                                inputName="email"
                                inputPlaceholder="....@novi-education.nl"
                                validationRules={{
                                    required: {
                                        value: true,
                                        message: "this field is required",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Email must be at least 8 characters long",
                                    },
                                    maxLength: {
                                        value: 35,
                                        message: "Email cannot be more than 35 characters long",
                                    },
                                    validate: (value) => value.includes("@")
                                        || 'Email must contain a @',
                                }}
                                register={register}
                                errors={errors}
                            />

                            <label htmlFor="message-field">
                                Message:
                                <textarea className="message-field"
                                          id="message-field"
                                          name="message_field"
                                          rows="7"
                                          cols="43"
                                          placeholder="Enter your comments here. "
                                          {...register("message", {
                                              required: {
                                                  value: true,
                                                  message: "this field is required",
                                              },
                                              minLength: {
                                                  value: 8,
                                                  message: "Input  must be at least 8 characters long",
                                              },
                                              maxLength: {
                                                  value: 30,
                                                  message: "Input  cannot be more than 550 characters long",
                                              },

                                          })}
                                />
                                {errors.message && <p className="errors">{errors.message.message}</p>}
                            </label>
                            <span className="button-field">
                        <Button
                            type="submit"
                            name="sign-in-button"
                            children="Submit"
                        />
                        </span>


                            <p>finished filling out your contact form click <Link to="/">here</Link> to return to our
                                homepage</p>

                        </form>
                    </article>

                </section>
            </div>
        </>
    );

}

export default Contact;