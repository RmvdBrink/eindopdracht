import React from 'react';
import Button from "../../components/button/Button";
import {Link} from "react-router-dom";
import "./Contact.css"
import "../../App.css"
import {useForm} from "react-hook-form";


function Contact() {

    const { handleSubmit, formState: { errors },register  } = useForm();


    function handleFormSubmit(data) {
        console.log(data)
    }
    return (
        <>
        {/*<div>*/}
        {/*    <h1>Contact</h1>*/}
        {/*</div>*/}

            <div  className="outer-content-container-contact">
                <section className="inner-content-container-contact">
                    <article className="content-container-contact">

                        <form onSubmit={handleSubmit(handleFormSubmit)} className="contact-form">
                            <h5><strong>Contact us</strong> </h5>
                            <p>Welcome to our healthy recipes website! If you have any questions or suggestions, please don't hesitate to reach out to us using the contact form below. We are always looking for ways to improve and bring you the best healthy recipes and tips. Thank you for visiting!</p>

                            <label htmlFor="firstname-field">
                                Name:
                                <input
                                    type="text"
                                    id="firstname-field"
                                    name="name"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your first name here."
                                    {...register("name",{
                                        required: {
                                            value: true,
                                            message:"this field is required",
                                        },
                                        minLength: {
                                            value: 2,
                                            message:"name must be at least 2 characters long",
                                        },
                                        maxLength: {
                                            value: 35,
                                            message:"username cannot be more than 35 characters long",
                                        },

                                    })}
                                />
                                {errors.name && <p>{errors.name.message}</p> }
                            </label>
                            <label htmlFor="last-name-field">
                                Username:
                                <input
                                    type="text"
                                    id="last-name-field"
                                    name="lastname"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your last name here."
                                    {...register("last-name",{
                                        required: {
                                            value: true,
                                            message:"this field is required",
                                        },
                                        minLength: {
                                            value: 4,
                                            message:"username must be at least 8 characters long",
                                        },
                                        maxLength: {
                                            value: 35,
                                            message:"username cannot be more than 35 characters long",
                                        },

                                    })}
                                />
                                {errors.lastname && <p>{errors.lastname.message}</p> }
                            </label>
                            <label htmlFor="phone-number-field">
                                Phone number:
                                <input
                                    type="text"
                                    id="phone-number-field"
                                    name="number"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your phone number here."
                                    {...register("number",{
                                        required: {
                                            value: true,
                                            message:"this field is required",
                                        },
                                        minLength: {
                                            value: 10,
                                            message:"phone number  must be at least 10 characters long",
                                        },
                                        maxLength: {
                                            value: 18,
                                            message:"phone number cannot be more than 16 characters long",
                                        },

                                    })}
                                />
                                {errors.number && <p>{errors.number.message}</p> }
                            </label>
                            <label htmlFor="email-field">
                                Emailadres:
                                <input
                                    type="text"
                                    id="email-field"
                                    name="email"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    placeholder="....@novi-education.nl"
                                    {...register("email",{
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
                                            || 'Email must contain an @',
                                    })}
                                />
                                {errors.email && <p>{errors.email.message}</p> }
                            </label>

                            <label htmlFor="message-field">
                                Message :
                                <textarea  className="message-field"
                                    id="message-field"
                                    name="message_field"
                                    rows="5"
                                    cols="43"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your comments her. "
                                    {...register("message",{
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
                                {errors.message && <p>{errors.message.message}</p> }
                            </label>
                            <span className="button-field">
                        <Button
                            type="submit"
                            name="sign-in-button"
                            children="Sign in"
                        />
                        </span>
                            {/*<button*/}
                            {/*    className="sign-in-button"*/}
                            {/*    type="submit"*/}
                            {/*>Sign in</button>*/}

                            <p>finished filling out your contact form click   <Link to="/">here</Link> to return to our homepage</p>
                            <p>forgot you password</p>
                        </form>
                    </article>

                </section>
            </div>
        </>
    );

}

export default Contact;