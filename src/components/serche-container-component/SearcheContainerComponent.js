import React, { useState, useEffect } from 'react';
import Loader from '../loader-compenent/LoaderComponent';
import Button from "../button/Button";
import "./SearcheContainerComponent.css"

const SearchContainer = ({ searchForRecipes, hideLoader }) => {
    const [input, setInput] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const handleSearchButton = () => {
        if(input === '') return

        searchForRecipes(input);
        setInput('');
        setShowLoader(true);
    }

    // hides loader when recipes are found
    useEffect(() => {
        setShowLoader(false);
    }, [hideLoader])

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

            {showLoader ? <Loader /> : null}
            <div className="overlay"></div>
        </section>
    )
}

export default SearchContainer;