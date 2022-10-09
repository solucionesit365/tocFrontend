export default {
  namespaced: true,
  state: {
    parametros: null,
  },
  mutations: {
    setParametrosMutation(state, payload) {
      state.parametros = payload;
    },
  },
  getters: {
    getParametros: (state) => state.parametros,
  },
  actions: {
    setParametros({ commit }, payload) {
      commit("setParametrosMutation", payload);
    },
  },
};
