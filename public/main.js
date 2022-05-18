const socket = io();


socket.on("datosTabla", (data) => { 
    console.log(data)
    if(data?.length){
       return renderTabla(data)
    }
     
    });
function renderTabla(data) {
  const html = data
    .map((item) => {
      return( ` <tr >
      <td>${item.nombre}</td>
      <td>${item.precio}</td>
      <td>
        <img
          src="${item.link} "
          style="width: 70px;height:70px;"
          alt="fotito"
        /></td></tr>
    `)
    })
    .join(" ");
  document.getElementById("bodyTabla").innerHTML = html;
}
const button = document.getElementById("botonAgregar");
button.addEventListener("click",(event)=>{addProduct()})
//esta funcion se ejecuta en el evento click del boton
//toma los valores del form y los envia al servidor
function addProduct() {
  const producto = {
    nombre:document.getElementById("Nombre").value,
    precio:document.getElementById("Precio").value,
    link:document.getElementById("Link").value
  }
    
  console.log(producto)
  socket.emit('nuevo-producto',producto);
}
//MENSAJES
socket.on("datosMensajes", (mensaje) => { 
    
    if(mensaje?.length){
       return renderMensajes(mensaje)
    }
     
    });
function renderMensajes(mensaje) {
  const html = mensaje
    .map((item) => {
      return `<div class="flex">
      <p class="mail mr-1">${item.mail} </p>
      <p class="fecha mr-1">[${item.fechaYHora}] :</p>
      <i class="mensaje">${item.mensaje}</i>
      
  </div>`;
    })
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}
const botonMensaje = document.getElementById("botonMensaje");
botonMensaje.addEventListener("click",(event)=>{addMessage()})
//esta funcion se ejecuta en el evento click del boton
//toma los valores del form y los envia al servidor
function addMessage() {
    const mensaje = {
        mail:document.getElementById("userName").value,
        mensaje:document.getElementById("textito").value,
        fechaYHora:new Date().toLocaleString()
      }
    
  console.log(mensaje)
  socket.emit('nuevo-mensaje',mensaje);
}