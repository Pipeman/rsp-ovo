import React from "react";
import { observer } from "mobx-react";

import "./score.css";

export default observer(({ score }) => (
    <div className="score">
        <h2 className="score__title">{score}</h2>
    </div>
));