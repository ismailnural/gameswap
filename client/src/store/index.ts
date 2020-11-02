import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    swaps: null,
    swapDetail: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!(token);
    },
    setUser(state, user) {
      state.user = user;
    },
    setSwaps(state, swaps) {
      state.swaps = swaps;
    },
    setSwapDetail(state, swap) {
      state.swapDetail = swap;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setSwaps({ commit }, swaps) {
      commit('setSwaps', swaps);
    },
    setSwapDetail({ commit }, swap) {
      commit('setSwapDetail', swap);
    },
  },
  modules: {
  },
});
