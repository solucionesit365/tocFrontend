import { createStore } from "vuex";
import InstallWizard from "./modules/InstallWizard";
import ModalPeso from "./modules/ModalPeso";
import Cestas from "./modules/Cestas";
import Ticket from "./modules/Ticket";
import Menu from "./modules/Menu";
import Dinero from "./modules/Dinero";
import Notificaciones from "./modules/Notificaciones";
import Trabajadores from "./modules/Trabajadores";
import Clientes from "./modules/Clientes";
import Footer from "./modules/Footer";
import CestasActivas from "./modules/CestasActivas";
import Caja from "./modules/Caja";
import ModalEditarProducto from "./modules/ModalEditarProducto";
import Alergenos from "./modules/Alergenos";
import Datafono from "./modules/Datafono";
import axios from "axios";

window.addEventListener(
  "contextmenu",
  function(e) {
    e.preventDefault();
  },
  false
);

export default createStore({
  state: {
    parametros: null,
    modoActual: "NORMAL",
    unidadesString: "0",
    esperandoDatafono: false,
  },
  getters: {
    getModoActual: (state) => state.modoActual,
    getParametros: (state) => state.parametros,
    getUnidades: (state) => Number(state.unidadesString),
    getEsperandoDatafono: (state) => state.esperandoDatafono,
  },
  mutations: {
    setEsperandoDatafonoMutation(state, payload) {
      state.esperandoDatafono = payload;
    },
    setModoActualMutation(state, payload) {
      state.modoActual = payload;
    },
    setParametrosMutation(state, payload) {
      state.parametros = payload;
    },
    setUnidadesMutation(state, payload) {
      const aux = state.unidades + payload;
      state.unidadesString = `${Number(aux)}`;
    },
    resetUnidadesMutation(state) {
      state.unidadesString = "0";
    },
    borrarDigitoMutation(state) {
      const aux = state.unidadesString.slice(0, -1);
      if (aux == "") {
        state.unidadesString = "0";
      } else {
        state.unidadesString = aux;
      }
    },
  },
  actions: {
    setEsperandoDatafono({ commit }, payload) {
      commit("setEsperandoDatafonoMutation", payload);
    },
    setModoActual({ commit }, payload) {
      if (payload == "DEVOLUCION") {
        axios.post("promociones/setEstadoPromociones", {
          estadoPromociones: false,
        });
      }
      commit("setModoActualMutation", payload);
    },
    setParametros({ commit }, payload) {
      commit("setParametrosMutation", payload);
    },
    addDigitoUnidades({ commit }, unidadesString) {
      commit("setUnidadesMutation", unidadesString);
    },
    resetUnidades({ commit }) {
      commit("resetUnidadesMutation");
    },
    borrarDigitoUnidades({ commit }) {
      commit("borrarDigitoMutation");
    },
  },
  modules: {
    InstallWizard,
    ModalPeso,
    Cestas,
    Ticket,
    Menu,
    Dinero,
    Notificaciones,
    Trabajadores,
    Clientes,
    Caja,
    Footer,
    CestasActivas,
    ModalEditarProducto,
    Alergenos,
    Datafono,
  },
});
