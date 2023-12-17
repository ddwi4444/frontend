<template style="margin: 0px">
    <v-main>
      <loading-screen :value="loadingScreen"></loading-screen>
  
      <v-card>  
        <v-toolbar dark color="#006598">
          <v-btn icon dark>
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </v-toolbar>

          <center>
            <div style="width: 700px;" class="contentSubComic">
              <!-- Your dialog content goes here -->
              <v-img :src="$baseUrl + '/storage/' + dataSubComicSinglePost.content" style="width: 100%;"></v-img>
            </div>
  
            <!-- Scroll to top button -->
            <v-btn @click="goToTop" class="scroll-to-top-button" fab dark small color="grey">
              <v-icon dark>mdi-arrow-up</v-icon>
            </v-btn>
          </center>
        </v-card>
    </v-main>
  </template>
  
  <script>
//   import moment from "moment";
  import LoadingScreen from "@/components/loading-screen.vue";
  
  export default {
    components: {
      "loading-screen": LoadingScreen,
    },
    data: () => ({
      // Data
      dataSubComicSinglePost: [],
  
      // Adds On
      loadingScreen: false,
      dialogIklan: true,
      dialogSubComic: false,
      userLogin: {
        token: localStorage.getItem("token"), // initialize with a valid token or empty string
        uuid: localStorage.getItem("uuid"),
        id: localStorage.getItem("id"),
      },
    }),
    computed: {},
    created() {
      this.axioGetDataSubComic();
    },
    watch: {},
    methods: {
      axioGetDataSubComic(){
          this.loadingScreen = true;
          const { slug, uuid } = this.$route.params; // Get parameters from the route
          var url = this.$api + "/getDataSubComic/" + slug + "/" + uuid;
  
          // Gunakan 'url' dalam permintaan POST
        this.$http
          .get(url)
          .then((response) => {
            this.dataSubComicSinglePost = response.data.dataSubComic
  
            // Menonaktifkan loading screen setelah 300ms
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          })
          .catch((error) => {
            // Menangani kesalahan jika terjadi
            console.error("Error fetching Comic data:", error);
            this.loadingScreen = false;
          });
      },

      goToTop() {
      // Scroll to the top logic
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // You can change this to 'auto' for an instant scroll
      });
    },
  
    },
  };
  </script>
  
  <style scoped>
  .scroll-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  cursor: pointer;
}
  @media (max-width: 767px) {
  .contentSubComic{
    max-width: 350px !important;
  }
}
  </style>
  