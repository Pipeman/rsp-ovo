import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./scores.scss";
import Score from "../score";

class Scores extends Component {
    playersNames = this.props.store.playersNames;
    score = this.props.store.score;

    render() {
        return (
            <header className="scores">
                {this.playersNames.map((name, index) => (
                    <Score
                        score={this.score[name]}
                        name={name}
                        key={index}
                    ></Score>
                ))}
            </header>
        );
    }
}

export default inject("store")(observer(Scores));