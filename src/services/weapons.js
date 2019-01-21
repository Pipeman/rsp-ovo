import { faHandRock, faHandScissors, faHandPaper } from "@fortawesome/free-solid-svg-icons";

const weapons = [
    {
        icon: faHandRock,
        name: "rock",
        winsAgainst: ["scissors"],
    },
    {
        icon: faHandScissors,
        name: "scissors",
        winsAgainst: ["paper"],
    },
    {
        icon: faHandPaper,
        name: "paper",
        winsAgainst: ["rock"],
    },
];
export const weaponsNumber = weapons.length;

export default weapons;
