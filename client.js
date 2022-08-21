const net=require('net');
const readline = require("readline");

const ip=process.argv[2];
const port=Number.parseInt(process.argv[3]);
const server=net.connect(port, ip, ()=>{
    console.log('Connection established with echo server!\n');
})

server.on('error', (err)=>{
    console.log(err);
})

server.on('data', (data)=>{
    console.log(`Data received from server: ${data}\n`)
})

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.setPrompt('Enter the data to be sent to server (Enter e for exit): ');

rl.on('line', (input)=>{
    if (input.length==1 && input.toLowerCase()==='e'){
        process.exit();
    }
    else
    server.write(input);
})

process.on('exit', ()=>{
    server.destroy();
})
