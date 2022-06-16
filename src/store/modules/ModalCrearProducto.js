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
  },
  mutations: {
    abrirModalMutation(state, payload) {
        state.modal.show();
        state.posicion = payload.posicion;
        console.log(payload.posicion)
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
