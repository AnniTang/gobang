const WebSocket=require('ws');

const wss=new WebSocket.Server({port:8081,clientTracking:true});
let clients=[];
wss.on('connection',function connection(ws){
    ws.on('message',function incoming(message){
        //console.log('received:%s',message);
        wss.clients.forEach(function incoming(client){
            client.send(message)
        });

            //client.send(JSON.stringify(clients));
        });
    });

    //ws.send('something');