import React from 'react';
import "./SignIn.css"
import "../../App.css"


function SignIn() {
    return (
        <>

            <div  className="outer-content-container-sign-in">
                <div className="inner-content-container-sign-in">
                    <fieldset className="content-container-sign-in">

                    <form className="sign-in-form">
                        <p><strong>Sign In</strong> </p>
                        <label htmlFor="email-field">
                            Emailadres:
                            <input
                                type="email"
                                id="email-field"
                                name="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                placeholder="rick@novi.nl"
                            />
                        </label>
                        <label htmlFor="password-field">
                            Wachtwoord:
                            <input
                                type="password"
                                id="password-field"
                                name="password_field"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                            />
                        </label>
                        <button
                            className="sign-in-button"
                            type="submit"


                        >Sign in</button>
                        <p>no account yet click on sign up to create a new one</p>
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