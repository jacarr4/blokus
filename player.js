class Player {
    constructor(xPos, yPos, boxSize, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.boxSize = boxSize * 2;
        this.color = color;
        this.pieces = this.createPieces();
    }

    createPieces() {
        var pieces_lcl = [];
        for(var key in piece_data) {
            var piece = new Piece(piece_data[key]);
            pieces_lcl.push(piece);
        }
        return pieces_lcl;
    }

    numPieces() {
        return this.pieces.length;
    }

    drawPieces(ctx) {
        var pieceGridSize = 5

        for(var i = 0; i < this.numPieces(); i++) {
            var curPosX = this.xPos + (i % pieceGridSize) * this.boxSize;
            var curPosY = this.yPos + Math.floor(i / pieceGridSize) * this.boxSize;
            this.pieces[i].draw(ctx, curPosX, curPosY, this.boxSize, this.color);
        }
    }
}