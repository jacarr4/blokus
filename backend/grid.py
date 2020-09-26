import numpy as np

class Grid:
    def __init__(self):
        # self._grid = np.array([np.arange(0,20)]*20,dtype=int)
        self._grid = np.zeros(shape=(20,20), dtype=int)
        print( self._grid )
    
    def placePiece(self, piece_data, position: tuple):
        print( self._grid )