export default {
  namespaced: true,
  state: {
    arrayTrabajadores: [],
    trabajadorActivo: "",
    nombreTrabajadorActivo: "",
  },
  mutations: {
    setArrayTrabajadoresMutation(state, payload) {
      state.arrayTrabajadores = payload;
    },
    setTrabajadorActivoMutation(state, payload) {
      state.trabajadorActivo = payload;
    },
    setNombreTrabajadorActivoMutation(state, payload) {
      state.nombreTrabajadorActivo = payload;
    },
  },
  getters: {
    // eslint-disable-next-line no-underscore-dangle
    getArrayTrabajadores: (state) => state.arrayTrabajadores,
    getTrabajadorActivo: (state) => state.trabajadorActivo,
    getNombreTrabajadorActivo: (state) => state.nombreTrabajadorActivo,
  },
  actions: {
    setArrayTrabajadores({ commit }, data) {
      commit("setArrayTrabajadoresMutation", data);
    },
    setTrabajadorActivo({ commit }, data) {
      commit("setTrabajadorActivoMutation", data);
    },
    setNombreTrabajadorActivo({ commit }, data) {
      commit("setNombreTrabajadorActivoMutation", data);
    },
  },
};
