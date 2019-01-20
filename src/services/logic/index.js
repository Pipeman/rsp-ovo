import weapons from "../weapons";

const playsMissingError = new Error("getWinner must receive 2 plays");

export function getWinner(plays) {
    if (!plays || plays.length !== 2 || !weapons.includes(plays[0]) || !weapons.includes(plays[1])) {
        throw playsMissingError;
    }

    const [player1, player2] = plays;
    const player1Weapon = player1.name;
    const player2Weapon = player2.name;

    if (player1Weapon === player2Weapon) {
        return null
    } else if (player1.winsAgainst.includes(player2Weapon)) {
        return player1;
    } else if (player2.winsAgainst.includes(player1Weapon)) {
        return player2;
    }
};