// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
};

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity, inputError, storeQuantity }) => {
      let product;
      for (let item of rootState.products.all) {
        if ((product = item.B.find(innerItem => innerItem.id === id))) break;
      }
      return {
        title: product.name,
        price: product.price,
        id: product.id,
        storeQuantity: product.quantity,
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
      const cartItem = state.items.find(item => item.id === product.id);
      console.log(cartItem);
      if (!cartItem) {
        commit('pushProductToCart', {
          id: product.id,
          inputError: product.inputError,
          storeQuantity: product.quantity
        });
      } else {
        commit('incrementItemQuantity', cartItem);
      }
    }
  }
};

// mutations
const mutations = {
  pushProductToCart(state, { id, inputError, storeQuantity }) {
    state.items.push({
      id,
      quantity: 1,
      inputError,
      storeQuantity
    });
  },
  incrementItemQuantity(state, { id, storeQuantity }) {
    const cartItem = state.items.find(item => item.id === id);
    if (cartItem.quantity < storeQuantity) cartItem.quantity++;
  },
  changeItemQuantityByInput(state, payload) {
    const cartItem = state.items.find(item => item.id === payload.id);
    if (payload.val <= cartItem.storeQuantity && payload.val > -1) {
      cartItem.quantity = payload.val;
    } else {
      cartItem.quantity = 0;
    }
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
