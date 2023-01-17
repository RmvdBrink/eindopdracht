import {Link} from "react-router-dom";

const NoFavoritesFound = ({ favoritesFound}) => {
    return(
        <>
            {
                !favoritesFound && <Link to="/Search" className="no-favorites">
                    <p>No favorite recipes yet.</p>
                    <p><span>Search</span> for your favorite recipes!</p>
                </Link>
            }
        </>
    )
}

export default NoFavoritesFound