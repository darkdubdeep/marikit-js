<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12 sm6 offset-sm3>
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

              <v-list-tile v-for="subItem in item.B" :key="subItem.id">
                <v-list-tile-content>
                  <v-list-tile-title v-html="subItem.name + ' (' + subItem.quantity + ')'"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="subItem.name + ' (' + subItem.quantity + ')'"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <!-- <v-card v-for="subItem in item.B" :key="subItem.id">
                <v-card-title primary-title>
                  <div>
                    <div>{{ subItem.name }}</div>
                  </div>
                </v-card-title>
              </v-card>-->
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
</style>
