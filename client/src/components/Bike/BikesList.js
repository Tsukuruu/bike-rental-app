import React from "react";
import { observer } from "mobx-react-lite";

import "./BikesList.css";
import BikeItem from "./BikeItem";

const BikesList = observer((props) => {
  return (
    <div className={props.className + " bikes-list"}>
      {props.store.map((bike) => {
        return (
          <BikeItem
            key={bike.id}
            id={bike.id}
            name={bike.name}
            type={bike.type.title}
            rentalPrice={bike.rentalPrice}
            rentalTimestamp={bike.rentalTimestamp}
            isRented={bike.isRented}
          />
        );
      })}
    </div>
  );
});

export default BikesList;
