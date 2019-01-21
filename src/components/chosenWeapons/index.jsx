import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./chosenWeapons.css";
import ChosenWeapon from "../chosenWeapon";

class ChosenWeapons extends Component {
    playersNames = this.props.store.playersNames;
    currentGame = this.props.store.currentGame;

    render() {
        return (
            <div className="chosen-weapons">
                {this.playersNames.map((name, index) => (
                    <ChosenWeapon
                        icon={this.currentGame[name].icon}
                        playerName={name}
                        isWinner={this.props.store.winner === name}
                        key={index}
                    ></ChosenWeapon>)
                )}
            </div>
        );
    }
}

export default inject("store")(observer(ChosenWeapons));