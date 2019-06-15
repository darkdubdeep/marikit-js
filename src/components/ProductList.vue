<template>
  <v-container>
    <v-layout text-xs-center justify-center wrap>
      <v-flex xs12 sm11>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title>Товары</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-group
              v-for="item in products"
              :key="item.categoryId"
              v-model="item.active"
              no-action
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.G }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>

              <v-list-tile v-for="subItem in item.B" :key="subItem.id" class="highed-price">
                <v-list-tile-content>
                  <v-list-tile-title v-html="subItem.name + ' (' + subItem.quantity + ')'"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-layout row wrap align-center>
                    <v-list-tile-action-text
                      class="pr-3 pb-2 title font-weight-bold"
                    >{{ subItem.price }} р.</v-list-tile-action-text>
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
  data: () => ({}),
  computed: mapState({
    products: state => state.products.all
  }),
  mounted: function() {
    this.$store.dispatch("getAllProducts");
  }
};
</script>

<style>
.v-list__group__items--no-action .v-list__tile {
  padding-left: 35px;
}

.highed-price {
  background: #ffe0b2;
}
</style>
