import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./weapon.scss";

const Weapon = observer(({ clickAction, icon}) => (
	<button
		className="weapon"
		onClick={clickAction}
	>
    	<FontAwesomeIcon icon={icon}/>
	</button>
));

export default Weapon;