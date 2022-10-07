import { io } from "socket.io-client";
const socket = io("http://localhost:5051");

import store from "./store/index";
import router from "./router/index";
import { useToast } from "vue-toastification";

const toast = useToast();

/* Eze 4.0 */
socket.on("cargarTrabajadores", (arrayTrabajadores) => {
  try {
    if (arrayTrabajadores) {
      store.dispatch("Trabajadores/setArrayTrabajadores", arrayTrabajadores);
    } else {
      throw Error("Error, arrayTrabajadores no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

/* Eze 4.0 */
socket.on("cargarCestas", (arrayCestas) => {
  try {
    if (arrayCestas) {
      console.log(arrayCestas);
      store.dispatch("Cestas/setArrayCestasAction", arrayCestas);
    } else {
      throw Error("Error, arrayCestas no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

/* Eze 4.0 */
socket.on("cargarParametros", (parametros) => {
  try {
    console.log("parametros: ", parametros);
    if (parametros) {
      store.dispatch("Parametros/setParametros", parametros);
    } else {
      throw Error("Error, parametros no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

/* Eze 4.0 */
socket.on("cargarVentas", (arrayTickets) => {
  try {
    console.log("arrayTickets: ", arrayTickets);
    if (arrayTickets) {
      // store.dispatch("Parametros/setParametros", parametros);
    } else {
      throw Error("Error, arrayTickets no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
  socket.sendBuffer = [];
});

socket.on("test", (data) => {
  console.log(data);
});

socket.on("resDatafono", (data) => {
  console.log(data);
});

socket.on("resConsultaPuntos", (data) => {
  if (data.error == false) {
    toast.info(`Puntos del cliente: ${data.info}`);
  } else {
    toast.error(data.mensaje);
  }
});

socket.on("consultaPaytef", (data) => {
  store.dispatch("setEsperandoDatafono", false);
  if (data.error === false) {
    store.dispatch("Cestas/setIdAction", -1);
    store.dispatch("setModoActual", "NORMAL");
    store.dispatch("Clientes/resetClienteActivo");
    store.dispatch("Footer/resetMenuActivo");
    router.push({
      name: "Home",
      params: { tipoToast: "success", mensajeToast: "Ticket creado" },
    });
  } else {
    toast.error(data.mensaje);
  }
});

// socket.on('resPaytef', (data) => {
//   // store.dispatch('setEsperandoDatafono', false);
//   // if (data.error == false) {
//   //   store.dispatch('Cestas/setIdAction', -1);
//   //   store.dispatch('setModoActual', 'NORMAL');
//   //   store.dispatch('Clientes/resetClienteActivo');
//   //   store.dispatch('Footer/resetMenuActivo');
//   //   router.push({ name: 'Home', params: { tipoToast: 'success', mensajeToast: 'Ticket creado' } });
//   // } else {
//   //   toast.error(data.mensaje);
//   // }
// });

socket.on("resDatafono", (data) => {
  store.dispatch("setEsperandoDatafono", false);
  if (data.error == false) {
    store.dispatch("Cestas/setIdAction", -1);
    store.dispatch("setModoActual", "NORMAL");
    store.dispatch("Clientes/resetClienteActivo");
    store.dispatch("Footer/resetMenuActivo");
    router.push({
      name: "Home",
      params: { tipoToast: "success", mensajeToast: "Ticket creado" },
    });
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
