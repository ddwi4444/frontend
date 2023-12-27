<template>
  <div>
    <center>
      <div class="row" style="justify-content: center; margin: 0px; padding: 0px;">
        <v-form ref="form" class="form" @submit.prevent="submit">
          <img data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="0"
            src="@/assets/logoHAF2.png"
            class="d-inline-block align-top"
            alt="Logo HAF"
            @click="goToHome()"
            style="cursor: pointer"
          />

          <p data-aos="zoom-out" data-aos-duration="1500" data-aos-offset="0" class="title" style="margin-bottom: 0px">Register</p>
          <p data-aos="zoom-out" data-aos-duration="1500" data-aos-offset="0" class="message" style="margin-bottom: 0px">
            Signup now and get full access to our app.
          </p>

          <label data-aos="fade-right" data-aos-duration="1500" data-aos-offset="0">
            <v-text-field
              v-model="nama_persona"
              :rules="namaPersonaRules"
              placeholder="Name (Persona) * You can't change anymore"
              type="text"
              class="input"
              required
              @keyup="uppercase"
            />
          </label>

          <label data-aos="fade-left" data-aos-duration="1500" data-aos-offset="0">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              placeholder="Email"
              type="email"
              class="input"
              required
            />
          </label>

          <label data-aos="fade-right" data-aos-duration="1500" data-aos-offset="0">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              placeholder="Password"
              type="password"
              class="input"
              required
            />
          </label>

          <label data-aos="fade-left" data-aos-duration="1500" data-aos-offset="0">
            <v-text-field
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              placeholder="Confirm password"
              type="password"
              class="input"
              required
            />
          </label>

          <v-btn data-aos="fade-up" data-aos-duration="1500" data-aos-offset="0"
            class="button-login-register primary"
            style="text-transform: unset !important"
            @click="submit"
            :loading="loading"
            >Register</v-btn
          >
          <p data-aos="fade-up" data-aos-duration="1500" data-aos-offset="0" class="signin">
            Already have an acount?
            <router-link style="color: blue" to="login">Sign In </router-link>
          </p>
        </v-form>
      </div>
    </center>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" auto-height :color="color" text top right>
      {{ textMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn plain color="red" text v-bind="attrs" @click="snackbar = false">
          <v-icon
            dense
            color="#FF0000"
            @click="snackbar = false"
            class="data-table-icon"
            >mdi-close</v-icon
          >
        </v-btn>
      </template>
    </v-snackbar>
    <!-- End Snackbar -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "main-view",
  data() {
    return {
      // FORM
      registerForm: new FormData(),
      nama_persona: "",
      email: "",
      password: "",
      confirmPassword: "",

      // ADDONS
      loading: false,

      // Snackbar
      snackbar: false,
      textMessage: "",
      color: "",
    };
  },
  computed: {
    // VALIDATION FORM
    namaPersonaRules() {
      return [(v) => !!v || "This field is required"];
    },
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
    confirmPasswordRules() {
      return [
        (v) => !!v || "This field is required",
        (v) =>
          (v && v.length >= 8) ||
          "Your password needs to be minimal 8 characters",
        (v) =>
          v === this.password ||
          "Password Confirmation did not match with password",
      ];
    },
  },
  methods: {
    // For Uppercase Form For Nama Persona
    uppercase() {
      const words = this.nama_persona.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
      this.nama_persona = words.join(" ");
    },

    goToHome() {
      return this.$router.push("/");
    },
    goToLogin() {
      const path = "/";
      if (this.$route.path !== path) {
        this.$router.push({
          name: "login",
        });
      }
    },
    submit() {
      this.loading = true;

      if (this.$refs.form.validate()) {
        var url = this.$api + "/register";
        let data = {
          nama_persona: this.nama_persona,
          email: this.email,
          password: this.password,
        };

        this.$http
          .post(url, data)
          .then((response) => {

            this.textMessage = (response.data.message);
            this.snackbar = true;
            this.color = "success";

            // this.$router.push({
            //   name: "login",
            // });
          })
          .catch(() => {
            this.textMessage = "🚫 Oops! Something went wrong. Registration unsuccessful.";
            this.snackbar = true;
            this.color = "blue-grey";

            this.loading = false;
          });

        setTimeout(() => (this.loading = false), 500);
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
