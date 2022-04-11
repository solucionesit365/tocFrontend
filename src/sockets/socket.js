const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // BUILD PARA TPV
// const socket = io('http://54.195.159.7:3000'); // BUILD PARA SERVIDOR
// const socket = io('http://34.78.247.153:3000'); // BUILD PARA SERVIDOR (?)
import store from '../store/index';
import router from '../router/index';
import { useToast } from "vue-toastification";

const toast = useToast();

socket.on('disconnect', () => {
  console.log("Desconectado del servidor");
  socket.sendBuffer = [];
})
socket.on('test', (data) => {
    console.log(data);
});
socket.on('resDatafono', (data) => {
    console.log(data);
});

socket.on('resConsultaPuntos', (data) => {
  if (data.error == false) {
    toast.info(`Puntos del cliente: ${data.info}`);
  } else {
    toast.error(data.mensaje);
  }
});

socket.on('consultaPaytef', (data) => {
  store.dispatch('setEsperandoDatafono', false);
  if (data.error === false) {    
    store.dispatch('Cesta/setIdAction', -1);
    store.dispatch('setModoActual', 'NORMAL');
    store.dispatch('Clientes/resetClienteActivo');
    store.dispatch('Footer/resetMenuActivo');
    router.push({ name: 'Home', params: { tipoToast: 'success', mensajeToast: 'Ticket creado' } });
  } else {
    toast.error(data.mensaje);
  }
});

// socket.on('resPaytef', (data) => {
//   // store.dispatch('setEsperandoDatafono', false);
//   // if (data.error == false) {
//   //   store.dispatch('Cesta/setIdAction', -1);
//   //   store.dispatch('setModoActual', 'NORMAL');
//   //   store.dispatch('Clientes/resetClienteActivo');
//   //   store.dispatch('Footer/resetMenuActivo');
//   //   router.push({ name: 'Home', params: { tipoToast: 'success', mensajeToast: 'Ticket creado' } });
//   // } else {
//   //   toast.error(data.mensaje);
//   // }
// });

socket.on('resDatafono', (data) => {
    store.dispatch('setEsperandoDatafono', false);
    if (data.error == false) {
      store.dispatch('Cesta/setIdAction', -1);
      store.dispatch('setModoActual', 'NORMAL');
      store.dispatch('Clientes/resetClienteActivo');
      store.dispatch('Footer/resetMenuActivo');
      router.push({ name: 'Home', params: { tipoToast: 'success', mensajeToast: 'Ticket creado' } });
    } else {
      toast.error(data.mensaje);
    }
});

function emitSocket(canal, datos = null) {
  if (socket.connected) {
    socket.emit(canal, datos);
  }
}

export { socket, emitSocket };