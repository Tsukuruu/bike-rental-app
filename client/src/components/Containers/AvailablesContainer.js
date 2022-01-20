import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import BikesStoreContext from '../../store/BikesStoreContext';

import BikesList from '../Bike/BikesList';

const AvailablesContainer = observer(props => {

    const store = useContext(BikesStoreContext);

    return (
        <div className="availaibles">
            <h3 className="availaibles__header secondary-header">
                🚲 Availaible bicycles ({store.availableBikesCount})
            </h3>
            <BikesList store={ store.availableBikes } className="availaibles__list" />
        </div>
    )
});

export default AvailablesContainer;