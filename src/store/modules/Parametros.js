export default {
  namespaced: true,
  state: {
    parametros: null,
  },
  mutations: {
    setParametrosMutation(state, payload) {
      state.cesta = payload;
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
