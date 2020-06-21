piece_data = {
    // pieces of size 5
    "L5": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "Y5": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "N5": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0]
    ],
    "U5": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "V5": [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "Z5": [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "X5": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "T5": [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "W5": [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "P5": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "F5": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "I5": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ],

    // pieces of size 4
    "O4": [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "L4": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "T4": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "Z4": [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    "I4": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0]
    ],

    // pieces of size 3
    "V3": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    "I3": [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],

    // pieces of size 2
    "I2": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
    ],

    // pieces of size 1
    "I1": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
};

class Grid {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize) {
        this.gridSize = gridSize;
        this.boxSize = boxSize;
        this.startPosX = (canvasWidth - gridSize * boxSize) / 2;
        this.startPosY = (canvasHeight - gridSize * boxSize) / 2;
    }

    draw(ctx) {
        for(var i = 0; i < this.gridSize; i++) {
            for(var j = 0; j < this.gridSize; j++) {
                var xPos = this.startPosX + i * this.boxSize;
                var yPos = this.startPosY + j * this.boxSize;
                ctx.strokeRect(xPos, yPos, this.boxSize, this.boxSize);
            }
        }
    }
}

class Piece {
    constructor(data) {
        this.data = data;
    }

    draw(ctx, xPos, yPos, boxSize, fillStyle) {
        var pieceSize = 5;
        // ctx.fillStyle = fillStyle;
        for(var i = 0; i < pieceSize; i++) {
            for(var j = 0; j < pieceSize; j++) {
                var xPosNew = xPos + (i * boxSize / pieceSize);
                var yPosNew = yPos + (j * boxSize / pieceSize);
                if(this.data[j][i]) {
                    // var xPosNew = xPos + (i * boxSize / pieceSize);
                    // var yPosNew = yPos + (j * boxSize / pieceSize);

                    ctx.fillStyle = fillStyle;
                    ctx.fillRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
                    // ctx.strokeRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
                }
                ctx.strokeRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
            }
        }
    }
}

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

class Game {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers) {
        this.grid = new Grid(canvasWidth, canvasHeight, gridSize, boxSize);
        this.numPlayers = numPlayers;
        // TODO: clean up these arguments
        this.player1 = new Player(25, 50, boxSize, 'rgb(0, 0, 200, 0.5)');
        this.player2 = new Player(25, 250, boxSize, 'rgb(200, 0, 0, 0.5)');
        this.player3 = new Player(675, 50, boxSize, 'rgb(0, 200, 0, 0.5)');
        this.player4 = new Player(675, 250, boxSize, 'rgb(200, 200, 0, 0.5)');
    }

    draw(ctx) {
        this.grid.draw(ctx);
        this.player1.drawPieces(ctx);
        this.player2.drawPieces(ctx);
        this.player3.drawPieces(ctx);
        this.player4.drawPieces(ctx);
    }
};

function init(canvasWidth, canvasHeight) {
    var gridSize = 20;
    var boxSize = 20;
    numPlayers = 1;
    var game = new Game(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers);
    var canvas = document.getElementById('mainCanvas');
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        game.draw(ctx);
    }

    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        // console.log('mousedown:');
        // console.log('x: ' + x);
        // console.log('y: ' + y);
        // console.log('\n');
    });

    canvas.addEventListener('mousemove', e => {
        x = e.offsetX;
        y = e.offsetY;
        // console.log('mousemove:');
        // console.log('x: ' + x);
        // console.log('y: ' + y);
        // console.log('\n');
    });

    canvas.addEventListener('mouseup', e => {
        x = e.offsetX;
        y = e.offsetY;
        // console.log('mouseup:');
        // console.log('x: ' + x);
        // console.log('y: ' + y);
        // console.log('\n');
    });
}
