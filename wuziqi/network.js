var exampleSocket = new WebSocket("ws://localhost:8081");
exampleSocket.onmessage = function (event) {
    var blobdata = event.data;
    let reader = new FileReader(); // 创建读取文件对象
    reader.readAsText(blobdata, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
    reader.addEventListener("loadend", function () { // 
        let res = JSON.parse(reader.result); // 返回的数据
        console.log(res, '返回结果')
            clearCanvas();
    drawChessboard();

    list = res;
    res.forEach(drawChess);
    });
    //console.log(JSON.parse(event.data));

}