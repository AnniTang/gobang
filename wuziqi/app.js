var exampleSocket = new WebSocket("ws://localhost:8081");
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
var list = [];
var chessWidth = 20;
var size = 15;
var pp=document.getElementById('pp');
canvas.width = chessWidth * (size + 1);
canvas.height = canvas.width;
function drawChessboard() {
    for (var i = 1; i < size + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(20, i * 20);
        ctx.lineTo(300, i * 20);
        ctx.stroke();
    }
    for (var i = 1; i < size + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 20, 20);
        ctx.lineTo(i * 20, 300);
        ctx.stroke();
    }
}
function drawChess(item) {
    ctx.beginPath();
    ctx.arc(item.x, item.y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = item.color;
    ctx.fill();
}

function clearCanvas() {
    ctx.clearRect(0, 0, (size + 1) * chessWidth, (size + 1) * chessWidth);
}
function over(){
    pp.innerText='game over';
}
window.clearCanvas = clearCanvas;
window.drawChessboard = drawChessboard;
window.drawChess = drawChess;
window.over=over;
function checkWin(chessInfo) {
    var winCase = [];
    for (var k=0;k<4;k++)
    {
        winCase[k]=winCase[k]||[];
    for (var j = 0; j < 5; j++) {
        winCase[k][j] = winCase[k][j] || [];
        for (var i = -j; i < 5 - j; i++) {
            if (k===0){
                winCase[k][j].push({
                    x: chessInfo.x - i * chessWidth,
                    y: chessInfo.y,
                    color: chessInfo.color
                })
            }
            if(k===1){
                winCase[k][j].push({
                    x: chessInfo.x,
                    y: chessInfo.y - i * chessWidth,
                    color: chessInfo.color
                })
            }
            if(k===2){
                winCase[k][j].push({
                    x: chessInfo.x - i * chessWidth,
                    y: chessInfo.y - i * chessWidth,
                    color: chessInfo.color
                })
            }
            if(k===3){
                winCase[k][j].push({
                    x: chessInfo.x + i * chessWidth,
                    y: chessInfo.y - i * chessWidth,
                    color: chessInfo.color
                })
            }
        }
    }}
    console.log(winCase);
    var a = winCase.some(function(winPosition){
    return winPosition.some(function (winList) {
        return winList.every(function (item) {
            return list.filter(function (chess) {
                return item.x === chess.x && item.y === chess.y && item.color === chess.color
            }).length > 0;
        })
    })
})
    console.log(a);
    
    if (a)
    {over();}
}

/*
exampleSocket.onmessage = function (event) {
    console.log(JSON.parse(event.data));
    clearCanvas();
    drawChessboard();

    list = JSON.parse(event.data);
    JSON.parse(event.data).forEach(drawChess);
}*/
drawChessboard();

canvas.addEventListener('click', function (e) {
    if (
        e.clientX >= chessWidth * size + chessWidth / 2 ||
        e.clientX <= chessWidth / 2 ||
        e.clientY >= chessWidth * size + chessWidth / 2 ||
        e.clientY <= chessWidth / 2
    ) {
        return;
    }
    var chessInfo = {
        x: Math.round(e.clientX / 20) * 20,
        y: Math.round(e.clientY / 20) * 20,
        color: list.length % 2 === 0 ? 'black' : 'white'
    }
    function ischessThere() {
        return list.filter(function (item) {
            return item.x === chessInfo.x && item.y === chessInfo.y;
        }).length > 0;
    }
    if (ischessThere()) {
        return;
    }
    list.push(chessInfo);

    exampleSocket.send(JSON.stringify(list));
    drawChess({
        x: Math.round(e.clientX / 20) * 20,
        y: Math.round(e.clientY / 20) * 20,
        color: list.length % 2 === 0 ? 'white' : 'black'
    });
    checkWin(chessInfo);
})
document.querySelector('button').addEventListener('click', function () {
    list.pop();
    exampleSocket.send(JSON.stringify(list));
    clearCanvas();
    drawChessboard();

    list.forEach(drawChess);
})