export default {
    namespaced: true,
    state: {
      activo: null,
    },
    mutations: {
      setActivoMutation(state, payload) {
        state.activo = payload;
      },
    },
    actions: {
      setActivoAction({ commit }, activo) {
        commit('setActivoMutation', activo);
      },
    },
};
