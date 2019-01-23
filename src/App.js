import React, { Component } from "react";
import { Provider } from "mobx-react";
import "./App.scss";
import Store from "./store";
import WeaponsList from "./components/weaponsList";
import ChosenWeapons from "./components/chosenWeapons";
import Scores from "./components/scores";
import Welcome from "./components/welcome";

const store = new Store();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Scores/>
          <Welcome/>
          <ChosenWeapons/>
          <WeaponsList></WeaponsList>
        </div>
      </Provider>
    );
  }
}

export default App;
