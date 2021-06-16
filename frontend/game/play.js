class GameMeta {
    constructor() {
        this.socket = io();
    }

    showGame()      { document.getElementById( "gameContainer" ).style.visibility = "visible"; }
    hideGame()      { document.getElementById( "gameContainer" ).style.visibility = "hidden";  }
    showLoginForm() { document.getElementById( "loginForm" ).style.visibility     = "visible"; }
    hideLoginForm() { document.getElementById( "loginForm" ).style.visibility     = "hidden";  }
    removeLoginForm() { document.getElementById( "loginForm" ).remove(); }
    showJoinForm()  { document.getElementById( "joinForm" ).style.visibility      = "visible"; }
    hideJoinForm()  { document.getElementById( "joinForm" ).style.visibility      = "hidden";  }
    removeJoinForm() { document.getElementById( "joinForm" ).remove(); }

    setUsername( username ) { this.username = username; }
    getUsername() { return this.username; }

    setCanvasWidth( canvasWidth ) { this.canvasWidth = canvasWidth; }
    setCanvasHeight( canvasHeight ) { this.canvasHeight = canvasHeight; }

    createGame() {
        console.log( "creating game with username " + this.username );
        this.socket.emit( 'create game', { username: this.username } );
        this.start();
    }
    joinGame( gameId ) {
        console.log( "joining game with username " + this.username + " and gameId " + gameId );
        this.socket.emit( 'join game', { username: this.username, gameId: gameId } )
        this.start();
    }

    start() {
        this.removeJoinForm();
        this.showGame();

        var gridSize = 20;
        var boxSize = 20;
        var numPlayers = 4;
        var game = new Game( this.socket, this.canvasWidth, this.canvasHeight, gridSize, boxSize, numPlayers );
        var canvas = document.getElementById( 'mainCanvas' );
        if(canvas.getContext) {
            var ctx = canvas.getContext('2d');
            game.setCtx(ctx);
            game.draw(ctx);
        }

        canvas.addEventListener('mousedown', e => {
            game.handleMouseDown(e.offsetX, e.offsetY, e.button);
        });

        canvas.addEventListener('mousemove', e => {
            game.setMousePos(e.offsetX, e.offsetY);
        });

        canvas.addEventListener('mouseup', e => {
            game.handleMouseUp(e.offsetX, e.offsetY, e.button);
        });

        canvas.addEventListener('contextmenu', e => {
            e.preventDefault();
        }, false);

        document.addEventListener('keydown', e => {
            game.handleKeyDown(e.keyCode);
        });

        this.socket.on( 'joined', function( message ) {
            var gameId = message[ 'gameId' ];
            var username = message[ 'username' ];
            var player = message[ 'player' ];
            var playerNames = message[ 'playerNames' ];
            game.setGameId( gameId );
            game.setUsername( username );
            game.setPlayer( player );
            game.setPlayerNames( playerNames );
            game.updatePlayerTurnDialog();
        });

        this.socket.on( 'start', function( message ) {
            var playerNames = message[ 'playerNames' ];
            console.log( playerNames );
            game.setPlayerNames( playerNames );
        });

        this.socket.on( 'game state update', function( message ) {
            var x = message[ 'position' ][ 0 ]
            var y = message[ 'position' ][ 1 ]
            var piece = message[ 'piece' ]
            var player = message[ 'player' ]
            game.applyGameStateUpdate( x, y, piece, player );
        });
    }
}

var gameMeta = new GameMeta();

function init(canvasWidth, canvasHeight) {
    gameMeta.setCanvasWidth( canvasWidth );
    gameMeta.setCanvasHeight( canvasHeight );

    gameMeta.hideGame();
    gameMeta.hideJoinForm();
}

function getUsername() {
    var username = document.getElementById( "username" ).value;
    gameMeta.setUsername( username );
    gameMeta.removeLoginForm();
    gameMeta.showJoinForm();
}

function createGame() {
    gameMeta.createGame();
}

function joinGame() {
    var gameId = document.getElementById( "gameId" ).value;
    gameMeta.joinGame( gameId );
}