import React from "react";
import { inject, observer } from "mobx-react";

import "./welcome.scss";

const Welcome = inject("store")(
    observer(({ store }) => store.isGameStarted ? null : <h2 className="welcome-message">Select one of the weapons below to start a game</h2>
));

export default Welcome;