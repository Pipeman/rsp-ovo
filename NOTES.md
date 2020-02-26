# Notes
* The winsAgainst property inside a weapon is an array so that it is possible to easily expand the game.
* I focused on writing the tests for what is more critical in my opinion, therefore the store and the services receive much more thorough tests than the components.
* The app was thought mostly with mobile visualisation in mind
* At the moment the deployed version is the development one, which is definitely not ideal

# TODO
* getWinner service can be enhanced to accept both an array or 2 different attribtes
* let the user set the names of the players. The current store structure already allows this, but there is no action defined to do so
* add a history of the ongoing match plays
* write more tests
* write integration tests
* add a start new game button
* cure accessibility
* add PWA capabilities
* think more about the visualisation on bigger screens
* optimise the deployment process
* add a "bet" version of the game where the computer plays against itself and the player can bet on who's going to win
* add Rock-paper-scissors-lizard-Spock variant