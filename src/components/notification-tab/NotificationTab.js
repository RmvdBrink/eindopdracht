import React, { useEffect} from 'react';




const NoRecipesFound = ({ text, setShowNotificationTab}) => {

    // Remove tab after 2.5 seconds of display
    useEffect(() => {
        setTimeout(() => {
            setShowNotificationTab(false);
        }, 2500)
    }, [setShowNotificationTab]);

    return(
        <div className="notification-tab" onClick={() => setShowNotificationTab(false)}>
            <div className="container">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default NoRecipesFound;