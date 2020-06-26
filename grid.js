class Grid {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize) {
        this.gridSize = gridSize;
        this.boxSize = boxSize;
        this.startPosX = Math.floor((canvasWidth - gridSize * boxSize) / 2);
        this.startPosY = Math.floor((canvasHeight - gridSize * boxSize) / 2);
        this.pieces = [];
        this.piecesX = [];
        this.piecesY = [];
        console.log("grid start pos: x=" + this.startPosX + ", y=" + this.startPosY);
    }

    get xStart() {
        return this.startPosX;
    }

    get yStart() {
        return this.startPosY;
    }

    contains(x, y) {
        var xInBounds = x >= this.startPosX && x <= this.startPosX + this.gridSize * this.boxSize;
        var yInBounds = y >= this.startPosY && y <= this.startPosY + this.gridSize * this.boxSize;
        return xInBounds && yInBounds;
    }

    addPiece(piece, xPos, yPos) {
        this.pieces.push(piece);
        var xGridPos = Math.floor((xPos - this.startPosX) / this.boxSize);
        var yGridPos = Math.floor((yPos - this.startPosY) / this.boxSize);
        this.piecesX.push(xGridPos);
        this.piecesY.push(yGridPos);
    }

    draw(ctx) {
        for(var i = 0; i < this.gridSize; i++) {
            for(var j = 0; j < this.gridSize; j++) {
                var xPos = this.startPosX + i * this.boxSize;
                var yPos = this.startPosY + j * this.boxSize;

                ctx.fillStyle = 'rgb(200, 200, 200)';
                ctx.fillRect(xPos, yPos, this.boxSize, this.boxSize);
                ctx.strokeRect(xPos, yPos, this.boxSize, this.boxSize);
            }
        }

        var pieceSize = 5; // TODO: make global

        for(var k = 0; k < this.pieces.length; k++) {
            ctx.fillStyle = this.pieces[k].fillStyle;
            for(var i = 0; i < pieceSize; i++) {
                for(var j = 0; j < pieceSize; j++) {
                    if(this.pieces[k].data[j][i]) {
                        var xPos = this.startPosX + this.boxSize * (this.piecesX[k] - 2 + i);
                        var yPos = this.startPosY + this.boxSize * (this.piecesY[k] - 2 + j);
                        ctx.fillRect(xPos, yPos, this.boxSize, this.boxSize); // draw the piece
                        ctx.strokeRect(xPos, yPos, this.boxSize, this.boxSize); // redraw the border so it's dark
                    }
                }
            }         
        }
    }
}