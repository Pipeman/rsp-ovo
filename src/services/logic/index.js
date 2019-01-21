const playsMissingError = new Error("getWinner must receive 2 plays and the players' names");

export function getWinner(plays, playersNames) {
    if (!plays || plays.length !== 2 || !playersNames || playersNames.length !== 2) {
        throw playsMissingError;
    }

    const [player1, player2] = plays;
    const player1Weapon = player1.name;
    const player2Weapon = player2.name;

    if (player1Weapon === player2Weapon) {
        return null
    } else if (player1.winsAgainst.includes(player2Weapon)) {
        return playersNames[0];
    } else if (player2.winsAgainst.includes(player1Weapon)) {
        return playersNames[1];
    }
};