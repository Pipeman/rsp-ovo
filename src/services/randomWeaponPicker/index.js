export function randomWeaponPicker(weapons) {
    const randomInt = getRandomInt(weapons.length);

    return weapons[randomInt];
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}