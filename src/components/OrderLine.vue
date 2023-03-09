<template>
  <div class="product-line">
    <product-image class="product-img" :image="$store.state.order_list[index].img" />
    <div class="product-information">
      <span class="product-title">{{$store.state.order_list[index].name}}</span>
      <span class="product-sku">{{$store.state.order_list[index].sku}}</span>
    </div>
    <div class="product-quantity-information" v-if="!noedit">
      <input class="product-quantity" type="number" v-model="$store.state.order_list[index].quantity" />
      <select class="product-quantity-type" v-model="$store.state.order_list[index].quantity_type" >
        <option value="stuks">ST</option>
        <option value="colli">COLLI</option>
        <option value="tray">TRAY</option>
        <option value="multipack">MP</option>
      </select>
    </div>
    <div class="product-quantity-information" v-else>
      <input class="product-quantity noborder" type="number" v-model="$store.state.order_list[index].quantity" disabled/>
      <select class="product-quantity-type noselect" v-model="$store.state.order_list[index].quantity_type" disabled>
        <option value="stuks">ST</option>
        <option value="colli">COLLI</option>
        <option value="tray">TRAY</option>
        <option value="multipack">MP</option>
      </select>
    </div>
    <button class="remove-button" v-if="!noedit" @click="removeProductFromOrderListByIndex">-</button>
  </div>
</template>

<script>
import ProductImage from "@/components/product/ProductImage.vue";

export default {
  name: "OrderLine",
  components: {ProductImage},
  props: {
    index: {
      type: Number,
      required: true
    },
    noedit: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    removeProductFromOrderListByIndex() {
      this.$store.commit("removeProductFromOrderListByIndex", this.index);
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
    margin: 0  auto;
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
    align-items: flex-end;
    margin-left: auto;
    margin-top: auto;
    margin-bottom: auto;
  }
  .product-quantity {
    font-size: 1em;
    max-width: 2em;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    -webkit-appearance: none;
    -moz-appearance: textfield;
  }
  .product-quantity-type {
    font-size: .9em;
    max-width: 5em;
    margin-left: .5em;
  }
  .remove-button {
    color: red;
    border: none;
    padding: 0 .5em;
    font-size: 1.5em;
    font-weight: bold;
    cursor: pointer;
    background: none;
  }
  .noborder {
    border: none;
    background: none;
  }
  .noselect {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    font-size: 1em;
  }
</style>