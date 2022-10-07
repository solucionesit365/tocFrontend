export default {
  namespaced: true,
  state: {
    cantidad: 0,
  },
  mutations: {
    setCestaMutation(state, payload) {
      state.cesta = payload;
    },
    setActivoMutation(state, payload) {
      state.activo = payload;
    },
  },
  getters: {
    //   // eslint-disable-next-line no-underscore-dangle
    //   getItem: (state) => state.cesta.lista[state.activo]._id,
  },
  actions: {},
};
