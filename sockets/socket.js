const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();


bands.addBand(new Band('Dalmata'));
bands.addBand(new Band('Don Omar'));
bands.addBand(new Band('Daddy Yankee'));
bands.addBand(new Band('Randy'));
bands.addBand(new Band('Chencho'));
//Mensajes de sockets
r=0;
io.on('connection', client => {
   r++;
    console.log('Clientes Conectados ='+r);
    client.emit('active-bands',bands.getBands()); 


    client.on('disconnect', () => { 
       r--;
        console.log('Cliente Desconectado quedan ='+r);
     });

    //REcibiendo mensaje de index.html
     client.on('mensaje',(palyload)=>{
        console.log('mensaje!!!!',palyload);
        
        //servidor emite mensaje
        io.emit('mensaje',{admin: 'Nuevo mensaje'});
     });

     client.on('vote-band',(payload)=>{
         bands.voteBand(payload.id);
         //servidor envia mensaje a todos
         io.emit('active-bands',bands.getBands()); 
         
     });

     client.on('add-band',(payload)=>{
        const newBand= new Band(payload.name);
      bands.addBand(newBand);
      //servidor envia mensaje a todos
      io.emit('active-bands',bands.getBands()); 
      
     });

     client.on('delete-band',(payload)=>{ 
    bands.deleteBand(payload.id);
    //servidor envia mensaje a todos
    io.emit('active-bands',bands.getBands()); 
    
   });



   //   client.on('emitir-mensaje',( palyload )=>{
   //    //  console.log(palyload);
   //    //io.emit('emitir-mensaje', palyload); // emite a todos
   //    client.broadcast.emit('nuevo-mensaje', palyload); // emite a todos menos al que lo emitio
   //    // client.broadcast.emit('emitir-mensaje', palyload); // emite a todos menos al que lo emitio
   //   });


  });

