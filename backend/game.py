from backend.grid import Grid

class Game:
    def __init__(self, gameId):
        self._players = set()
        self._gameId = gameId
        self._grid = Grid()
        self._pieces = []
        self._lastTurn = -1

    def numPlayers(self):
        return len(self._players)

    def getPieces(self):
        return self._pieces

    def getTurn(self):
        return (self._lastTurn + 1) % 4

    def addPlayer(self, username):
        if username in self._players:
            raise ValueError( "Username %s already playing this game." % username )
        if len(self._players) >= 4:
            raise ValueError( "Game #%s is full." % self._gameId )
        self._players.add(username)

    def placePiece(self, player, piece, position):
        print(f"Game {self._gameId}: Player {player} is placing piece {piece} in position {position}")
        self._grid.placePiece(piece['_data'], position)
        self._pieces.append( {'player': player, 'data': piece['_data'], 'position': position} )
        self._lastTurn = player