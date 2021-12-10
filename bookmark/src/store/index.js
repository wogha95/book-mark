import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    logined: false,
    email: '',
    loading: false,
  },
  mutations: {
    setLogin(state, email) {
      state.logined = true;
      state.email = email;
    },
    setLogout(state) {
      state.logined = false;
      state.email = '';
    },
  },
  actions: {
    
  }
})