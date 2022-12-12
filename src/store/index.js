import { createStore } from 'vuex'

export default createStore({
  state: {
    search_results: [],
  },
  mutations: {
    setSearchResults(state, data) {
      state.search_results = data;
    }
  },
  actions: {
    async fetchSearchResults({ commit }, query) {
      const response = await fetch(`https://api.coop.nl/INTERSHOP/rest/WFS/COOP-3645-Site/-;loc=nl_NL;cur=EUR/culios/products?searchTerm=${query}&amount=9`);
      const data = await response.json();
      commit('setSearchResults', data.elements);
    }
  },
  modules: {
  }
})
