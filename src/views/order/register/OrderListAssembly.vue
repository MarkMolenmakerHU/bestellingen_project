<template>
  <div class="register-order">
    <OrderRegistrationProgress />
    <SearchField />
    <div class="product-list">
      <ProductLine />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";
import OrderRegistrationProgress from "@/components/OrderRegistrationProgress.vue";
import ProductLine from "@/components/ProductLine.vue";

export default {
  name: 'OrderListAssembly',
  components: {
    ProductLine,
    OrderRegistrationProgress,
    SearchField
  }
}
</script>

<style scoped>
.register-order {
  /* Fill the space between the header and footer */
  height: calc(100% - 10vh);
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
}
</style>