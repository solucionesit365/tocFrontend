import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
  },
  mutations: {
    testMutation(state, payload) {
      state.edadState = payload;
    },
    abrirModalMutation(state, payload) {
      console.log('modal varis js');
      state.modal.show();
    },
    setModalMutation(state) {
      const modalElement = document.getElementById('modalVaris');
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
