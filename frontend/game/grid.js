class Grid {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize) {
        this.gridSize = gridSize;
        this.boxSize = boxSize;
        this.startPosX = Math.floor((canvasWidth - gridSize * boxSize) / 2);
        this.startPosY = Math.floor((canvasHeight - gridSize * boxSize) / 2);
        this.pieces = [];
        this.piecesX = [];
        this.piecesY = [];
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

    pieceIsInBounds(piece, xGridPos, yGridPos) {
        var leftmostVal = 4;
        var rightMostVal = 0;
        var uppermostVal = 4;
        var lowermostVal = 0;
        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 5; j++) {
                if(piece.data[j][i] == 1) {
                    if(i < leftmostVal) {
                        leftmostVal = i;
                    }
                    if(i > rightMostVal) {
                        rightMostVal = i;
                    }
                    if(j < uppermostVal) {
                        uppermostVal = j;
                    }
                    if(j > lowermostVal) {
                        lowermostVal = j;
                    }
                }
            }
        }

        var leftBound = xGridPos + leftmostVal - 2;
        var rightBound = xGridPos + rightMostVal - 2;
        var upperBound = yGridPos + uppermostVal - 2;
        var lowerBound = yGridPos + lowermostVal - 2;

        var min = 0;
        var max = this.gridSize;

        return leftBound >= min && rightBound < max && upperBound >= min && lowerBound < max;
    }

    xGridPos(xPos) {
        return Math.floor((xPos - this.startPosX) / this.boxSize);
    }

    yGridPos(yPos) {
        return Math.floor((yPos - this.startPosY) / this.boxSize);
    }

    isValidMove(piece, xPos, yPos) {
        // var xGridPos = Math.floor((xPos - this.startPosX) / this.boxSize);
        // var yGridPos = Math.floor((yPos - this.startPosY) / this.boxSize);
        var xGridPos = this.xGridPos(xPos);
        var yGridPos = this.yGridPos(yPos);

        return this.pieceIsInBounds(piece, xGridPos, yGridPos);
    }

    // addPiece(piece, xPos, yPos) {
    //     this.pieces.push(piece);
    //     var xGridPos = Math.floor((xPos - this.startPosX) / this.boxSize);
    //     var yGridPos = Math.floor((yPos - this.startPosY) / this.boxSize);
    //     this.piecesX.push(xGridPos);
    //     this.piecesY.push(yGridPos);
    // }

    addPiece( piece, xGridPos, yGridPos ) {
        this.pieces.push( piece );
        this.piecesX.push( xGridPos );
        this.piecesY.push( yGridPos );
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
                    if(this.pieces[k]._data[j][i]) {
                        var xPos = this.startPosX + this.boxSize * (this.piecesX[k] - 2 + i);
                        var yPos = this.startPosY + this.boxSize * (this.piecesY[k] - 2 + j);
                        ctx.fillRect(xPos, yPos, this.boxSize, this.boxSize); // draw the piece
                        ctx.strokeRect(xPos, yPos, this.boxSize, this.boxSize); // redraw the border so it's dark
                    }
                }
            }
        }
    }
};