<template>
  <h1>Inloggen</h1>
  <DynamicForm :schema="loginSchema" @submit="login" />
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import DynamicForm from "../components/form/DynamicForm.vue";

export default {
  name: "Login",
  components: { DynamicForm },
  data: () => {
    const loginSchema = {
      fields: [{
        label: "Gebruikersnaam",
        name: "username",
        as: "input",
        placeholder: "Gebruikersnaam",
        rules: Yup.string().required("Vul een gebruikersnaam in!")
      },
      {
        label: "Wachtwoord",
        name: "password",
        as: "input",
        type: "password",
        placeholder: "Wachtwoord",
        rules: Yup.string().required("Vul een wachtwoord in!")
      }],
      button: "Inloggen"
    }
    return {
      loginSchema
    };
  },
  methods: {
    async login(values) {
      try {
        const response = await axios.post("/api/auth/login", {
          username: values.username,
          password: values.password,
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