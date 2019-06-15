<template>
  <v-container fluid>
    <ShoppingCart/>
    <ProductList/>
  </v-container>
</template>

<script>
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";

export default {
  components: {
    ProductList,
    ShoppingCart
  }
};
</script>
