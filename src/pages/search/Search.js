import React, {useContext, useState} from 'react';
import "./Search.css"
import axios from "axios";
import SearchCard from "../../components/search-card/SearchCard";
import Button from "../../components/button/Button";
import CheckboxComponent from "../../components/chekbox-component/CheckboxComponent";
import DietsCheckboxComponent from "../../components/chekbox-component/diets-components/DietsCheckboxComponent";
import {RecipesContext} from "../../context/RecipesContext";
import SearchContainer from "../../components/serche-container-component/SearcheContainerComponent";
import NotificationTab from "../../components/notification-tab/NotificationTab";
import Loader from "../../components/loader-compenent/LoaderComponent"
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";





const APP_ID = "enter the app id between the brackets"
const APP_KEY = "enter here between the brackets app key"

function Search() {


    const [error, toggleError ] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [selectedAllergen, setSelectedAllergen] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState([])
    const [minCalories, setMinCalories] = useState("");
    const [maxCalories, setMaxCalories] = useState("");
    const [showNotificationTab, setShowNotificationTab] = useState(false);
    const [showFilter, setShowFilter] = useState(false);


    const { recipes, setRecipes } = useContext(RecipesContext);
    const { isAuth } = useContext(AuthContext);

    //convert an array of selected allergens and diets into a string that can be used in a URL query.
    //oin(). In this case, "&" is used as the separator. The resulting string is then assigned to the variables
    // allergenToExclude and dietsToExclude
    const allergenToExclude = selectedAllergen.join("&");
    const dietsToExclude = selectedDiet.join("&");


    //function that requests min and max kcal for recipe filter
    const calorieRange = ("calories=")
    const combineMinMaxCalorie = minCalories.toString().concat('-',  maxCalories.toString());
    let totalCalorieRange = calorieRange.concat(combineMinMaxCalorie)

    if (totalCalorieRange === "calories=-") {
        totalCalorieRange= "";
    }
    //function that shows the filter options by clicking the button
    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };


    //function that retrieves recipes with api call, take into account multiple parameters to perform specific filtering commands
    //it also does the data formatting to a
    //   recipe object containing only the data I need to display on the screen and save for favorites
    const searchForRecipes = async (query) => {
        if (query === "") return;



        toggleLoading(true);

        try {
            toggleError(false);
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&${dietsToExclude}&${allergenToExclude}&${totalCalorieRange}`);
            const recipes = getRequiredRecipesData(response.data.hits);
            setRecipes(recipes);
            toggleError(false);
            if (response.data.hits.length === 0) {
                setShowNotificationTab(true);
            } else {
                setShowNotificationTab(false);
            }


        } catch (e) {
            toggleError(true);
        }


        toggleLoading(false);


    }



    //that takes an array of "recipes" as an argument, and returns an array of objects that contain specific properties
    //of the recipes. The map() method is used to iterate through the array of recipes, and for each recipe, a new
    // object is created with properties

    const getRequiredRecipesData = (recipes) => {
        return recipes.map((recipe) => {
            let largeImage = recipe.recipe.images.LARGE !== undefined ?
                recipe.recipe.images.LARGE.url :
                recipe.recipe.images.REGULAR.url ;

            return {
                name: recipe.recipe.label,
                prepTime: recipe.recipe.totalTime,
                ingredients: recipe.recipe.ingredientLines,
                calories: recipe.recipe.calories,
                cuisineType: recipe.recipe.cuisineType,
                mealType: recipe.recipe.mealType,
                dishType: recipe.recipe.dishType,
                uri: recipe.recipe.uri,
                image: recipe.recipe.images.SMALL.url,
                largeImage: largeImage
            }
        });
    }

    // function getSearch that takes an event object e as an argument. The function is used to handle a form submission
    // or a button click event. The first line e.preventDefault() prevents the default behavior of the event, which is to refresh the page when the form is submitted or the button is clicked.

    const getSearch = e => {
        e.preventDefault();
        setMaxCalories("")
        setMinCalories("")

    }
    // Add a function that will run when an allergen is selected or deselected
    const handleAllergenChange = (allergen) => {
        // Check if the allergen is already in the list of selected allergens
        if (selectedAllergen.includes(allergen)) {
            // Remove the allergen from the list
            setSelectedAllergen(selectedAllergen.filter((a) => a !== allergen));
        } else {
            // Add the allergen to the list
            setSelectedAllergen([...selectedAllergen, allergen]);
        }
    }

    // Add a function that will be executed when a diet is selected or deselected
    const handleDietsChange = (diets) => {
        // Check if the diet is already in the list of selected diets
        if (selectedDiet.includes(diets)) {
            // Remove the diet from the list
            setSelectedDiet(selectedDiet.filter((a) => a !== diets));
        } else {
            // Add the diet to the list
            setSelectedDiet([...selectedDiet, diets]);
        }
    }


    return (
        <>

    <main className="outer-content-container-search">
        <section className="inner-content-container-search">
            <div className="content-container-search1">
                <div className="content-title-container-search1">
                <h2>Recipes Search page</h2>
                <p> Find healthy recipes that contributes to your daily life!</p>
                <p>Welcome to the Recipes Search page, where you can find healthy recipes that contribute to your daily life! As a user, you can always search for recipes using a keyword, but to make use of the full functionality of the page, you will need to log in. </p>
                    <p> Once logged in, you will have access to search filters for dietary restrictions and allergies, and the ability to save your favorite recipes for easy access later.</p>
                    <p>Enter a product you are looking for and the search engine returns a maximum of twenty recipes if they can be found in our database.</p>
                    <p>Scroll through the search results looking for great recipes</p>
                    <p>Found a nice recipe, click on it and a window at the bottom of the page will open with the detailed recipe</p>
                    <p>Finally, when you are logged in, you can easily save and delete recipes.</p>
                    <p>Enjoy our wonderful recipes !</p>
                </div>
            </div>
            <div className="content-container-search1-title-text">

            </div>
            {error && <p>Something went wrong while retrieving the data</p>}

                <div className="content-container-search2">

                    <form onSubmit={getSearch} >
                        <div className="search-bar-content-container-search2">
                        {showNotificationTab ? <NotificationTab text="No recipes found for your search" setShowNotificationTab={setShowNotificationTab} /> : null}
                        <SearchContainer searchForRecipes={searchForRecipes} />
                            {loading ? <Loader /> : null}
                        <div>
                            {isAuth ?
                                <div className="content-container-search2-button">
                                    <Button name="material-symbols-outlined"
                                        clickHandler={toggleFilter}
                                        children="filter_list"/>
                                    Search filter :
                                </div>:<Link to="/sign-in"> <p className="material-symbols-outlined">nutrition click to sign in</p></Link>
                            }
                            <div className="min-max-input-field-kcal" style={{ display: showFilter ? "block" : "none" }}>
                                <label className="kcal-label" htmlFor="min-kcal ">
                                    Min-kcal :
                                </label>
                                <input
                                    type="text"
                                    id="kcal"
                                    name="kcal"
                                    placeholder="min value 100 kcal"
                                    value={minCalories}
                                    onChange={(e) => setMinCalories(e.target.value)}
                                />

                                <label className="kcal-label" htmlFor="max-kcal">
                                    Max-Kcal :
                                </label>
                                <input
                                    type="text"
                                    id="kcal"
                                    name="kcal"
                                    placeholder="max value 3000 kcal"
                                    value={maxCalories}
                                    onChange={(e) => setMaxCalories(e.target.value)}
                                />

                            </div>
                        </div>
                        <label className="search-label" htmlFor="allergens" style={{ display: showFilter ? "flex" : "none" }}>Allergies :</label>
                        <div className="checkbox-content-container-search2" style={{ display: showFilter ? "flex" : "none" }}>
                        {/* Make the radiobox-menu for allergenen */}

                            <span className="cel1" style={{ display: showFilter ? "flex" : "none" }}>

                            <CheckboxComponent
                            label="gluten"
                            type="checkbox"
                            checkBoxId="gluten"
                            name="allergen"
                            value="gluten"
                            changeHandler={() => handleAllergenChange('health=gluten-free')}
                            children="Gluten-free"
                            />

                            <CheckboxComponent
                                label="dairy"
                                type="checkbox"
                                checkBoxId="dairy"
                                name="allergen"
                                value="dairy"
                                changeHandler={() => handleAllergenChange('health=dairy-free')}
                                children="Dairy-free"
                            />

                            <CheckboxComponent
                                label="fish"
                                type="checkbox"
                                checkBoxId="fish"
                                name="allergen"
                                value="fish"
                                changeHandler={() => handleAllergenChange('health=fish-free')}
                                children="Fish-free"
                            />

                            <CheckboxComponent
                                label="crustacean"
                                type="checkbox"
                                checkBoxId="crustacean"
                                name="allergen"
                                value="crustacean"
                                changeHandler={() => handleAllergenChange('health=crustacean-free')}
                                children="Crustacean-free"
                            />

                            <CheckboxComponent
                                label="lupine"
                                type="checkbox"
                                checkBoxId="lupine"
                                name="allergen"
                                value="lupine"
                                changeHandler={() => handleAllergenChange('health=lupine-free')}
                                children="Lupine-free"
                            />

                            <CheckboxComponent
                                label="peanut-free"
                                type="checkbox"
                                checkBoxId="peanut"
                                name="allergen"
                                value="peanut"
                                changeHandler={() => handleAllergenChange('health=peanut-free')}
                                children="Peanut-free"
                            />

                            <CheckboxComponent
                                label="tree-Nut"
                                type="checkbox"
                                checkBoxId="tree-Nut"
                                name="allergen"
                                value="tree-Nut"
                                changeHandler={() => handleAllergenChange('health=tree-Nut-free')}
                                children="Tree-Nut-free"
                            />

                            </span>
                            <span className="cel2" style={{ display: showFilter ? "flex" : "none" }}>
                            <CheckboxComponent
                                label="shellfish"
                                type="checkbox"
                                checkBoxId="shellfish"
                                name="allergen"
                                value="shellfish"
                                changeHandler={() => handleAllergenChange('health=shellfish-free')}
                                children="Shellfish-free"
                            />

                            <CheckboxComponent
                                label="celery"
                                type="checkbox"
                                checkBoxId="celery"
                                name="allergen"
                                value="celery"
                                changeHandler={() => handleAllergenChange('health=celery-free')}
                                children="Celery-free"
                            />

                            <CheckboxComponent
                                label="egg"
                                type="checkbox"
                                checkBoxId="egg"
                                name="allergen"
                                value="egg"
                                changeHandler={() => handleAllergenChange('health=egg-free')}
                                children="Egg-free"
                            />

                            <CheckboxComponent
                                label="mustard"
                                type="checkbox"
                                checkBoxId="mustard"
                                name="allergen"
                                value="mustard"
                                changeHandler={() => handleAllergenChange('health=mustard-free')}
                                children="Mustard-free"
                            />

                            <CheckboxComponent
                                label="sesame"
                                type="checkbox"
                                checkBoxId="sesame"
                                name="allergen"
                                value="sesame"
                                changeHandler={() => handleAllergenChange('health=sesame-free')}
                                children="Sesame-free"
                            />

                            <CheckboxComponent
                                label="soy-free"
                                type="checkbox"
                                checkBoxId="soy"
                                name="allergen"
                                value="soy"
                                changeHandler={() => handleAllergenChange('health=soy-free')}
                                children="Soy-free"
                            />

                            <CheckboxComponent
                                label="wheat"
                                type="checkbox"
                                checkBoxId="wheat"
                                name="allergen"
                                value="wheat"
                                changeHandler={() => handleAllergenChange('health=wheat-free')}
                                children="Wheat-free"
                            />

                        </span>
                        </div>


                        {/* Maak het radiobox-menu voor diets */}
                        <label className="search-label" htmlFor="diets" style={{ display: showFilter ? "flex" : "none" }}>Diets :</label>
                        <div className="checkbox-content-container-search2" style={{ display: showFilter ? "flex" : "none" }}>


                            <span className="cel1" style={{ display: showFilter ? "flex" : "none" }}>



                            <DietsCheckboxComponent
                                label="balanced"
                                type="checkbox"
                                checkBoxId="balanced"
                                name="diets"
                                value="diet=balanced&"
                                changeHandler={() => handleDietsChange('diet=balanced&')}
                                children="Balanced"
                            />

                            <DietsCheckboxComponent
                                label="high-fiber"
                                type="checkbox"
                                checkBoxId="high-fiber"
                                name="diets"
                                value="diet=high-fiber&"
                                changeHandler={() => handleDietsChange('diet=high-fiber&')}
                                children="High-Fiber"
                            />

                            <DietsCheckboxComponent
                                label="high-protein"
                                type="checkbox"
                                checkBoxId="high-protein"
                                name="diets"
                                value="diet=high-protein&"
                                changeHandler={() => handleDietsChange('diet=high-protein&')}
                                children="High-Protein"
                            />


                            <DietsCheckboxComponent
                                label="low-Carb"
                                type="checkbox"
                                checkBoxId="low-Carb"
                                name="diets"
                                value="diet=low-Carb&"
                                changeHandler={() => handleDietsChange('diet=low-carb&')}
                                children="Low-Carb"
                            />

                            <DietsCheckboxComponent
                                label="low-fat"
                                type="checkbox"
                                checkBoxId="low-fat&"
                                name="diets"
                                value="diet=low-fat"
                                changeHandler={() => handleDietsChange('diet=low-fat&')}
                                children="Low-Fat"
                            />

                            <DietsCheckboxComponent
                                label="low-sodium"
                                type="checkbox"
                                checkBoxId="low-sodium&"
                                name="diets"
                                value="diet=low-sodium"
                                changeHandler={() => handleDietsChange('diet=low-sodium&')}
                                children="Low-Sodium"
                            />
                            <DietsCheckboxComponent
                                label="alcohol-free"
                                type="checkbox"
                                checkBoxId="alcohol-free"
                                name="allergen"
                                value="health=alcohol-free"
                                changeHandler={() => handleAllergenChange('health=alcohol-free')}
                                children="Alcohol-free"
                            />

                            <DietsCheckboxComponent
                                label="keto"
                                type="checkbox"
                                checkBoxId="keto"
                                name="allergen"
                                value="health=keto-friendly"
                                changeHandler={() => handleAllergenChange('health=keto-friendly')}
                                children="Keto"
                            />

                            <DietsCheckboxComponent
                                label="kidney-friendly"
                                type="checkbox"
                                checkBoxId="kidney-friendly"
                                name="allergen"
                                value="health=kidney-friendly"
                                changeHandler={() => handleAllergenChange('health=kidney-friendly')}
                                children="Kidney-friendly"
                            />

                            <DietsCheckboxComponent
                                label="kosher"
                                type="checkbox"
                                checkBoxId="kosher"
                                name="allergen"
                                value="health=kosher"
                                changeHandler={() => handleAllergenChange('health=kosher')}
                                children="Kosher"
                            />

                             </span>
                            <span className="cel2" style={{ display: showFilter ? "flex" : "none" }}>

                            <DietsCheckboxComponent
                                label="low-potassium"
                                type="checkbox"
                                checkBoxId="low-potassium"
                                name="allergen"
                                value="health=low-potassium"
                                changeHandler={() => handleAllergenChange('health=low-potassium')}
                                children="Low-Potassium"
                            />

                            <DietsCheckboxComponent
                                label="no-oil-added"
                                type="checkbox"
                                checkBoxId="no-oil-added"
                                name="allergen"
                                value="health=no-oil-added"
                                changeHandler={() => handleAllergenChange('health=no-oil-added')}
                                children="No oil added"
                            />

                            <DietsCheckboxComponent
                                label="low-sugar"
                                type="checkbox"
                                checkBoxId="low-sugar"
                                name="allergen"
                                value="health=low-sugar"
                                changeHandler={() => handleAllergenChange('health=low-sugar')}
                                children="Low-sugar"
                            />

                            <DietsCheckboxComponent
                                label="paleo"
                                type="checkbox"
                                checkBoxId="paleo"
                                name="allergen"
                                value="health=paleo"
                                changeHandler={() => handleAllergenChange('health=paleo')}
                                children="Paleo"
                            />

                           <DietsCheckboxComponent
                               label="pescatarian"
                               type="checkbox"
                               checkBoxId="pescatarian"
                               name="allergen"
                               value="health=pescatarian"
                               changeHandler={() => handleAllergenChange('health=pescatarian')}
                               children="Pescatarian"
                           />

                           <DietsCheckboxComponent
                               label="pork-free"
                               type="checkbox"
                               checkBoxId="pork-free"
                               name="allergen"
                               value="health=pork-free"
                               changeHandler={() => handleAllergenChange('health=pork-free')}
                               children="Pork-free"
                           />

                            <DietsCheckboxComponent
                                label="red-meat-free"
                                type="checkbox"
                                checkBoxId="red-meat-free"
                                name="allergen"
                                value="health=red-meat-free"
                                changeHandler={() => handleAllergenChange('health=red-meat-free')}
                                children="Red-meat-free"
                            />

                            <DietsCheckboxComponent
                                label="sugar-conscious"
                                type="checkbox"
                                checkBoxId="sugar-conscious"
                                name="allergen"
                                value="health=sugar-conscious"
                                changeHandler={() => handleAllergenChange('health=sugar-conscious')}
                                children="Sugar-conscious"
                            />
                                <DietsCheckboxComponent
                                    label="vegan"
                                    type="checkbox"
                                    checkBoxId="vegan"
                                    name="allergen"
                                    value="health=vegan"
                                    changeHandler={() => handleAllergenChange('health=vegan')}
                                    children="Vegan"
                                />

                                <DietsCheckboxComponent
                                    label="vegetarian"
                                    type="checkbox"
                                    checkBoxId="vegetarian"
                                    name="allergen"
                                    value="health=vegetarian"
                                    changeHandler={() => handleAllergenChange('health=vegetarian')}
                                    children="Vegetarian"
                                />
                        </span>
                        </div>

                        </div>
                    </form>

                </div>
            {recipes.length > 0 ? <div className="content-container-search3">

            {recipes.length > 0 ? <SearchCard recipes={recipes}/> : null}


            </div> : null}
        </section>
    </main>

        </>
    );
}

export default Search;
