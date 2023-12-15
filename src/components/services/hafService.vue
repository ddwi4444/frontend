<template>
  <v-main>
    <loading-screen :value="loadingScreen"></loading-screen>

    <div class="container">
      <div class="row" style="margin: 0px; padding: 0px;">
        <div class="row" style="margin-top: 30px; justify-content: center; margin: 0px; padding: 0px;">
          <h4>Recommended</h4>
          <div
            v-for="dataServicer in dataServicers"
            :key="dataServicer.id"
            class="card-service"
          >
            <div
              class="card-details"
              @click="handlerDetailServicer(dataServicer)"
            >
              <div class="image-service-size" style="height: 120px">
                <img
                  v-if="dataServicer.image != null"
                  style="object-fit: cover"
                  class="card__img-service"
                  :src="$baseUrl + '/storage/' + dataServicer.image"
                  alt=""
                />
                <img
                  v-else
                  class="card__img-service"
                  src="@/assets/userImage.jpg"
                  alt=""
                />
              </div>
              <p
                class="text-title"
                style="margin-bottom: 0px; margin-top: 10px"
              >
                {{ dataServicer.nama_persona }}
              </p>
              <p>30 Projects</p>
            </div>
            <button
              @click="handlerDetailServicer(dataServicer)"
              class="card-button-service"
            >
              More info
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <v-dialog v-model="dialogDetail" width="950px">
        <v-card>
          <v-card-title class="lighten-2">
            <div class="row" style="margin: 0px">
              <div
                class="col-md-6"
                style="display: flex; justify-content: start"
              ></div>
              <div class="col-md-6" style="display: flex; justify-content: end">
                <v-btn
                  @click="dialogDetail = false"
                  class="mx-1"
                  fab
                  dark
                  small
                  color="red"
                  style="height: 20px; width: 20px"
                >
                  <b-icon icon="x-lg" aria-hidden="true"></b-icon>
                </v-btn>
              </div>
            </div>
          </v-card-title>

          <v-card-title
            class="lighten-2"
            style="margin-top: 0px; padding-top: 0px; justify-content: center"
          >
            <img
              style="
                border-radius: 50%;
                height: 100px;
                width: 100px;
                object-fit: cover;
              "
              :src="$baseUrl + '/storage/' + this.imageServicer"
              alt="Avatar"
            />
          </v-card-title>

          <v-card-text>
            <p
              class="text-title"
              style="
                margin-bottom: 0px;
                margin-top: 10px;
                font-size: 18px;
                color: black;
              "
            >
              {{ this.nama_persona }}
            </p>
            <v-row align="center" class="">
              <v-rating
                :value="ratingAverage"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-row>
            <div class="grey--text mt-3">
              {{ ratingAverage.toFixed(2) }} ({{ countReviews }})
            </div>
          </v-card-text>

          <div>
            <b-tabs
              content-class="mt-5"
              align="center"
              style="padding-left: 0px"
            >
              <!-- v-for="dataPortfolio in dataPortfolios"
                      :key="dataPortfolio.id"  -->
              <b-tab title="Portfolio" active>
                <b-container fluid class="p-4 bg-transparent">
                  <center>
                    <v-row>
                      <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                      <v-col
                        v-for="dataPortfolio in dataPortfolios"
                        :key="dataPortfolio.id"
                        class="d-flex child-flex"
                        cols="4"
                      >
                        <v-img
                          style="cursor: zoom-in; border-radius: 15px"
                          :src="
                            $baseUrl + '/storage/' + dataPortfolio.thumbnail
                          "
                          aspect-ratio="1"
                          class="grey lighten-2"
                          @click="
                            zoom(
                              $baseUrl + '/storage/' + dataPortfolio.thumbnail
                            )
                          "
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </center>
                </b-container>
              </b-tab>
              <b-tab title="Review">
                <div style="display: grid">
                  <center>
                    <!-- Review -->
                    <div v-if="dataReviews.length > 0">
                      <div
                        v-for="dataReview in dataReviews"
                        :key="dataReview.id"
                        style="min-height: 350px"
                      >
                        <div class="testimonial-box">
                          <!--top------------------------->
                          <div class="box-top">
                            <!--profile----->
                            <div class="profile">
                              <!--img---->
                              <div
                                v-for="dataReviewer in dataReviewers"
                                :key="dataReviewer.id"
                              >
                                <div
                                  class="profile-img"
                                  v-if="
                                    dataReviewer.id ===
                                    dataReview.user_id_customer
                                  "
                                >
                                  <img
                                    :src="
                                      $baseUrl +
                                      '/storage/' +
                                      dataReviewer.image
                                    "
                                  />
                                </div>
                              </div>
                              <!--name-and-username-->
                              <div class="name-user">
                                <strong>{{ dataReview.post_by }}</strong>
                                <span>{{ dataReview.created_at }}</span>
                              </div>
                            </div>
                            <!--reviews------>
                            <div class="reviews">
                              <v-rating
                                :value="dataReview.rating"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"
                              ></v-rating
                              ><!--Empty star-->
                            </div>
                          </div>
                          <!--Comments---------------------------------------->
                          <div
                            class="client-comment"
                            style="text-align: justify"
                          >
                            <p>
                              {{ dataReview.isi }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else style="min-height: 350px">
                      <p>No reviews available</p>
                    </div>
                  </center>
                </div>
              </b-tab>
              <b-tab title="Order">
                <div v-if="user_id_servicer != userLogin.id">
                  <v-form class="form" ref="form" @submit.prevent>
                    <div class="row" style="margin: 0px">
                      <div
                        class="col-sm-4"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        Project Name
                      </div>
                      <div class="col-sm-7">
                        <b-form-input
                          id="input-1"
                          v-model="project_name"
                          trim
                          placeholder="e.g. Coloring Manga"
                        ></b-form-input>
                        <v-slide-y-transition>
                          <div
                            v-if="!isProjectNameValid"
                            transition="scroll-y-transition"
                            style="
                              font-size: 12px;
                              text-align: left;
                              color: red;
                              margin-left: 15px;
                              margin-top: 1px;
                              min-height: 14px;
                              font-weight: lighter;
                            "
                          >
                            This field is required
                          </div>
                        </v-slide-y-transition>
                      </div>
                    </div>
                    <div class="row" style="margin: 0px">
                      <div
                        class="col-sm-4"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        Offering Cost
                      </div>
                      <div class="col-sm-7">
                        <b-form-input
                          id="input-1"
                          v-model="offering_cost"
                          trim
                          placeholder="e.g. 10000000"
                        ></b-form-input>
                        <v-slide-y-transition>
                          <div
                            v-if="!isOfferingCostValid"
                            transition="scroll-y-transition"
                            style="
                              font-size: 12px;
                              text-align: left;
                              color: red;
                              margin-left: 15px;
                              margin-top: 1px;
                              min-height: 14px;
                              font-weight: lighter;
                            "
                          >
                            This field is required and must be a number
                          </div>
                        </v-slide-y-transition>
                      </div>
                    </div>
                    <div class="row" style="margin: 0px">
                      <div
                        class="col-sm-4"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        Description of Task
                      </div>
                      <div class="col-sm-7">
                        <b-form-input
                          id="input-1"
                          v-model="desc"
                          trim
                          placeholder="Describe shortly what you want to servicer do"
                        ></b-form-input>
                        <v-slide-y-transition>
                          <div
                            v-if="!isDescValid"
                            transition="scroll-y-transition"
                            style="
                              font-size: 12px;
                              text-align: left;
                              color: red;
                              margin-left: 15px;
                              margin-top: 1px;
                              min-height: 14px;
                              font-weight: lighter;
                            "
                          >
                            This field is required
                          </div>
                        </v-slide-y-transition>
                      </div>
                    </div>
                    <div class="row" style="margin: 0px">
                      <div
                        class="col-sm-4"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        Storyboard
                        <span
                          style="
                            position: relative;
                            top: -0.5rem;
                            font-size: 10px;
                            color: red;
                          "
                          >*Optional</span
                        >
                      </div>
                      <div class="col-sm-7" style="text-align: start">
                        <b-form-file
                          style="width: 300px"
                          id="storyboard"
                          v-model="storyboard"
                          class="mt-3"
                          plain
                          accept="image/*"
                        ></b-form-file>
                      </div>
                    </div>

                    <v-card-actions class="row" style="margin: 0px">
                      <div
                        class="col-sm-4"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      ></div>
                      <div
                        class="col-sm-7"
                        style="text-align: start"
                        v-if="
                          !isProjectNameValid ||
                          !isOfferingCostValid ||
                          !isDescValid
                        "
                      >
                        <v-btn
                          style="text-transform: unset !important"
                          rounded
                          outlined
                          small
                          disabled
                          color="indigo"
                          class="btn-form-primary m-t-35"
                          :loading="loading"
                          @click="submitServiceTransaction(user_id_servicer)"
                          >Order</v-btn
                        >
                      </div>
                      <div
                        class="col-sm-7"
                        style="text-align: start"
                        v-if="
                          isProjectNameValid &&
                          isOfferingCostValid &&
                          isDescValid
                        "
                      >
                        <v-btn
                          style="text-transform: unset !important"
                          rounded
                          small
                          outlined
                          color="indigo"
                          class="m-t-35"
                          :loading="loading"
                          @click="submitServiceTransaction(user_id_servicer)"
                          >Order</v-btn
                        >
                      </div>
                    </v-card-actions>
                  </v-form>
                </div>
                <div v-else>
                  <div
                    disabled
                    style="
                      pointer-events: none;
                      filter: alpha(opacity=50);
                      opacity: 0.5;
                    "
                  >
                    <v-form class="form" ref="form" @submit.prevent>
                      <div class="row" style="margin: 0px">
                        <div
                          class="col-sm-4"
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          Project Name
                        </div>
                        <div class="col-sm-7">
                          <b-form-input
                            id="input-1"
                            v-model="project_name"
                            trim
                            placeholder="e.g. Coloring Manga"
                          ></b-form-input>
                          <v-slide-y-transition>
                            <div
                              v-if="!isProjectNameValid"
                              transition="scroll-y-transition"
                              style="
                                font-size: 12px;
                                text-align: left;
                                color: red;
                                margin-left: 15px;
                                margin-top: 1px;
                                min-height: 14px;
                                font-weight: lighter;
                              "
                            >
                              This field is required
                            </div>
                          </v-slide-y-transition>
                        </div>
                      </div>
                      <div class="row" style="margin: 0px">
                        <div
                          class="col-sm-4"
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          Offering Cost
                        </div>
                        <div class="col-sm-7">
                          <b-form-input
                            id="input-1"
                            v-model="offering_cost"
                            trim
                            placeholder="e.g. 10000000"
                          ></b-form-input>
                          <v-slide-y-transition>
                            <div
                              v-if="!isOfferingCostValid"
                              transition="scroll-y-transition"
                              style="
                                font-size: 12px;
                                text-align: left;
                                color: red;
                                margin-left: 15px;
                                margin-top: 1px;
                                min-height: 14px;
                                font-weight: lighter;
                              "
                            >
                              This field is required and must be a number
                            </div>
                          </v-slide-y-transition>
                        </div>
                      </div>
                      <div class="row" style="margin: 0px">
                        <div
                          class="col-sm-4"
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          Description of Task
                        </div>
                        <div class="col-sm-7">
                          <b-form-input
                            id="input-1"
                            v-model="desc"
                            trim
                            placeholder="Describe shortly what you want to servicer do"
                          ></b-form-input>
                          <v-slide-y-transition>
                            <div
                              v-if="!isDescValid"
                              transition="scroll-y-transition"
                              style="
                                font-size: 12px;
                                text-align: left;
                                color: red;
                                margin-left: 15px;
                                margin-top: 1px;
                                min-height: 14px;
                                font-weight: lighter;
                              "
                            >
                              This field is required
                            </div>
                          </v-slide-y-transition>
                        </div>
                      </div>
                      <div class="row" style="margin: 0px">
                        <div
                          class="col-sm-4"
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          Storyboard
                          <span
                            style="
                              position: relative;
                              top: -0.5rem;
                              font-size: 10px;
                              color: red;
                            "
                            >*Optional</span
                          >
                        </div>
                        <div class="col-sm-7" style="text-align: start">
                          <b-form-file
                            style="width: 300px"
                            id="storyboard"
                            v-model="storyboard"
                            class="mt-3"
                            plain
                            accept="image/*"
                          ></b-form-file>
                        </div>
                      </div>

                      <v-card-actions class="row" style="margin: 0px">
                        <div
                          class="col-sm-4"
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                        ></div>
                        <div
                          class="col-sm-7"
                          style="text-align: start"
                          v-if="
                            !isProjectNameValid ||
                            !isOfferingCostValid ||
                            !isDescValid
                          "
                        >
                          <v-btn
                            style="text-transform: unset !important"
                            rounded
                            outlined
                            small
                            disabled
                            color="indigo"
                            class="btn-form-primary m-t-35"
                            :loading="loading"
                            @click="submitServiceTransaction(user_id_servicer)"
                            >Order</v-btn
                          >
                        </div>
                        <div
                          class="col-sm-7"
                          style="text-align: start"
                          v-if="
                            isProjectNameValid &&
                            isOfferingCostValid &&
                            isDescValid
                          "
                        >
                          <v-btn
                            style="text-transform: unset !important"
                            rounded
                            small
                            outlined
                            color="indigo"
                            class="m-t-35"
                            :loading="loading"
                            @click="submitServiceTransaction(user_id_servicer)"
                            >Order</v-btn
                          >
                        </div>
                      </v-card-actions>
                    </v-form>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <!-- Dialog Zooom Image -->
    <v-dialog v-model="dialogZoom" width="600" style="max-height: none">
      <v-card style="max-height: none">
        <v-card-actions style="max-height: none">
          <a class="btn-close" @click="dialogZoom = false"> </a>
        </v-card-actions>

        <v-card-text class="m-0" style="max-height: none">
          <img
            :src="getImage"
            class="img-zoom-full of-cover"
            style="width: 100%"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- End Dialog Zooom Image -->

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="color" text>
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
  </v-main>
</template>

<script>
import LoadingScreen from "@/components/loading-screen.vue";
import moment from "moment";

export default {
  components: {
    "loading-screen": LoadingScreen,
  },
  data: () => ({
    // Portfolio
    dataPortfolios: [],

    // Servicer
    dataServicers: [],
    nama_persona: "",
    imageServicer: "",
    user_id_servicer: "",
    TranskasiLayananForm: new FormData(),

    dialogDetail: false,

    // Review
    dataReviews: [],
    dataReviewers: [],
    ratingAverage: 0,
    countReviews: 0,

    // Form Project Service
    project_name: "",
    offering_cost: "",
    desc: "",
    storyboard: null,

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Add ons
    loadingScreen: false,
    dialogZoom: false,
    getImage: null, // initialize getImage property here
    loading: false,
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      uuid: localStorage.getItem("uuid"),
      id: localStorage.getItem("id"),
    },
  }),
  created() {
    this.axioDataServicer();
  },
  computed: {
    isProjectNameValid() {
      return this.project_name.trim() !== ""; // Content is required (not empty)
    },
    isOfferingCostValid() {
      const offering_cost = this.offering_cost.trim();
      return offering_cost !== "" && /^\d+$/.test(offering_cost); // Content is required (not empty) and contains only numbers
    },
    isDescValid() {
      return this.desc.trim() !== ""; // Content is required (not empty)
    },
  },
  methods: {
    handlerDetailServicer(dataServicer) {
      this.dialogDetail = true;
      this.axioDataPortfolio(dataServicer.id);
      this.axioDataReview(dataServicer.id);
      console.log("tes apakah berhasil memanggil axiodata");
      this.nama_persona = dataServicer.nama_persona;
      this.imageServicer = dataServicer.image;
      this.user_id_servicer = dataServicer.id;
      console.log(this.user_id_servicer);
    },

    axioDataServicer() {
      this.loadingScreen = true;
      var url = this.$api + "/get-servicer";

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataServicers = response.data.dataServicer;

          console.log("tes");

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching myprofile data:", error);
          this.loadingScreen = false;
        });
    },

    axioDataReview(idServicer) {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-reviewLayanan/" + idServicer;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataReviews = response.data.dataReview.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });
          this.dataReviewers = response.data.dataReviewers;
          this.ratingAverage = response.data.rerataRating;

          // Convert rerataRating to decimal format
          this.ratingAverage = parseFloat(response.data.rerataRating);

          // Total data review
          this.countReviews = this.dataReviews.length;

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching review data", error);
          this.loadingScreen = false;
        });
    },

    axioDataPortfolio(user_id) {
      this.loadingScreen = true;
      var url = this.$api + "/get-dataPortfolio/" + user_id;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataPortfolios = response.data.dataPortfolio;

          console.log(response.data.dataPortfolio, "dataPortfolio");

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching portfolio data:", error);
          this.loadingScreen = false;
        });
    },

    submitServiceTransaction(user_id_servicer) {
      this.loadingScreen = true;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };
      var url = this.$api + "/create-transaksiLayanan/" + user_id_servicer;

      var inputStoryboard = document.getElementById("storyboard"),
        dataFileStoryboard = inputStoryboard.files[0];

      this.TranskasiLayananForm = new FormData();

      this.TranskasiLayananForm.append("project_name", this.project_name);
      this.TranskasiLayananForm.append("offering_cost", this.offering_cost);
      this.TranskasiLayananForm.append("description", this.desc);

      if (dataFileStoryboard) {
        this.TranskasiLayananForm.append("storyboard", dataFileStoryboard);
      }

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .post(url, this.TranskasiLayananForm, { headers: headers })
        .then((response) => {
          this.dataPortfolios = response.data.dataPortfolio;

          document.getElementById("storyboard").value = "";
          this.project_name = "";
          this.offering_cost = "";
          this.desc = "";
          this.storyboard = null;

          this.textMessage = "Successfully send offering services";
          this.snackbar = true;
          this.color = "green";

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching portfolio data:", error);
          this.loadingScreen = false;
        });
    },

    // Addons

    // For zoom image
    zoom(img) {
      this.getImage = img;
      this.dialogZoom = true;
    },
  },
};
</script>

<style>
/* Card */
.card-service {
  width: 170px;
  height: 215px;
  border-radius: 20px;
  background: #ffffff;
  position: relative;
  padding: 10px;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 10px;
}

.card__img-service {
  background-size: cover;
  width: 100%;
  border-radius: 10px;
  height: 100%;
  object-fit: cover;
}

.card-details-service {
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
}

.card-button-service {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body-service {
  color: rgb(134, 134, 134);
}
/* /Card */

/*Text*/
.text-title-service {
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
}

/*Hover*/
.card-service:hover {
  border-color: #008bf8;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card-service:hover .card-button-service {
  transform: translate(-50%, 50%);
  opacity: 1;
}
/* /Hover */

/* Testimonial/Review */
#testimonials {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.testimonial-heading {
  letter-spacing: 1px;
  margin: 30px 0px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.testimonial-heading span {
  font-size: 1.3rem;
  color: #252525;
  margin-bottom: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.testimonial-box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
}
.testimonial-box {
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 20px;
  margin: 15px;
  border-radius: 15px;
}
.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.profile {
  display: flex;
  align-items: center;
}
.name-user {
  display: flex;
  flex-direction: column;
}
.name-user strong {
  color: #3d3d3d;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}
.name-user span {
  color: #979797;
  font-size: 0.8rem;
}
.reviews {
  color: #f9d71c;
}
.box-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.client-comment p {
  font-size: 0.9rem;
  color: #4b4b4b;
}

@media (max-width: 1060px) {
  .testimonial-box {
    width: 90%;
    padding: 10px;
  }
}
@media (max-width: 790px) {
  .testimonial-box {
    width: 90%;
  }
  .testimonial-heading h1 {
    font-size: 1.4rem;
  }
}
@media (max-width: 340px) {
  .box-top {
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .reviews {
    margin-top: 10px;
  }
}
/* /Testimonial/Review */
</style>
