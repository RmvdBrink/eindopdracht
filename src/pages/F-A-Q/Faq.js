import React from 'react';
import {Link} from "react-router-dom";
import "./Faq.css"

function Faq() {
    return (
        <div>
            <main className="outer-content-container-faq">
            <div className="inner-content-container-title-faq">

            </div>
            <section className="inner-content-container-faq">
                <article className="content-container-faq1">
                    <h3>Frequently Asked Questions</h3>


                   <h4>1. General</h4>
                    <p> Is your question not listed? Please contact us via the contact page and we will try to answer your question as soon as possible.</p>

                   <h5> Can I copy recipes?</h5>
                    <p> No, you may not copy and use texts and/or photos without my permission. Contact us at info@HealthyRecepis.com or look here for the extensive <Link to="/disclaimer">disclaimer</Link>.</p>
                    </article>

                    <article className="content-container-faq2">
                  <h4>2. Preparing recipes</h4>

                    <h5>Is the oven temperature in the recipes for electric, gas or convection?</h5>

                    <p>  I have an electric oven where I almost always use the top and bottom heat function (conventional). The temperatures in my recipes are therefore adjusted to this. I use this for casseroles, cakes, pizzas, etc. If you have a gas oven or if you use the convection function, reduce the temperature in the recipes by about 10%. Click here for a handy table. If you want to heat several layers/dishes in the oven, it is best to use the convection setting. This distributes the hot air evenly throughout the oven. I also have a grill in the oven that I sometimes turn on for the last few minutes with, for example, a gratin for an extra crispy crust.</p>

                    <h5>Do you also have recipes for special diets such as gluten-free, lactose-free, low-carb or sugar-free?</h5>

                    <p> I have a category on my site for gluten free recipes, low carb recipes and vegan recipes. Perhaps in the future there will be even more categories for dishes on a diet or eating method.</p>

                   <p> There are often alternatives available for recipes containing lactose. For example, you can replace milk with lactose-free milk such as soy milk, almond milk or rice milk and cooking cream with soy cream. I use regular refined sugar in almost all of my baking recipes. This can be replaced by, for example, palm sugar, agave syrup, coconut flower sugar, etc. Look here for the quantities.</p>

                    <h5>Are your recipes healthy?</h5>

                       <p>they are not all. But I do try to keep a good balance in mind. For example, I try to include enough vegetables in dishes and I use many fresh ingredients and I make many things myself. I have bundled recipes that contain many nutrients and are responsible in a Healthy recipes category. Please note, this does not mean that these recipes are always low in calories.</p>
                        </article>

                        <article className="content-container-faq2">
                    <h4>3. My healthy recipes account</h4>
                    <h5>What can you do with a account?</h5>
                    <p>If you have created your own profile page you can save your favorite recipes. This means you always have your saved recipes at hand </p>

                    <h5>How do I change my password?</h5>

                    <p>After logging in you can change your password under 'my profile'. After you have changed the new password, you can log in with it from now on. If you have forgotten your password, you can request it via 'forgot password' on the <Link to="/sign-in">login page</Link> </p>

                    <h5>How do I save my favorite recipes?</h5>

                    <p>To save your favorite recipes and, you need to create a profile. Click on <Link to="/sign-up">sign up</Link> and sign in:</p>

                        <p>– with a username and password. Enter your E-mail address and a password. Also check your welcome email (possibly in your spam box). After logging in, you can supplement your profile with additional information such as your name, photo and preferences.</p>

                        <p>Then simply click on the heart next to a recipe or blog to add your favorite articles to your list. You can see this under the 'favorites' button in your account. You can also share these recipes in collections. Removal is easy by clicking on the cross.</p>

                    <h5>I forgot my password, what now?</h5>
                    <p>Go to <Link to="/sign-in">'sign in'</Link>  and then click on 'forgot password'. Enter your E-mail address and then check your e-mail (note, it may also have ended up in your spam). Click on the link in your email and enter a new password. Then log in again with your new details.</p>

                    {/*<h5></h5>*/}
                    {/*<p></p>*/}
                </article>
            </section>
            </main>
        </div>
    );
}

export default Faq;