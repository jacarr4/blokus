class Player {
    constructor(xPos, yPos, boxSize, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.boxSize = boxSize * 2; //TODO: clean up
        this.color = color;
        this.pieces = this.createPieces();
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
        if(this.selectedPieceIndex) {
            this.pieces[this.selectedPieceIndex].setPosition(x, y);
        }
    }

    drawPiecesForFrame(ctx) {
        for(var i = 0; i < this.numPieces; i++) {
            this.pieces[i].draw(ctx, this.color);
        }
    }

    handleMouseDown(x, y) {
        for(var i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].contains(x, y)) {
                this.selectedPieceIndex = i;
                this.pieces[i].setBoxSize(100);
            }
        }
    }

    handleMouseMove(x, y) {
        if(this.selectedPiece) {
            console.log( "moving selected piece: " + this.selectedPiece.name );
        }
    }

    handleMouseUp(x, y) {
        this.selectedPieceIndex = null;
    }
}