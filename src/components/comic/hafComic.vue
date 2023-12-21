<template style="margin: 0px">
  <v-main>
    <loading-screen :value="loadingScreen"></loading-screen>

    <div style="justify-content: center; display: flex">
      <div style="position: absolute; z-index: 1; width: 100%">
        <v-parallax
          data-aos="fade-down"
          data-aos-duration="1500"
          height="700"
          :src="$baseUrl + '/storage/' + dataComic.thumbnail"
          style="filter: blur(0.8rem); object-fit: cover"
        ></v-parallax>
      </div>

      <v-container
        style="
          position: absolute;
          z-index: 3;
          top: 30px;
          display: grid;
          justify-content: center;
        "
        class="containerImage"
      >
        <v-layout>
          <v-flex>
            <div
              class="imageThumbnail"
              color="white"
              style="width: 300px; height: 350px; border-radius: 20px"
            >
              <!-- Img error  -->
              <img
                data-aos="fade-up"
                data-aos-duration="1500"
                :src="$baseUrl + '/storage/' + dataComic.thumbnail"
                style="
                  margin-top: 10px;
                  border-radius: 20px;
                  object-fit: cover;
                  height: 100%;
                  width: 100%;
                "
              />
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container
        data-aos="fade-up"
        data-aos-duration="1500"
        style="
          position: absolute;
          z-index: 3;
          top: 200px;
          display: grid;
          justify-content: end;
          margin-right: 30px;
          max-width: 1000px !important;
        "
      >
        <v-flex>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                @click.stop="handlerClickFavorite(dataComic.uuid)"
                rounded
                :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
                dark
                small
                class="mx-1"
                fab
              >
                <v-icon
                  v-if="hasFavorite(dataComic.uuid, userLogin.uuid)"
                  dense
                  color="pink"
                  class="data-table-icon"
                  >mdi-heart</v-icon
                >
                <v-icon v-else dense color="white" class="data-table-icon"
                  >mdi-heart</v-icon
                >
              </v-btn>
            </template>
            <span>Add to Favorite</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <!-- Your existing button code -->
              <v-btn
                @click="openInstagramInNewTab"
                rounded
                :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
                dark
                small
                class="mx-1"
                fab
                v-on="on"
              >
                <v-icon dense color="white" class="data-table-icon"
                  >mdi-instagram</v-icon
                >
              </v-btn>
            </template>
            <span>Visit Instagram Author</span>
          </v-tooltip>
        </v-flex>
      </v-container>

      <v-container
        data-aos="fade-up"
        data-aos-duration="1500"
        style="
          position: absolute;
          z-index: 2;
          top: 250px;
          max-width: 1000px !important;
        "
      >
        <v-card color="white" style="min-height: 500px; border-radius: 20px">
          <h3
            data-aos="fade-up"
            data-aos-duration="1500"
            class="f-24 f-md-20 f-secondary text-center m-b-50"
            style="
              padding-top: 170px;
              font-family: 'Georgia';
              font-weight: bold;
            "
          >
            {{ dataComic.judul }}
          </h3>
          <p
            data-aos="fade-up"
            data-aos-duration="1500"
            style="font-family: 'Georgia'; font-size: 20px; margin-bottom: 8px"
          >
            <span style="font-family: sans-serif; font-size: 16px">by</span>
            {{ dataComic.post_by }}
          </p>

          <p data-aos="fade-up" data-aos-duration="1500" style="margin: 0px">
            · Synopsys ·
          </p>
          <center style="padding-bottom: 60px">
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              v-html="dataComic.sinopsis"
              style="
                text-align: justify;
                max-width: 600px;
                padding-left: 15px;
                padding-right: 15px;
              "
            ></div>

            <hr
              data-aos="fade-up"
              data-aos-duration="1500"
              style="width: 50%; border: 1px solid; border-radius: 50px"
            />

            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              v-for="dataSubComic in dataSubComics"
              :key="dataSubComic.id"
            >
              <b-card
                @click.stop="
                  handlerSubComic(dataSubComic.slug, dataSubComic.uuid)
                "
                no-body
                class="overflow-hidden bot-card"
                style="
                  max-width: 540px;
                  min-height: 100px;
                  padding: 0px;
                  margin: 7px;
                  border-radius: 20px;
                  background-color: rgb(250, 250, 250);
                "
              >
                <div class="row no-gutters">
                  <div class="col-image col">
                    <!-- Use a computed property to get the matching merchandise -->
                    <b-card-img
                      style="
                        height: 100px;
                        width: 100px;
                        border-radius: 20px !important;
                        object-fit: cover;
                      "
                      :src="$baseUrl + '/storage/' + dataSubComic.thumbnail"
                      alt="Image"
                      class="rounded-0"
                    ></b-card-img>
                  </div>
                  <div
                    class="col"
                    style="
                      margin-right: 5px;
                      margin-left: 5px;
                      align-content: center;
                      display: grid;
                    "
                  >
                    <p
                      style="
                        text-align: start;
                        margin: 0px;
                        font-size: 14px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 50ch;
                      "
                    >
                      {{ dataSubComic.judul }}
                    </p>
                    <p
                      style="
                        text-align: start;
                        margin: 0px;
                        font-size: 14px;
                        display: flex;
                      "
                    >
                      <v-icon
                        dense
                        small
                        color="black"
                        class="data-table-icon"
                        style="padding-right: 3px"
                        >mdi-eye</v-icon
                      >
                      {{ dataSubComic.jumlah_view }}
                    </p>
                    <p style="text-align: start; margin: 0px; font-size: 14px">
                      {{ dataSubComic.created_at }}
                    </p>
                    <p style="text-align: start; margin: 0px; font-size: 14px">
                      # {{ dataSubComic.chapter }}
                    </p>
                  </div>
                </div>
              </b-card>
            </div>
          </center>
        </v-card>
      </v-container>
    </div>

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogIklan"
      style="z-index: 1000"
    >
      <template v-slot:default="dialog">
        <v-card style="border-radius: 20px !important">
          <v-toolbar color="#006598" dark>Opening from the top</v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">Hello world!</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <!-- Dialog Setail SubComic -->
    <v-dialog
      v-model="dialogSubComic"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      ref="myDialogRef"
      id="thisElement"
    >
      <v-card>
        <v-toolbar class="fixed-top" dark color="#006598">
          <v-btn icon dark @click="dialogSubComic = false">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
        </v-toolbar>

        <center>
          <div style="width: 700px; margin-top: 64px" class="contentSubComic">
            <!-- Your dialog content goes here -->
            <v-img
              :src="$baseUrl + '/storage/' + dataSubComicSinglePost.content"
              style="width: 100%"
            ></v-img>
          </div>

          <center>
            <v-flex
              style="
                padding-top: 20px;
                padding-bottom: 20px;
                justify-content: center;
              "
            >
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <!-- Your existing button code -->
                  <v-btn
                    @click="
                      addLikeSubComic(
                        dataSubComicSinglePost.uuid,
                        dataSubComicSinglePost.slug
                      )
                    "
                    rounded
                    v-on="on"
                    :style="{ backgroundColor: 'rgb(225, 225, 225)' }"
                    dark
                    style="
                      text-transform: capitalize;
                      color: rgb(72, 72, 72);
                      font-size: 17px;
                      margin: 5px;
                    "
                  >
                    <v-icon
                      dense
                      color="#006598"
                      class="data-table-icon"
                      v-if="
                        hasLike(dataSubComicSinglePost.uuid, userLogin.uuid)
                      "
                      >mdi-thumb-up-outline</v-icon
                    >
                    <v-icon
                      dense
                      color="rgb(72, 72, 72)"
                      class="data-table-icon"
                      v-else
                      >mdi-thumb-up-outline</v-icon
                    >
                    {{ dataSubComicSinglePost.jumlah_like }}</v-btn
                  >
                </template>
                <span>Like</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    @click.stop="handlerClickFavorite(dataComic.uuid)"
                    rounded
                    :style="{ backgroundColor: 'rgb(225, 225, 225)' }"
                    style="margin: 5px"
                    dark
                    small
                    class="mx-1"
                    fab
                  >
                    <v-icon
                      v-if="hasFavorite(dataComic.uuid, userLogin.uuid)"
                      dense
                      color="pink"
                      class="data-table-icon"
                      >mdi-heart-outline</v-icon
                    >
                    <v-icon
                      v-else
                      dense
                      color="rgb(72, 72, 72)"
                      class="data-table-icon"
                      >mdi-heart-outline</v-icon
                    >
                  </v-btn>
                </template>
                <span>Add Comic to Favorite</span>
              </v-tooltip>
            </v-flex>
          </center>

          <hr style="padding-bottom: 20px; margin: 0px; width: 50%" />

          <div class="text-box-school" v-if="this.myProfile.length != 0">
            <div class="box-container">
              <div>
                <div class="d-flex flex-row align-items-start">
                  <b-avatar
                    style="padding: 2px"
                    badge
                    badge-variant="success"
                    :src="$baseUrl + '/storage/' + this.userLogin.image"
                  >
                  </b-avatar>
                  <v-textarea
                    :counter="255"
                    filled
                    auto-grow
                    label="Left a comment"
                    rows="3"
                    row-height="30"
                    v-model="commentSubComic"
                    style="
                      margin: 0px;
                      padding: 0px;
                      width: 100%;
                      border-radius: 20px;
                    "
                  ></v-textarea>
                </div>
                <div class="mt-2 text-right"></div>
              </div>

              <div>
                <div class="formatting" style="display: block !important">
                  <div>
                    <v-btn
                      @click.stop="
                        submitCommentSubComic(dataSubComicSinglePost.uuid)
                      "
                      rounded
                      color="#006598"
                      dark
                      style="text-transform: capitalize"
                    >
                      Post Comment
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>

            <p style="font-family: 'Georgia'; font-size: 17px; margin: 0px">
              Comment
            </p>

            <div
              v-for="dataKomenSubComic in dataKomenSubComics"
              :key="dataKomenSubComic.id"
            >
              <div style="padding: 5px">
                <div class="comment-react"></div>
                <div class="comment-container-school">
                  <div class="user">
                    <div class="user-pic">
                      <b-avatar
                        badge
                        badge-variant="success"
                        :src="getUserImage(dataKomenSubComic.user_id)"
                      >
                      </b-avatar>
                    </div>
                    <div class="user-info">
                      <span
                        style="
                          padding: 0px;
                          margin: 0px;
                          text-transform: capitalize;
                        "
                        >{{ dataKomenSubComic.komen_by }}</span
                      >
                      <div class="row" style="padding: 0px; margin: 0px">
                        <div
                          class="col-sm-10 style-detail-card-forum"
                          style="
                            padding: 0px;
                            margin: 0px;
                            width: 175px;
                            display: grid;
                            align-items: center;
                            justify-content: start;
                          "
                        >
                          <p style="padding: 0px; margin: 0px">
                            {{ dataKomenSubComic.created_at }}
                          </p>
                        </div>
                        <div
                          class="col"
                          style="
                            padding: 0px;
                            margin: 0px;
                            align-content: center;
                            display: grid;
                          "
                        ></div>
                        <div
                          class="col"
                          style="
                            padding: 0px;
                            margin: 0px;
                            align-content: center;
                            display: grid;
                          "
                        >
                          <a
                            v-if="
                              myProfile.id === dataSubComicSinglePost.user_id ||
                              myProfile.role === 'admin'
                            "
                            @click="
                              deleteHandleComenSubKomik(dataKomenSubComic)
                            "
                            style="
                              color: #4898ff;
                              font-weight: 600;
                              font-size: 10px;
                              margin-left: 10px;
                            "
                            >Delete</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="comment-content">{{ dataKomenSubComic.isi }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-box-school"
            v-else
            style="
              pointer-events: none; /* Prevents user interaction */
              opacity: 0.5;
            "
          >
            <div class="box-container">
              <div>
                <div class="d-flex flex-row align-items-start">
                  <b-avatar
                    style="padding: 2px"
                    badge
                    badge-variant="success"
                    :src="$baseUrl + '/storage/' + this.userLogin.image"
                  >
                  </b-avatar>
                  <v-textarea
                    :counter="255"
                    filled
                    auto-grow
                    label="You need to log in to left a comment 🤭🤭🤭"
                    rows="3"
                    row-height="30"
                    v-model="commentSubComic"
                    style="
                      margin: 0px;
                      padding: 0px;
                      width: 100%;
                      border-radius: 20px;
                    "
                  ></v-textarea>
                </div>
                <div class="mt-2 text-right"></div>
              </div>

              <div>
                <div class="formatting" style="display: block !important">
                  <div>
                    <v-btn
                      @click.stop="
                        submitCommentSubComic(dataSubComicSinglePost.uuid)
                      "
                      rounded
                      color="#006598"
                      dark
                      style="text-transform: capitalize"
                    >
                      Post Comment
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>

            <p style="font-family: 'Georgia'; font-size: 17px; margin: 0px">
              Comment
            </p>

            <div
              v-for="dataKomenSubComic in dataKomenSubComics"
              :key="dataKomenSubComic.id"
            >
              <div style="padding: 5px">
                <div class="comment-react"></div>
                <div class="comment-container-school">
                  <div class="user">
                    <div class="user-pic">
                      <b-avatar
                        badge
                        badge-variant="success"
                        :src="getUserImage(dataKomenSubComic.user_id)"
                      >
                      </b-avatar>
                    </div>
                    <div class="user-info">
                      <span
                        style="
                          padding: 0px;
                          margin: 0px;
                          text-transform: capitalize;
                        "
                        >{{ dataKomenSubComic.komen_by }}</span
                      >
                      <div class="row" style="padding: 0px; margin: 0px">
                        <div
                          class="col-sm-10 style-detail-card-forum"
                          style="
                            padding: 0px;
                            margin: 0px;
                            width: 175px;
                            display: grid;
                            align-items: center;
                            justify-content: start;
                          "
                        >
                          <p style="padding: 0px; margin: 0px">
                            {{ dataKomenSubComic.created_at }}
                          </p>
                        </div>
                        <div
                          class="col"
                          style="
                            padding: 0px;
                            margin: 0px;
                            align-content: center;
                            display: grid;
                          "
                        ></div>
                        <div
                          class="col"
                          style="
                            padding: 0px;
                            margin: 0px;
                            align-content: center;
                            display: grid;
                          "
                        >
                          <a
                            v-if="
                              myProfile.id === dataSubComicSinglePost.user_id ||
                              myProfile.role === 'admin'
                            "
                            @click="
                              deleteHandleComenSubKomik(dataKomenSubComic)
                            "
                            style="
                              color: #4898ff;
                              font-weight: 600;
                              font-size: 10px;
                              margin-left: 10px;
                            "
                            >Delete</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="comment-content">{{ dataKomenSubComic.isi }}</p>
                </div>
              </div>
            </div>
          </div>
        </center>
      </v-card>
    </v-dialog>

    <!-- Dialog Delete Comic Handler -->
    <v-dialog v-model="dialogConfirmDelete" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Order</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          Are you sure want to delete this comment?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDelete = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteKomenSubKomik"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Comic Handler -->

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

    <!-- Dialog Loading -->
    <v-dialog
      v-model="dialogLoader"
      content-class="elevation-0"
      persistent
      width="300"
    >
      <v-card color="#fff0">
        <img
          src="@/assets/Spin-1s-200px.gif"
          style="height: 150px"
          class="d-inline-block align-top"
          alt="Animation"
        />
      </v-card>
    </v-dialog>
    <!-- End Dialog Loading -->

    <!-- End Dialog Detail SubCOmic -->
  </v-main>
</template>

<script>
import moment from "moment";
import LoadingScreen from "@/components/loading-screen.vue";

export default {
  components: {
    "loading-screen": LoadingScreen,
  },
  data: () => ({
    // Data
    dataComic: [],
    dataSubComics: [],
    dataKomikFavorites: [],
    dataSubComicSinglePost: [],
    dataLikeSubComics: [],
    dataKomenSubComics: [],
    dataUserKomenSubComics: [],
    commentSubComic: "",

    // Form
    CommentSubComicForm: new FormData(),

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Delete komen
    uuidKomenSubKomik: "",
    subComicUUID: "",

    // Adds On
    loadingScreen: false,
    dialogIklan: false,
    dialogSubComic: false,
    dialogLoader: false,
    dialogConfirmDelete: false,
    myProfile: [],
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      uuid: localStorage.getItem("uuid"),
      id: localStorage.getItem("id"),
      image: localStorage.getItem("image"),
    },
  }),
  computed: {},
  created() {
    this.axioDataComicSinglePost();

    if (this.userLogin.token != null) {
      this.axioDataMyProfile();
      this.axioDataKomikFavorite();
      this.axioDataLikeSubKomik();
    }
  },
  watch: {},
  methods: {
    deleteHandleComenSubKomik(item) {
      this.uuidKomenSubKomik = item.uuid;
      this.subComicUUID = item.sub_komik_uuid;
      this.dialogConfirmDelete = true;
    },

    handlerSubComic(slugSubComic, uuidSubComic) {
      //   this.addJumlahViewSubComic(uuidSubComic);
      //   this.$router.push({
      //     name: 'haf-detail-subcomic',
      //     params: {
      //         slug: slugSubComic,
      //         uuid: uuidSubComic
      //     }
      // });

      this.addJumlahViewSubComic(uuidSubComic);
      this.axioGetDataSubComic(slugSubComic, uuidSubComic);
      this.axioDataKomenSubKomik(uuidSubComic);
    },

    handlerClickFavorite(uuidKomik) {
      if (this.myProfile.length != 0) {
        this.dialogLoader = true;
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };

        var url =
          this.$api + "/klikFavorite/" + uuidKomik + "/" + this.userLogin.uuid;

        this.$http
          .get(url, { headers: headers })
          .then((response) => {
            this.axioDataComicSinglePost();
            this.axioDataKomikFavorite();

            if (response.data.iyaFavorite == 1) {
              this.textMessage = "Comic added to favorites 😍";
              this.snackbar = true;
              this.color = "success";
            } else {
              this.textMessage = "Comic removed from favorites 😔";
              this.snackbar = true;
              this.color = "blue-grey";
            }

            console.log(this.totalPagesDataFavorite, "totalpages");

            // Menonaktifkan loading screen setelah 300ms
            setTimeout(() => {
              this.loadingScreen = false;
              this.dialogLoader = false;
            }, 300);
          })
          .catch(() => {
            this.dialogLoader = false;
          });
      } else {
        this.textMessage =
          "You need to log in to add favorite this comic 🤭🤭🤭";
        this.snackbar = true;
        this.color = "blue-grey";
      }
    },

    addLikeSubComic(uuidSubComic, slugSubComic) {
      if (this.myProfile.length != 0) {
        this.dialogLoader = true;
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };

        var url =
          this.$api + "/klikLike/" + uuidSubComic + "/" + this.userLogin.uuid;

        this.$http
          .get(url, { headers: headers })
          .then((response) => {
            this.respone = response.data.response;

            this.axioDataLikeSubKomik();
            this.axioGetDataSubComic(slugSubComic, uuidSubComic);

            if (response.data.iyaLike == 1) {
              this.textMessage = "You liked this comic 😍";
              this.snackbar = true;
              this.color = "success";
            } else {
              this.textMessage =
                "Oops, is there anything wrong with the comic? 😔";
              this.snackbar = true;
              this.color = "blue-grey";
            }

            // Menonaktifkan loading screen setelah 300ms
            setTimeout(() => {
              this.dialogLoader = false;
            }, 300);
          })
          .catch((error) => {
            // Menangani kesalahan jika terjadi
            console.error("Error fetching portfolio data:", error);
            this.dialogLoader = false;
          });
      } else {
        this.textMessage = "You need to log in to like this comic 🤭🤭🤭";
        this.snackbar = true;
        this.color = "blue-grey";
      }
    },

    addJumlahViewSubComic(uuidSubComic) {
      this.loadingScreen = true;

      var url = this.$api + "/addJumlahViewSubComic/" + uuidSubComic;

      this.$http
        .get(url)
        .then((response) => {
          this.respone = response.data.response;

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

    submitCommentSubComic(uuidSubComic) {
      this.dialogLoader = true;
      var url = this.$api + "/create-komen/" + uuidSubComic;
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.CommentSubComicForm = new FormData();
      this.CommentSubComicForm.append("isi", this.commentSubComic);

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .post(url, this.CommentSubComicForm, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;

          this.commentSubComic = "";
          this.axioDataKomenSubKomik(uuidSubComic);

          this.textMessage = "Your comment has been posted 😊 ";
          this.snackbar = true;
          this.color = "success";

          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          if (this.commentSubComic.length > 255) {
            this.textMessage = "Your comment exceeds the character limit 😔 ";
            this.snackbar = true;
            this.color = "blue-grey";
          }
          this.dialogLoader = false;
        });
    },

    deleteKomenSubKomik() {
      this.dialogLoader = true;
      var url = this.$api + "/delete-komenSubKomik/" + this.uuidKomenSubKomik;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then(() => {
          this.dialogConfirmDelete = false;
          this.axioDataKomenSubKomik(this.subComicUUID);

          this.textMessage = "The comment has been successfully deleted 😊";
          this.snackbar = true;
          this.color = "success";

          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          this.dialogLoader = false;
          this.dialogConfirmDelete = false;
        });
    },

    axioGetDataSubComic(slugSubComic, uuidSubComic) {
      this.loadingScreen = true;
      var url =
        this.$api + "/getDataSubComic/" + slugSubComic + "/" + uuidSubComic;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataSubComicSinglePost = response.data.dataSubComic;

          this.dialogSubComic = true;
          this.dialogIklan = false;

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

    axioDataComicSinglePost() {
      const { slug, uuid } = this.$route.params; // Get parameters from the route
      this.loadingScreen = true;
      var url = this.$api + "/getDataKomikSinglePost/" + slug + "/" + uuid;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataComic = response.data.dataComic;

          this.dataSubComics = response.data.dataSubComics.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("MMMM D, YYYY"),
            };
          });

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

    axioDataKomenSubKomik(uuidSubKomik) {
      var url;

      url = this.$api + "/show-komenSubKomik/" + uuidSubKomik;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataKomenSubComics = response.data.dataKomenSubKomik.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format(
                "dddd, M/DD/YYYY, h:mm a"
              ),
            };
          });

          this.dataUserKomenSubComics = response.data.dataUser;

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

    axioDataLikeSubKomik() {
      this.loadingScreen = true;
      var url;
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      url = this.$api + "/getDataLikeSubKomik/" + this.userLogin.uuid;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.dataLikeSubComics = response.data.dataLikeSubComics;

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

    axioDataKomikFavorite() {
      this.loadingScreen = true;
      var url;

      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      url = this.$api + "/getDataKomikFavorite/" + this.userLogin.uuid;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.dataKomikFavorites = response.data.dataKomikFavorites.map(
            (x) => {
              return {
                ...x,
                created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
              };
            }
          );

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch(() => {
          this.loadingScreen = false;
        });
    },

    axioDataMyProfile() {
      this.loadingScreen = true;
      var url = this.$api + "/get-my-profile/" + this.userLogin.uuid;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.myProfile = response.data.myProfile;

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

    // Adds On
    hasFavorite(komikUuid, userUuid) {
      return this.dataKomikFavorites.some(
        (favorite) =>
          favorite.komik_uuid === komikUuid && favorite.user_uuid === userUuid
      );
    },
    hasLike(subKomikUuid, userUuid) {
      return this.dataLikeSubComics.some(
        (like) =>
          like.subKomik_uuid === subKomikUuid && like.user_uuid === userUuid
      );
    },
    openInstagramInNewTab() {
      window.open(this.dataComic.instagram_author, "_blank");
    },
    getUserImage(userId) {
      const user = this.dataUserKomenSubComics.find(
        (user) => user.id === userId
      );

      if (user && user.image) {
        return `${this.$baseUrl}/storage/${user.image}`;
      } else {
        // You can return a default image URL or an empty string as per your requirement
        return "";
      }
    },
  },
};
</script>

<style scoped>
.text-box-school {
  width: 50%;
  height: fit-content;
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 20px;
}

.text-box-school .box-container {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 10px;
}

.text-box-school textarea {
  width: 100%;
  height: 40px;
  resize: none;
  border: 0;
  border-radius: 6px;
  padding: 12px 12px 10px 12px;
  font-size: 13px;
  outline: none;
  caret-color: #0a84ff;
}
/* End Card */

.comment-react {
  width: 35px;
  height: fit-content;
  display: grid;
  grid-template-columns: auto;
  margin: 0;
  background-color: #f1f1f1;
  border-radius: 5px;
}

.comment-react button {
  width: 35px;
  height: 35px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0;
  outline: none;
}

.comment-react button:after {
  content: "";
  width: 40px;
  height: 40px;
  position: absolute;
  left: -2.5px;
  top: -2.5px;
  background-color: #f5356e;
  border-radius: 50%;
  z-index: 0;
  transform: scale(0);
}

.comment-react button svg {
  position: relative;
  z-index: 9;
}

.comment-react button:hover:after {
  animation: ripple 0.6s ease-in-out forwards;
}

.comment-react button:hover svg {
  fill: #f5356e;
}

.comment-react button:hover svg path {
  stroke: #f5356e;
  fill: #f5356e;
}

.comment-react hr {
  width: 80%;
  height: 1px;
  background-color: #dfe1e6;
  margin: auto;
  border: 0;
}

.comment-react span {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: 13px;
  font-weight: 600;
  color: #707277;
}

.comment-container-school {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
  margin: 0;
  padding: 15px;
  background-color: white;
  border-radius: 20px;
}

.comment-container-school .user {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
}

.comment-container-school .user .user-pic {
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  border-radius: 50%;
}

.comment-container-school .user .user-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3px;
}

.comment-container-school .user .user-info span {
  font-weight: 700;
  font-size: 12px;
  color: #47484b;
}

.comment-content {
  margin-left: 100px;
  margin-right: 100px;
}

.comment-container-school .user .user-info p {
  font-weight: 600;
  font-size: 10px;
  color: #acaeb4;
}

.comment-container-school .comment-content {
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: #5f6064;
}
/* En Comment */
.overflow-hidden .col-image {
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: start;
  max-width: 100px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.bot-card:hover {
  background-color: rgb(237, 237, 237) !important;
  cursor: pointer;
}

@media (max-width: 767px) {
  .text-box-school {
    width: 100% !important;
  }
  .imageThumbnail {
    max-width: 200px;
  }
  .containerImage {
    justify-content: start !important;
    padding-left: 40px;
  }
  .contentSubComic {
    max-width: 350px !important;
    margin-top: 56px !important;
  }
}
</style>
