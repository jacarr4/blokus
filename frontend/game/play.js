class GameMeta {
    constructor() {
        // var socket = io();
        this.socket = io();
        // this.fun()
    }

    // fun() {
    //     this.socket.on('connect', function() {
    //         this.socket.emit( 'my event', { data: "I'm connected!" } );
    //         // socket.emit('my event', {data: 'I\'m connected!'});
    //         // socket.emit('join', { 'username': this.username, 'room': this.gameId });
    //     });

    //     this.socket.on('message', function( message ) {
    //         console.log( 'got message: ', message );
    //     });
    // }

    showGame()      { document.getElementById( "gameContainer" ).style.visibility = "visible"; }
    hideGame()      { document.getElementById( "gameContainer" ).style.visibility = "hidden"; }
    showLoginForm() { document.getElementById( "loginForm" ).style.visibility     = "visible"; }
    hideLoginForm() { document.getElementById( "loginForm" ).style.visibility     = "hidden"; }
    showJoinForm()  { document.getElementById( "joinForm" ).style.visibility      = "visible"; }
    hideJoinForm()  { document.getElementById( "joinForm" ).style.visibility      = "hidden"; }

    setUsername( username ) { this.username = username; }
    getUsername() { return this.username; }
    // getSocket() { return this.socket; }

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
        this.hideJoinForm();
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
            game.setGameId( gameId );
            game.setUsername( username );
            game.setPlayer( player );
            // console.log( message );
        });

        this.socket.on( 'game state update', function( message ) {
            console.log( message )
            // console.log( 'game state update: ' + message );
            var x = message[ 'position' ][ 0 ]
            var y = message[ 'position' ][ 1 ]
            var piece = message[ 'piece' ]
            var player = message[ 'player' ]
            console.log( 'x: ' + x );
            console.log( 'y: ' + y);
            console.log( 'piece: ' + piece );
            console.log( 'player: ' + player );
            game.applyGameStateUpdate( x, y, piece, player );
        });
    }
}

var gameMeta = new GameMeta();

function init(canvasWidth, canvasHeight) {
    // var gridSize = 20;
    // var boxSize = 20;
    // numPlayers = 4;
    // var game = new Game(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers);
    // var canvas = document.getElementById('mainCanvas');
    // if(canvas.getContext) {
    //     var ctx = canvas.getContext('2d');
    //     game.setCtx(ctx);
    //     game.draw(ctx);
    // }

    // canvas.addEventListener('mousedown', e => {
    //     game.handleMouseDown(e.offsetX, e.offsetY, e.button);
    // });

    // canvas.addEventListener('mousemove', e => {
    //     game.setMousePos(e.offsetX, e.offsetY);
    // });

    // canvas.addEventListener('mouseup', e => {
    //     game.handleMouseUp(e.offsetX, e.offsetY, e.button);
    // });

    // canvas.addEventListener('contextmenu', e => {
    //     e.preventDefault();
    // }, false);

    // document.addEventListener('keydown', e => {
    //     game.handleKeyDown(e.keyCode);
    // });

    gameMeta.setCanvasWidth( canvasWidth );
    gameMeta.setCanvasHeight( canvasHeight );

    gameMeta.hideGame();
    gameMeta.hideJoinForm();
}

function getUsername() {
    var username = document.getElementById( "username" ).value;
    gameMeta.setUsername( username );
    gameMeta.hideLoginForm();
    gameMeta.showJoinForm();
}

function createGame() {
    gameMeta.createGame();
}

function joinGame() {
    var gameId = document.getElementById( "gameId" ).value;
    gameMeta.joinGame( gameId );
}