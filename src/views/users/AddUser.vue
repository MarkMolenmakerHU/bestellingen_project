<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="addUser" method="post">
      <label for="username">Gebruikersnaam</label>
      <input type="text" v-model="username" placeholder="Gebruikersnaam" />
      <label for="firstname">Voornaam</label>
      <input type="text" v-model="firstname" placeholder="Voornaam" />
      <label for="lastname">Achternaam</label>
      <input type="text" v-model="lastname" placeholder="Achternaam"/>
      <label for="role">Rol</label>
      <select v-model="role" id="role">
        <option value="beheer">Beheer</option>
        <option value="gebruiker" >Gebruiker</option>
      </select>
      <label for="password">Wachtwoord</label>
      <input type="password" v-model="password" placeholder="Wachtwoord" />
      <label for="password">Herhaal wachtwoord</label>
      <input type="password" v-model="password_repeated" placeholder="Herhaal wachtwoord" />
      <button type="submit" class="button">Gebruiker Toevoegen</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddUser",
  data: () => {
    return {
      username: "",
      firstname: "",
      lastname: "",
      role: "gebruiker",
      password: "",
      password_repeated: ""
    };
  },
  methods: {
    async addUser() {
      if (this.password !== this.password_repeated) {
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
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role,
        password: this.password,
      });

      this.$router.push(`/user/${result.data.id}`);
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 1em;
}
.form label {
  margin: 0;
  padding: 0.5em;
  border: none;
  font-size: 1em;
}
.form input {
  margin-bottom: 0.5em;
  padding: 0.5em;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1em;
}
</style>