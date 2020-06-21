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

    handleMouseDown(x, y) {
        console.log("Mouse Down at x=" + x + ", y=" + y);
    }

    handleMouseMove(x, y) {
        console.log("Mouse Move at x=" + x + ", y=" + y);
    }

    handleMouseUp(x, y) {
        console.log("Mouse Up at x=" + x + ", y=" + y);
    }
};