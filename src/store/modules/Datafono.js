export default {
  namespaced: true,
  state: {
    pagoActivo: false,
    mensaje: "",
  },
  mutations: {
    setPagoActivoMutation(state, payload) {
      state.pagoActivo = payload;
    },
    setMensajeMutation(state, payload) {
      state.mensaje = payload;
    },
  },
  actions: {
    setPagoActivo({ commit }, data) {
      commit("setPagoActivoMutation", data);
    },
    setMensaje({ commit }, data) {
      commit("setMensajeMutation", data);
    },
  },
};
