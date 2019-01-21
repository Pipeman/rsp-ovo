import { configure } from "mobx";
import Store from ".";
import weapons from "../services/weapons";
import { getWinner } from "../services/logic";

jest.mock("../services/logic");

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

    describe("resetScore", () => {

        it("should be defined", () => {
            expect(store.resetScore).toBeDefined();
        });

        it("should be a method", () => {
            expect(store.resetScore).toBeInstanceOf(Function);
        });

        it("should set the scores to 0", () => {
            store.score[store.playersNames[0]] = 10;
            store.score[store.playersNames[1]] = 99;
            store.resetScore();
            expect(store.score[store.playersNames[0]]).toBe(0);
            expect(store.score[store.playersNames[1]]).toBe(0);
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
            expect(() => store.setPlayerWeapon("player1")).toThrow(errorMessage);
            expect(() => store.setPlayerWeapon("player1", null)).toThrow(errorMessage);
            expect(() => store.setPlayerWeapon("player1", {})).toThrow(errorMessage);
        });

        it("should accept a string and a weapon", () => {
            expect(() => store.setPlayerWeapon("player1", weapons[1])).not.toThrow();
        });

        it("should store the players weapon in the Store", () => {
            store.setPlayerWeapon("player1", weapons[1]);
            expect(store.currentGame.player1).toEqual(weapons[1]);
            store.setPlayerWeapon("player2", weapons[1]);
            expect(store.currentGame.player2).toEqual(weapons[1]);
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
            expect(() => store.updateScoreForPlayer("player1")).not.toThrow();
        });

        it("should add 1 to the score of the player passed as attribute", () => {
            store.updateScoreForPlayer("player1");
            expect(store.score.player1).toBe(1);
            store.updateScoreForPlayer("player2");
            expect(store.score.player2).toBe(1);
        });
    });

    describe("setCurrentGameWinner", () => {

        beforeEach(() => {
            store.updateScoreForPlayer = jest.fn(store.updateScoreForPlayer);
            getWinner.mockReturnValue("player1");
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

        it("should throw if it does not receives an array with 2 plays", () => {
            const errorMessage = "setCurrentGameWinner requires 2 plays";
            expect(() => store.setCurrentGameWinner()).toThrowError(errorMessage);
            expect(() => store.setCurrentGameWinner([])).toThrowError(errorMessage);
            expect(() => store.setCurrentGameWinner([{}])).toThrowError(errorMessage);
            expect(() => store.setCurrentGameWinner([{}, {}])).toThrowError(errorMessage);
            expect(() => store.setCurrentGameWinner([{}, {}, {}])).toThrowError(errorMessage);
        });

        it("should not throw when receiving an array with 2 plays", () => {
            expect(() => store.setCurrentGameWinner([weapons[0], weapons[2]])).not.toThrow();
        });

        it("should call the getWinner service", () => {
            const plays = [weapons[0], weapons[2]];
            store.setCurrentGameWinner(plays);
            expect(getWinner).toHaveBeenCalledTimes(1);
            expect(getWinner).toHaveBeenCalledWith(plays, store.playersNames);
        });

        it("should update the score", () => {
            store.setCurrentGameWinner([weapons[0], weapons[2]]);
            expect(store.updateScoreForPlayer).toHaveBeenCalledTimes(1);
            expect(store.updateScoreForPlayer).toHaveBeenCalledWith("player1");
        });

        it("should update the score accordingly to the winner", () => {
            const [rock, scissors] = weapons;
            const rockVsScissors = [rock, scissors];
            store.setCurrentGameWinner(rockVsScissors)
            expect(store.score.player1).toBe(1);
            expect(store.score.player2).toBe(0);
        });
    });
});