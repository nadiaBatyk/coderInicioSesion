const express = require("express");
const rutasProducto = require("./routes/productosRutas");
const {engine} = require('express-handlebars');

const {Server:ioServer} = require('socket.io')
const http = require('http');
const res = require("express/lib/response");
const app = express();

//SERVIDOR HTTP CON FUNCIONALIDADES DE APP (EXPRESS)
const httpServer = http.createServer(app);
//SERVIDOR WEBSOCKET CON FUNCIONALIDADES DE HTTP
const socketServer = new ioServer(httpServer);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware para cargar archivos
app.use(express.static(__dirname + '/public'));
//RUTAS
app.use("/", rutasProducto);
//MOTOR DE PLANTILLAS
app.set("view engine","hbs")
///CONFIGURACION HANDLEBARS
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir:__dirname+"/views/layouts",
    partialsDir:__dirname+"/views/partials",
  })
);

//DONDE ESTAN LOS ARCHIVOS DE PLANTILLA
app.set("views","/views")
const arrayDB = [{
    nombre:'mochila', precio:1800,link:'https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-128.png'
  }];
const arrayMensajes =[]
socketServer.on('connection',(socket)=>{
    console.log('cliente en el websocket')
    socket.emit('datosTabla', arrayDB)
    socket.on('nuevo-producto',(producto)=>{
        arrayDB.push(producto);
        socketServer.sockets.emit('datosTabla',arrayDB)
    })
    socket.emit('datosMensajes', arrayMensajes)
    socket.on('nuevo-mensaje',(mensaje)=>{
        //persistir los mensajes
        arrayMensajes.push(mensaje);
        socketServer.sockets.emit('datosMensajes',arrayMensajes)
    })
})




//PUERTO

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`servidor en puerto ${server.address().port}`);
});
//por si hay errores en el servidor
server.on("error", (error) => console.log(`error en el servidor ${error}`));
