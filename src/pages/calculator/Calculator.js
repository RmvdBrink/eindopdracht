import React, {useEffect, useState} from 'react';
// import SearchCard from "../../components/search-card/SearchCard";
import axios from "axios";
import Button from "../../components/button/Button";

const APP_ID = "id=0c78e8a1&app"
const APP_KEY = "key=d17f117cd5cfc21bccfac6a9560a352a"

function Calculator() {


        const [calorie, setCalorie] = useState({});
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
                    const data = await axios.get(`https://api.edamam.com/api/nutrition-data?app_${APP_ID}_${APP_KEY}&nutrition-type=cooking&ingr=${query}`)
                    console.log(data.data)
                    setCalorie(data.data)
                    // query
                } catch (e) {

                    if (axios.isCancel(e)) {
                        console.log("The axios request was cancelled")
                    }  else {
                        console.error(e)
                        toggleError(true)
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
                    <h1>Kcal calculator</h1>
                </div>
                {error && <p>Something went wrong while retrieving the data</p>}
                {loading && <p>we are loading the data for you</p>}
                <main className="outer-content-container-search">
                    <section className="inner-content-container-search">
                        <div className="content-container-search1">
                            <h2>Kcal calculator page</h2>
                            <p>Our dishes always consist very healthy products.
                                Do you still want to know how many kcal you take to balance your eating habits, enter them below.</p>
                        </div>
                        <form onSubmit={getSearch}>
                        <div>
                            <p>
                                <textarea
                                    className="text-field-calculator"
                                    name="calculator"
                                    id="calculator"
                                    cols="30"
                                    rows="10"
                                    onChange={updateSearch}
                                    placeholder="enter your product such as for example: 100 g chicken"
                                ></textarea>
                            </p>
                            <div className="result-calculator">

                                <div>
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


                                                {calorie.data && calorie.data.map((calorie) => {
                                                    return (
                                                        <>
                                                        <tbody key={calorie.calories}>
                                                        <tr>
                                                <th>{calorie.ingredients[0].parsed[0].quantity}</th>
                                                <th>{calorie.ingredients[0].parsed[0].measure}</th>
                                                <th>{calorie.ingredients[0].parsed[0].foodMatch}</th>
                                                <th>{calorie.calories}</th>

                                                        </tr>

                                                        </tbody>
                                                        </>
                                                )

                                                })}


                                    </table>
                                </div>

                            </div>
                            <Button name="calculator"
                            type="submit"
                            children="calculate"
                            />
                            <Button
                            name="reset"
                            typte="onclick"
                            // clickHandler={fieldReset}
                            children="reset"
                            />

                        </div>
                    </form>
                    </section>
                </main>

            </>
        );
    }

export default Calculator;