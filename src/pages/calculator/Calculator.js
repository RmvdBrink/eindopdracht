import React, {useState} from 'react';
import axios from "axios";
import Button from "../../components/button/Button";
import "./Calculator.css"
import roundCalories from "../../helpers/roundCalories";

const APP_ID = "0c78e8a1"
const APP_KEY = "d17f117cd5cfc21bccfac6a9560a352a"

function Calculator() {
    const [calorie, setCalorie] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");

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
        } catch (e) {
            setError(true);
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
    const labelPartFatrn = calorie && calorie.totalNutrients && calorie.totalNutrients.Fatrn && calorie.totalNutrients.Fatrn.label.split(',')[1];


    return (
        <>

            <div>

            </div>
            {error && <p>Something went wrong while retrieving the data</p>}
            {loading && <p>we are loading the data for you</p>}
            <main className="outer-content-container-calculator">
                <section className="inner-content-container-calculator">
                    <div className="content-container-calculator1">
                        <h5>Kcal calculator page</h5>
                        <p>Our dishes always consist very healthy products.
                            Do you still want to know how many kcal you take to balance your eating habits, enter them
                            below.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="content-container-calculator2">
                            <p>
                                <label className="title-field-calc" htmlFor="title-field-calc">
                                    Title :
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
                                    placeholder="enter your product such as for example: 100 g chicken"
                                ></textarea>
                            </p>
                            <div className="content-container-calculator3">


                                <Button name="calculator"
                                        type="submit"
                                        children="calculate"
                                />
                                <Button
                                    name="reset"
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
                                            <table>
                                                <div className="tab-h5"><h5>Nutrition Facts</h5></div>

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
                                                <tr className="thick-row">
                                                    <td colSpan="1" className="blank-cell"></td>
                                                    <td colSpan="3" className="small-info"><b>% Daily Value*</b></td>
                                                </tr>
                                                {/*turns objects into arrays to search through*/}
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

                                                            <th colSpan="2">{labelPartFatrn} fat {roundCalories(calorie.totalNutrients.FATRN.quantity)} g</th>

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
                                                            {/*<td className="blank-cell"></td>*/}
                                                            <th>Includes {calorie.SUGARadded} Added Sugars</th>
                                                            <td></td>
                                                        </tr>
                                                        <tr className="thick-end">
                                                            <th colSpan="2">
                                                                <b>Protein</b> {roundCalories(calorie.totalNutrients.PROCNT.quantity)} g
                                                            </th>
                                                            <td>
                                                                <b>{roundCalories(calorie.totalDaily.PROCNT.quantity)}{calorie.totalDaily.PROCNT.unit}</b>
                                                            </td>
                                                        </tr>

                                                        <table>
                                                            <tbody>
                                                            <tr>
                                                                <th>Vitamin
                                                                    D {roundCalories(calorie.totalNutrients.VITD.quantity)} {calorie.totalNutrients.VITD.unit}</th>
                                                                <td>
                                                                    <b>{roundCalories(calorie.totalDaily.VITD.quantity)}{calorie.totalDaily.VITD.unit}</b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Calcium {roundCalories(calorie.totalNutrients.CA.quantity)} {calorie.totalNutrients.CA.unit}</th>
                                                                <td>
                                                                    <b>{roundCalories(calorie.totalDaily.CA.quantity)}{calorie.totalDaily.CA.unit}</b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Iron {roundCalories(calorie.totalNutrients.FE.quantity)} {calorie.totalNutrients.FE.unit} </th>
                                                                <td>
                                                                    <b>{roundCalories(calorie.totalDaily.FE.quantity)}{calorie.totalDaily.FE.unit} </b>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Potassium {roundCalories(calorie.totalNutrients.K.quantity)} {calorie.totalNutrients.K.unit} </th>
                                                                <td>
                                                                    <b>{roundCalories(calorie.totalDaily.K.quantity)}{calorie.totalDaily.K.unit} </b>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <p>*Percent Daily Values are based on a 2000 calorie diet</p>
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


// import React, {useEffect, useState} from 'react';
// // import SearchCard from "../../components/search-card/SearchCard";
// import axios from "axios";
// import Button from "../../components/button/Button";
// import "./Calculator.css"
// import roundCalories from "../../helpers/roundCalories";
//
// const APP_ID = "0c78e8a1"
// const APP_KEY = "d17f117cd5cfc21bccfac6a9560a352a"
//
// function Calculator() {
//     const [calorie, setCalorie] = useState([]);
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [title, setTitle] = useState("");
//     const [ingredients, setIngredients] = useState("");
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             setError(false);
//             const data = await axios.post(
//                 'https://api.edamam.com/api/nutrition-details',
//                 {
//                     'title': title,
//                     'ingr': ingredients.split("\n")
//                 },
//                 {
//                     params: {
//                         'app_id': `${APP_ID}`,
//                         'app_key': `${APP_KEY}`
//                     },
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     }
//                 }
//             );
//             setCalorie(data.data);
//         } catch (e) {
//             setError(true);
//         }
//         setLoading(false);
//     }
//
//     const handleReset = () => {
//         setTitle("");
//         setIngredients("");
//         setCalorie([])
//     }
//     // const labelPart = calorie.totalNutrients.FATRN && calorie.totalNutrients.FATRN.label.split(',')[1];
//
//     return (
//         <>
//
//             <div>
//
//             </div>
//             {error && <p>Something went wrong while retrieving the data</p>}
//             {loading && <p>we are loading the data for you</p>}
//             <main className="outer-content-container-calculator">
//                 <section className="inner-content-container-calculator">
//                     <div className="content-container-calculator1">
//                         <h5>Kcal calculator page</h5>
//                         <p>Our dishes always consist very healthy products.
//                             Do you still want to know how many kcal you take to balance your eating habits, enter them
//                             below.</p>
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                         <div className="content-container-calculator2">
//                             <p>
//                                 <label className="title-field-calc" htmlFor="title-field-calc">
//                                     Title :
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="title-field-calc"
//                                     name="title"
//                                     placeholder="enter the title here"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//
//                                 <textarea
//                                     className="text-field-calculator"
//                                     name="calculator"
//                                     id="calculator"
//                                     cols="30"
//                                     rows="10"
//                                     value={ingredients}
//                                     onChange={(e) => setIngredients(e.target.value)}
//                                     placeholder="enter your product such as for example: 100 g chicken"
//                                 ></textarea>
//                             </p>
//                             <div className="content-container-calculator3">
//
//                                 {/*<button type="submit">Submit</button>*/}
//                                 {/*<button type="reset" onClick={handleReset}>Reset</button>*/}
//                                 <Button name="calculator"
//                                         type="submit"
//                                         children="calculate"
//                                 />
//                                 <Button
//                                     name="reset"
//                                     type="onclick"
//                                     children="Reset"
//                                     clickHandler={handleReset}/>
//
//                                 {console.log(title)}
//
//                             </div>
//
//                             <div className="result-calculator">
//                                 {ingredients !== "" ?
//                                     <div className="outer-content-container-calculator4">
//
//                                         <div className="content-container-calculator4">
//
//                                             {calorie.ingredients && calorie.ingredients.map((ingredient, i) => {
//                                                 let quantity = "-";
//                                                 let measure = "-";
//                                                 let foodMatch = "-";
//                                                 let weight = "-";
//                                                 let cal = "-";
//                                                 let unit = "-";
//
//                                                 if (ingredient.parsed) {
//                                                     if (ingredient.parsed[0].quantity.toFixed(1)) {
//                                                         quantity = ingredient.parsed[0].quantity.toFixed(1);
//                                                     }
//                                                     if (ingredient.parsed[0].measure) {
//                                                         measure = ingredient.parsed[0].measure;
//                                                     }
//                                                     if (ingredient.parsed[0].foodMatch) {
//                                                         foodMatch = ingredient.parsed[0].foodMatch;
//                                                     }
//                                                     if (roundCalories(ingredient.parsed[0].weight)) {
//                                                         weight = roundCalories(ingredient.parsed[0].weight);
//                                                     }
//                                                     if (ingredient.parsed[0].nutrients.ENERC_KCAL) {
//                                                         cal = roundCalories(ingredient.parsed[0].nutrients.ENERC_KCAL.quantity);
//                                                         unit = ingredient.parsed[0].nutrients.ENERC_KCAL.unit;
//                                                     }
//                                                 }
//
//                                                 return (
//                                                     <tr key={i}>
//                                                         <td>{quantity} {measure} {foodMatch}</td>
//                                                         <td>{weight} gr</td>
//                                                         <td>{cal} {unit}</td>
//                                                     </tr>
//                                                 );
//                                             })}
//
//                                             <>
//                                             </>
//                                             <h5>Nutrition Facts</h5>
//                                             <table>
//                                                 <thead>
//                                                 <tr>
//                                                     <th colSpan="3" className="amps">Amount Per Serving</th>
//                                                 </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                 <tr>
//                                                     <th colSpan="2" id="lkcal-val-cal"><b>Total Calories</b></th>
//                                                     <td className="nob">{calorie.calories} Kcal.</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th colSpan="2" id="lkcal-val-cal"><b>Total weight</b></th>
//                                                     <td className="nob">{roundCalories(calorie.totalWeight)} g.</td>
//                                                 </tr>
//                                                 <tr className="thick-row">
//                                                     <td colSpan="2" className="blank-cell"></td>
//                                                     <td colSpan="3" className="small-info"><b>% Daily Value*</b></td>
//                                                 </tr>
//                                                 {Object.keys(calorie).length > 0 &&
//
//                                                     <>
//                                                         <tr>
//                                                             <th colSpan="2"><b>Total fat </b> {roundCalories(calorie.totalNutrients.FAT.quantity)} g</th>
//
//                                                             <td > {roundCalories(calorie.totalDaily.FAT.quantity)} {calorie.totalDaily.FAT.unit}</td>
//                                                         </tr>
//                                                         <tr>
//
//                                                             <th colSpan="2">{calorie.totalNutrients.FASAT.label} fat {roundCalories(calorie.totalNutrients.FASAT.quantity)} g  </th>
//
//                                                             <td>{roundCalories(calorie.totalDaily.FASAT.quantity)} {calorie.totalDaily.FASAT.unit}</td>
//                                                         </tr>
//                                                         {/*<tr>*/}
//
//                                                         {/*    <th colSpan="2">{calorie.totalNutrients.FATRN.label} fat {roundCalories(calorie.totalNutrients.FATRN.quantity)} g  </th>*/}
//
//                                                         {/*</tr>*/}
//                                                         <tr>
//                                                             <th colSpan="2"><b>Cholesterol</b> {roundCalories(calorie.totalNutrients.CHOLE.quantity)} g</th>
//
//                                                             <td > {roundCalories(calorie.totalDaily.CHOLE.quantity)} {calorie.totalDaily.CHOLE.unit}</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th colSpan="2"><b>Sodium</b> {roundCalories(calorie.totalNutrients.NA.quantity)} mg</th>
//
//                                                             <td > {roundCalories(calorie.totalDaily.NA.quantity)} {calorie.totalDaily.NA.unit}</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th colSpan="2"><b>Carbohydrate</b> {roundCalories(calorie.totalNutrients.CHOCDF.quantity)} g</th>
//
//                                                             <td > {roundCalories(calorie.totalDaily.CHOCDF.quantity)} {calorie.totalDaily.CHOCDF.unit}</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th colSpan="2"><b>Dietary Fiber</b> {roundCalories(calorie.totalNutrients.FIBTG.quantity)} g</th>
//
//                                                             <td > {roundCalories(calorie.totalDaily.FIBTG.quantity)} {calorie.totalDaily.FIBTG.unit}</td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th colSpan="2"><b>Total Sugars</b> {roundCalories(calorie.totalNutrients.SUGAR.quantity)} g</th>
//
//                                                         </tr>
//                                                         <tr>
//                                                             <th colSpan="2"><b>Total Sugars</b> {roundCalories(calorie.totalNutrients.SUGAR.quantity)} g</th>
//
//                                                         </tr>
//                                                     </>
//
//                                                 }
//
//
//
//
//                                                 {/*<tr>*/}
//                                                 {/*    <td className="blank-cell"></td>*/}
//                                                 {/*    <th>Total Sugars {calorie.SUGAR}</th>*/}
//                                                 {/*    <td></td>*/}
//                                                 {/*</tr>*/}
//                                                 {/*<tr>*/}
//                                                 {/*    <td className="blank-cell"></td>*/}
//                                                 {/*    <th>Includes {calorie.SUGARadded} Added Sugars</th>*/}
//                                                 {/*    <td></td>*/}
//                                                 {/*</tr>*/}
//                                                 {/*<tr className="thick-end">*/}
//                                                 {/*    <th colSpan="2"><b>Protein</b> {calorie.PROCNT}</th>*/}
//                                                 {/*    <td><b>{calorie.totalDaily.PROCNT}</b></td>*/}
//                                                 {/*</tr>*/}
//                                                 </tbody>
//                                             </table>
//                                             {console.log(calorie)}
//
//
//
//
//                                         </div>
//
//
//                                     </div> : null}
//                             </div>
//                         </div>
//                     </form>
//                 </section>
//             </main>
//
//         </>
//     );
// }
//
//
//
// export default Calculator;


// import React, {useEffect, useState} from 'react';
// // import SearchCard from "../../components/search-card/SearchCard";
// import axios from "axios";
// import Button from "../../components/button/Button";
// import "./Calculator.css"
//
// const APP_ID = "0c78e8a1"
// const APP_KEY = "d17f117cd5cfc21bccfac6a9560a352a"
//
// function Calculator() {
//
//
//     const [calorie, setCalorie] = useState([]);
//     const [search, setSearch] = useState("")
//     const [error, toggleError] = useState(false);
//     const [query, setQuery] = useState("")
//     const [loading, toggleLoading] = useState(false);
//
//     const preUrl = "nutrition-type=cooking&ingr=";
//     let combineUrl = preUrl.concat(query);
//
//     if (combineUrl === "nutrition-type=cooking&ingr=") {
//         combineUrl = "";
//     }
//
//     console.log(combineUrl)
//
//
//     useEffect(() => {
//
//         const controller = new AbortController();
//
//
//         async function fetchData() {
//             toggleLoading(true);
//
//             try {
//                 toggleError(false);
//                 const data = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&${combineUrl}`, {signal: controller.signal})
//
//
//                 console.log(data.data)
//                 setCalorie(data.data)
//                 // query
//             } catch (e) {
//                 // console.error(e)
//                 if (axios.isCancel(e)) {
//                     console.log("The axios request was cancelled")
//
//                 } else {
//                     console.error(e)
//                     toggleError(true)
//                 }
//             }
//             toggleLoading(false)
//
//         }
//
//         fetchData()
//
//
//         return function cleanup() {
//             controller.abort();
//
//         }
//     }, [combineUrl]);
//
//     const updateSearch = e => {
//         setSearch(e.target.value);
//         console.log(search);
//     }
//
//     const getSearch = e => {
//         e.preventDefault();
//         setQuery(search);
//         setSearch("");
//     }
// // function fieldReset() {
// //             setCalorie("")
// // }
//
//     return (
//         <>
//
//             <div>
//
//             </div>
//             {error && <p>Something went wrong while retrieving the data</p>}
//             {loading && <p>we are loading the data for you</p>}
//             <main className="outer-content-container-calculator">
//                 <section className="inner-content-container-calculator">
//                     <div className="content-container-calculator1">
//                         <h5>Kcal calculator page</h5>
//                         <p>Our dishes always consist very healthy products.
//                             Do you still want to know how many kcal you take to balance your eating habits, enter them
//                             below.</p>
//                     </div>
//                     <form onSubmit={getSearch}>
//                         <div className="content-container-calculator2">
//                             <p>
//                                 <textarea
//                                     className="text-field-calculator"
//                                     name="calculator"
//                                     id="calculator"
//                                     cols="30"
//                                     rows="10"
//                                     value={search}
//                                     onChange={updateSearch}
//                                     placeholder="enter your product such as for example: 100 g chicken"
//                                 ></textarea>
//                             </p>
//                             <div className="content-container-calculator3">
//                                 <Button name="calculator"
//                                         type="submit"
//                                         children="calculate"
//                                 />
//                                 {/*<Button*/}
//                                 {/*    name="reset"*/}
//                                 {/*    typte="onclick"*/}
//                                 {/*    // clickHandler={fieldReset}*/}
//                                 {/*    children="reset"*/}
//                                 {/*/>*/}
//                             </div>
//                             <div className="result-calculator">
//                                 <div className="outer-content-container-calculator4">
//                                     <div className="content-container-calculator4">
//                                         <table>
//                                             <thead>
//
//                                             <tr>
//                                                 <th>Qty</th>
//                                                 <th>Unit</th>
//                                                 <th>Food</th>
//                                                 <th>Calories</th>
//                                                 {/*<th>Weight</th>*/}
//                                             </tr>
//                                             </thead>
//
//                                             <tbody>
//                                             {Object.keys(calorie).length > 0 &&
//                                                 <>
//
//                                                     <tr>
//                                                         <th>{calorie.ingredients[0].parsed[0].quantity}</th>
//                                                         <th>{calorie.ingredients[0].parsed[0].measure}</th>
//                                                         <th>{calorie.ingredients[0].parsed[0].foodMatch}</th>
//                                                         <th>{calorie.calories}</th>
//
//                                                     </tr>
//
//                                                 </>
//                                             }
//
//                                             </tbody>
//                                         </table>
//                                     </div>
//
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </section>
//             </main>
//
//         </>
//     );
// }
//
// export default Calculator;


// useEffect(() => {
//     console.log("run")
//     const controller = new AbortController();
//
//
//
//     async function fetchData() {
//         toggleLoading(true);
//
//         try {
//             toggleError(false);
//             const data = await axios.post(
//                 'https://api.edamam.com/api/nutrition-details',
//
//                 {
//                     'title': 'Almond Milk',
//                     'ingr': [
//                         '50g raw almonds',
//                         '100ml water',
//                         '3g sea salt'
//                     ]
//                 },
//                 {
//                     params: {
//                         'app_id': '0c78e8a1',
//                         'app_key': 'd17f117cd5cfc21bccfac6a9560a352a'
//                     },
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     }
//                 }
//             );
//
//             console.log(data.data)
//             setCalorie(data.data)
//             // query
//         } catch (e) {
//             // console.error(e)
//             if (axios.isCancel(e)) {
//                 console.log("The axios request was cancelled")
//
//             }  else {
//                 console.error(e)
//                 toggleError(true)
//             }
//         }
//         toggleLoading(false)
//
//     }
//     fetchData()
//
//
//     return function cleanup() {
//         controller.abort();
//
//     }
// }, [combineUrl]);


