import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { faHandRock, faHandScissors, faHandPaper } from "@fortawesome/free-solid-svg-icons";

import Weapon from "../weapon";

class WeaponsList extends Component {
    playerName = this.props.store.playersNames[0];
    weapons = this.props.store.weapons;

    render() {
        const weaponsIcons = {
            [this.weapons[0].name]: faHandRock,
            [this.weapons[1].name]: faHandScissors,
            [this.weapons[2].name]: faHandPaper,
        };
      
        return (
            <div>
                {this.weapons.map((weapon, index) => (
                    <Weapon
                        icon={weaponsIcons[weapon.name]}
                        clickAction={() => this.props.store.setPlayerWeapon(this.playerName, weapon)}
                        key={index}
                    ></Weapon>
                ))}
            </div>
        );
    }
}

export default inject("store")(observer(WeaponsList));