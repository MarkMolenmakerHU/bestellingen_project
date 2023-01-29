<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="gebruikersnaam" />
      <br />
      <br />
      <input v-model="password" placeholder="wachtwoord" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/api/auth/login", {
          username: this.username,
          password: this.password,
        });
        const { id, accessToken, refreshToken } = await response.data;
        localStorage.setItem("loggedInUserId", id);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (accessToken) {
          await Swal.fire({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            icon: 'success',
            title: 'Succesvol ingelod!',
            text: 'Je wordt doorgestuurd naar de hoofdpagina...'
          });
          this.$router.push("/");
        }

      } catch (err) {
        await Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
          icon: 'error',
          title: 'Inloggen mislukt! Gebruikersnaam of wachtwoord is onjuist.'
        });
      }
    },
  }
};
</script>

<style scoped>

</style>