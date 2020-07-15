async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

class Game {
    constructor(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers) {
        this.grid = new Grid(canvasWidth, canvasHeight, gridSize, boxSize);
        this.numPlayers = numPlayers;
        // TODO: clean up these arguments
        var gridStartX = this.grid.xStart;
        var gridStartY = this.grid.yStart;
        this.player1 = new Player(25, gridStartY, boxSize, 'rgb(0, 0, 200, 0.5)');
        this.player2 = new Player(25, canvasHeight / 2, boxSize, 'rgb(200, 0, 0, 0.5)');
        this.player3 = new Player(675, gridStartY, boxSize, 'rgb(0, 200, 0, 0.5)');
        this.player4 = new Player(675, canvasHeight / 2, boxSize, 'rgb(200, 200, 0, 0.5)');

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
                if(this.grid.isValidMove(this.selectedPiece, x, y)) {
                    this.grid.addPiece(this.selectedPiece, x, y);
                    this.players[this.playerTurn].placeSelectedPiece(x, y);
                    this.updateGameState(x, y, this.playerTurn, this.selectedPiece);
                    this.updatePlayerTurn();
                } else {
                    this.players[this.playerTurn].deselectPiece(x, y);
                }
            } else {
                this.players[this.playerTurn].deselectPiece(x, y);
            }
            this.selectedPiece = null;
        }
    }

    handleKeyDown(keyCode) {
        switch(keyCode) {
            case 49: this.players[this.playerTurn].flipSelectedPiece(); break;
            case 50: this.players[this.playerTurn].rotateSelectedPiece(); break;
        }
    }

    updateGameState(x, y, playerTurn, selectedPiece) {
        const url = "/api/update_game_state";
        postData(url, {x: x, y: y, player: playerTurn, piece: selectedPiece}).then(data => {
            console.log(data);
        });
        // const Http = new XMLHttpRequest();
        // Http.onreadystatechange = function() {
        //     if(Http.readyState == 4 && Http.status == 200) {
        //         console.log(Http.responseText);
        //     }
        // }
        // const url = "/api/update_game_state";
        // Http.open("GET", url);
        // Http.send();
    }
};