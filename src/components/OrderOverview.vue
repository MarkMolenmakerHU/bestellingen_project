<template>
  <div class="container">
    <div class="information-container">
      <span class="title">{{formatted_name(order.firstname, order.lastname)}}</span>
      <div class="sub-container">
        <div class="data-container">
          <span class="subtitle">Datum:</span>
          <span class="subtitle-data">{{formatted_date(order.pickup_date)}} - {{order.pickup_time}}</span>
        </div>
        <div class="data-container right">
          <span class="subtitle">Status:</span>
          <span class="subtitle-data">{{order.state}}</span>
        </div>
      </div>
    </div>
    <div class="product-container">
      <ProductLine v-for="product in order.product_list" v-bind:key="product.sku" :product="product"/>
    </div>
    <div class="actions-container">
      <router-link class="action-btn" :to="'/order/' + order._id"><i class="fa-solid fa-eye edit"/>WEERGEVEN</router-link>
      <button class="action-btn" @click="completeOrder" v-if="order.state !== 'completed'"><i class="fa-solid fa-check accept"/>VOLTOOIEN</button>
    </div>
  </div>
</template>

<script>
import ProductLine from "@/components/ProductLine.vue";
import axios from "axios";

export default {
  name: "OrderOverview",
  components: {ProductLine},
  props: {
    order: {
      type: Object,
      required: true,
    }
  },
  methods: {
    formatted_name(firstname, lastname) {
      let name = 'Onbekende Klant'
      if (firstname !== undefined && lastname !== undefined)
        name = firstname + ' ' + lastname;
      return name;
    },
    // Refactor the string to a dd/mm/yyyy format
    formatted_date(string) {
      let date = new Date(string);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async completeOrder() {
      await axios.post("/api/orders/state", {
        order_id: this.order._id,
        edited_by: localStorage.getItem("loggedInUserId"), // UserId
        state: "completed",
      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      });

      this.$router.go();
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  margin: 1em 2em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.information-container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.title {
  font-size: 1em;
  font-weight: bold;
}
.sub-container {
  display: flex;
  margin-top: .3em;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  background-color: #fff;
}
.data-container {
  display: flex;
  flex-direction: row;
  gap: .3em;
  justify-content: flex-start;
  width: 50%;
  font-size: .9em;
  background-color: #fff;
}
.right {
  justify-content: flex-end;
}
.subtitle {
  color: #696969;
}
.subtitle-data {
  color: #000
}
.product-container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}
.actions-container {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 1em;
}
.action-btn {
  display: flex;
  padding: 1em;
  width: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: var(--color-background);
  text-decoration: none;
  color: #000;
  font-size: 1em;
}
.action-btn:hover {
  background-color: #ddd;
  cursor: pointer;
}
.action-btn i {
  margin-right: .5em;
}
.edit {
  color: var(--color-primary);
}
.accept {
  color: #44d200;
}
</style>