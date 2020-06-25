class Game {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers) {
        this.grid = new Grid(canvasWidth, canvasHeight, gridSize, boxSize);
        this.numPlayers = numPlayers;
        // TODO: clean up these arguments
        this.player1 = new Player(25, 50, boxSize, 'rgb(0, 0, 200, 0.5)');
        this.player2 = new Player(25, 250, boxSize, 'rgb(200, 0, 0, 0.5)');
        this.player3 = new Player(675, 50, boxSize, 'rgb(0, 200, 0, 0.5)');
        this.player4 = new Player(675, 250, boxSize, 'rgb(200, 200, 0, 0.5)');
        // this.player1 = new Player(25, 50, boxSize, '#5E81AC');
        // this.player2 = new Player(25, 250, boxSize, '#BF616A');
        // this.player3 = new Player(675, 50, boxSize, '#A3BE8C');
        // this.player4 = new Player(675, 250, boxSize, '#EBCB8B');

        this.players = [this.player1, this.player2, this.player3, this.player4];
        this.playerTurn = 0;

        this.selectedPiece = null;
    }

    setCtx(ctx) {
        this.ctx = ctx;
    }

    draw() {
        var canvas = document.getElementById('mainCanvas');
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.grid.draw(ctx);
        for(var i = 0; i < this.numPlayers; i++) {
            this.players[i].drawPiecesForFrame(ctx);
        }
        window.requestAnimationFrame(()=>this.draw());
    }

    updatePlayerTurn() {
        this.playerTurn = (this.playerTurn + 1) % this.numPlayers;
    }

    handleMouseDown(x, y, button) {
        if(button == 0) {
            this.selectedPiece = this.players[this.playerTurn].selectPiece(x, y);
        } else if( button == 2 ) {
            this.players[this.playerTurn].rotateSelectedPiece();
        }
    }

    setMousePos(x, y) {
        this.players[this.playerTurn].setMousePos(x, y);
    }

    handleMouseUp(x, y, button) {
        if(button == 0) {
            if(this.selectedPiece && this.grid.contains(x, y)) {
                this.grid.addPiece(this.selectedPiece, x, y);
                this.players[this.playerTurn].placeSelectedPiece(x, y);
                this.updatePlayerTurn();
            }
            else {
                this.players[this.playerTurn].deselectPiece(x, y);
            }
            this.selectedPiece = null;
        }
    }
};