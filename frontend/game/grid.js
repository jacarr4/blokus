class Grid {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize) {
        this.gridSize = gridSize;
        this.boxSize = boxSize;
        this.startPosX = Math.floor((canvasWidth - gridSize * boxSize) / 2);
        this.startPosY = Math.floor((canvasHeight - gridSize * boxSize) / 2);
        this.pieces = [];
        this.piecesX = [];
        this.piecesY = [];
        this.grid = new Array( 20 );
        for( var i = 0; i < 20; i++ ) {
            this.grid[ i ] = new Array( 20 ).fill( 0 );
        }
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

    pieceOverlaps( piece, xGridPos, yGridPos ) {
        for( var i = 0; i < 5; i++ ) {
            for( var j = 0; j < 5; j++ ) {
                var yPos = yGridPos - 2 + j;
                var xPos = xGridPos - 2 + i;

                // we check out of bounds elsewhere, just ignore it here
                if( yPos < 0 || yPos >= 20 || xPos < 0 || xPos >= 20 ) {
                    continue;
                }
                if( piece.data[ j ][ i ] == 1 && this.grid[ yPos ][ xPos ] != 0 ) {
                    return true;
                }
            }
        }
    }

    pieceTouchesCorner( piece, xGridPos, yGridPos, player ) {
        // if it's the first turn, enforce that it's the corner of the board
        if( this.pieces.length < 4 ) {
            for( var i = 0; i < 5; i++ ) {
                for( var j = 0; j < 5; j++ ) {
                    var yPos = yGridPos - 2 + j;
                    var xPos = xGridPos - 2 + i;

                    if( piece.data[ j ][ i ] == 1 ) {
                        var isInCorner = false;
                        isInCorner = isInCorner || ( xPos == 0 && yPos == 0 );
                        isInCorner = isInCorner || ( xPos == 0 && yPos == 19 );
                        isInCorner = isInCorner || ( xPos == 19 && yPos == 0 );
                        isInCorner = isInCorner || ( xPos == 19 && yPos == 19 );
                        if( isInCorner ) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        var playerNumber = player + 1;

        for( var i = 0; i < 5; i++ ) {
            for( var j = 0; j < 5; j++ ) {
                var yPos = yGridPos - 2 + j;
                var xPos = xGridPos - 2 + i;

                if( piece.data[ j ][ i ] == 1 ) {
                    // check all four corners
                    var cornersY = [ yPos - 1, yPos + 1, yPos - 1, yPos + 1 ];
                    var cornersX = [ xPos - 1, xPos - 1, xPos + 1, xPos + 1 ];
                    for( var k = 0; k < 4; k++ ) {
                        if( cornersX[ k ] >= 0 && cornersX[ k ] < 20 &&
                            cornersY[ k ] >= 0 && cornersY[ k ] < 20 ) {
                            if( this.grid[ cornersY[ k ] ][ cornersX[ k ] ] == playerNumber ) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    pieceTouchesEdge( piece, xGridPos, yGridPos, player ) {
        if( this.pieces.length < 4 ) {
            return false;
        }

        var playerNumber = player + 1;

        for( var i = 0; i < 5; i++ ) {
            for( var j = 0; j < 5; j++ ) {
                var yPos = yGridPos - 2 + j;
                var xPos = xGridPos - 2 + i;

                if( piece.data[ j ][ i ] == 1 ) {
                    // check all four edges
                    var edgesY = [ yPos - 1, yPos + 1, yPos,     yPos ];
                    var edgesX = [ xPos,     xPos,     xPos - 1, xPos + 1 ];
                    for( var k = 0; k < 4; k++ ) {
                        if( edgesX[ k ] >= 0 && edgesX[ k ] < 20 &&
                            edgesY[ k ] >= 0 && edgesY[ k ] < 20 ) {
                            if( this.grid[ edgesY[ k ] ][ edgesX[ k ] ] == playerNumber ) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    xGridPos(xPos) {
        return Math.floor((xPos - this.startPosX) / this.boxSize);
    }

    yGridPos(yPos) {
        return Math.floor((yPos - this.startPosY) / this.boxSize);
    }

    isValidMove(piece, xPos, yPos, player) {
        // var xGridPos = Math.floor((xPos - this.startPosX) / this.boxSize);
        // var yGridPos = Math.floor((yPos - this.startPosY) / this.boxSize);
        var xGridPos = this.xGridPos(xPos);
        var yGridPos = this.yGridPos(yPos);

        var isValid = this.pieceIsInBounds( piece, xGridPos, yGridPos );
        isValid = isValid && !this.pieceOverlaps( piece, xGridPos, yGridPos );
        isValid = isValid && this.pieceTouchesCorner( piece, xGridPos, yGridPos, player );
        isValid = isValid && !this.pieceTouchesEdge( piece, xGridPos, yGridPos, player );

        return isValid;

        // return this.pieceIsInBounds(piece, xGridPos, yGridPos);
    }

    // addPiece(piece, xPos, yPos) {
    //     this.pieces.push(piece);
    //     var xGridPos = Math.floor((xPos - this.startPosX) / this.boxSize);
    //     var yGridPos = Math.floor((yPos - this.startPosY) / this.boxSize);
    //     this.piecesX.push(xGridPos);
    //     this.piecesY.push(yGridPos);
    // }

    addPiece( piece, xGridPos, yGridPos, player ) {
        this.pieces.push( piece );
        this.piecesX.push( xGridPos );
        this.piecesY.push( yGridPos );

        // save grid data as a unique number for each player.
        // this way, we can determine if the player is touching their own corners
        var playerNumber = player + 1;
        for( var i = 0; i < 5; i++ ) {
            for( var j = 0; j < 5; j++ ) {
                var yPos = yGridPos - 2 + j;
                var xPos = xGridPos - 2 + i;

                // we check out of bounds elsewhere, just ignore it here
                if( yPos < 0 || yPos >= 20 || xPos < 0 || xPos >= 20 ) {
                    continue;
                }

                if( piece._data[ j ][ i ] == 1 ) {
                    this.grid[ yPos ][ xPos ] = playerNumber;
                }
            }
        }
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