<template>
  <div class="product-line">
    <product-image class="product-img" :image="product.images.length > 0 ? product.images[0].effectiveUrl : ''" />
    <div class="product-information">
      <span class="product-title">{{product.productName}}</span>
      <span class="product-sku">{{product.sku}}</span>
    </div>
    <button class="add-button" @click="addProductToOrderList">+</button>
  </div>
</template>

<script>
import ProductImage from "@/components/product/ProductImage.vue";

export default {
  name: "SearchLine",
  components: {ProductImage},
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addProductToOrderList() {
      const added_product = {
        name: this.product.productName,
        img: this.product.images.length > 0 ? this.product.images[0].effectiveUrl : '',
        sku: this.product.sku,
        quantity: 1,
        quantity_type: 'stuks'
      }
      this.$emit('addedProductToOrderList', added_product)
      this.$store.commit("addProductToOrderList", added_product);
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
  .add-button {
    margin-left: auto;
    color: green;
    border: none;
    padding: 0 .5em;
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;
    background: none;
  }
</style>