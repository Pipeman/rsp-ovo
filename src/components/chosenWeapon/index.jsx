import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./chosenWeapon.css";

export default observer(({ icon, playerName, isWinner }) => {
    return (
        <div className="chosen-weapon">
            <h2 className="chosen-weapon__title">{playerName}</h2>
            {(icon) ? <FontAwesomeIcon className="chosen-weapon__icon" icon={icon}/> : null}
            <h3>{isWinner ? `${playerName} won!`: ""}</h3>
        </div>);
});