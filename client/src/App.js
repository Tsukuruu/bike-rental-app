import React from "react";

import BikesStore from "./store/BikesStore";
import BikesStoreContext from "./store/BikesStoreContext";

import "./App.css";
import NewRentContainer from "./components/Containers/NewRentContainer";
import AvailaiblesContainer from "./components/Containers/AvailablesContainer";
import RentsContainer from "./components/Containers/RentsContainer";

const App = () => {

  return (
    <div className="app">
      <h1 className="header main-header">Awesome Bike Rental</h1>
      <BikesStoreContext.Provider value={new BikesStore()}>
        <NewRentContainer />
        <RentsContainer />
        <AvailaiblesContainer />
      </BikesStoreContext.Provider>
    </div>
  );
};

export default App;
