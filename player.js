class Player {
    constructor(xPos, yPos, boxSize, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.boxSize = boxSize * 2; //TODO: clean up
        this.color = color;
        this.pieces = this.createPieces();
        this.placedPieces = [];
        this.selectedPiece = null;
        this.selectedPieceIndex = null;
    }

    createPieces() {
        var curPosX = this.xPos + (i % pieceGridSize) * this.boxSize;
        var curPosY = this.yPos + Math.floor(i / pieceGridSize) * this.boxSize;

        var pieces_lcl = [];
        var i = 0
        var pieceGridSize = 5;
        for(var key in piece_data) {
            var piece = new Piece(key, piece_data[key]);
            piece.setBoxSize(this.boxSize);

            var curPosX = this.xPos + (i % pieceGridSize) * this.boxSize;
            var curPosY = this.yPos + Math.floor(i / pieceGridSize) * this.boxSize;

            piece.setPosition(curPosX, curPosY);
            piece.setColor(this.color);
            pieces_lcl.push(piece);
            
            i += 1;
        }
        return pieces_lcl;
    }

    get numPieces() {
        return this.pieces.length;
    }

    setMousePos(x, y) {
        if(this.selectedPieceIndex != null) {
            this.pieces[this.selectedPieceIndex].setPosition(x, y);
        }
    }

    drawPiecesForFrame(ctx) {
        for(var i = 0; i < this.numPieces; i++) {
            this.pieces[i].drawCenter(ctx);
        }
    }

    handleMouseDown(x, y) {
        if(this.selectedPieceIndex) {
            return this.pieces[this.selectedPieceIndex];
        }
        for(var i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].contains(x, y)) {
                this.selectedPieceIndex = i;
                this.pieces[this.selectedPieceIndex].setBoxSize(100);
            }
        }
        return this.pieces[this.selectedPieceIndex];
    }

    placeSelectedPiece(x, y) {
        var piece = this.pieces.splice(this.selectedPieceIndex, 1);
        this.placedPieces.push(piece);
        this.selectedPieceIndex = null;
    }
}