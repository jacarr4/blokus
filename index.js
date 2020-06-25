function init(canvasWidth, canvasHeight) {
    var gridSize = 20;
    var boxSize = 20;
    numPlayers = 4;
    var game = new Game(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers);
    var canvas = document.getElementById('mainCanvas');
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

    document.addEventListener('contextmenu', e => {
        e.preventDefault();
    }, false);
}
