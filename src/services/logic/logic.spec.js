import { getWinner } from ".";
import weapons from "../weapons";

fdescribe("getWinner", () => {

    it("should be defined", () => {
        expect(getWinner).toBeDefined();
    });

    it("should be a function", () => {
        expect(getWinner).toBeInstanceOf(Function);
    });

    it("should throw if it does not receives an array with 2 plays", () => {
        const errorMessage = "getWinner must receive 2 plays";
        expect(() => getWinner()).toThrowError(errorMessage);
        expect(() => getWinner([])).toThrowError(errorMessage);
        expect(() => getWinner([{}])).toThrowError(errorMessage);
        expect(() => getWinner([{}, {}])).toThrowError(errorMessage);
        expect(() => getWinner([{}, {}, {}])).toThrowError(errorMessage);
    });

    it("sould not throw when passed an array with 2 plays", () => {
        expect(() => getWinner([weapons[1], weapons[2]])).not.toThrowError();
    });

    it("should return null when the 2 plays are the same", () => {
        expect(getWinner([weapons[0], weapons[0]])).toBeNull();
        expect(getWinner([weapons[1], weapons[1]])).toBeNull();
        expect(getWinner([weapons[2], weapons[2]])).toBeNull();
    });

    it("should return the winner between the 2 plays", () => {
        const [rock, scissors, paper] = weapons;
        const rockVsScissors = [rock, scissors];
        expect(getWinner(rockVsScissors)).toBe(rock);
        const scissorsVsPaper = [scissors, paper];
        expect(getWinner(scissorsVsPaper)).toBe(scissors);
        const paperVsRock = [paper, rock];
        expect(getWinner(paperVsRock)).toBe(paper);
        const scissorsVsRock = [scissors, rock];
        expect(getWinner(scissorsVsRock)).toBe(rock);
        const paperVsScissors = [paper, scissors];
        expect(getWinner(paperVsScissors)).toBe(scissors);
        const rockVsPaper = [rock, paper];
        expect(getWinner(rockVsPaper)).toBe(paper);
    });
});