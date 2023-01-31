import {Link} from "react-router-dom";

//massage for favorites page if no favorites are saved
// redirect to search page.


const NoFavoritesFound = ({ favoritesFound}) => {
    return(
        <>
            {
                !favoritesFound && <Link to="/Search">
                    <p>No favorite recipes yet.</p>
                    <p><span>Search</span> for your favorite recipes!</p>
                </Link>
            }
        </>
    )
}

export default NoFavoritesFound