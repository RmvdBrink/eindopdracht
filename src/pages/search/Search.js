import React, {useEffect, useState} from 'react';
import "./Search.css"
import axios from "axios";
import SearchCard from "../../components/search-card/SearchCard";
// import Background1 from "src/assets/search-page.jpg"

const APP_ID = "id=08659f69&app"
const APP_KEY = "key=%2013cd3b413ae7c5546cc09ef8a8590c71"

function Search() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("")
    const [error, toggleError ] = useState(false);
    const [query, setQuery] = useState("")
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);

            try {
                toggleError(false);
                const data = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_${APP_ID}_${APP_KEY}`)
                console.log(data.data.hits)
                setRecipes(data.data.hits)

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
        setSearch(e.target.value)
        console.log(search)
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search)
        setSearch("")
    }

    return (
        <>

    <main className="outer-content-container-search">
        <section className="inner-content-container-search">
            <div className="content-container-search1">
                <h5>Recipes Search page</h5>
                <p>search her for you best recipes</p>
            </div>
            {error && <p>Something went wrong while retrieving the data</p>}
            {loading && <p>we are loading the data for you</p>}
                <div className="content-container-search2">
                    <form onSubmit={getSearch} className="search-form">
                        <input className="search-bar"
                            type="text"
                            name="search"
                            value={search}
                            onChange={updateSearch}
                            placeholder="search her for you recipes "
                        />
                   <span>
                    <button className="search-button"

                        type="submit">
                        Search
                    </button>
                   </span>
                    </form>

                </div>
            <div className="content-container-search3">
                {recipes.map((recipe) => {
                    return( <SearchCard
                            key={recipe.recipe.totalWeight}
                            title={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                        />

                    )
                })}
            </div>
        </section>
    </main>

        </>
    );
}

export default Search;