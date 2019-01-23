import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./weaponsList.scss";
import Weapon from "../weapon";

class WeaponsList extends Component {
    playerName = this.props.store.playersNames[0];
    weapons = this.props.store.weapons;

    render() {
        return (
            <div className="weapons-list">
                {this.weapons.map((weapon, index) => (
                    <Weapon
                        icon={weapon.icon}
                        clickAction={() => this.props.store.initialisePlay(this.playerName, weapon)}
                        key={index}
                    ></Weapon>
                ))}
            </div>
        );
    }
}

export default inject("store")(observer(WeaponsList));