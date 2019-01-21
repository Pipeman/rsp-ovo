import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { faHandScissors } from "@fortawesome/free-solid-svg-icons";

import Weapon from ".";

configure({ adapter: new Adapter() });


describe("Weapon", () => {
    let clickAction;

    beforeEach(() => {
        clickAction = jest.fn();
    });

    it("should rendered correctly", () => {
        const component = shallow(
            <Weapon
                icon={faHandScissors}
                clickAction={() => clickAction()}
            />
        );
        expect(component).toMatchSnapshot();
    });
});