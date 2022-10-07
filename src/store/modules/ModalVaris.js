import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
    nombre: '',
  },
  mutations: {
    abrirModalMutation(state, payload) {
      state.nombre = payload.nombre;  
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
