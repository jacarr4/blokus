# block game
TODO:
* put rules/controls somewhere visible but not distracting
* highlight player names with their color
* undo move
* scoreboard
* decide on best keybinds for rotate and reflect (right now it's 1 and 2)

Wishlist:
* refactor everything
* cut down on REST API traffic.
  * we don't need to send piece data. can simply send piece name and orientation
  * we don't need to send which player's turn it is, server should keep track of this
  * don't trust client, unfortunately this means two game logic impls (low priority, no one is going to cheat at this game)
