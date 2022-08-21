const net=require('net');
const ip = require('ip');
const readline = require("readline");

const server=net.createServer();
const ip_addr=ip.address();
const port=Number.parseInt(process.argv[2]);

server.on('error', (err)=>{
    console.log(err);
});

server.listen(port, ip_addr, ()=>{
    console.log(`server has started listening on port: ${port} and ip: ${ip_addr}`)
} );

server.on('connection', (client_socket)=>{
    console.log(`Client Connected (ip:${client_socket.remoteAddress}\nport:${client_socket.remotePort})\n`);

    client_socket.on('data', function (data) {
        console.log(`Msg from client (ip: ${client_socket.remoteAddress}, port: ${client_socket.remotePort}): ${data.toString()}\n`);
        client_socket.write(data, (err)=>{
            if (err){
                
            }
            else{
                console.log(`Data sent to client (ip: ${client_socket.remoteAddress}, port: ${client_socket.remotePort}): ${data.toString()}\n`)
            }
        });
      });

    client_socket.on('close', (err)=>{
        if (err)
        console.log(`client (ip: ${client_socket.remoteAddress}, port: ${client_socket.remotePort}) disconnected due to error.\n`);

        else
        console.log(`client (ip: ${client_socket.remoteAddress}, port: ${client_socket.remotePort}) disconnected normally.\n`);

    });

    client_socket.on('error', (err)=>{
      
        console.log(`An error occurred at client (ip: ${client_socket.remoteAddress}, port: ${client_socket.remotePort}).\n`);


    });


})




var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "",
  });
  

  rl.on('line', (input)=>{
      if (input.length==1 && input.toLowerCase()==='e'){
          process.exit();
      }
   
  })

  process.on('exit', ()=>{
   server.close();
  })
