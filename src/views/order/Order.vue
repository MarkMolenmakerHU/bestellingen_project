<template>
  <div>
    <div v-if="!loading">
      <OrderDetailedOverview v-if="this.order" :order="this.order" />
    </div>
    <LoadingSkeleton v-else />
  </div>
</template>

<script>
import OrderDetailedOverview from "@/components/OrderDetailedOverview.vue";
import LoadingSkeleton from "../../components/LoadingSkeleton.vue";

export default {
  name: "Order",
  components: {LoadingSkeleton, OrderDetailedOverview},
  data() {
    return {
      loading: false,
      order: null
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchOrder", this.$route.params.id).then(
        (order) => {
          this.order = order;
          this.loading = false;
        }
    );
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