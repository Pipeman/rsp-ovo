import { configure, decorate, observable, action, computed } from "mobx";
import weapons from "../services/weapons";
import { getWinner } from "../services/logic";
import { randomWeaponPicker } from "../services/randomWeaponPicker";

const noPlayerAndWeaponError = new Error("setPlayerWeapon requires a player and a weapon");
const invalidScoreFormatError = new Error("setScore requires a player's name");
const invalidIsLoadingError = new Error("setLoadingStatus requires a bolean");

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
    isLoading = false;
    isGameStarted = false;

    initialisePlay(player, weapon) {
        this.isGameStarted = true;
        this.setLoadingStatus(true);

        this.resetGameWinner();
        this.setPlayerWeapon(player, weapon);

        const otherPlayer = this.playersNames.find(name => name !== player);
        this.setPlayerWeapon(otherPlayer, this.randomWeapon);

        setTimeout(() => {
            this.setCurrentGameWinner(this.currentGame);
            this.setLoadingStatus(false);
        }, 1000);
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
    setLoadingStatus(isLoading) {
        if (typeof isLoading !== "boolean") {
            throw invalidIsLoadingError;
        }
        this.isLoading = isLoading;
    }
}

decorate(Store, {
    playersNames: observable,
    score: observable,
    currentGame: observable,
    currentGameWinner: observable,
    weapons: observable,
    isLoading: observable,
    isGameStarted: observable,
    randomWeapon: computed,
    resetGameWinner: action,
    initialisePlay: action,
    winner: computed,
    setPlayerWeapon: action,
    updateScoreForPlayer: action,
    setCurrentGameWinner: action,
    setLoadingStatus: action,
});

export default Store;