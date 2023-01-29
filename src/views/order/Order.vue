<template>
  <div>
    <OrderDetailedOverview :order="$store.state.order" v-if="$store.state.order"/>
  </div>
</template>

<script>
import OrderDetailedOverview from "@/components/OrderDetailedOverview.vue";

export default {
  name: "Order",
  components: {OrderDetailedOverview},
  beforeMount() {
    this.$store.dispatch("fetchOrder", this.$route.params.id);
  },
  methods: {
    // Refactor the string to a dd/mm/yyyy format
    formatted_date(string) {
      let date = new Date(string);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
  }
}
</script>

<style scoped>
</style>