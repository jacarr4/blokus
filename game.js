class Game {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers) {
        this.grid = new Grid(canvasWidth, canvasHeight, gridSize, boxSize);
        this.numPlayers = numPlayers;
        // TODO: clean up these arguments
        this.player1 = new Player(25, 50, boxSize, 'rgb(0, 0, 200, 0.5)');
        this.player2 = new Player(25, 250, boxSize, 'rgb(200, 0, 0, 0.5)');
        this.player3 = new Player(675, 50, boxSize, 'rgb(0, 200, 0, 0.5)');
        this.player4 = new Player(675, 250, boxSize, 'rgb(200, 200, 0, 0.5)');

        this.players = [this.player1, this.player2, this.player3, this.player4];
        this.playerTurn = 0;

        this.selectedPiece = null;
    }

    setMousePos(x, y) {
        this.players[this.playerTurn].setMousePos(x, y);
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }

    draw() {
        var canvas = document.getElementById('mainCanvas');
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < this.numPlayers; i++) {
            this.players[i].drawPiecesForFrame(ctx);
        }
        this.grid.draw(ctx);
        window.requestAnimationFrame(()=>this.draw());
    }

    handleMouseDown(x, y) {
        this.selectedPiece = this.players[this.playerTurn].handleMouseDown(x, y);
    }

    handleMouseMove(x, y) {
        this.players[this.playerTurn].setMousePos(x, y);
    }

    handleMouseUp(x, y) {
        if(this.selectedPiece && this.grid.contains(x, y)) {
            this.grid.addPiece(this.selectedPiece, x, y);
            this.players[this.playerTurn].placeSelectedPiece(x, y);
        }
        this.selectedPiece = null;
    }
};