<template>
  <div class="user-profile" v-if="this.$store.state.user">
    <div class="image-border">
      <span class="image-icon">{{this.$store.state.user.firstname[0]}}</span>
    </div>
    <div class="user-details">
      <input type="text" name="username" id="username" :value="this.$store.state.user.username" disabled>
      <input type="text" name="firstname" id="firstname" :value="this.$store.state.user.firstname" disabled>
      <input type="text" name="lastname" id="lastname" :value="this.$store.state.user.lastname" disabled>
      <input type="text" name="role" id="role" :value="this.$store.state.user.role" disabled>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  beforeMount() {
    this.$store.dispatch("fetchUser", this.$route.params.id);
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