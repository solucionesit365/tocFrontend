import { Modal } from 'bootstrap';

export default {
  namespaced: true,
  state: {
    modal: null,
  },
  mutations: {
  
    abrirModalMutation(state) {
      console.log('modal varis js');
      state.modal.show();
      
    },
    setModalMutation(state) {
      const modalElement = document.getElementById('modalVaris');
      console.log('modal varis');
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
    abrirModal({ commit }) {
      console.log('modal log');
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
