<template>
  <div>
  <h1>Nieuwe Gebruiker Aanmaken</h1>
  <CreateAccountForm :schema="createAccountSchema" @submit="addUser"/>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import CreateAccountForm from "@/components/form/CreateAccountForm.vue";
import * as Yup from "yup";

export default {
  name: "AddUser",
  components: {CreateAccountForm},
  data: () => {
    const createAccountSchema = {
      fields: [{
        label: "Gebruikersnaam",
        name: "username",
        as: "input",
        placeholder: "Gebruikersnaam",
        rules: Yup.string().required("Vul een gebruikersnaam in!")
      },
        {
          label: "Voornaam",
          name: "firstname",
          as: "input",
          placeholder: "Voornaam",
          rules: Yup.string().required("Vul een voornaam in!")
        },
        {
          label: "Achternaam",
          name: "lastname",
          as: "input",
          placeholder: "Achternaam",
          rules: Yup.string().required("Vul een achternaam in!")
        },
        {
          label: "Wachtwoord",
          name: "password",
          as: "input",
          type: "password",
          placeholder: "Wachtwoord",
          rules: Yup.string().required("Vul een wachtwoord in!")
        },
        {
          label: "Herhaal Wachtwoord",
          name: "repeat_password",
          as: "input",
          type: "password",
          placeholder: "Herhaal Wachtwoord",
          rules: Yup.string().required("Vul een wachtwoord in!")
        },
        {
          label: "Pincode",
          name: "pin",
          as: "input",
          type: "password",
          placeholder: "Pincode 4 cijfers",
          rules: Yup.string().max(4, "Pincode moet 4 cijfers zijn!").concat(
              Yup.string().matches(/^[0123456789]{4}$/, "Pincode moet 4 cijfers zijn!")).concat(
              Yup.string().required("Vul een pincode in!"))
        }],
      button: "Gebruiker Aanmaken"
    }
    return {
      createAccountSchema
    };
  },
  methods: {
    async addUser(values) {
      if (values.password !== values.repeat_password) {
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
          title: 'Gebruiker aanmaken mislukt! Wachtwoorden zijn niet hetzelfde!'
        });
        return;
      }

      const result = await axios.post("/api/auth/signup", {
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        role: values.role,
        password: values.password,
        pin: values.pin
      });

      this.$router.push(`/user/${result.data.id}`);
    }
  }
}
</script>

<style scoped>

</style>