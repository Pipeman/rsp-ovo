import { faHandRock, faHandScissors, faHandPaper, faHandLizard, faHandSpock } from "@fortawesome/free-solid-svg-icons";

const weapons = [
    {
        icon: faHandRock,
        name: "rock",
        winsAgainst: ["scissors", "lizard"],
    },
    {
        icon: faHandScissors,
        name: "scissors",
        winsAgainst: ["paper", "lizard"],
    },
    {
        icon: faHandPaper,
        name: "paper",
        winsAgainst: ["rock", "spock"],
    },
    {
        icon: faHandLizard,
        name: "lizard",
        winsAgainst: ["spock", "paper"],
    },
    {
        icon: faHandSpock,
        name: "spock",
        winsAgainst: ["rock", "scissors"],
    },
];
export const weaponsNumber = weapons.length;

export default weapons;
