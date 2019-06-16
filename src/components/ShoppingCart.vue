<template>
  <v-container>
    <v-layout text-xs-center justify-center wrap>
      <v-flex xs12 sm9>
        <v-card>
          <v-toolbar color="teal lighten-2" dark>
            <v-toolbar-title>Корзина</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <h2 v-if="!products.length">В корзине нет товаров</h2>
            <v-list-tile v-for="item in products" :key="item.id">
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-layout row align-center>
                  <v-list-tile-action-text class="pr-3 pb-0 font-weight-black">
                    <h3 class="text-red" v-if="item.storeQuantity < 10">Количество ограниченно</h3>
                  </v-list-tile-action-text>
                  <v-list-tile-action-text>
                    <v-text-field
                      :value="item.quantity"
                      @input="updateQuantity($event, item.id)"
                      :error="item.inputError ? true : false"
                    ></v-text-field>
                  </v-list-tile-action-text>
                  <v-list-tile-action-text
                    class="pr-1 pb-2 title font-weight-bold min-width"
                  >{{ item.price | convertToRubles(currency) }} р.</v-list-tile-action-text>
                  <v-btn icon ripple>
                    <v-icon color="teal lighten-2" @click="deleteItemFromCart(item)">delete</v-icon>
                  </v-btn>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <h2 class="text-right" v-if="products.length">{{total | convertToRubles(currency)}} р.</h2>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "ShoppingCart",
  data: () => ({}),
  computed: {
    ...mapState({
      currency: state => state.products.currency
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice"
    })
  },
  methods: {
    updateQuantity(val, id) {
      if (!/^\d+$/.test(val)) {
        this.$store.commit("cart/setInputError", id);
      } else {
        const payload = { val, id };
        this.$store.commit("cart/removeInputError", id);
        this.$store.commit("cart/changeItemQuantityByInput", payload);
      }
    },
    deleteItemFromCart(item) {
      this.$store.commit("cart/deleteItemFromCart", item.id);
    }
  },
  filters: {
    convertToRubles: (value, currency) => {
      return (value * currency).toFixed(2);
    }
  }
};
</script>

<style>
.v-list__group__items--no-action .v-list__tile {
  padding-left: 35px;
}
.min-width {
  min-width: 150px;
}
.text-red {
  color: #ff5252;
}
.text-right {
  text-align: right;
  padding-right: 20px;
  padding-bottom: 10px;
}
</style>
