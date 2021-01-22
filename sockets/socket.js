const { io } = require('../index');
//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.on('disconnect', () => { 
        console.log('Cliente Descnectado');
     });

    //REcibiendo mensaje de index.html
     client.on('mensaje',(palyload)=>{
        console.log('mensaje!!!!',palyload);
        
        //servidor emite mensaje
        io.emit('mensaje',{admin: 'Nuevo mensaje'});
     });
  });

