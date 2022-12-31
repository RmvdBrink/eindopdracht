import React from 'react';
import "./Home.css";
import {Link} from "react-router-dom";
import Poke from "../../assets/poke-bowl.jpg";
import Asperges from "../../assets/gasperges.jpg";
import Frambozen from "../../assets/framboze.jpg"

function Home() {


    return (
        <>
            <main className="outer-content-container-home">
                <section className="inner-content-container-home">
                    <article className="content-container-home1">
                        <div className="text-container-home1">
            <h5>Home from the healthy recipes</h5>
            <p>Welcome to our healthy recipe and search page! Eating healthier doesn't have to be a chore. Here, you'll find a variety of delicious and nourishing recipes that are easy to make and perfect for everyday life. From breakfast to dinner, we have something for every meal of the day. We are your go-to source for delicious and healthy meal ideas. </p>
            <p>Our mission is to help you live a healthier life by providing easy and tasty recipes that are good for your body and your taste buds.
                On our site, you'll find a wide variety of healthy recipes to choose from, including vegetarian, vegan, gluten-free, low-carb, and more. You can also filter the recipes by dietary restrictions or preferences to find something that fits your needs.</p>

                 <p>Whether you're looking to improve your overall health or just want to make some healthier choices, we have the recipes and resources to help you on your journey. So why wait? Start cooking and eating healthier today!
                "Take control of your health with every bite you take."
                Thank you for choosing Healthy Recipes. We hope you enjoy exploring our site and finding new and healthy meal ideas to try. Happy cooking!</p>
                        </div>
                        <span className="img-container-home-1"><img className="img-home-1" src={Poke} alt="poke bowl"/></span>
                    </article>



                    <article className="content-container-home2">
                        <div className="text-container-home2">
                            <h5>Our search function</h5>
                        <p>As a health-conscious individual, you may be constantly on the lookout for new and tasty recipes that fit your dietary needs and preferences. One of the most convenient ways to find these recipes is through the use of search engines like Google.</p>
                        <p>In addition to using keywords and search operators, you can also use the "tools" or "filters" options on the search results page to further refine your results..</p>
                        <p>Overall, search engines are an incredibly useful tool for finding healthy recipes and learning more about healthy eating. Whether you are looking for specific ingredients, dietary restrictions, or simply want to explore new recipe ideas, a search engine can help you find what you need. So the next time you are looking for healthy recipes, give a search engine a try and see what delicious and nutritious options are out there!</p>
                        <p> find your recipes <Link to="/search">here</Link></p>
                        </div>
                        <span className="img-container-home-2"><img  className="img-home-2" src={Asperges} alt="groene asperges"/></span>

                    </article>
                    <article className="content-container-home3">
                        <div className="text-container-home3">
                            <h5>Our kcal calculator function</h5>
                        <p>As part of our commitment to helping you maintain a balanced and nutritious diet, we offer a variety of tools and resources, including a calorie calculator.</p>

                        <p> But what is a calorie calculator and how does it work? Simply put, a calorie calculator is a tool that helps you estimate the number of calories in a given food or recipe. By entering specific information about the ingredients and serving sizes, the calculator can provide you with an approximate calorie count for that particular product.</p>

                        <p>Whether you are looking to lose weight, gain weight, or simply maintain a healthy diet, our calorie calculator can be a valuable tool in helping you achieve your goals. So be sure to check it out and see how it can help you create delicious and nutritious recipes that fit your needs!</p>

                       <p>if you want to use the kcal calculator <Link to="/calculator">here</Link></p>
                        </div>
                        <span className="img-container-home-3"><img className="img-home-3"src={Frambozen} alt="frambozen dessert "/></span>

                    </article>
                    <article className="content-container-home4">
                        <h5>Thank you !</h5>
                        <p>For visiting our healthy recipes homepage! We hope that you have found our site useful and that you have been able to discover some new and tasty recipes to try.</p>
                        <p>We are passionate about helping people lead healthier lives through nourishing, delicious food, and we are glad that we have been able to share that passion with you. Whether you are looking for specific ingredients, dietary restrictions, or simply want to explore new recipe ideas, we hope that our site has been able to provide you with the information and inspiration you need.</p>
                        <p>If you have any feedback or suggestions for how we can improve our site, we would love to hear from you. You can reach us through the contact form on our website or by following us on social media. We look forward to continuing to provide you with the best and most up-to-date healthy recipes and resources.</p>
                        <p>Thank you again for visiting and we hope to see you again soon!</p>

                    </article>
                </section>

        </main>
        </>
    );
}

export default Home;