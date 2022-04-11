export default {
    namespaced: true,
    state: {
      ticket: {
        dependienta: 3389,
        total: 10,
        formaDePago: 'EFECTIVO',
        detalle: [
          {
            nombre: 'Coca-Cola',
            subtotal: 1.6,
            unidades: 1,
          },
          {
            nombre: 'Fanta',
            subtotal: 1.6,
            unidades: 2,
          },
        ],
      },
      activo: null,
    },
    mutations: {
      setTicketAction(state, payload) {
        state.ticket = payload;
      },
      setActivoMutation(state, payload) {
        state.activo = payload;
      },
    },
    getters: {
      // eslint-disable-next-line no-underscore-dangle
      getItem: (state) => state.cesta.lista[state.activo]._id,
    },
    actions: {
      setTicketAction({ commit }, ticket) {
        commit('setTicketAction', ticket);
      },
      setActivoAction({ commit }, activo) {
        commit('setActivoMutation', activo);
      },
    },
};
