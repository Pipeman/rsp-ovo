import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { faHandScissors } from "@fortawesome/free-solid-svg-icons";
import ChosenWeapon from ".";

configure({ adapter: new Adapter() });

describe("ChosenWeapon", () => {

    it("should render correctly", () => {
        const component = shallow(<ChosenWeapon icon={faHandScissors}/>);
        expect(component).toMatchSnapshot();
    });
});