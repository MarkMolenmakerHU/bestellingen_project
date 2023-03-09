<template>
  <div class="product-line">
    <product-image class="product-img" :image="product.img" />
    <div class="product-information">
      <span class="product-title">{{product.name}}</span>
      <span class="product-sku">{{product.sku}}</span>
    </div>
    <div class="product-quantity-information">
      <span class="product-quantity">{{product.quantity}}</span>
      <span class="product-quantity-type">{{product.quantity_type}}</span>
    </div>
  </div>
</template>

<script>
import ProductImage from "@/components/product/ProductImage.vue";

export default {
  name: "ProductLine",
  components: {ProductImage},
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
    width: 90%;
    background-color: #fff;
    display: flex;
    max-height: 3em;
    margin: 0 auto;
  }
  .product-img {
    width: auto;
    max-height: 3em;
  }
  .product-information {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .product-title {
    font-size: 1em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .product-sku {
    font-size: .9em;
    color: var(--color-text-secondary);
  }
  .product-quantity-information {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: 1em;
  }
  .product-quantity {
    font-size: 1em;
    margin-right: .5em;
  }
  .product-quantity-type {
    font-size: .9em;
    color: var(--color-text-secondary);
  }
</style>