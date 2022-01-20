import React, { useContext } from "react";

import BikesStoreContext from "../../store/BikesStoreContext";

import "./BikeItem.css";

const BikeItem = (props) => {

  const store = useContext(BikesStoreContext);

  const getRentTime = timestamp => {

    const rentedAt = new Date(timestamp);

    const MS_IN_HOUR = 3600000;
    const MS_IN_MIN = 60000;

    const diff = (Date.now() - rentedAt);
    const hh = diff / MS_IN_HOUR;
    const mm = (diff % MS_IN_HOUR) / MS_IN_MIN;
    return `${hh.toFixed(0)}h ${mm.toFixed(0)}m`;
  }

  return (
    <div className="bike shadow-card">
      <div className="bike__description">
        {props.name} / {props.type} / ${props.rentalPrice.toFixed(2)} {props.isRented && ` /  ${getRentTime(props.rentalTimestamp)}`}
      </div>

      {props.isRented ? (
        <button
          className="bike__btn cancel-btn"
          onClick={() => {
            store.cancelRent(props.id);
          }}
        >
          Cancel rent
        </button>
      ) : (
        <div className="bike__btn-panel">
          <button
            className="bike__btn rent-btn"
            onClick={() => {
              store.rentBike(props.id);
            }}
          >
            Rent
          </button>
          <button className="bike__btn delete-btn" onClick={() => {
            store.deleteBike(props.id);
          }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default BikeItem;
