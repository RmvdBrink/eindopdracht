import React from 'react';
import "./FavouritePage.css"
import EMP from "../../assets/demo/EMPANADAS-liggend-1-864x486.jpg"
import HERf from "../../assets/demo/herfstrecepten_b-340x340.jpg"
import Las from "../../assets/demo/lasagne-uit-de-pan.jpg"
import PomHerf from "../../assets/demo/pompoen-herfst-salade-liggend-864x486.jpg"
import Rijst from "../../assets/demo/rijst-met-pompoen-liggend-864x486.jpg"
import Champ from "../../assets/demo/salade-met-champignons-2-864x486.jpg"

function FavoritePage() {
    return (
        <div className="background-container">

            <div className="outer-content-container-favourite">
                <div className="title-container-favourite">
                    <h2>My favourite recipes</h2>
                </div>
                    <div className="title-container-favourite-text">
                    <p>Welcome to our favorite recipes page! Here, you'll find a collection of dishes that we have tried and loved. From hearty main courses to delicious desserts, we have something for every occasion. Whether you're a seasoned home cook or just starting out, we hope you'll find inspiration in these recipes.</p>
                </div>
                <section className="inner-content-container-favourite">


                {/*    <svg className="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="fas"*/}
                {/*         data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"*/}
                {/*         data-fa-i2svg="">*/}
                {/*        <path fill="currentColor"*/}
                {/*              d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>*/}
                {/*    </svg>*/}

                    <div id="box1">
                    <img  src={PomHerf} alt="salade pompoen"/>
                    <h5>BBQ pumpkin</h5>
                    </div>
                    <div id="box1">
                    <img src={HERf} alt="Pumpkin soep"/>
                    <h5>Pumpkin soep</h5>
                    </div>
                    <div id="box1">
                    <img src={Champ} alt="salad"/>
                    <h5>salad</h5>
                    </div>
                    <div id="box1">
                    <img src={Rijst} alt="Autumn salad"/>
                    <h5>Autumn salad</h5>
                    </div>
                    <div id="box1">
                    <img src={EMP} alt="Empenade`s"/>
                    <h5>Empenade`s</h5>
                    </div>
                    <div id="box1">
                    <img src={Las} alt="Lasange "/>
                    <h5>Lasange </h5>
                    </div>

                </section>

            </div>
        </div>
    );
}

export default FavoritePage;