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
        const errorMessage = "getWinner must receive 2 plays and the players' names";
        expect(() => getWinner()).toThrowError(errorMessage);
        expect(() => getWinner(undefined, ["player1", "player2"])).toThrowError(errorMessage);
        expect(() => getWinner([], ["player1", "player2"])).toThrowError(errorMessage);
        expect(() => getWinner([{}], ["player1", "player2"])).toThrowError(errorMessage);
        expect(() => getWinner([{}, {}, {}], ["player1", "player2"])).toThrowError(errorMessage);
    });

    it("should throw if it does not receives the weapons list", () => {
        const errorMessage = "getWinner must receive 2 plays and the players' names";
        const plays = [weapons[1], weapons[0]];
        expect(() => getWinner(plays)).toThrowError(errorMessage);
        expect(() => getWinner(plays, [])).toThrowError(errorMessage);
        expect(() => getWinner(plays, ["", "", ""])).toThrowError(errorMessage);
    });

    it("sould not throw when passed an array with 2 plays and the players' names", () => {
        expect(() => getWinner([weapons[1], weapons[2]], ["", ""])).not.toThrowError();
    });

    it("should return null when the 2 plays are the same", () => {
        expect(getWinner([weapons[0], weapons[0]], ["weapons", "shields"])).toBeNull();
        expect(getWinner([weapons[1], weapons[1]], ["weapons", "shields"])).toBeNull();
        expect(getWinner([weapons[2], weapons[2]], ["weapons", "shields"])).toBeNull();
    });

    describe("when scissors are selected", () => {

        it("should beat paper and lizard", () => {
            const scissors = weapons[1];
            const paper = weapons[2];
            const lizard = weapons[3];
            const playersNames = ["player1", "player2"];
            const scissorsVsPaper = [scissors, paper];
            expect(getWinner(scissorsVsPaper, playersNames)).toBe(playersNames[0]);
            const scissorsVsLizard = [scissors, lizard];
            expect(getWinner(scissorsVsLizard, playersNames)).toBe(playersNames[0]);
        });
    });

    describe("when spock is selected", () => {

        it("should beat rock and scissors", () => {
            const rock = weapons[0];
            const scissors = weapons[1];
            const spock = weapons[4];
            const playersNames = ["player1", "player2"];
            const spockVsScissors = [spock, scissors];
            expect(getWinner(spockVsScissors, playersNames)).toBe(playersNames[0]);
            const spockVsRock = [spock, rock];
            expect(getWinner(spockVsRock, playersNames)).toBe(playersNames[0]);
        });
    });

    it("should return the winner between the 2 plays", () => {
        const [rock, scissors, paper] = weapons;
        const playersNames = ["player1", "player2"];
        const rockVsScissors = [rock, scissors];
        expect(getWinner(rockVsScissors, playersNames)).toBe(playersNames[0]);
        const scissorsVsPaper = [scissors, paper];
        expect(getWinner(scissorsVsPaper, playersNames)).toBe(playersNames[0]);
        const paperVsRock = [paper, rock];
        expect(getWinner(paperVsRock, playersNames)).toBe(playersNames[0]);
        const scissorsVsRock = [scissors, rock];
        expect(getWinner(scissorsVsRock, playersNames)).toBe(playersNames[1]);
        const paperVsScissors = [paper, scissors];
        expect(getWinner(paperVsScissors, playersNames)).toBe(playersNames[1]);
        const rockVsPaper = [rock, paper];
        expect(getWinner(rockVsPaper, playersNames)).toBe(playersNames[1]);
    });
});
