import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    email: sessionStorage.getItem('bookmark') || '',
    loading: false,
  },
  mutations: {
    setLogin(state, email) {
      sessionStorage.setItem('bookmark', email);
      state.email = email;
    },
    setLogout(state) {
      sessionStorage.removeItem('bookmark');
      state.email = '';
    },
  },
  actions: {
    
  }
})