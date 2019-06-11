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

      let extractedProducts = [];

      let goods;
      for (let item in productsNames) {
        productsNames[item].categoryId = item;
        productsByCategories.push(productsNames[item]);
      }
      // for (let item of extractedProducts) {
      //   item['B'] = [];
      // }
      console.log(productsData);
      console.log(productsByCategories);
      console.log(extractedProducts);

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
