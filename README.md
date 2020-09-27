# blokus
TODO:
* figure out how to get game clients to poll for game state
* box size/piece size refactor
* piece selection/placement animations
* undo
* enforce rules for placing pieces (must touch same color pieces at corners only, no overlapping)
  * in bounds (done)
  * no overlap
  * must touch another piece of same color at corner but not edge
* scoreboard
* put rules/controls somewhere visible but not distracting
* decide on best keybinds for rotate and reflect
* communicate with server
  * server holds game state and gets game state updates from clients
  * see about using flask_session to manage the players game #
  * should be easy if so, just redirect from create/join page to play.html
* use ngrok to make local server accessible over the web

Wishlist:
* cut down on REST API traffic.
  * we don't need to send piece data if it's cached on server side
  * we don't need to send which player's turn it is, server should keep track of this
  * don't trust client, unfortunately this means two game logic impls (low priority)
    * client should only update player turn upon successful response from the update_game_state endpoint