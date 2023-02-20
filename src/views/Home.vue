<template>
  <div class="home">
    <div v-if="!loading">
      <div class="orders-wrapper" v-if="$store.state.orders.length > 0">
        <span class="title">Vandaag</span>
        <OrderOverview v-for="order in $store.state.orders" v-bind:key="order._id" :order="order"/>
      </div>
      <div class="orders-wrapper" v-else>
        <span class="title">Geen Bestellingen Vandaag</span>
      </div>
    </div>
    <LoadingSkeleton v-else />
    <NavigationItem path="/order/register/assembly" name="Bestelling Registreren" prefix_icon="fa-pencil"/>
    <NavigationItem path="/orders" name="Overzicht Bestellingen" prefix_icon="fa-cart-shopping"/>
    <NavigationItem path="/users" name="Account beheer" prefix_icon="fa-users"/>
    <div class="spacer"/>
    <NavigationItem path="/login" name="Uitloggen" prefix_icon="fa-right-from-bracket" @click="logout()"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationItem from "@/components/NavigationItem.vue";
import axios from "axios";
import OrderOverview from "@/components/OrderOverview.vue";
import LoadingSkeleton from "../components/LoadingSkeleton.vue";

export default {
  name: 'Home',
  components: {
    LoadingSkeleton,
    OrderOverview,
    NavigationItem
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchOrdersToday").then(
        () => {
          this.loading = false;
        }
    );
  },
  methods: {
    logout() {
      axios.post("/api/auth/logoutAll", {
        refreshToken: localStorage.getItem("refreshToken")
      }).then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("loggedInUserId");
      });
    }
  }
}
</script>

<style scoped>
.home {
  /* Fill the space between the header and footer */
  height: calc(100% - 10vh);
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
}
.orders-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 1.5em;
  font-weight: bold;
  margin: 1em 0;
}
.spacer {
  height: 1em;
}
</style>