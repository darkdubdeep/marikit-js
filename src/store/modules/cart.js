// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
};

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity, inputError }) => {
      let product;
      for (let item of rootState.products.all) {
        if ((product = item.B.find(innerItem => innerItem.id === id))) break;
      }
      return {
        title: product.name,
        price: product.price,
        id: product.id,
        inputError,
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
        commit('pushProductToCart', {
          id: product.id,
          inputError: product.inputError
        });
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
  pushProductToCart(state, { id, inputError }) {
    state.items.push({
      id,
      quantity: 1,
      inputError
    });
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
  },
  incrementItemQuantityByInput(state, payload) {
    const cartItem = state.items.find(item => item.id === payload.id);
    cartItem.quantity = payload.val;
  },
  setInputError(state, payload) {
    const cartItem = state.items.find(item => item.id === payload);
    cartItem.inputError = true;
  },
  removeInputError(state, payload) {
    const cartItem = state.items.find(item => item.id === payload);
    cartItem.inputError = false;
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
