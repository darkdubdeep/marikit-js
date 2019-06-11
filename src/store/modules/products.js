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
    shop.getProducts((products, productsNames) => {
      const productsData = products.Value.Goods;
      let productsByCategories = [];
      console.log(productsData);
      let goods;
      for (let item in productsNames) {
        productsNames[item].categoryId = item;
        productsByCategories.push(productsNames[item]);
        for (let innerItem in productsNames[item]) {
          // console.log(productsNames[item][innerItem]);
        }
      }
      console.log(productsByCategories);
      commit('setProducts', goods);
    });
  }
};

// mutations
const mutations = {
  setProducts(state, goods) {
    state.all = goods;
    console.log(state.all);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
