import router from "../../router/index";

export default {
  namespaced: true,
  state: {
    cajaAbierta: false,
    arrayVentas: [],
  },
  mutations: {
    setEstadoCajaMutation(state, payload) {
      state.cajaAbierta = payload;
      if (state.cajaAbierta === true) {
        router.push("/");
      }
    },
    setArrayVentasMutation(state, payload) {
      state.arrayVentas = payload;
    }
  },
  getters: {
    // no se usa, solo ejemplo
    cajaAbierta: (state) => state.cajaAbierta,
  },
  actions: {
    setEstadoCaja({ commit }, cesta) {
      commit("setEstadoCajaMutation", cesta);
    },
    setArrayVentas({ commit }, payload) {
      commit("setArrayVentasMutation", payload);
    }
  },
};
