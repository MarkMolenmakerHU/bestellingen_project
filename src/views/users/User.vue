<template>
  <div v-if="!loading">
  <div class="user-profile" v-if="this.user">
    <div class="image-border">
      <span class="image-icon">{{this.user.firstname[0]}}</span>
    </div>
    <div class="user-details">
      <input type="text" name="username" id="username" :value="this.user.username" disabled>
      <input type="text" name="firstname" id="firstname" :value="this.user.firstname" disabled>
      <input type="text" name="lastname" id="lastname" :value="this.user.lastname" disabled>
      <input type="text" name="role" id="role" :value="this.user.role" disabled>
    </div>
  </div>
  </div>
  <LoadingSkeleton v-else />
</template>

<script>
import LoadingSkeleton from "../../components/LoadingSkeleton.vue";

export default {
  name: "User",
  components: {LoadingSkeleton},
  data() {
    return {
      loading: false,
      user: null
    }
  },
  beforeMount() {
    this.loading = true;
    this.$store.dispatch("fetchUser", this.$route.params.id).then(
        (user) => {
          this.user = user;
          this.loading = false;
        }
    );
  },
}
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
}
.image-border {
  border-radius: 50%;
  border: 1px solid #000;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.image-icon {
  font-size: 3em;
}
.user-details {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-details input {
  margin: 0.5em;
  padding: 0.5em;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1em;
}
</style>