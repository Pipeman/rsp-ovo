import React, { Component } from "react";
import { Provider } from "mobx-react";
import "./App.css";
import Store from "./store";
import WeaponsList from "./components/weaponsList";
import ChosenWeapons from "./components/chosenWeapons";
import Scores from "./components/scores";

const store = new Store();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Scores/>
          <ChosenWeapons/>
          <WeaponsList></WeaponsList>
        </div>
      </Provider>
    );
  }
}

export default App;
