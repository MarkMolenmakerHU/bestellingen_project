import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    search_results: [],

    order_list: [],
    order_data: {},

    users: [],
    user: null,

    orders: [],
    order: null
  },
  mutations: {
    setSearchResults(state, data) {
      state.search_results = data;
    },
    clearSearchResults(state) {
        state.search_results = [];
    },

    setOrderList(state, data) {
      state.order_list = data;
    },
    addProductToOrderList(state, data) {
      state.order_list.push(data);
    },
    removeProductFromOrderListByIndex(state, data) {
        state.order_list.splice(data, 1);
    },

    setOrderData(state, data) {
        state.order_data = data;
    },

    setUsers(state, data) {
        state.users = data;
    },
    setUser(state, data) {
        state.user = data;
    },

    setOrders(state, data) {
        state.orders = data;
    },
    setOrder(state, data) {
        state.order = data;
    }
  },
  actions: {
    async fetchSearchResults({ commit }, query) {
      const response = await fetch(`https://api.coop.nl/INTERSHOP/rest/WFS/COOP-3645-Site/-;loc=nl_NL;cur=EUR/culios/products?searchTerm=${query}&amount=9`);
      const data = await response.json();
      commit('setSearchResults', data.elements);
    },
    async fetchAllUsers({ commit }) {
        const response = await axios.get('/api/users', {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
        });
        const data = await response.data;
        commit('setUsers', data);
    },
    async fetchUser({ commit }, userId) {
        const response = await axios.get(`/api/users/${userId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
        });
        const data = await response.data;
        commit('setUser', data);
        return data;
    },
    async fetchOrder({ commit }, orderId) {
        const response = await axios.get(`/api/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
        });
        const data = await response.data;
        commit('setOrder', data);
        return data;
    },
      async fetchAllOrders({ commit }, { sort }) {
          const response = await axios.get('/api/orders?sort=' + sort, {
              headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
          });
          const data = await response.data;
          commit('setOrders', data);
      },
      async fetchOrdersToday({ commit }) {
          const response = await axios.get('/api/orders/today', {
              headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
          });
          const data = await response.data;
          commit('setOrders', data);
          return data;
      },
      async setOrderList({ commit }, product_list) {
        commit('setOrderList', product_list);
      },
      async setOrderData({ commit }, data) {
        commit('setOrderData', data);
      }
  },
  modules: {
  }
})
