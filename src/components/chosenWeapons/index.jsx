import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./chosenWeapons.scss";
import ChosenWeapon from "../chosenWeapon";

class ChosenWeapons extends Component {
    playersNames = this.props.store.playersNames;
    currentGame = this.props.store.currentGame;

    get chosenWeapon() {
        return this.props.store.isLoading
            ? <h4>Rock... Scissors... Paper...</h4>
            : <div className="chosen-weapons">
                    {this.playersNames.map((name, index) => (
                        <ChosenWeapon
                            icon={this.currentGame[name].icon}
                            playerName={name}
                            isWinner={this.props.store.winner === name}
                            key={index}
                        ></ChosenWeapon>)
                    )}
                </div>;
    }

    render() {
        return this.props.store.isLoading
            ? <h4>Rock... Scissors... Paper...</h4>
            : <div className="chosen-weapons">
                    {this.playersNames.map((name, index) => (
                        <ChosenWeapon
                            icon={this.currentGame[name].icon}
                            playerName={name}
                            isWinner={this.props.store.winner === name}
                            key={index}
                        ></ChosenWeapon>)
                    )}
                </div>;
    }
}

export default inject("store")(observer(ChosenWeapons));