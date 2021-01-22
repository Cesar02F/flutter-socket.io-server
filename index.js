const express = require('express');
const path = require('path');
require('dotenv').config();
//App de Express
const app = express();

//servidor node
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




//Path Publico
const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));



server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log('Sevidor Corriendo en puerto!!!',process.env.PORT);
});