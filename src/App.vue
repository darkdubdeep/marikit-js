<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Product list</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <ProductsPage/>
    </v-content>
  </v-app>
</template>

<script>
import ProductList from './components/ProductList';
import ProductsPage from './views/Products';

export default {
  name: 'App',
  components: {
    ProductsPage
  },
  data() {
    return {
      //
    };
  }
};
</script>
