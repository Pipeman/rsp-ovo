import { configure, decorate, observable, action, computed } from "mobx";
import weapons from "../services/weapons";
import { getWinner } from "../services/logic";
import { randomWeaponPicker } from "../services/randomWeaponPicker";

const noPlayerAndWeaponError = new Error("setPlayerWeapon requires a player and a weapon");
const invalidScoreFormatError = new Error("setScore requires a player's name");

const playersNamesDefault = ["you", "cpu"];

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
    currentGameWinner = "";
    weapons = weapons;

    initialisePlay(player, weapon) {
        this.resetGameWinner();
        this.setPlayerWeapon(player, weapon);

        const otherPlayer = this.playersNames.find(name => name !== player);
        this.setPlayerWeapon(otherPlayer, this.randomWeapon);
        
        this.setCurrentGameWinner(this.currentGame);
    }
    get randomWeapon() {
        return randomWeaponPicker(this.weapons);
    }
    get winner() {
        return this.currentGameWinner;
    }
    resetGameWinner() {
        this.currentGameWinner = "";
    }
    setCurrentGameWinner() {
        const plays = [this.currentGame[this.playersNames[0]], this.currentGame[this.playersNames[1]]];
        const winner = getWinner(plays, this.playersNames);
        if (winner) {
            this.updateScoreForPlayer(winner);
            this.currentGameWinner = winner;
        }
    }
    setPlayerWeapon(player, weapon) {
        if (!player || !this.playersNames.includes(player) || !weapon || !this.isWeapon(weapon)) {
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
    isWeapon(weaponTested) {
        return !!this.weapons.find(({ name, winsAgainst }) => {
            const isNameEqual = name === weaponTested.name;
            const isWinsAgainstEqual = JSON.stringify(winsAgainst) === JSON.stringify(weaponTested.winsAgainst);

            return isNameEqual && isWinsAgainstEqual;
        });
    }
}

decorate(Store, {
    playersNames: observable,
    score: observable,
    currentGame: observable,
    currentGameWinner: observable,
    weapons: observable,
    randomWeapon: computed,
    resetGameWinner: action,
    initialisePlay: action,
    winner: computed,
    setPlayerWeapon: action,
    updateScoreForPlayer: action,
    setCurrentGameWinner: action,
});

export default Store;