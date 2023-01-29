<template>
  <div class="register-order" v-if="$store.state.order">
    <OrderRegistrationProgress />
    <SearchField />
    <div class="product-list list">
      <SearchLine v-for="product in $store.state.search_results" v-bind:key="product.sku" :product="product"
                   @added-product-to-order-list="clearSearchResults" />
    </div>
    <div class="order-list list" v-if="$store.state.search_results.length === 0">
      <OrderLine v-for="(product, index) in $store.state.order_list" v-bind:key="product.sku" :index="index"/>
    </div>
    <router-link class="button orange" :to="'/order/' + this.$route.params.id + '/information'">Gegevens aanpassen</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";
import OrderRegistrationProgress from "@/components/OrderRegistrationProgress.vue";
import OrderLine from "@/components/OrderLine.vue";
import SearchLine from "@/components/SearchLine.vue";

export default {
  name: 'OrderListAssembly',
  components: {
    OrderLine,
    SearchLine,
    OrderRegistrationProgress,
    SearchField
  },
  methods: {
    clearSearchResults() {
      this.$store.commit("clearSearchResults");

    }
  },
  async created() {
    await this.$store.dispatch("fetchOrder", this.$route.params.id);
    this.$store.dispatch("setOrderList", this.$store.state.order.product_list);
  }
}
</script>

<style scoped>
.register-order {
  /* Fill the space between the header and footer */
  height: calc(100% - 10vh);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list {
  width: 100%;
}
.button {
  margin-top: auto;
}
</style>