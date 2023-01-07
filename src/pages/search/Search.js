import React, {useEffect, useState} from 'react';
import "./Search.css"
import axios from "axios";
import SearchCard from "../../components/search-card/SearchCard";
import Button from "../../components/button/Button";
import CheckboxComponent from "../../components/chekbox-component/CheckboxComponent";
// import { useForm} from "react-hook-form";
// import InputComponent from "../../components/input component/InputComponent";


const APP_ID = "08659f69"
const APP_KEY = "13cd3b413ae7c5546cc09ef8a8590c71"

function Search() {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("")
    const [error, toggleError ] = useState(false);
    const [query, setQuery] = useState("")
    const [loading, toggleLoading] = useState(false);
    const [selectedAllergen, setSelectedAllergen] = useState([]);


    // const { handleSubmit, formState: { errors },register  } = useForm();

    const allergenToExclude = selectedAllergen.join(',');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);

            try {
                toggleError(false);
                const data = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&${allergenToExclude}`,{signal: controller.signal})
                console.log(data.data.hits)
                setRecipes(data.data.hits)
                // &health=dairy-free

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
        void fetchData()

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
    // Voeg een functie toe die wordt uitgevoerd wanneer een allergeen wordt geselecteerd of deselecteerd
    const handleAllergenChange = (allergen) => {
        // Controleer of het allergeen al in de lijst met geselecteerde allergenen staat
        if (selectedAllergen.includes(allergen)) {
            // Verwijder het allergeen uit de lijst
            setSelectedAllergen(selectedAllergen.filter((a) => a !== allergen));
        } else {
            // Voeg het allergeen toe aan de lijst
            setSelectedAllergen([...selectedAllergen, allergen]);
        }
    }


    return (
        <>

    <main className="outer-content-container-search">
        <section className="inner-content-container-search">
            <div className="content-container-search1">

                <h2>Recipes Search page</h2>
                <p>search her for you best recipes</p>

            </div>
            {error && <p>Something went wrong while retrieving the data</p>}
            {loading && <p>we are loading the data for you</p>}
                <div className="content-container-search2">
                    <form onSubmit={getSearch} >

                        <div className="form-item">
                        <input className="search-bar"
                            type="text"
                            name="search"
                            value={search}
                            onChange={updateSearch}
                            placeholder="search her for you recipes "
                        />

                      <Button
                       name="search-button"
                       type="submit"
                       children="Search"
                       />
                        </div>
                        <div className="checkbox-content-container-search2">
                        {/* Maak het radiobox-menu voor allergenen */}
                        {/*<label htmlFor="allergens"></label>*/}
                            <span className="cel1">
                            <CheckboxComponent
                            classBox="1"
                            label="gluten"
                            type="checkbox"
                            checkBoxId="gluten"
                            name="allergen"
                            value="gluten"
                            changeHandler={() => handleAllergenChange('free&health=gluten-free')}
                            children="Gluten-free"
                            />

                            {/*<input type="checkbox" id="gluten-free" name="allergen" value="free&health=gluten-free" onChange={() => handleAllergenChange('free&health=gluten-free')} />*/}
                            {/*<label htmlFor="gluten-free">Gluten-free</label>*/}


                            <CheckboxComponent
                                // classBox="2"
                                label="dairy"
                                type="checkbox"
                                checkBoxId="dairy"
                                name="allergen"
                                value="dairy"
                                changeHandler={() => handleAllergenChange('free&health=dairy-free')}
                                children="Dairy-free"
                            />
                            {/*<input type="checkbox" id="dairy-free" name="allergen" value="free&health=dairy-free" onChange={() => handleAllergenChange('free&health=dairy-free')} />*/}
                            {/*<label htmlFor="dairy-free">Dairy-free</label>*/}


                            <CheckboxComponent
                                // classBox="3"
                                label="fish"
                                type="checkbox"
                                checkBoxId="fish"
                                name="allergen"
                                value="fish"
                                changeHandler={() => handleAllergenChange('free&health=fish-free')}
                                children="Fish-free"
                            />
                            {/*<input type="checkbox" id="fish-free" name="allergen" value="free&health=fish-free" onChange={() => handleAllergenChange('free&health=fish-free')} />*/}
                            {/*<label htmlFor="fish-free">Fish-free</label>*/}


                            <CheckboxComponent
                                label="crustacean"
                                type="checkbox"
                                checkBoxId="crustacean"
                                name="allergen"
                                value="crustacean"
                                changeHandler={() => handleAllergenChange('free&health=crustacean-free')}
                                children="Crustacean-free"
                            />
                            {/*<input type="checkbox" id="crustacean-free" name="allergen" value="free&health=crustacean-free" onChange={() => handleAllergenChange('free&health=crustacean-free')} />*/}
                            {/*<label htmlFor="Crustacean-free">Crustacean-free</label>*/}

                            <CheckboxComponent
                                // classBox="5"
                                label="lupine"
                                type="checkbox"
                                checkBoxId="lupine"
                                name="allergen"
                                value="lupine"
                                changeHandler={() => handleAllergenChange('free&health=lupine-free')}
                                children="Lupine-free"
                            />
                        {/*<input type="checkbox" id="lupine-free" name="allergen" value="free&health=lupine-free" onChange={() => handleAllergenChange('free&health=lupine-free')} />*/}
                        {/*<label htmlFor="lupine-free">Lupine-free</label>*/}


                            <CheckboxComponent
                                // classBox="6"
                                label="peanut-free"
                                type="checkbox"
                                checkBoxId="peanut"
                                name="allergen"
                                value="peanut"
                                changeHandler={() => handleAllergenChange('free&health=peanut-free')}
                                children="Peanut-free"
                            />
                            {/*<input type="checkbox" id="peanut-free" name="allergen" value="free&health=peanut-free" onChange={() => handleAllergenChange('free&health=peanut-free')} />*/}
                            {/*<label htmlFor="peanut-free">Peanut-free</label>*/}


                            <CheckboxComponent
                                // classBox="7"
                                label="tree-Nut"
                                type="checkbox"
                                checkBoxId="tree-Nut"
                                name="allergen"
                                value="tree-Nut"
                                changeHandler={() => handleAllergenChange('free&health=tree-Nut-free')}
                                children="Tree-Nut-free"
                            />
                            {/*<input type="checkbox" id="tree-Nut-free" name="allergen" value="free&health=tree-Nut-free" onChange={() => handleAllergenChange('free&health=tree-Nut-free')} />*/}
                            {/*<label htmlFor="tree-Nut-free">Tree-nut</label>*/}
                            </span>
                            <span className="cel2">
                            <CheckboxComponent
                                // classBox="8"
                                label="shellfish"
                                type="checkbox"
                                checkBoxId="shellfish"
                                name="allergen"
                                value="shellfish"
                                changeHandler={() => handleAllergenChange('free&health=shellfish-free')}
                                children="Shellfish-free"
                            />
                            {/*<input type="checkbox" id="shellfish-free" name="allergen" value="free&health=shellfish-free" onChange={() => handleAllergenChange('free&health=shellfish-free')} />*/}
                            {/*<label htmlFor="shellfish-free">Shellfish-free</label>*/}


                            <CheckboxComponent
                                // classBox="9"
                                label="celery"
                                type="checkbox"
                                checkBoxId="celery"
                                name="allergen"
                                value="celery"
                                changeHandler={() => handleAllergenChange('free&health=celery-free')}
                                children="Celery-free"
                            />
                            {/*<input type="checkbox" id="celery-free" name="allergen" value="free&health=celery-free" onChange={() => handleAllergenChange('free&health=celery-free')} />*/}
                            {/*<label htmlFor="celery-free">Celery-free</label>*/}


                            <CheckboxComponent
                                // classBox="10"
                                label="egg"
                                type="checkbox"
                                checkBoxId="egg"
                                name="allergen"
                                value="egg"
                                changeHandler={() => handleAllergenChange('free&health=egg-free')}
                                children="Egg-free"
                            />
                            {/*<input type="checkbox" id="egg-free" name="allergen" value="free&health=egg-free" onChange={() => handleAllergenChange('free&health=egg-free')} />*/}
                            {/*<label htmlFor="egg-free">Egg-free</label>*/}


                            <CheckboxComponent
                                // classBox="11"
                                label="mustard"
                                type="checkbox"
                                checkBoxId="mustard"
                                name="allergen"
                                value="mustard"
                                changeHandler={() => handleAllergenChange('free&health=mustard-free')}
                                children="Mustard-free"
                            />
                            {/*<input type="checkbox" id="mustard-free" name="allergen" value="free&health=mustard-free" onChange={() => handleAllergenChange('free&health=mustard-free')} />*/}
                            {/*<label htmlFor="mustard-free">Mustard-free</label>*/}


                            <CheckboxComponent
                                // classBox="12"
                                label="sesame"
                                type="checkbox"
                                checkBoxId="sesame"
                                name="allergen"
                                value="sesame"
                                changeHandler={() => handleAllergenChange('free&health=sesame-free')}
                                children="Sesame-free"
                            />
                            {/*<input type="checkbox" id="sesame-free" name="allergen" value="free&health=sesame-free" onChange={() => handleAllergenChange('free&health=sesame-free')} />*/}
                            {/*<label htmlFor="sesame-free">Sesame-free</label>*/}


                            <CheckboxComponent
                                // classBox="13"
                                label="soy-free"
                                type="checkbox"
                                checkBoxId="soy"
                                name="allergen"
                                value="soy"
                                changeHandler={() => handleAllergenChange('free&health=soy-free')}
                                children="Soy-free"
                            />
                            {/*<input type="checkbox" id="soy-free" name="allergen" value="free&health=soy-free" onChange={() => handleAllergenChange('free&health=soy-free')} />*/}
                            {/*<label htmlFor="soy-free">Soy-free</label>*/}


                            <CheckboxComponent
                                // classBox="14"
                                label="wheat"
                                type="checkbox"
                                checkBoxId="wheat"
                                name="allergen"
                                value="wheat"
                                changeHandler={() => handleAllergenChange('free&health=wheat-free')}
                                children="Wheat-free"
                            />
                            {/*<input type="checkbox" id="wheat-free" name="allergen" value="free&health=wheat-free" onChange={() => handleAllergenChange('free&health=wheat-free')} />*/}
                            {/*<label htmlFor="wheat-free">Wheat-free</label>*/}
                        </span>
                        </div>
                        {console.log(allergenToExclude)}
                    </form>

                </div>
            <div className="content-container-search3">
                {recipes.map((recipe) => {
                    return( <SearchCard
                            key={recipe.recipe.uri}
                            title={recipe.recipe.label}
                            calories={recipe.recipe.calories}
                            image={recipe.recipe.image}
                            id={recipe.recipe.uri.split("_")[1]}
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

// <div>
//     <InputComponent
//         inputId="search"
//         inputType="text"
//         inputName="search"
//         inputPlaceholder="search her for you recipes"
//         value={search}
//         changeHandler={updateSearch}
//         validationRules={{
//             required: {
//                 value: true,
//                 message:"this field is required",
//             },
//         }}
//         register={register}
//         errors={errors}
//     />
//     <Button
//         name="search-button"
//         type="submit"
//         children="Search"
//     />
// </div>