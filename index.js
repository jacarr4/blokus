function init(canvasWidth, canvasHeight) {
    var gridSize = 20;
    var boxSize = 20;
    numPlayers = 1;
    var game = new Game(canvasWidth, canvasHeight, gridSize, boxSize, numPlayers);
    var canvas = document.getElementById('mainCanvas');
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        game.draw(ctx);
    }

    canvas.addEventListener('mousedown', e => {
        game.handleMouseDown(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', e => {
        game.handleMouseMove(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mouseup', e => {
        game.handleMouseUp(e.offsetX, e.offsetY);
    });
}
