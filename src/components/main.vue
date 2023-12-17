<template>
  <div>
    <v-fade-transition>
      <div v-if="loadingScreen == true">
        <loading-screen :value="true"></loading-screen>
      </div>
    </v-fade-transition>
    <div class="app" >
      <nav class="navbar padding-navbar d-flex w-full p-x-15" style="z-index: 100;">
        <div class="logo">
            <img
            @click="handlerGoHome"
              src="@/assets/logoHAF2.png"
              class="d-inline-block align-top"
              alt="Logo HAF"
              style="height: 30px; cursor: pointer;"
            />
        </div>

        <div :class="['links', { open: isMenuOpen }]">
          <div class="show-profile-and-logout">
            <div class="menuColor" v-if="isMyProfile == 1" @click="handlerGoMyProfile">My Profile</div>
            <div class="menuUncolor" v-else @click="handlerGoMyProfile">My Profile</div>
          </div>
          <div class="menuColor" v-if="isServices==1" @click="handlerGoService">HAF Service</div>
          <div class="menuUncolor" v-else @click="handlerGoService">HAF Service</div>

          <div class="menuColor" v-if="isMerchandise==1" @click="handlerGoMerchandise">HAF Merchandise</div>
          <div class="menuUncolor" v-else @click="handlerGoMerchandise">HAF Merchandise</div>

          <div class="menuColor" v-if="isSchool==1" @click="handlerGoSchool">HAF School</div>
          <div class="menuUncolor" v-else @click="handlerGoSchool">HAF School</div>

          <div class="menuColor" v-if="isAbout==1" @click="handlerGoAbout">About</div>
          <div class="menuUncolor" v-else @click="handlerGoAbout">About</div>

          <div class="show-profile-and-logout" style="margin-bottom: 15px;">
            <router-link style="margin-bottom: 10px;" to="login" @click.native="logout">Logout</router-link>
          </div>
        </div>

        <div class="avatar" @click="handlerGoMyProfile">
          <div class="user-avatar">
            <b-avatar
              style="margin-right: 5px"
              badge
              badge-variant="success"
              :src="userLogin.image ? $baseUrl + '/storage/' + userLogin.image : ''">
            </b-avatar>
              <span
              v-if="isMyProfile == 1"
              class="menuColor mr-auto"
              style="display: inline-block; text-transform: capitalize"
            >
              {{ getNamaPersona }}</span
            >
            <span
              v-else
              class="menuUncolor mr-auto"
              style="display: inline-block; text-transform: capitalize"
            >
              {{ getNamaPersona }}</span
            >
          </div>
        </div>

        <button class="menu-toggle" @click="this.toggleMenu">
          <span class="menu-icon">
            <v-icon color="#FFFFFF" class="data-table-icon" v-if="!isMenuOpen"
              >mdi-menu</v-icon
            >
            <v-icon color="#FFFFFF" class="data-table-icon" v-else
              >mdi-close</v-icon
            >
          </span>
        </button>
      </nav>
    </div>

    <div class="fullheight" style="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LoadingScreen from "@/components/loading-screen.vue";

export default {
  name: "main-view",
  components: {
    "loading-screen": LoadingScreen,
  },
  data: () => ({
    isMenuOpen: false,
    loadingScreen: false,

    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      image: localStorage.getItem("image"),
    },

    // Adds On
    isServices: 0,
    isMerchandise: 0,
    isSchool: 0,
    isAbout: 0,
    isMyProfile: 0,
  }),
  mounted() {
    // Get the current URL
    const currentURL = window.location.href;

    // Check if the current URL contains 'http://localhost:8080/haf-merchandise'
    if (currentURL.includes('http://localhost:8080/haf-service')) {
      // Set isMerchandise to 1
      this.isServices = 1;
    }
    if (currentURL.includes('http://localhost:8080/haf-merchandise')) {
      // Set isMerchandise to 1
      this.isMerchandise = 1;
    }
    if (currentURL.includes('http://localhost:8080/haf-school')) {
      // Set isMerchandise to 1
      this.isSchool = 1;
    }
    if (currentURL.includes('http://localhost:8080/haf-about')) {
      // Set isMerchandise to 1
      this.isAbout = 1;
    }
    if (currentURL.includes('http://localhost:8080/haf-profile')) {
      // Set isMerchandise to 1
      this.isMyProfile = 1;
    }
  },
  methods: {
    
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      this.loadingScreen = true;

      var url = this.$api + "/logout";
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .post(url, this.NPCForm, { headers: headers })
        .then((response) => {
          console.log(response.data.message);
          localStorage.removeItem("image");
          localStorage.removeItem("nama_persona");
          localStorage.removeItem("role");
          localStorage.removeItem("token");
          setTimeout(() => {
            this.loadingScreen = false;
          }, 5000);
          this.$router.push({
            name: "login",
          });
        });
    },

    handlerGoMyProfile() {
      this.isMenuOpen = false;
      this.isMyProfile = 1;
      this.isServices = 0;
      this.isMerchandise = 0;
      this.isSchool = 0;
      this.isAbout = 0;
      return this.$router.push("/haf-profile").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    handlerGoHome(){
      this.isMenuOpen = false;
      this.isServices = 0;
      this.isMerchandise = 0;
      this.isSchool = 0;
      this.isAbout = 0;
      this.isMyProfile = 0;
      return this.$router.push("/").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    handlerGoService(){
      this.isMenuOpen = false;
      this.isServices = 1;
      this.isMerchandise = 0;
      this.isSchool = 0;
      this.isAbout = 0;
      this.isMyProfile = 0;
      return this.$router.push("/haf-service").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    handlerGoMerchandise(){
      this.isMenuOpen = false;
      this.isMerchandise = 1;
      this.isServices = 0;
      this.isSchool = 0;
      this.isAbout = 0;
      this.isMyProfile = 0;
      return this.$router.push("/haf-merchandise").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    handlerGoSchool(){
      this.isMenuOpen = false;
      this.isSchool = 1;
      this.isServices = 0;
      this.isMerchandise = 0;
      this.isAbout = 0;
      this.isMyProfile = 0;
      return this.$router.push("/haf-school").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    handlerGoAbout(){
      this.isMenuOpen = false;
      this.isAbout = 1;
      this.isServices = 0;
      this.isMerchandise = 0;
      this.isSchool = 0;
      this.isMyProfile = 0;
      return this.$router.push("/haf-about").catch((error) => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
    },

    // Reload Page
    reloadPage() {
      window.location.reload();
    },
  },
  computed: {
    getNamaPersona() {
      return localStorage.getItem("nama_persona");
    },
    loggedIn() {
      return localStorage.getItem("token") != null;
    },
  },
};
</script>

<style scoped>
.menuColor{
  color: #f39c12 !important;
  cursor: pointer;
}
.menuColor:hover{
  color: #f39c12 !important;
  cursor: pointer;
}
.menuUncolor{
  cursor: pointer;
}
.menuUncolor:hover{
  transition: 0.5s;
opacity: 2; 
color: #f39c12 !important;
  cursor: pointer;
}
.show-profile-and-logout {
  display: none;
}

.avatar-dropdown {
  position: relative;
}

.avatar {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #006598;
  border-radius: 5px;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown li:hover {
  background-color: #006598;
}

.navbar {
  transition: top 0.3s;
}

.navbar-hidden {
  top: -60px; /* Atur sesuai tinggi navbar Anda */
}

.navbar {
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #006598;
  color: white;
}

.logo img {
  height: 40px;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.links a:hover {
  color: #f39c12;
}

.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 10px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: all 1s ease;
}

.open .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.open .bar:nth-child(2) {
  opacity: 0;
}

.open .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .menuColor{
  color: #f39c12 !important;
  cursor: pointer;
}
  .menu-icon {
    cursor: pointer;
    transition: opacity 5s ease; /* Define the transition */
    transition: all 5s ease-in-out;
  }

  .menu-icon:hover {
    cursor: pointer;
    opacity: 0.7; /* Adjust the opacity on hover */
  }

  .show-profile-and-logout {
    display: block;
  }

  .avatar {
    display: none;
  }
  .navbar {
    top: 0;
    padding-left: 20px;
    padding-right: 20px;
  }

  .navbar-hidden {
    top: 0;
  }

  .links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #006598;
    text-align: center;
    z-index: 1;
    transition: ease-in-out;
    animation-duration: 4s;
    animation-delay: 2s;
    transition: all 1s ease;

  }

  .links.open {
    display: flex;
    border-bottom-left-radius: 15px !important;
    border-bottom-right-radius: 15px !important;  
    transition: all 1s ease;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
