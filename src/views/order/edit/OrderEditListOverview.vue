<template>
  <div class="register-order">
    <OrderRegistrationProgress/>
    <div class="order-data-wrapper">
      <div class="double-order-data" v-if="$store.state.order_data.firstname
      || $store.state.order_data.lastname">
        <span v-if="$store.state.order_data.firstname">{{$store.state.order_data.firstname.toUpperCase()[0]}}. </span>
        <span>{{$store.state.order_data.lastname}}</span>
      </div>
      <span v-if="$store.state.order_data.phonenumber">{{$store.state.order_data.phonenumber}}</span>
      <div class="double-order-data" v-if="$store.state.order_data.pickup_date
      || $store.state.order_data.pickup_time">
        <span>Wordt opgehaald op: {{formatted_date($store.state.order_data.pickup_date)}} - </span>
        <span>{{$store.state.order_data.pickup_time}}</span>
      </div>
      <div class="spacer" />
      <span v-if="$store.state.order_data.delivery_date">
        Wordt geleverd op: {{formatted_date($store.state.order_data.delivery_date)}}</span>
      <div class="order-data-other" v-if="$store.state.order_data.other_info">
        <span>Opmerking:</span>
        <span>{{$store.state.order_data.other_info}}</span>
      </div>
    </div>
    <div class="order-list">
      <span class="title">Bestellijst</span>
      <div class="order-lines">
        <OrderLine v-for="(product, index) in $store.state.order_list" v-bind:key="product.sku" :index="index" noedit/>
      </div>
  </div>
    <button class="button orange" @click="editOrder">Bestelling Aanpassen</button>
  </div>
</template>

<script>
// @ is an alias to /src
import OrderRegistrationProgress from "@/components/OrderRegistrationProgress.vue";
import OrderLine from "@/components/OrderLine.vue";
import axios from "axios";

export default {
  name: 'OrderListOverview',
  components: {
    OrderLine,
    OrderRegistrationProgress
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
    async editOrder() {
      const result = await axios.post("/api/orders/edit", {
        order_id: this.$route.params.id,
        edited_by: localStorage.getItem("loggedInUserId"), // UserId
        firstname: this.$store.state.order_data.firstname,
        lastname: this.$store.state.order_data.lastname,
        phonenumber: this.$store.state.order_data.phonenumber,
        pickup_date: this.$store.state.order_data.pickup_date,
        pickup_time: this.$store.state.order_data.pickup_time,
        delivery_date: this.$store.state.order_data.delivery_date,
        other_info: this.$store.state.order_data.other_info,
        state: "pending",
        product_list: this.$store.state.order_list
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      });

      this.$store.state.order_data = {};
      this.$store.state.order_list = [];

      this.$router.push(`/order/${result.data._id}`);
    }
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
.order-data-wrapper {
  margin-top: 1em;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding: .5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: start;
}
.order-list {
  margin-top: 1em;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: .5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.order-data-other {
  display: flex;
  flex-direction: column;
}
.title {
  width: 90%;
  text-align: start;
  margin: 0 auto .5em;
}
.order-lines {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.button {
  margin-top: auto;
}
.spacer {
  height: 1em;
}
</style>