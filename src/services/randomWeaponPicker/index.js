import weapons, { weaponsNumber } from "../weapons";

export function randomWeaponPicker() {
    const randomInt = getRandomInt(weaponsNumber);

    return weapons[randomInt];
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}