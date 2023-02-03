import React from 'react';
import "./WorkTogether.css"
import Scroll from "../../components/scroll/Scroll";
function WorkTogether() {





    return (
        <div>
            <main className="outer-content-container-work">
                <section className="inner-content-container-work">
                    <h1>Work together</h1>
                    {<Scroll/>}
                    <article className="content-container-work1">

                        <p>Welcome to the "Work Together" page of our healthy recipes site! Are you a nutritionist,
                            dietitian, or fitness coach looking to collaborate with us? We believe that a healthy
                            lifestyle is all about balance, and we're always looking for like-minded professionals to
                            join forces with.</p>

                        <p> On this page, you'll find information about how you can work with us to promote healthy
                            eating habits and lifestyles. Whether you're interested in guest blogging, hosting a
                            workshop, or simply sharing your expertise with our audience, we'd love to hear from
                            you.</p>

                        <p> So let's work together to inspire and educate others about the importance of nourishing
                            their bodies with wholesome, nutritious meals. We look forward to the opportunity to
                            collaborate with you and make a positive impact on the health and well-being of our
                            community.</p>
                    </article>
                    <article className="content-container-work2">
                        <p>Do you want to see your product on our site and bring it to the attention of a large
                            audience? We have a large reach and inspire thousands of people every day.</p>
                        <p> There are various possibilities for a collaboration such as a banner or a sponsored article
                            where I get to work with your product. But a post on our social channels such as Facebook
                            and Instagram is also a way to draw the attention of an engaged audience. You can also
                            contact us for other requests such as an event report, the development of recipes or a
                            cooking workshop with your products. </p>
                        <h5>Visitor numbers</h5>
                        <ul>
                            <li> 3,500,000 unique visitors per month</li>

                            <li>20,000,000 page views per month</li>

                            <li>150,000+ NiceRecipes profiles created</li>
                        </ul>
                        <h5>Contact</h5>
                        <p>For the possibilities and rates for advertising,</p> <p> please contact me at rick.van den
                        brink@vovi-education.nl</p>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default WorkTogether;