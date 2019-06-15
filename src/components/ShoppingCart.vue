<template>
  <v-container>
    <v-layout text-xs-center justify-center wrap>
      <v-flex xs12 sm9>
        <v-card>
          <v-toolbar color="teal lighten-2" dark>
            <v-toolbar-title>Корзина</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile v-for="item in products" :key="item.id">
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-layout row wrap align-center>
                  <v-list-tile-action-text
                    class="pr-3 pb-2 title font-weight-bold"
                  >{{ item.quantity }}</v-list-tile-action-text>
                  <v-list-tile-action-text
                    class="pr-3 pb-2 title font-weight-bold"
                  >{{ item.price | convertToRubles(currency) }} р.</v-list-tile-action-text>
                  <v-btn icon ripple>
                    <v-icon color="teal lighten-2">delete</v-icon>
                  </v-btn>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
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
      cartProducts: state => state.cart.items,
      currency: state => state.products.currency
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice"
    })
  },
  mounted: function() {},
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
</style>
