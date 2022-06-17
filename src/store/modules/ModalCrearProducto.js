import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
    idArticulo: 0,
    precioConIva: 0,
    nombre: '',
    tipoIva: 0,
    posicion: 0,
    menu: '',
  },
  mutations: {
    abrirModalMutation(state, payload) {
     
        state.posicion = payload.posicion;
        state.menu = payload.menu;
        state.modal.show();
    },
    setModalMutation(state) {
      const modalElement = document.getElementById('modalCrearProducto');
      if (modalElement != null) {
        state.modal = new Modal(modalElement);
      }
    },
    cerrarModalMutation(state) {
      state.modal.hide();
    },
  },
  getters: {
    // eslint-disable-next-line no-underscore-dangle
  getPosicion: (state) => { state.posicion},
  getMenu: (state) => { state.menu},
  },
  actions: {
    abrirModal({ commit }, data) {
      commit('abrirModalMutation', data);
    },
    cerrarModal({ commit }) {
      commit('cerrarModalMutation');
    },
    setModal(context) {
      context.commit('setModalMutation');
    },
  },
};
