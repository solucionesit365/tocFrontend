import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
    producto: 0,
    codiBotiga:0,
 
  },
  mutations: {
    abrirModalMutation(state, payload) {
      state.producto = payload.producto;
      state.codiBotiga = payload.codiBotiga;
        state.modal.show();
    },
    setModalMutation(state) {

      const modalElement = document.getElementById('modalMostrarAlergenos');
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
    getProducto: (state) => state.producto,
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
