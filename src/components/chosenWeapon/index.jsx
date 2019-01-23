import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./chosenWeapon.scss";

export default observer(({ icon, playerName, isWinner }) => {
    return (
        <div className={`chosen-weapon ${isWinner ? "chosen-weapon--winner" : ""}`}>
            {(icon) ? <FontAwesomeIcon className="chosen-weapon__icon" icon={icon}/> : null}
            {isWinner ? <h3>{playerName} won!</h3>: ""}
        </div>);
});