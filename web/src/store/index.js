import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    data: { key: 'default' }
  },
  mutations: {
    commitData(state, data) {
      state.data = JSON.parse(JSON.stringify(data));
    },
  },
  actions: {
    setData({ commit }, data) {
      commit('commitData', data);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
  getters: {
    getStateKey: (state) => (key) => state[key],
  },
});
