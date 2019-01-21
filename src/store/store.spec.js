import { configure } from "mobx";
import Store from ".";
import weapons from "../services/weapons";
import { getWinner } from "../services/logic";
import { randomWeaponPicker } from "../services/randomWeaponPicker";

jest.mock("../services/logic");
jest.mock("../services/randomWeaponPicker");

describe("store", () => {
    let store;

    beforeEach(() => {
        configure({
            enforceActions: "never",
        });
        store = new Store();
    });
    
    it("should be defined", () => {
        expect(store).toBeDefined();
    });

    describe("initialisePlay", () => {

        beforeEach(() => {
            store.setPlayerWeapon = jest.fn();
            store.setCurrentGameWinner = jest.fn();
        });

        afterEach(() => {
            store.setPlayerWeapon.mockReset();
        });

        it("should be defined", () => {
            expect(store.initialisePlay).toBeDefined();
        });

        it("should be a method", () => {
            expect(store.initialisePlay).toBeInstanceOf(Function);
        });

        it("should set the two players weapons", () => {
            store.initialisePlay("you", weapons[1]);
            expect(store.setPlayerWeapon).toHaveBeenCalledTimes(2);
            expect(store.setPlayerWeapon).toHaveBeenCalledWith("you", weapons[1]);
        });

        it("should set the current game winner", () => {
            store.initialisePlay("you", weapons[1]);
            expect(store.setCurrentGameWinner).toHaveBeenCalledTimes(1);
        });
    });

    describe("randomWeapon", () => {

        beforeEach(() => {
            randomWeaponPicker.mockReturnValue(weapons[2]);
        });

        afterEach(() => {
            randomWeaponPicker.mockReset();
        });

        it("should be defined", () => {
            expect(store.randomWeapon).toBeDefined();
        });

        it("should be a getter", () => {
            expect(() => { store.randomWeapon = {}; }).toThrow();
        });

        it("should call the random weapon picker", () => {
            // eslint-disable-next-line no-unused-expressions
            store.randomWeapon;
            expect(randomWeaponPicker).toHaveBeenCalledTimes(1);
            expect(randomWeaponPicker).toHaveBeenCalledWith(store.weapons);
        });

        it("should return the result of random weapon picker", () => {           
            expect(store.randomWeapon).toBe(weapons[2]);
        });
    });

    describe("setCurrentGameWinner", () => {

        beforeEach(() => {
            store.updateScoreForPlayer = jest.fn(store.updateScoreForPlayer);
            getWinner.mockReturnValue("you");
        });

        afterEach(() => {
            getWinner.mockReset();
        });

        it("should be defined", () => {
            expect(store.setCurrentGameWinner).toBeDefined();
        });

        it("should be a method", () => {
            expect(store.setCurrentGameWinner).toBeInstanceOf(Function);
        });

        it("should call the getWinner service", () => {
            store.currentGame.you = weapons[0];
            store.currentGame.cpu = weapons[2];
            store.setCurrentGameWinner();
            expect(getWinner).toHaveBeenCalledTimes(1);
            expect(getWinner).toHaveBeenCalledWith([store.currentGame.you, store.currentGame.cpu], store.playersNames);
        });

        it("should update the score", () => {
            store.setCurrentGameWinner([weapons[0], weapons[2]]);
            expect(store.updateScoreForPlayer).toHaveBeenCalledTimes(1);
            expect(store.updateScoreForPlayer).toHaveBeenCalledWith("you");
        });

        it("should update the score accordingly to the winner", () => {
            const [rock, scissors] = weapons;
            const rockVsScissors = [rock, scissors];
            store.setCurrentGameWinner(rockVsScissors)
            expect(store.score.you).toBe(1);
            expect(store.score.cpu).toBe(0);
        });
    });

    describe("setPlayerWeapon", () => {

        it("should be defined", () => {
            expect(store.setPlayerWeapon).toBeDefined();
        });

        it("should be a method", () => {
            expect(store.setPlayerWeapon).toBeInstanceOf(Function);
        });

        it("should throw when it does not receive a string and a weapons as attributes", () => {
            const errorMessage = "setPlayerWeapon requires a player and a weapon";
            expect(() => store.setPlayerWeapon()).toThrow(errorMessage);
            expect(() => store.setPlayerWeapon("")).toThrow(errorMessage);
            expect(() => store.setPlayerWeapon("you")).toThrow(errorMessage);
            expect(() => store.setPlayerWeapon("you", null)).toThrow(errorMessage);
            expect(() => store.setPlayerWeapon("you", {})).toThrow(errorMessage);
        });

        it("should accept a string and a weapon", () => {
            expect(() => store.setPlayerWeapon("cpu", weapons[1])).not.toThrow();
        });

        it("should store the players weapon in the Store", () => {
            store.setPlayerWeapon("you", weapons[1]);
            expect(store.currentGame.you).toEqual(weapons[1]);
            store.setPlayerWeapon("cpu", weapons[1]);
            expect(store.currentGame.cpu).toEqual(weapons[1]);
        });
    });

    describe("updateScoreForPlayer", () => {

        it("should be defined", () => {
            expect(store.updateScoreForPlayer).toBeDefined();
        });

        it("should be a method", () => {
            expect(store.updateScoreForPlayer).toBeInstanceOf(Function);
        });

        it("should throw when not receiving a string and a number", () => {
            const errorMessage = "setScore requires a player's name";
            expect(() => store.updateScoreForPlayer()).toThrow(errorMessage);
            expect(() => store.updateScoreForPlayer("")).toThrow(errorMessage);
            expect(() => store.updateScoreForPlayer("player5678")).toThrow(errorMessage);
            expect(() => store.updateScoreForPlayer([])).toThrow(errorMessage);
        });

        it("should not throw when receiving a players name", () => {
            expect(() => store.updateScoreForPlayer("you")).not.toThrow();
        });

        it("should add 1 to the score of the player passed as attribute", () => {
            store.updateScoreForPlayer("you");
            expect(store.score.you).toBe(1);
            store.updateScoreForPlayer("cpu");
            expect(store.score.cpu).toBe(1);
        });
    });
});