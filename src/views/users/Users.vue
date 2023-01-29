<template>
  <div>
    <NavigationItem v-for="user in $store.state.users" v-bind:key="user._id" :name="user.username"
                    :path="'/user/' + user._id" prefix_icon="fa-user"/>
    <div class="spacer"/>
    <router-link to="/users/add" class="button">Gebruiker toevoegen</router-link>

  </div>
</template>

<script>
import NavigationItem from "@/components/NavigationItem.vue";

export default {
  name: "Users",
  components: {NavigationItem},
  beforeMount() {
    this.$store.dispatch("fetchAllUsers");
  }
}
</script>

<style scoped>
.spacer {
  height: 1em;
}
</style>