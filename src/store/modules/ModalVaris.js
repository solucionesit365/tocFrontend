import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
  },
  mutations: {
    abrirModalMutation(state, payload) {
      console.log('modal varis js');
        state.modal.show();
    },
    setModalMutation(state) {

      const modalElement = document.getElementById('ModalVaris');
      if (modalElement != null) {
        state.modal = new Modal(modalElement);
      }
    },
    cerrarModalMutation(state) {
      state.modal.hide();
    },
  },
  actions: {
    abrirModal({ commit }) {
      commit('abrirModalMutation');
    },
    cerrarModal({ commit }) {
      commit('cerrarModalMutation');
    },
    setModal(context) {
      context.commit('setModalMutation');
    },
  },
};
