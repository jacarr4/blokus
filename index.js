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
        x = e.offsetX;
        y = e.offsetY;
        // console.log('mousedown:');
        // console.log('x: ' + x);
        // console.log('y: ' + y);
        // console.log('\n');
    });

    canvas.addEventListener('mousemove', e => {
        x = e.offsetX;
        y = e.offsetY;
        // console.log('mousemove:');
        // console.log('x: ' + x);
        // console.log('y: ' + y);
        // console.log('\n');
    });

    canvas.addEventListener('mouseup', e => {
        x = e.offsetX;
        y = e.offsetY;
        // console.log('mouseup:');
        // console.log('x: ' + x);
        // console.log('y: ' + y);
        // console.log('\n');
    });
}
