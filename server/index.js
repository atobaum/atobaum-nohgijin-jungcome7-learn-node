var net = require('net')
var fs = require('fs')

//서버 만듬
var server = net.createServer(function(socket){
    socket.on('data',function(data){
        var k = ''+data
        //console.log(k)
        var route = k.split('HTTP/1.1')[0].split(' ')[1]
        //console.log("route:"+ route)

       if(route.includes('favicon')) return;
       try {
            output = fs.readFileSync('./public'+route)
            //console.log(''+output)
            socket.write("HTTP/1.1 200 OK \r\n");
            socket.write("Content-Type: text/html;charset=utf-8\r\n");
            socket.write("Content-Length: " + output.length + "\r\n");
            socket.write("\r\n");
             
            socket.write(output, 0, output.length);
            socket.write("\r\n");
        } catch (error) {
            console.log(error)
        }
    })
})

//서버 킴
server.listen(8080,function(){
})