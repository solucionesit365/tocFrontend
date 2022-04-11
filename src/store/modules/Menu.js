export default {
    namespaced: true,
    state: {
      hidden: true,
    },
    mutations: {
        setHiddenMutation(state, payload) {
            state.hidden = payload;
        },
    },
    actions: {
      setHiddenAction({ commit }, hidden) {
          commit('setHiddenMutation', hidden);
      },
    },
};
