<template>
  <div class="register-order" v-if="$store.state.order">
    <OrderRegistrationProgress/>
    <form class="order-information" @submit.prevent>
      <span>Klant Gegevens</span>
      <input type="text" v-model="$store.state.order_data.firstname" placeholder="Voornaam...">
      <input type="text" v-model="$store.state.order_data.lastname" placeholder="Achternaam...">
      <input type="text" v-model="$store.state.order_data.phonenumber" placeholder="Telefoonnummer...">
      <span>Afhaalmoment</span>
      <div class="double-input-wrapper">
        <input type="date" v-model="$store.state.order_data.pickup_date">
        <input type="time" v-model="$store.state.order_data.pickup_time">
      </div>
      <span>Leveringsmoment</span>
      <input type="date" v-model="$store.state.order_data.delivery_date">
      <span>Opmerkingen</span>
      <textarea v-model="$store.state.order_data.other_info" placeholder="Overig..." />
    </form>
    <router-link class="button orange" :to="'/order/' + this.$route.params.id + '/overview'">Aanpassen Afronden</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import OrderRegistrationProgress from "@/components/OrderRegistrationProgress.vue";

export default {
  name: 'OrderListInformation',
  components: {
    OrderRegistrationProgress
  },
  async created() {
    await this.$store.dispatch("fetchOrder", this.$route.params.id);
    this.$store.dispatch("setOrderData", this.$store.state.order);

    // Format the date to yyyy-mm-dd
    const formattedPickupDate = new Date(this.$store.state.order.pickup_date);
    const formattedDeliveryDate = new Date(this.$store.state.order.delivery_date);
    this.$store.state.order_data.pickup_date = formattedPickupDate.toISOString().split('T')[0];
    this.$store.state.order_data.delivery_date = formattedDeliveryDate.toISOString().split('T')[0];
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
.order-information {
  margin-top: 1em;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
}
.order-information input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.order-information textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.order-information span {
  margin-right: auto;
  padding-left: .5em;
}
.double-input-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}
.button {
  margin-top: auto;
}
</style>