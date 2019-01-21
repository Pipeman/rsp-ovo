import { configure, decorate, observable, action } from "mobx";
import weapons from "../services/weapons";
import { getWinner } from "../services/logic";

const noPlayerAndWeaponError = new Error("setPlayerWeapon requires a player and a weapon");
const invalidScoreFormatError = new Error("setScore requires a player's name");
const invalidPlays = new Error("setCurrentGameWinner requires 2 plays");

const playersNamesDefault = ["player1", "player2"];

configure({
    enforceActions: "observed",
});

class Store {
    playersNames = playersNamesDefault;
    score = {
        [this.playersNames[0]]: 0,
        [this.playersNames[1]]: 0,
    };
    currentGame = {
        [this.playersNames[0]]: {},
        [this.playersNames[1]]: {},
    };
    weapons = weapons;

    resetScore() {
        this.score = {
            [this.playersNames[0]]: 0,
            [this.playersNames[1]]: 0,
        };
    }
    setPlayerWeapon(player, weapon) {
        if (!player || !this.playersNames.includes(player) || !weapon || !this.weapons.includes(weapon)) {
            throw noPlayerAndWeaponError;
        }

        this.currentGame[player] = weapon;
    }
    updateScoreForPlayer(player) {
        if (!player || !this.playersNames.includes(player)) {
            throw invalidScoreFormatError;
        }

        this.score[player]++;
    }
    setCurrentGameWinner(plays) {
        if (!plays || plays.length !== 2 || !this.weapons.includes(plays[0]) || !this.weapons.includes(plays[1])) {
            throw invalidPlays;
        }

        const winner = getWinner(plays, this.playersNames);
        this.updateScoreForPlayer(winner);
    }
}

decorate(Store, {
    playersNames: observable,
    score: observable,
    currentGame: observable,
    setPlayerWeapon: action,
    updateScoreForPlayer: action,
    setCurrentGameWinner: action,
});

export default Store;