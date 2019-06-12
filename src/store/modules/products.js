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

      let goods;
      for (let item in productsNames) {
        productsNames[item].categoryId = item;
        productsByCategories.push(productsNames[item]);
      }
      let extractedProducts = JSON.parse(JSON.stringify(productsByCategories));

      for (let item of extractedProducts) {
        item['B'] = [];
      }

      for (let item of productsData) {
        for (let item2 of productsByCategories) {
          if (item.G == item2.categoryId) {
            for (let item3 in item2.B) {
              if (item.T == item3) {
                for (let item4 of extractedProducts) {
                  // примерно на этом уровне, мне уже самому стало немного страшно
                  if (item4.categoryId == item2.categoryId) {
                    let obj = {
                      name: item2.B[item3].N,
                      id: item3,
                      price: item.C,
                      quantity: item.P
                    };
                    item4.B.push(obj);
                  }
                }
              }
            }
          }
        }
      }

      console.log(productsData);
      console.log(productsByCategories);
      console.log(extractedProducts);

      commit('setProducts', extractedProducts);
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
