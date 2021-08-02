import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    data: { key: 'value' }
  },
  mutations: {
    commitData(state) {
      state.data = JSON.parse(JSON.stringify(data));
    }
  },
  actions: {
    setData(state, data) {
      this.commit('commitData', data);
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin],

});
