<template>
  <div>
    <!--    A dropdown menu to select a sorting methods for the orders-->
    <select class="dropdown" v-model="sorting_method" @change="loadOrders">
      <option value="date_desc">Datum - Nieuwste eerst</option>
      <option value="date_asc">Datum - Oudste eerst</option>
      <option value="name_asc">Naam - A t/m Z</option>
      <option value="name_desc">Naam - Z t/m A</option>
      <option value="state_asc">Status - Afgerond eerst</option>
      <option value="state_desc">Status - In behandeling eerst</option>
    </select>
    <NavigationItem v-for="order in $store.state.orders" v-bind:key="order._id" :name="order_name(order)"
                    :path="'/order/' + order._id" prefix_icon="fa-cart-shopping"/>
    <div class="spacer"/>
    <router-link to="/order/register/assembly" class="button">Bestelling registreren</router-link>

  </div>
</template>

<script>
import NavigationItem from "@/components/NavigationItem.vue";

export default {
  name: "Orders",
  components: {NavigationItem},
  data () {
    return {
      sorting_method: "date_desc"
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchAllOrders", {sort: this.sorting_method});
  },
  methods: {
    order_name(order) {
      let date = new Date(order.pickup_date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const state = order.state === 'pending' ? 'In behandeling' : 'Afgerond';

      let name = 'Onbekende Klant'
      if (order.firstname !== undefined && order.lastname !== undefined)
        name = order.firstname.toUpperCase()[0] + '. ' + order.lastname;

      return `${name} - ${day}/${month}/${year} - ${state}`;
    },
    loadOrders() {
      this.$store.dispatch("fetchAllOrders", {sort: this.sorting_method});
    },
  }
}
</script>

<style scoped>
.dropdown {
  margin: 1em;
  padding: 0.5em;
  border-radius: 0.5em;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 1em;
  color: #000;
  width: 100%;
  max-width: 20em;
}
.spacer { height: 1em; }
</style>