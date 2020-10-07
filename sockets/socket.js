const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require ( '../controllers/socket');


// Mensajes de Sockets
io.on('connection', (client) =>  {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    //Verificar autenticacion 
    if( !valido ) { return client.disconnect();}

    //Cliente autenticado
    usuarioConectado( uid );
    
    // Ingresar a sala 
    // sala global, client.id, sala personal
    client.join(uid);

    client.on('mensaje-personal', async (payload) => {
       
        await grabarMensaje( payload );
        io.to(payload.para).emit('mensaje-personal',payload);

    })

    

    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });

    


});
