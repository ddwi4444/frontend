<template>
  <div>
    <center>
      <div class="row" style="margin-top: 30px; justify-content: center">
        <v-form class="form" ref="form" @submit.prevent="login()">
          <img
            src="@/assets/logoHAF2.png"
            class="d-inline-block align-top"
            alt="Logo HAF"
            @click="goToHome()"
            style="cursor: pointer"
          />

          <p class="title" style="margin-bottom: 0px">Login</p>
          <p class="message" style="margin-bottom: 0px">
            Signup now and get full access to our app.
          </p>
          <label>
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              placeholder="Email"
              type="email"
              class="input"
              prepend-icon="mdi-account"
              required
            />
          </label>

          <label>
            <v-text-field
              v-model="form.password"
              :rules="passwordRules"
              placeholder="Password"
              type="password"
              class="input"
              prepend-icon="mdi-lock"
              required
            />
          </label>
          <div class="row" style="justify-content: center">
            <div class="col-sm-4">
              <v-btn
                class="button-login-register primary"
                style="text-transform: unset !important"
                :loading="loading"
                @click="login()"
              >
                Login
              </v-btn>
            </div>
            <div class="col-sm-4">
              <router-link to="register"
                ><v-btn
                  class="button-login-register primary"
                  style="text-transform: unset !important"
                >
                  Register
                </v-btn></router-link
              >
            </div>
          </div>
          <p class="signin">Forgot Password? <a href="#">Help</a></p>
        </v-form>
      </div>
    </center>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "login-view",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      // ADDONS
      loading: false,
    };
  },
  computed: {
    // VALIDATION FORM
    emailRules() {
      return [
        (v) => !!v || "This field is required",
        (v) => /.+@.+\..+/.test(v) || "Please enter a valid email address",
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "This field is required",
        (v) =>
          (v && v.length >= 8) ||
          "Your password needs to be minimal 8 characters",
      ];
    },
  },
  methods: {
    goToHome() {
      return this.$router.push("/");
    },
    goToRegister() {
      const path = "/";
      if (this.$route.path !== path) {
        this.$router.push({
          name: "register",
        });
      }
    },
    login() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/login";
        let data = {
          email: this.form.email,
          password: this.form.password,
        };

        this.$http
          .post(url, data)
          .then((response) => {
            localStorage.setItem(
              "nama_persona",
              response.data.data.user.nama_persona
            );
            localStorage.setItem("role", response.data.data.user.role);
            localStorage.setItem("image", response.data.data.user.uuid);
            localStorage.setItem("token", response.data.data.token);

            this.$router.push({
              name: "haf-profile",
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
        this.loading = true;
        setTimeout(() => (this.loading = false), 10000);
      }
    },
  },
});
</script>

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
  padding: 15px 10px 0px 10px;
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
