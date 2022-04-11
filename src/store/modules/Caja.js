import { Modal } from 'bootstrap';
import router from '../../router/index';

export default {
    namespaced: true,
    state: {
        cajaAbierta: false,
    },
    mutations: {
        setEstadoCajaMutation(state, payload) {
        state.cajaAbierta = payload;
        if (state.cajaAbierta === true) {
          router.push('/');
        }
      },
    },
    getters: {
      // no se usa, solo ejemplo
      cajaAbierta: (state) => state.cajaAbierta,
    },
    actions: {
      setEstadoCaja({ commit }, cesta) {
        commit('setEstadoCajaMutation', cesta);
      },
    },
  };
  