class Piece {
    constructor(data) {
        this.data = data;
    }

    setBoxSize(boxSize) {
        this.boxSize = boxSize;
    }

    setPosition(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    contains(x, y) {
        return this.xPos <= x && this.xPos + this.boxSize >= x && this.yPos <= y && this.yPos + this.boxSize >= y;
    }

    draw(ctx, fillStyle) {
        var pieceSize = 5;
        // ctx.fillStyle = fillStyle;
        for(var i = 0; i < pieceSize; i++) {
            for(var j = 0; j < pieceSize; j++) {
                var xPosNew = this.xPos + (i * this.boxSize / pieceSize);
                var yPosNew = this.yPos + (j * this.boxSize / pieceSize);
                if(this.data[j][i]) {
                    // var xPosNew = xPos + (i * boxSize / pieceSize);
                    // var yPosNew = yPos + (j * boxSize / pieceSize);

                    ctx.fillStyle = fillStyle;
                    ctx.fillRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
                    // ctx.strokeRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
                }
                ctx.strokeRect(xPosNew, yPosNew, this.boxSize/pieceSize, this.boxSize/pieceSize);
            }
        }
    }

    // draw(ctx, xPos, yPos, boxSize, fillStyle) {
    //     var pieceSize = 5;
    //     // ctx.fillStyle = fillStyle;
    //     for(var i = 0; i < pieceSize; i++) {
    //         for(var j = 0; j < pieceSize; j++) {
    //             var xPosNew = xPos + (i * boxSize / pieceSize);
    //             var yPosNew = yPos + (j * boxSize / pieceSize);
    //             if(this.data[j][i]) {
    //                 // var xPosNew = xPos + (i * boxSize / pieceSize);
    //                 // var yPosNew = yPos + (j * boxSize / pieceSize);

    //                 ctx.fillStyle = fillStyle;
    //                 ctx.fillRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
    //                 // ctx.strokeRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
    //             }
    //             ctx.strokeRect(xPosNew, yPosNew, boxSize/pieceSize, boxSize/pieceSize);
    //         }
    //     }
    // }
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