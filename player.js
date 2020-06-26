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
        this.hoveredPieceIndex = null;
    }

    createPieces() {
        var pieces_lcl = [];
        var i = 0
        var pieceGridSize = 5;
        for(var key in piece_data) {
            var piece = new Piece(key, piece_data[key]);
            piece.setBoxSize(this.boxSize);

            var curPosX = this.xPos + (i % pieceGridSize) * this.boxSize;
            var curPosY = this.yPos + Math.floor(i / pieceGridSize) * this.boxSize;

            piece.setStartPosition(curPosX, curPosY);
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
        if(this.hoveredPieceIndex != null) {
            if(this.selectedPieceIndex == null) {
                this.pieces[this.hoveredPieceIndex].unhover();
            }
            this.hoveredPieceIndex = null;
        }

        if(this.selectedPieceIndex != null) {
            this.pieces[this.selectedPieceIndex].setCenterPosition(x, y);
        } else {
            for(var i = 0; i < this.pieces.length; i++) {
                if(this.pieces[i].contains(x, y)) {
                    this.hoveredPieceIndex = i;
                    this.pieces[this.hoveredPieceIndex].hover();
                }
            }
        }
    }

    drawPiecesForFrame(ctx) {
        for(var i = 0; i < this.numPieces; i++) {
            this.pieces[i].drawCenter(ctx);
        }
    }

    selectPiece(x, y) {
        for(var i = 0; i < this.pieces.length; i++) {
            if(this.pieces[i].contains(x, y)) {
                this.selectedPieceX = this.pieces[i].x;
                this.selectedPieceY = this.pieces[i].y;
                this.selectedPieceIndex = i;
                this.pieces[this.selectedPieceIndex].setBoxSize(100);
            }
        }
        return this.pieces[this.selectedPieceIndex];
    }

    rotateSelectedPiece() {
        if(this.selectedPieceIndex != null) {
            this.pieces[this.selectedPieceIndex].rotate();
        }
    }

    deselectPiece(x, y) {
        if(this.selectedPieceIndex != null) {
            this.pieces[this.selectedPieceIndex].resetPiece(this.selectedPieceX, this.selectedPieceY);
            this.selectedPieceIndex = null;
        }
    }

    placeSelectedPiece(x, y) {
        var piece = this.pieces.splice(this.selectedPieceIndex, 1);
        this.placedPieces.push(piece);
        this.selectedPieceIndex = null;
    }
}