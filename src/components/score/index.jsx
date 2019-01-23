import React from "react";
import { observer } from "mobx-react";

import "./score.scss";

export default observer(({ name, score }) => (
    <div className="score">
        <h3 className="score__player">{name}</h3>
        <h2 className="score__number">{score}</h2>
    </div>
));