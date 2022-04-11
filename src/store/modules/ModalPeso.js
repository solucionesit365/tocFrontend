import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    tareasState: ['tarea 1', 'tarea 2', 'tarea 3'],
    edadState: 26,
    modal: null,
    idArticulo: 0,
    idBoton: '',
    precioConIva: 0
  },
  mutations: {
    testMutation(state, payload) {
      state.edadState = payload;
    },
    abrirModalMutation(state, payload) {
      console.log(payload);
      state.idArticulo = payload.idArticulo;
      state.idBoton = payload.idBoton;
      state.precioConIva = payload.precioConIva;
      state.modal.show();
    },
    setModalMutation(state) {
      const modalElement = document.getElementById('modalTecladoPeso');
      if (modalElement != null) {
        state.modal = new Modal(modalElement, { keyboard: false });
      }
    },
    cerrarModalMutation(state) {
      state.modal.hide();
    },
  },
  actions: {
    testAction({ commit }) {
      commit('testMutation', 30);
    },
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
