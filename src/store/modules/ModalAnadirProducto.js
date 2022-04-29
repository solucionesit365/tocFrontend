import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
    idArticulo: 0,
    precioConIva: 0,
    nombre: '',
    tipoIva: 0,
  },
  mutations: {
    abrirModalMutation(state, payload) {
        state.idArticulo = payload.idArticulo;
        state.precioConIva = payload.precioConIva;
        state.nombre = payload.nombre;
        state.tipoIva = payload.tipoIva;
        state.modal.show();
    },
    setModalMutation(state) {
      const modalElement = document.getElementById('modalAnadirProducto');
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
    getNombre: (state) => state.nombre,
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
