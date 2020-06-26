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

    get x() {
        return this.xPos;
    }

    get y() {
        return this.yPos;
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

    setCenterPosition(xPos, yPos) {
        this.xPos = xPos - this.boxSize / 2;
        this.yPos = yPos - this.boxSize / 2;

        this.xCenterPos = xPos;
        this.yCenterPos = yPos;
    }

    setStartPosition(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;

        this.xCenterPos = xPos + this.boxSize / 2;
        this.yCenterPos = yPos + this.boxSize / 2;
    }

    resetPiece(x, y) {
        this.setBoxSize(40);
        this.setStartPosition(x, y);
    }

    setColor(fillStyle) {
        this.fillStyle = fillStyle;
    }

    contains(x, y) {
        return Math.abs(x - this.xCenterPos) < this.boxSize/2 && Math.abs(y - this.yCenterPos) < this.boxSize/2;
    }

    // draw(ctx) {
    //     ctx.fillStyle = this.fillStyle;
    //     var pieceSize = 5;

    //     for(var i = 0; i < pieceSize; i++) {
    //         for(var j = 0; j < pieceSize; j++) {
    //             var xPosNew = this.xPos + (i * this.boxSize / pieceSize);
    //             var yPosNew = this.yPos + (j * this.boxSize / pieceSize);
    //             if(this._data[j][i]) {
    //                 ctx.fillRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
    //                 ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
    //             }
    //             // ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
    //         }
    //     }
    // }

    drawCenter(ctx) {
        ctx.fillStyle = this.fillStyle;
        var pieceSize = 5;

        var xStartPos = this.xCenterPos - this.boxSize / 2;
        var yStartPos = this.yCenterPos - this.boxSize / 2;

        for(var i = 0; i < pieceSize; i++) {
            for(var j = 0; j < pieceSize; j++) {
                var xPosNew = xStartPos + (i * this.boxSize / pieceSize);
                var yPosNew = yStartPos + (j * this.boxSize / pieceSize);
                if(this._data[j][i]) {
                    ctx.fillRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                    ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                }
                // ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
            }
        }
    }

    rotate() {
        var pieceSize = 5;
        var newData = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        for(var i = 0; i < Math.floor(pieceSize / 2); i++) {
            for(var j = 0; j < Math.floor(pieceSize - i - 1); j++) {
                newData[i][j] = this._data[pieceSize - 1 - j][i];
                newData[pieceSize - 1 - j][i] = this._data[pieceSize - 1 - i][pieceSize - 1 - j];
                newData[pieceSize - 1 - i][pieceSize - 1 - j] = this._data[j][pieceSize - 1 - i];
                newData[j][pieceSize - 1 - i] = this._data[i][j];
            }
        }
        newData[2][2] = this._data[2][2];
        this._data = newData;
    }

    hover() {
        // this.setStartPosition(this.xPos - this.boxSize / 2, this.yPos - this.boxSize / 2);
        this.setBoxSize(50);
    }

    unhover() {
        this.setBoxSize(40);
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
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
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