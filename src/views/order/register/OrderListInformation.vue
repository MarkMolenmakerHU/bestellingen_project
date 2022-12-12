<template>
  <div class="register-order">
    <OrderRegistrationProgress/>
  </div>
</template>

<script>
// @ is an alias to /src
import OrderRegistrationProgress from "@/components/OrderRegistrationProgress.vue";

export default {
  name: 'OrderListInformation',
  components: {
    OrderRegistrationProgress
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