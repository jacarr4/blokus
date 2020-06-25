class Piece {
    constructor(name, data) {
        this._name = name;
        this._data = data;
    }

    get name() {
        return this._name;
    }

    get data() {
        return this._data;
    }

    setBoxSize(boxSize) {
        this.boxSize = boxSize;
    }

    get getBoxSize() {
        return this.boxSize;
    }

    get getColor() {
        return this.fillStyle;
    }

    // this represents the position of the center tile's top left corner
    // TODO: make it true center
    setPosition(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    setColor(fillStyle) {
        this.fillStyle = fillStyle;
    }

    contains(x, y) {
        return Math.abs(x - this.xPos) < this.boxSize/2 && Math.abs(y - this.yPos) < this.boxSize/2;
    }

    drawCenter(ctx) {
        var pieceSize = 5;

        for(var i = 0; i < pieceSize; i++) {
            for(var j = 0; j < pieceSize; j++) {
                var iAdj = i - Math.floor(pieceSize/2);
                var jAdj = j - Math.floor(pieceSize/2);
                var xPosNew = this.xPos + (iAdj * this.boxSize / pieceSize);
                var yPosNew = this.yPos + (jAdj * this.boxSize / pieceSize);
                if(this._data[j][i]) {
                    ctx.fillStyle = this.fillStyle;
                    ctx.fillRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                    ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                }
            }
        }
    }

    draw(ctx) {
        var pieceSize = 5;

        for(var i = 0; i < pieceSize; i++) {
            for(var j = 0; j < pieceSize; j++) {
                if(this._data[j][i]) {
                    var xPosNew = xPos + (i * boxSize / pieceSize);
                    var yPosNew = yPos + (j * boxSize / pieceSize);

                    ctx.fillStyle = this.fillStyle;
                    ctx.fillRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                    ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                }
            }
        }
    }
}

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