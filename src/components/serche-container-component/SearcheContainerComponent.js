import React, {useState} from 'react';
import Button from "../button/Button";
import "./SearcheContainerComponent.css"

const SearchContainer = ({searchForRecipes}) => {
    const [input, setInput] = useState('');

    // when a search button is clicked. The function first checks if the input variable is an empty string
    //variable is not an empty string, it calls the searchForRecipes function and passes in the input
    const handleSearchButton = () => {
        if (input === '') return

        searchForRecipes(input);
        //This clears the input field after the search is performed.
        setInput('');

    }


    return (
        <section>


            <div className="form-item">
                <input className="search-bar"
                       type="text"
                       placeholder="Search for a recipe"
                       value={input}
                       onChange={e => setInput(e.target.value)}
                />

                <Button
                    name="search-button "
                    type="submit"
                    children="Search"
                    clickHandler={handleSearchButton}/>
            </div>


        </section>
    )
}

export default SearchContainer;