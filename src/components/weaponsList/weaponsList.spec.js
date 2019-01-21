import React from "react";
import { configure as enzymeConfigure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { observable, configure } from "mobx";
import weapons from "../../services/weapons";
import WeaponsList from ".";

enzymeConfigure({ adapter: new Adapter() });

describe("WeaponsList", () => {
    let store;

    beforeEach(() => {
        configure({
            enforceActions: "never",
        });
        store = observable({
            playersNames: ["player1", "player2"],
            weapons,
            setPlayerWeapon: jest.fn(),
        });
    });

    it("should rendered correctly", () => {
        const component = shallow(<WeaponsList store={store}/>);
        expect(component).toMatchSnapshot();
    });
});