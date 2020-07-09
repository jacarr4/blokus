# blokus
TODO:
* box size/piece size refactor
* piece selection/placement animations
* undo
* enforce rules for placing pieces (must touch same color pieces at corners only, no overlapping)
  * in bounds (done)
  * no overlap
  * must touch another piece of same color at corner but not edge
* scoreboard
* communicate with server
  * server holds game state and gets game state updates from clients
  * see about using flask_session to manage the players game #
  * should be easy if so, just redirect from create/join page to play.html
* use ngrok to make local server accessible over the web