// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
};

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      let product;
      for (let item of rootState.products.all) {
        if ((product = item.B.find(innerItem => innerItem.id === id))) break;
      }
      console.log(product);
      return {
        title: product.name,
        price: product.price,
        quantity
      };
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }
};

// actions
const actions = {
  addProductToCart({ state, commit }, product) {
    if (product.quantity > 0) {
      console.log('shit fired');
      const cartItem = state.items.find(item => item.id === product.id);
      if (!cartItem) {
        commit('pushProductToCart', { id: product.id });
      } else {
        commit('incrementItemQuantity', cartItem);
      }
      // // remove 1 item from stock
      // commit(
      //   'products/decrementProductInventory',
      //   { id: product.id },
      //   { root: true }
      // );
    }
  }
};

// mutations
const mutations = {
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1
    });
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
  },

  setCartItems(state, { items }) {
    state.items = items;
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
