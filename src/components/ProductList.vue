<template>
  <v-container>
    <v-layout text-xs-center justify-center wrap>
      <v-flex xs12 sm11>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Товары</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-group v-for="item in products" :key="item.categoryId" no-action>
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.G }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
              <v-list-tile
                v-for="subItem in item.B"
                :key="subItem.id"
                v-bind:class="{ 'increased-price': currencyIncreased }"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="subItem.name + ' (' + subItem.quantity + ')'"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-layout row wrap align-center>
                    <v-list-tile-action-text
                      class="pr-3 pb-2 title font-weight-bold"
                    >{{ subItem.price | convertToRubles(currency) }} р.</v-list-tile-action-text>
                    <v-btn icon ripple>
                      <v-icon color="teal lighten-2">shopping_cart</v-icon>
                    </v-btn>
                  </v-layout>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    active: true
  }),
  computed: mapState({
    products: state => state.products.all,
    currency: state => state.products.currency,
    currencyIncreased: state => state.products.currencyIncreased
  }),
  mounted: function() {
    this.$store.dispatch("getAllProducts");
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

.increased-price {
  background: #ffe0b2;
}
</style>
