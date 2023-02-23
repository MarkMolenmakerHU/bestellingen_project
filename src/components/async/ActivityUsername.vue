<template>
  <span class="title">{{this.username}}</span>
</template>

<script>
import axios from "axios";

export default {
  name: "ActivityUsername",
  data() {
    return {
      username: ""
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    axios.get("/api/users/" + this.id + "/fullname", {
      headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
    }).then((response) => {
      this.username = response.data;
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>

<style scoped>

</style>