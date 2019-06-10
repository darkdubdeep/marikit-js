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
      let goods;
      for (let item in productsNames) {
        console.log('outer');
        console.log(productsNames[item]);
        for (let innerItem in productsNames[item]) {
          console.log('inner');
          console.log(productsNames[item][innerItem]);
        }
      }
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
