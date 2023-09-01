<template>
  <div>
    <center>
      <div class="row" style="margin-top: 30px; justify-content: center">
        <form class="form" @submit.prevent="login()">
          <img
            src="@/assets/logoHAF2.png"
            class="d-inline-block align-top"
            alt="Logo HAF"
          />

          <p class="title" style="margin-bottom: 0px">Login</p>
          <p class="message" style="margin-bottom: 0px">
            Signup now and get full access to our app.
          </p>
          <label>
            <input
              v-model="form.email"
              placeholder=""
              type="email"
              class="input"
              required
            />
            <span>Email</span>
          </label>

          <label>
            <input
              v-model="form.password"
              placeholder=""
              type="password"
              class="input"
              required
            />
            <span>Password</span>
          </label>
          <div class="row" style="justify-content: center">
            <div class="col-sm-4">
              <button class="button-login-register">
                Login
              </button>
            </div>
            <div class="col-sm-4">
              <router-link to="register"><button class="button-login-register">
                Register
              </button></router-link>
            </div>
          </div>
          <p class="signin">Forgot Password? <a href="#">Help</a></p>
        </form>
      </div>
    </center>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,
.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message,
.signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,
.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: 0.3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* Button Login / Register */
.button-login-register {
  padding: 8px 15px;
  border: 0;
  border-radius: 100px;
  background-color: royalblue;
  color: #ffffff;
  font-weight: Bold;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.button-login-register:hover {
  background-color: rgb(86, 122, 229);
  box-shadow: 0 0 20px #5ca9dd50;
  transform: scale(1.1);
}

.button-login-register:active {
  background-color: royalblue;
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}
/* /Button Login / Register */
</style>

<script lang="ts">
// import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: "main-view",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    goToRegister() {
      const path = "/";
      if (this.$route.path !== path) {
        this.$router.push({
          name: "register",
        });
      }
    },
    login() {
      var url = this.$api + "/login";
      let data = {
        email: this.form.email,
        password: this.form.password,
      };

      this.$http
        .post(url, data)
        .then((response) => {
          let userLogin = {
            token: response.data.data.token,
            nama: response.data.data.user.nama_persona,
            role: response.data.data.user.role,
          };

          localStorage.setItem("userLogin", JSON.stringify(userLogin));

          this.$router.push({
            name: "haf-profile",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
