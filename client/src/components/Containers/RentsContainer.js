import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import BikesStoreContext from '../../store/BikesStoreContext';

import BikesList from '../Bike/BikesList';

const RentsContainer = observer(props => {

    const store = useContext(BikesStoreContext);

    return (
        <div className="rents">
            <h3 className="rents__header secondary-header">
                🤩 Your rent (Total: ${ store.totalRentedPrice })
            </h3>
            <BikesList store={store.rentedBikes} className="rents__list"/>
        </div>
    )
});

export default RentsContainer;