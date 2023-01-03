import React, {useEffect, useState} from 'react';
// import SearchCard from "../../components/search-card/SearchCard";
import axios from "axios";
import Button from "../../components/button/Button";
import "./Calculator.css"

const APP_ID = "0c78e8a1&app"
const APP_KEY = "d17f117cd5cfc21bccfac6a9560a352a"

function Calculator() {


        const [calorie, setCalorie] = useState([]);
        const [search, setSearch] = useState("")
        const [error, toggleError] = useState(false);
        const [query, setQuery] = useState("")
        const [loading, toggleLoading] = useState(false);

        useEffect(() => {
            console.log("run")
            const controller = new AbortController();


            async function fetchData() {
                toggleLoading(true);

                try {
                    toggleError(false);
                    const data = await axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}_key=${APP_KEY}&nutrition-type=cooking&ingr=${query}`,{signal: controller.signal} )
                    console.log(data.data)
                    setCalorie(data.data)
                    // query
                } catch (e) {
                    // console.error(e)
                    if (axios.isCancel(e)) {
                        console.log("The axios request was cancelled")
                        toggleError(true)
                    }  else {
                        console.error(e)

                    }
                }
                toggleLoading(false)

                }
            fetchData()


            return function cleanup() {
                controller.abort();

            }
        }, [query]);

        const updateSearch = e => {
            setSearch(e.target.value);
            console.log(search);
        }

        const getSearch = e => {
            e.preventDefault();
            setQuery(search);
            setSearch("");
        }
// function fieldReset() {
//             setCalorie("")
// }

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
                                Do you still want to know how many kcal you take to balance your eating habits, enter them below.</p>
                        </div>
                        <form onSubmit={getSearch}>
                        <div className="content-container-calculator2">
                            <p>
                                <textarea
                                    className="text-field-calculator"
                                    name="calculator"
                                    id="calculator"
                                    cols="30"
                                    rows="10"
                                    value={search}
                                    onChange={updateSearch}
                                    placeholder="enter your product such as for example: 100 g chicken"
                                ></textarea>
                            </p>
                            <div className="content-container-calculator3">
                                <Button name="calculator"
                                        type="submit"
                                        children="calculate"
                                />
                                {/*<Button*/}
                                {/*    name="reset"*/}
                                {/*    typte="onclick"*/}
                                {/*    // clickHandler={fieldReset}*/}
                                {/*    children="reset"*/}
                                {/*/>*/}
                            </div>
                            <div className="result-calculator">
                                <div className="outer-content-container-calculator4">
                                <div className="content-container-calculator4">
                                    <table>
                                        <thead>

                                        <tr>
                                                <th>Qty</th>
                                                <th>Unit</th>
                                                <th>Food</th>
                                                <th>Calories</th>
                                                {/*<th>Weight</th>*/}
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {Object.keys(calorie).length > 0 &&
                                            <>

                                                        <tr>
                                                            <th>{calorie.ingredients[0].parsed[0].quantity}</th>
                                                            <th>{calorie.ingredients[0].parsed[0].measure}</th>
                                                            <th>{calorie.ingredients[0].parsed[0].foodMatch}</th>
                                                            <th>{calorie.calories}</th>

                                                        </tr>

                                            </>
                                        }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            </div>
                        </div>
                    </form>
                    </section>
                </main>

            </>
        );
    }

export default Calculator;



// async function analyzeRecipe() {
//     try {
//         const response = await axios.post('https://api.edamam.com/api/nutrition-details', {
//             query: '10 oz butter',
//         }, {
//             headers: {
//                 'x-app-id': '0c78e8a1',
//                 'x-app-key': 'd17f117cd5cfc21bccfac6a9560a352a'
//             }
//         });
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }
//
// analyzeRecipe();