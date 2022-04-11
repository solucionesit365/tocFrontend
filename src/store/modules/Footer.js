export default {
    namespaced: true,
    state: {
        menuActivo: 0
    },
    mutations: {
      setMenuActivoMutation(state, payload) {
        state.menuActivo = payload;
      },
    },
    actions: {
      setMenuActivo({ commit }, activo) {
        commit('setMenuActivoMutation', activo);
      },
      resetMenuActivo({ commit }) {
        commit('setMenuActivoMutation', 0);
      },
    },
  };
    