<template>
  <div class="product-line">
    <img :src="product.images[0].effectiveUrl" alt="img">
    <span>{{product.productName}}</span>
    <span>{{product.sku}}</span>
  </div>
</template>

<script>
export default {
  name: "ProductLine",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .product-line {
    width: 100%;
    background-color: #fff;
  }
</style>