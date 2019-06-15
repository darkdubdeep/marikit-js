import shop from '../../api/shop';

// initial state

const state = {
  all: [],
  currency: 40,
  currencyIncreased: false
};

// getters
const getters = {};

// actions
const actions = {
  getAllProducts({ commit }) {
    // получаем данные продкутов и имена продуктов
    shop.getProducts((products, productsNames) => {
      // забираем необходимые данные из файла data.json
      const productsData = products.Value.Goods;
      // создаем новый массив из файла для более удоной работы с данными
      let productsByCategories = [];
      for (let item in productsNames) {
        productsNames[item].categoryId = item;
        productsByCategories.push(productsNames[item]);
      }
      // создаем конечный массив с данными и "отвязываемся" от ссылок применяя функции JSON
      let extractedProducts = JSON.parse(JSON.stringify(productsByCategories));
      for (let item of extractedProducts) {
        item['B'] = [];
      }
      for (let item of productsData) {
        for (let item2 of productsByCategories) {
          // ищем к какой категории относиться товар и затем ищем этот товар в данной категории
          if (item.G == item2.categoryId) {
            for (let item3 in item2.B) {
              if (item.T == item3) {
                for (let item4 of extractedProducts) {
                  if (item4.categoryId == item2.categoryId) {
                    // создаем конечный объект товара и пушим его в нужную категорию конечного массива
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
      commit('setProducts', extractedProducts);
      commit('setCurrency');
    });
  }
};

// mutations
const mutations = {
  setProducts(state, goods) {
    state.all = goods;
  },
  // мутация для изменения текущего курса доллара
  setCurrency(state) {
    let currency = state.currency;
    let newCurrency = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
    if (currency < newCurrency) {
      state.currencyIncreased = true;
    } else {
      state.currencyIncreased = false;
    }
    state.currency = newCurrency;
    console.log('updated');
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
