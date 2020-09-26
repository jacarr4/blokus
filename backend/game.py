from backend.grid import Grid

class Game:
    def __init__(self, gameId):
        self._players = set()
        self._gameId = gameId
        self._grid = Grid()
    
    def numPlayers(self):
        return len(self._players)

    def addPlayer(self, username):
        if username in self._players:
            raise ValueError( "Username %s already playing this game." % username )
        if len(self._players) >= 4:
            raise ValueError( "Game #%s is full." % self._gameId )
        self._players.add(username)
    
    def placePiece(self, player, piece, position):
        print(f"Game {self._gameId}: Player {player} is placing piece {piece} in position {position}")
        self._grid.placePiece(piece, position)