<template>
  <div>
    <NavigationItem v-for="order in $store.state.orders" v-bind:key="order._id" :name="order_name(order)"
                    :path="'/order/' + order._id" prefix_icon="fa-cart-shopping"/>
    <div class="spacer"/>
    <router-link to="/orders/register" class="button">Bestelling registreren</router-link>

  </div>
</template>

<script>
import NavigationItem from "@/components/NavigationItem.vue";

export default {
  name: "Orders",
  components: {NavigationItem},
  beforeMount() {
    this.$store.dispatch("fetchAllOrders");
  },
  methods: {
    order_name(order) {
      let date = new Date(order.pickup_date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const state = order.state === 'pending' ? 'In behandeling' : 'Afgerond';
      return `${order.firstname.toUpperCase()[0]}. ${order.lastname} - ${day}/${month}/${year} - ${state}`;
    }
  }
}
</script>

<style scoped>
.spacer {
  height: 1em;
}
</style>