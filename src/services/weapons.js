const weapons = [
    {
        name: "rock",
        winsAgainst: ["scissors"],
    },
    {
        name: "scissors",
        winsAgainst: ["paper"],
    },
    {
        name: "paper",
        winsAgainst: ["rock"],
    },
];
export const weaponsNumber = weapons.length;

export default weapons;
