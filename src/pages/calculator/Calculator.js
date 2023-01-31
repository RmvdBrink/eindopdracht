import React, {useState} from 'react';
import axios from "axios";
import Button from "../../components/button/Button";
import "./Calculator.css"
import roundCalories from "../../helpers/roundCalories";
import Loader from "../../components/loader-compenent/LoaderComponent";
import NotificationTab from "../../components/notification-tab/NotificationTab";

const APP_ID = "0c78e8a1"
const APP_KEY = "d17f117cd5cfc21bccfac6a9560a352a"

function Calculator() {
    const [calorie, setCalorie] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [showNotificationTab, setShowNotificationTab] = useState(false);

    //function that does a post api cal to adamam Nutrition Analysis to retrieve various data about food types

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setError(false);
            const data = await axios.post(
                'https://api.edamam.com/api/nutrition-details',
                {
                    'title': title,
                    'ingr': ingredients.split("\n")
                },
                {
                    params: {
                        'app_id': `${APP_ID}`,
                        'app_key': `${APP_KEY}`
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            setCalorie(data.data);
            console.log(data.data)
            if (data.data.length === 0) {
                setShowNotificationTab(true);
            } else {
                setShowNotificationTab(false);
            }
        } catch (e) {
            if (e.response) {
                const {status, data} = e.response;
                if (status === 555) {
                    setShowNotificationTab(true);
                    console.error(data);
                } else {
                    setShowNotificationTab(false);
                }
                setError(true);
            }
        }
        setLoading(false);
    }
    // reset function sets al the text fields back to null
    const handleReset = () => {
        setTitle("");
        setIngredients("");
        setCalorie([])
    }
    //checking if the calorie object exists, If it does, it is using the split() method on the label grabbing the second item in that array by using the index of [1]
    //This will return the second element of the label after it is splitted by the comma,
    const labelPartFasat = calorie && calorie.totalNutrients && calorie.totalNutrients.FASAT && calorie.totalNutrients.FASAT.label.split(',')[1];


    return (
        <>

            <div>

            </div>
            {error && <p>Something went wrong while retrieving the data</p>}
            <main className="outer-content-container-calculator">
                <section className="inner-content-container-calculator">
                    <div className="content-container-calculator1">
                        <h2>Kcal calculator page</h2>
                        <p>Welcome to our Kcal Calculator! With this tool, you can easily calculate the nutritional
                            value of your favorite recipes. Here's how it works: </p>
                        <ul>
                            <li>First, enter the title of a recipe that you found on our site in the "Title" field.</li>
                            <li>Next, copy and paste the ingredients list from the recipe into the "Ingredients" text
                                field, with each ingredient on a new line :
                            </li>
                            <li>(e.g. "1/2 cup ripe banana ").</li>
                            <li>Finally, simply press the "Calculate" button to see the nutritional values, including
                                the total calories, of the recipe.
                            </li>
                        </ul>
                        <p> Our tool is easy to use and will help you make informed choices about the food you eat. Give
                            it a try and discover the nutritional value of your favorite recipes!</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="content-container-calculator2">
                            <div>
                    {showNotificationTab ? <NotificationTab text="No data found that matches your search " setShowNotificationTab={setShowNotificationTab} /> : null}
                                <label className="title-field-calc" htmlFor="title-field-calc">
                                </label>
                                <input
                                    type="text"
                                    id="title-field-calc"
                                    name="title"
                                    placeholder="enter the title here"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <textarea
                                    className="text-field-calculator"
                                    name="calculator"
                                    id="calculator"
                                    cols="30"
                                    rows="10"
                                    value={ingredients}
                                    onChange={(e) => setIngredients(e.target.value)}
                                    placeholder="enter your product such as for example : 1 cup all-purpose flour"
                                ></textarea>
                            </div>
                            <span>{loading ? <Loader /> : null}</span>
                            <div className="content-container-calculator3">


                                <Button name="button-calculator"
                                        type="submit"
                                        children="calculate"
                                />
                                <Button
                                    name="button-reset"
                                    type="reset"
                                    children="Reset"
                                    clickHandler={handleReset}/>


                            </div>

                            <div className="result-calculator">
                                {ingredients !== "" ?
                                    <div className="outer-content-container-calculator4">

                                        <div className="content-container-calculator4">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Qty</th>
                                                    <th>Unit</th>
                                                    <th>Food</th>
                                                    <th>Weight</th>
                                                    <th>Calories</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {/*iterates over the ingredients array and returns multiple values*/}
                                                {calorie.ingredients && calorie.ingredients.map((ingredient, i) => {
                                                    let quantity = "-";
                                                    let measure = "-";
                                                    let foodMatch = "-";
                                                    let weight = "-";
                                                    let cal = "-";


                                                    if (ingredient.parsed) {
                                                        if (ingredient.parsed[0].quantity.toFixed(1)) {
                                                            quantity = ingredient.parsed[0].quantity.toFixed(1);
                                                        }
                                                        if (ingredient.parsed[0].measure) {
                                                            measure = ingredient.parsed[0].measure;
                                                        }
                                                        if (ingredient.parsed[0].foodMatch) {
                                                            foodMatch = ingredient.parsed[0].foodMatch;
                                                        }
                                                        if (roundCalories(ingredient.parsed[0].weight)) {
                                                            weight = roundCalories(ingredient.parsed[0].weight);
                                                        }
                                                        if (ingredient.parsed[0].nutrients.ENERC_KCAL) {
                                                            cal = roundCalories(ingredient.parsed[0].nutrients.ENERC_KCAL.quantity);

                                                        }
                                                    }
                                                    //returns values from map function and tabulates them
                                                    return (
                                                        <tr key={i}>
                                                            <td>{quantity} </td>
                                                            <td>{measure} </td>
                                                            <td> {foodMatch}</td>
                                                            <td>{weight} gr</td>
                                                            <td>{cal} kcal</td>
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            </table>
                                            <>
                                            </>

                                            {/*design of nutritional value tables*/}

                                            <div className="tab-h5"><h5>Nutrition Facts</h5></div>
                                            <table>


                                                <thead>

                                                <tr>
                                                    <th colSpan="3">Amount Per Serving</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th colSpan="2" id="lkcal-val-cal"><b>Total Calories</b></th>
                                                    <td className="nob">{calorie.calories} Kcal.</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="2" id="lkcal-val-cal"><b>Total weight</b></th>
                                                    <td className="nob">{roundCalories(calorie.totalWeight)} g.</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="1" className="blank-cell"></td>
                                                    <td colSpan="3"><b>% Daily Value*</b></td>
                                                </tr>

                                                {Object.keys(calorie).length > 0 &&

                                                    <>
                                                        <tr>
                                                            <th colSpan="2"><b>Total
                                                                fat </b> {roundCalories(calorie.totalNutrients.FAT.quantity)} g
                                                            </th>

                                                            <td> {roundCalories(calorie.totalDaily.FAT.quantity)} {calorie.totalDaily.FAT.unit}</td>
                                                        </tr>
                                                        <tr>

                                                            <th colSpan="2">{labelPartFasat} fat {roundCalories(calorie.totalNutrients.FASAT.quantity)} g</th>

                                                            <td>{roundCalories(calorie.totalDaily.FASAT.quantity)} {calorie.totalDaily.FASAT.unit}</td>
                                                        </tr>

                                                        <tr>
                                                            <th colSpan="2">
                                                                <b>Cholesterol</b> {roundCalories(calorie.totalNutrients.CHOLE.quantity)} g
                                                            </th>

                                                            <td> {roundCalories(calorie.totalDaily.CHOLE.quantity)} {calorie.totalDaily.CHOLE.unit}</td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2">
                                                                <b>Sodium</b> {roundCalories(calorie.totalNutrients.NA.quantity)} mg
                                                            </th>

                                                            <td> {roundCalories(calorie.totalDaily.NA.quantity)} {calorie.totalDaily.NA.unit}</td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2">
                                                                <b>Carbohydrate</b> {roundCalories(calorie.totalNutrients.CHOCDF.quantity)} g
                                                            </th>

                                                            <td> {roundCalories(calorie.totalDaily.CHOCDF.quantity)} {calorie.totalDaily.CHOCDF.unit}</td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2"><b>Dietary
                                                                Fiber</b> {roundCalories(calorie.totalNutrients.FIBTG.quantity)} g
                                                            </th>

                                                            <td> {roundCalories(calorie.totalDaily.FIBTG.quantity)} {calorie.totalDaily.FIBTG.unit}</td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2"><b>Total
                                                                Sugars</b> {roundCalories(calorie.totalNutrients.SUGAR.quantity)} g
                                                            </th>

                                                        </tr>

                                                        <tr>

                                                            <th>Includes {calorie.SUGARadded} Added Sugars</th>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2">
                                                                <b>Protein</b> {roundCalories(calorie.totalNutrients.PROCNT.quantity)} g
                                                            </th>
                                                            <td>
                                                                <b>{roundCalories(calorie.totalDaily.PROCNT.quantity)}{calorie.totalDaily.PROCNT.unit}</b>
                                                            </td>
                                                        </tr>


                                                        <tr>
                                                            <th colSpan="2">Vitamin
                                                                D {roundCalories(calorie.totalNutrients.VITD.quantity)} {calorie.totalNutrients.VITD.unit}</th>
                                                            <td>
                                                                <b>{roundCalories(calorie.totalDaily.VITD.quantity)}{calorie.totalDaily.VITD.unit}</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2">Calcium {roundCalories(calorie.totalNutrients.CA.quantity)} {calorie.totalNutrients.CA.unit}</th>
                                                            <td>
                                                                <b>{roundCalories(calorie.totalDaily.CA.quantity)}{calorie.totalDaily.CA.unit}</b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2">Iron {roundCalories(calorie.totalNutrients.FE.quantity)} {calorie.totalNutrients.FE.unit} </th>
                                                            <td>
                                                                <b>{roundCalories(calorie.totalDaily.FE.quantity)}{calorie.totalDaily.FE.unit} </b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan="2">Potassium {roundCalories(calorie.totalNutrients.K.quantity)} {calorie.totalNutrients.K.unit} </th>
                                                            <td>
                                                                <b>{roundCalories(calorie.totalDaily.K.quantity)}{calorie.totalDaily.K.unit} </b>
                                                            </td>
                                                        </tr>


                                                        <td colSpan="9" className="footer-tabel">*Percent Daily Values
                                                            are based on a 2000 calorie diet
                                                        </td>
                                                    </>

                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : null}
                            </div>
                        </div>
                    </form>
                </section>
            </main>

        </>
    );
}


export default Calculator;




