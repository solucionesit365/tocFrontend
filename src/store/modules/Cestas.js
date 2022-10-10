export default {
  namespaced: true,
  state: {
    arrayCestas: [],
    idCestaActiva: null,
    cesta: {
      _id: -1,
      lista: [],
    },
    activo: null, // Se refiere al item de la cesta
    hayRegaloEnCesta: false
  },
  mutations: {
    setArrayCestasMutation(state, payload) {
      state.arrayCestas = payload;
    },
    setCestaMutation(state, payload) {
      state.cesta = payload;
    },
    setActivoMutation(state, payload) {
      state.activo = payload;
    },
    setIdMutation(state, payload) {
      state.cesta._id = payload;
    },
    setHayRegaloEnCesta(state, payload) {
      state.hayRegaloEnCesta = payload;
    },
    setIdCestaActivaMutation(state, payload) {
      state.idCestaActiva = payload;
    }
  },
  getters: {
    // eslint-disable-next-line no-underscore-dangle
    getItem: (state) => state.cesta.lista[state.activo]._id,
    getCestaId: (state) => state.cesta._id,
    getHayRegaloEnCesta: (state) => state.hayRegaloEnCesta,
    getIdCestaActiva: (state) => state.idCestaActiva
  },
  actions: {
    setCestaAction({ commit }, cesta) {
      commit('setCestaMutation', cesta);
    },
    setActivoAction({ commit }, activo) {
      commit('setActivoMutation', activo);
    },
    setIdAction({ commit }, idCesta) {
      commit('setIdMutation', idCesta);
    },
    setHayRegaloEnCestaAction({ commit }, valor) {
      commit('setHayRegaloEnCesta', valor);
    },
    setArrayCestasAction({commit}, payload) {
      if (payload.length > 0)
        commit("setIdCestaActivaMutation", payload[0]._id)
      commit("setArrayCestasMutation", payload);
    }
  },
};
