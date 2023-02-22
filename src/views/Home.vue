<template>
  <div class="home">
    <div v-if="!loading">
      <div class="orders-wrapper" v-if="this.orders.length > 0">
        <span class="title">Vandaag</span>
        <div class="orders-container">
          <OrderOverview :order="this.orders[this.index]"/>
        </div>
        <div class="cycle-arrows">
          <div class="cycle-arrow" @click="handlePrevious"><span>&#60;</span></div>
          <span>{{this.index + 1}} / {{this.orders.length}}</span>
          <div class="cycle-arrow" @click="handleNext"><span>&#62;</span></div>
        </div>
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
      loading: false,
      orders: [],
      index: 0
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchOrdersToday").then(
        (orders) => {
          this.orders = orders;
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
    },
    handlePrevious() {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.orders.length - 1;
      }
    },
    handleNext() {
      if (this.index < this.orders.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5em auto;
}
.title {
  font-size: 1.5em;
  font-weight: bold;
}
.spacer {
  height: 1em;
}
.orders-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cycle-arrows {
  width: 100%;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cycle-arrow {
  display: flex;
  width: 2em;
  color: white;
  height: 1em;
  font-size: 2em;
  cursor: pointer;
  background-color: var(--color-primary);
  border-radius: 10px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>