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
<<<<<<< HEAD
=======

>>>>>>> c7ebe300f949bb0bfb058ede626d0f8b5945c02f
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
