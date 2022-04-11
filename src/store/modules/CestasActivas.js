export default {
    namespaced: true,
    state: {
      cestas: [],
    },
    mutations: {
      setCestasActivasMutation(state, payload) {
        state.cestas.push(payload);
      },
      deleteCestaActivaMutation(state, payload) {
        const index = state.cestas.findIndex(i => i.idMongo === payload);
        if(state.cestas[index] !== undefined && state.cestas[index].nombre.split(' ')[0] === 'Taula') {
          state.cestas.splice(index, 1);
        }
    
      },
    },
    getters: {
      // eslint-disable-next-line no-underscore-dangle
      getCestasActivas: (state) => state.cestas,
    },
    actions: {
      setCestasActivasAction({ commit }, cesta) {
        commit('setCestasActivasMutation', cesta);
      },
      deleteCestaActivaAction({ commit }, cesta) {
        commit('deleteCestaActivaMutation', cesta);
      },
    },
  };
  