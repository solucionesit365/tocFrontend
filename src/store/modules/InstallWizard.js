import { Modal } from 'bootstrap';

import axios from 'axios';

export default {
  namespaced: true,
  state: {
    licencia: '',
    password: '',
    tipoImpresora: 'USB',
    tipoDatafono: 'CLEARONE',
    impresoraCafeteria: 'NO',
    modal: null,
  },
  mutations: {
    testMutation(state, payload) {
      state.edadState = payload;
    },
    abrirModalMutation(state) {
      state.modal.show();
    },
    setModalMutation(state) {
      const modalElement = document.getElementById('modalInstallWizard');
      if (modalElement != null) {
        state.modal = new Modal(modalElement, { keyboard: false });
      }
    },
    cerrarModalMutation(state) {
      state.modal.hide();
    },
    resetModalMutation(state) {
      state.licencia = '';
      state.password = '';
      state.tipoImpresora = 'USB';
      state.tipoDatafono = 'CLEARONE';
      state.impresoraCafeteria = 'NO';
    },
    recuperarDatosModalMutation(state, payload) {
      state.licencia = payload.licencia;
      state.password = payload.password;
      state.tipoImpresora = payload.tipoImpresora;
      state.tipoDatafono = payload.tipoDatafono;
      state.impresoraCafeteria = payload.impresoraCafeteria;
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
    setModal({ commit }) {
      commit('setModalMutation');
      axios.post('/parametros/todoInstalado').then((res) => {
        if (res.data.todoInstalado === false) {
          commit('abrirModalMutation');
        } else {
          commit('recuperarDatosModalMutation', res.data.config);
        }
      });
    },
    resetModal({ commit }) {
      commit('resetModalMutation');
    },
    copyInitialData({ state }) {
      return {
        licencia: state.licencia,
        password: state.password,
        tipoImpresora: state.tipoImpresora,
        tipoDatafono: state.tipoDatafono,
        impresoraCafeteria: state.impresoraCafeteria,
      };
    },
  },
};
