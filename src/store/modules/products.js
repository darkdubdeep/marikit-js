import shop from '../../api/shop';

// initial state

const state = {
  all: []
};

// getters
const getters = {};

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit('setProducts', products);
    });
  }
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
    console.log('state all');
    console.log(state.all);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
