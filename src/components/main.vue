<template>
  <div>
    <div class="app">
      <nav class="navbar">
        <div class="logo">
          <router-link to="/">
            <img
              src="@/assets/logoHAF2.png"
              class="d-inline-block align-top"
              alt="Logo HAF"
              style="height: 30px"
            />
          </router-link>
        </div>

        <div :class="['links', { open: isMenuOpen }]">
          <router-link to="haf-service">HAF Service</router-link>
          <router-link to="haf-merchandise">HAF Merchandise</router-link>
          <router-link to="haf-school">HAF School</router-link>
          <router-link to="haf-about">About</router-link>
        </div>

        <div class="avatar-dropdown">
          <div class="avatar" @click="this.toggleDropdown">
            <div class="user-avatar">
              <b-avatar
                badge
                badge-variant="success"
                src="https://placekitten.com/300/300"
              ></b-avatar
              ><span class="mr-auto"> J. Circlehead</span>
            </div>
          </div>
          <div class="dropdown" v-if="isDropdownOpen">
            <ul>
              <li>
                <router-link
                  style="color: aliceblue; text-decoration: none"
                  to="haf-profile"
                  >My Profile</router-link
                >
              </li>
            </ul>
          </div>
        </div>

        <button class="menu-toggle" @click="this.toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </nav>
    </div>

    <div class="fullheight" style="margin-top: 15px">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
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
  transition: transform 0.3s, opacity 0.3s;
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
  .navbar {
    top: 0;
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
    animation-duration: 4s;
    animation-delay: 2s;
  }

  .links.open {
    display: flex;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>

<script lang="ts">
export default {
  name: "main-view",
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen: false,
    };
  },
  mounted() {},
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>
