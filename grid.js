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

    handleMouseDown(x, y) {
        console.log("handleMouseDown in Grid: x=" + x + ", y=" + y);
    }

    handleMouseMove(x, y) {
        console.log("handleMouseMove in Grid: x=" + x + ", y=" + y);
    }

    handleMouseUp(x, y) {
        console.log("handleMouseUp in Grid: x=" + x + ", y=" + y);
    }
}