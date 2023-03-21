<template>
  <div>
  <h1>Inloggen</h1>
  <div class="pin-code">
    <div class="pin-point" :class="{ active: pin.length > 0 }" />
    <div class="pin-point" :class="{ active: pin.length > 1 }" />
    <div class="pin-point" :class="{ active: pin.length > 2 }" />
    <div class="pin-point" :class="{ active: pin.length > 3 }" />
  </div>
  <div class="pin-wrapper">
    <div class="pin-row">
      <button class="btn pin-btn" @click="press(1)">1</button>
      <button class="btn pin-btn" @click="press(2)">2</button>
      <button class="btn pin-btn" @click="press(3)">3</button>
    </div>
    <div class="pin-row">
      <button class="btn pin-btn" @click="press(4)">4</button>
      <button class="btn pin-btn" @click="press(5)">5</button>
      <button class="btn pin-btn" @click="press(6)">6</button>
    </div>
    <div class="pin-row">
      <button class="btn pin-btn" @click="press(7)">7</button>
      <button class="btn pin-btn" @click="press(8)">8</button>
      <button class="btn pin-btn" @click="press(9)">9</button>
    </div>
    <div class="pin-row">
      <button class="btn action-btn" @click="press('BACK')">
        <i class="fas fa-backspace" />
      </button>
      <button class="btn pin-btn" @click="press(0)">0</button>
      <button class="btn action-btn" @click="press('GO')">
        <i class="fas fa-arrow-right" />
      </button>
    </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "LoginPin",
  data() {
    return {
      pin: "",
    }
  },
  methods: {
    press(value) {
      if (value === "BACK") {
        this.pin = this.pin.slice(0, -1);
      } else if (value === "GO") {
        if (this.pin.length === 4) {
          this.loginWithPin();
          this.pin = "";
        }
      } else
      if (this.pin.length < 4) {
        this.pin += value;
        if (this.pin.length === 4) {
          this.loginWithPin();
          this.pin = "";
        }
      }
    },
    async loginWithPin() {
      try {
        const response = await axios.post("/api/auth/accessToken", {
          refreshToken: localStorage.getItem("refreshToken"),
          pin: this.pin,
        });
        const {id, accessToken, refreshToken} = await response.data;
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
    }
  }
};
</script>

<style scoped>
.pin-wrapper {
  display: flex;
  flex-direction: column;
}
.pin-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 5rem;
  aspect-ratio: 1/1;
  border-radius: 10%;
  margin: .5rem;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
}
.pin-btn:hover {
  background-color: var(--color-primary);
  color: #fff;
}
.pin-btn:active {
  transform: translate(.25rem, .25rem);
  box-shadow: none;
}
.pin-btn {
  border: .1rem solid var(--color-primary);
  box-shadow: .25rem .25rem 0 var(--color-primary-dark);
  background-color: #fff;
  color: #000;
}
.action-btn {
  border: none;
  box-shadow: none;
}
.action-btn i {
  color: var(--color-primary-dark);
  font-size: 2.5rem;
}
.action-btn:hover i {
  color: var(--color-primary-light);
}
.action-btn:active i {
  transform: translate(0, .25rem);
}

.pin-code {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
.pin-point {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #000;
  margin: 0 .5rem;
}
.pin-point.active {
  background-color: var(--color-primary);
}
</style>