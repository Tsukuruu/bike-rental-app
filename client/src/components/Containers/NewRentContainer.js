import React from 'react';

import NewRentForm from '../NewRentForm/NewRentForm';

const NewRentContainer = props => {
    return (
        <div className="new-rent">
            <h3 className="new-rent__header secondary-header">
                🤑 Create new rent
            </h3>
            <NewRentForm className="new-rent__form"/>
        </div>
    )
}

export default NewRentContainer;