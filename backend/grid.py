import numpy as np

class Grid:
    def __init__(self):
        # self._grid = np.array([np.arange(0,20)]*20,dtype=int)
        self._grid = np.zeros(shape=(20,20), dtype=int)
        print( self._grid )
    
    def placePiece(self, piece_data, position: tuple):
        x = position[0]
        y = position[1]
        # print( piece_data )
        for i in range(5):
            for j in range(5):
                gridX = x + i - 2
                gridY = y + j - 2
                if(gridX >= 0 and gridX < 20 and gridY >= 0 and gridY < 20):
                    self._grid[gridY][gridX] |= piece_data[j][i]
        print( self._grid )