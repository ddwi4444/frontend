<template>
  <div>
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
        src="https://cdn1.katadata.co.id/media/images/thumb/2022/11/10/Ilustrasi_Ciri-ciri_Orang_Yang_Bersyukur-2022_11_10-13_22_48_d368708753bdc5c3131472013522d76c_960x640_thumb.jpg"
        alt="Avatar"
      />
    </v-card-title>

    <v-card-text>
      <h4 style="text-transform: capitalize">{{ getNamaPersona }}</h4>
      <p class="ma-0 pa-0 bold" style="font-weight: 100">Your bio is here</p>
    </v-card-text>

    <div>
      <b-tabs align="center" style="padding-left: 0px">
        <!-- Profile -->
        <b-tab title="Profile" active>
          <b-container class="conatiner-size-my-profile">
            <b-row>
              <b-col sm="7">
                <p class="ma-0 pa-0">Name : Doni Dwi Irawan</p>
                <p class="ma-0 pa-0">Age : 17 Tahun</p>
                <p class="ma-0 pa-0">Racial : Half Demon-Vampire</p>
                <p class="ma-0 pa-0">Birth Date : 9 April</p>
                <p class="ma-0 pa-0">Zodiac : Aries</p>
                <p class="ma-0 pa-0">MBTI : INFJ-T</p>
                <p class="ma-0 pa-0">Body Weight : 50 kg</p>
                <p class="ma-0 pa-0">Body Tall : 171 cm</p>
                <br />
                <p class="ma-0 pa-0">
                  Hobby : Memasak, Membaca Dongeng, minum teh, dan berjalan
                  jalan.
                </p>
                <p class="ma-0 pa-0">
                  Like : Bakso, Darah, orang yang mentaati peraturan, langit
                  malam dan Rasi Bintang, Musik klasik.
                </p>
                <p class="ma-0 pa-0">
                  Did not Like : Bakso, Darah, orang yang mentaati peraturan,
                  langit malam dan Rasi Bintang, Musik klasik.
                </p>
                <br />
                <p class="ma-0 pa-0">
                  Quotes :<br />“May God Forgive Your sin”
                </p>
                <h3 class="ma-0 pa-0" style="color: #a36e1e">............</h3>
              </b-col>
              <b-col sm="5">
                <b-img
                  fluid
                  src="https://historicalartfantasia.files.wordpress.com/2022/11/fullbody-gilang-1-b-ilkom-m.-rafael-indrawan.png"
                  alt="Character"
                ></b-img>
              </b-col>
            </b-row>
            <hr
              class="wp-block-separator has-css-opacity is-style-wide"
              style="color: #a36e1e"
            />
            <p>-</p>
          </b-container>
        </b-tab>
        <!-- End Profile -->

        <!-- NPC -->
        <b-tab title="NPC">
          <template>
            <loading-screen :value="loadingScreen"></loading-screen>
            <v-container class="conatiner-size-my-profile p-0">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><!-- SEARCH -->
                    <div class="form-input">
                      <v-text-field
                        v-model="search"
                        class="p-0 m-0"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field></div
                  ></b-col>
                  <b-col
                    ><v-btn
                      small
                      color="primary"
                      dark
                      class="mb-2"
                      style="text-transform: unset !important"
                      @click="addHandlerNPC"
                    >
                      Add NPC
                    </v-btn></b-col
                  >
                </b-row>
              </b-container>

              <v-data-table
                :headers="list.headers"
                :items="list.npcs"
                :search="list.search"
                class="elevation-1"
                :footer-props="{
                  showFirstLastPage: true,
                  firstIcon: 'mdi-skip-previous',
                  lastIcon: 'mdi-skip-next',
                  itemsPerPageAllText: 'All',
                  itemsPerPageText: 'Rows per page',
                }"
              >
                <template v-slot:[`item.no`]="{ item }">
                  <template>{{ list.npcs.indexOf(item) + 1 }}</template>
                </template>

                <template v-slot:[`item.image_npc`]="{ item }">
                  <div
                    class="w-img-oval m-2"
                    @click="zoom($baseUrl + '/storage/' + item.image_npc)"
                  >
                    <img
                      :src="$baseUrl + '/storage/' + item.image_npc"
                      class="img-oval"
                    />
                    <a class="img-oval-zoom">
                      <i class="mdi mdi-eye f-28 text-white"></i>
                    </a>
                  </div>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    dense
                    color="#ffbd03"
                    @click="editHandlerNPC(item)"
                    class="data-table-icon mr-3"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    dense
                    color="#FF0000"
                    @click="deleteHandlerNPC(item)"
                    class="data-table-icon"
                    >mdi-delete</v-icon
                  >
                </template>
                <template v-slot:[`footer.page-text`]="items">
                  {{ items.pageStart }} - {{ items.pageStop }} dari
                  {{ items.itemsLength }}
                </template>
                <template v-slot:no-data>
                  <div color="white"><p class="p-0 m-0">NPC is empty</p></div>
                </template>
              </v-data-table>
            </v-container>
          </template>
        </b-tab>
        <!-- End NPC -->

        <!-- Comic -->
        <b-tab title="Comic">
          <div></div>
        </b-tab>
        <!-- End Comic -->

        <!-- Portfolio -->
        <b-tab title="Portfolio">
          <div></div>
        </b-tab>
        <!-- End Portfolio -->

        <!-- Your Order -->
        <b-tab title="Your Order">
          <div></div>
        </b-tab>
        <!-- End Your Order -->

        <!-- Your Activity -->
        <b-tab title="Your Activity">
          <div></div>
        </b-tab>
      </b-tabs>
      <!--  End Your Activity -->
    </div>

    <!-- Dialog Zooom Image -->
    <v-dialog v-model="dialogZoom" width="600" style="max-height: none">
      <v-card style="max-height: none">
        <v-card-actions style="max-height: none">
          <a class="btn-close" @click="dialogZoom = false"> </a>
        </v-card-actions>

        <v-card-text class="m-0" style="max-height: none">
          <img :src="getImage" class="img-zoom-full of-cover" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- End Dialog Zooom Image -->

    <!-- Dialog Delete NPC Handler -->
    <v-dialog v-model="dialogConfirmDeleteNPC" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete NPC</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span
            >Are you sure want to delete
            <b style="text-transform: capitalize">{{ npc_name }}</b
            >'s NPC?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDeleteNPC = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteDataNPC()"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete NPC Handler -->

    <!-- Dialog Edit NPC -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogNPC"
      persistent
    >
      <v-card
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <h3
          class="f-24 f-md-20 f-secondary text-center m-b-50"
          style="margin-bottom: 50px; padding-top: 30px; font-family: 'Georgia'; font-weight: bold;"
        >
          {{ inputType == "AddNPC" ? "Add New NPC" : "Update NPC" }}
        </h3>
        <v-form
          ref="form"
          class="w-full"
          @submit.prevent="
            inputType == 'AddNPC' ? submitNPC('AddNPC') : submitNPC('UpdateNPC')
          "
        >
          <div
            class="h-auto w-full d-flex align-center justify-center flex-column m-b-25 mt-5"
          >
            <label
              for="file-foto"
              class="br-full position-relative p-all-10"
              :class="{ 'border-error-file': fotoError }"
            >
              <v-img
                v-if="image64Foto != '' || inputType == 'AddNPC'"
                :src="image64Foto"
                class="img-profil border"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  v-if="image_npc != null"
                  :src="$baseUrl + '/storage/' + image_npc"
                  class="img-profil"
                  cover
                ></v-img>
              </div>
              <input
                type="file"
                id="file-foto"
                ref="fileFoto"
                accept="image/*"
                hidden
                @change="handleFileChange"
                v-on:change="onFotoChange"
              />
              <a class="btn-img-profil cp">
                <i class="icon mdi mdi-pencil f-18"></i>
              </a>
            </label>
            <div style="height: 15px">
              <v-slide-y-transition>
                <div
                  v-if="!isFileSelected"
                  transition="scroll-y-transition"
                  style="
                    font-size: 12px;
                    text-align: left;
                    color: red;
                    min-height: 14px;
                    font-weight: lighter;
                  "
                >
                  This field is required
                </div>
              </v-slide-y-transition>
            </div>
          </div>
          <div
            style="padding-left: 50px; padding-right: 50px; margin-top: 50px"
          >
            <label
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
              >NPC Name</label
            >
            <v-text-field
              solo
              v-model="npc_name"
              type="text"
              class="input-form-primary"
              placeholder="Filled the NPC Name"
              variant="underline"
              autocomplete="false"
              hide-details=true
            >
            </v-text-field>
            <div style="height: 15px">
                <v-slide-y-transition>
                  <div
                    v-if="!isNPCNameValid"
                    transition="scroll-y-transition"
                    style="
                    margin-top: 1px;
                      font-size: 12px;
                      text-align: left;
                      color: red;
                      margin-left: 15px;
                      min-height: 14px;
                      font-weight: lighter;
                    "
                  >
                    This field is required
                  </div>
                </v-slide-y-transition>
              </div>
          </div>
          <div style="padding-left: 50px; padding-right: 50px; margin-top: 30px;">
            <label
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
              >NPC Profile</label
            >
            <div id="app">
              <vue-editor
                id="editor1"
                v-model="npc_profile"
              />
              <div style="height: 15px">
                <v-slide-y-transition>
                  <div
                    v-if="!isNPCProfileValid"
                    transition="scroll-y-transition"
                    style="
                      font-size: 12px;
                      text-align: left;
                      color: red;
                      margin-left: 15px;
                      min-height: 14px;
                      font-weight: lighter;
                    "
                  >
                    This field is required
                  </div>
                </v-slide-y-transition>
              </div>
            </div>
          </div>
          <div
            style="padding-left: 50px; padding-right: 50px; margin-top: 30px"
          >
            <label
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
              >NPC Story</label
            >
            <div id="app">
              <vue-editor
                id="editor2"
                v-model="npc_story"
              />
              <div style="height: 15px">
                <v-slide-y-transition>
                  <div
                    v-if="!isNPCStoryValid"
                    transition="scroll-y-transition"
                    style="
                      font-size: 12px;
                      text-align: left;
                      color: red;
                      margin-left: 15px;
                      min-height: 14px;
                      font-weight: lighter;
                    "
                  >
                    This field is required
                  </div>
                </v-slide-y-transition>
              </div>
            </div>
          </div>
        </v-form>

        <v-card-actions class="justify-end">
          <div v-if="!isNPCStoryValid || !isNPCProfileValid">
            <v-btn
              rounded
              outlined
              disabled
              color="indigo"
              class="btn-form-primary m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddNPC'
                  ? submitNPC('AddNPC')
                  : submitNPC('UpdateNPC')
              "
              >{{ inputType == "AddNPC" ? "Add NPC" : "Update NPC" }}</v-btn
            >
          </div>
          <div v-if="isNPCStoryValid && isNPCProfileValid && isFileSelected && isNPCNameValid">
            <v-btn
              rounded
              outlined
              color="indigo"
              class="m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddNPC'
                  ? submitNPC('AddNPC')
                  : submitNPC('UpdateNPC')
              "
              >{{ inputType == "AddNPC" ? "Add NPC" : "Update NPC" }}</v-btn
            >
          </div>

          <v-btn plain text @click="dialogNPC = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Edit NPC -->

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="color" text>
      {{ textMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import LoadingScreen from "@/components/loading-screen.vue";
import { VueEditor } from "vue2-editor";

export default {
  name: "main-view",
  components: {
    "loading-screen": LoadingScreen,
    VueEditor,
  },
  data: () => ({
    // NPC
    deleteIdNPC: "",
    dialogConfirmDeleteNPC: false,
    editIdNPC: "",
    dialogNPC: false,
    image_npc: "",
    npc_name: "",
    npc_profile: "",
    npc_story: "",

    // FORM NPC
    NPCForm: new FormData(),
    inputType: "AddNPC",

    // Forms
    image64Foto: "",
    fotoError: false,
    selectedFile: null, // Store the selected file

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Addons
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
    },
    multiLine: true,
    getImage: null, // initialize getImage property here
    dialogZoom: false,
    loadingScreen: true,
    loading: false,
    search: "",
    dialog: false,
    dialogDelete: false,

    list: {
      headers: [],
      npcs: [],
    },
  }),
  created() {
    this.initializeNPC();
  },
  computed: {
    getNamaPersona() {
      return localStorage.getItem("nama_persona");
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    loggedIn() {
      return localStorage.getItem("token") != null;
    },

    // Validation for NPC
    isNPCNameValid() {
      // Custom validation logic
      return this.npc_name.trim() !== ""; // Content is required (not empty)
    },
    isNPCProfileValid() {
      // Custom validation logic
      return this.npc_profile.trim() !== ""; // Content is required (not empty)
    },
    isNPCStoryValid() {
      return this.npc_story.trim() !== ""; // Content is required (not empty)
    },


    // VAlidator for File required
    isFileSelected() {
      // Custom validation logic
      return this.selectedFile !== null; // File is required (not null)
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    // For NPC
    addHandlerNPC() {
      this.clearForm();
      this.inputType = "AddNPC";
      this.dialogNPC = true;
    },

    editHandlerNPC(item) {
      this.inputType = "Update";
      this.dialogNPC = true;
      this.editIdNPC = item.id;
      this.image_npc = item.image_npc;
      this.npc_name = item.npc_name;
      this.npc_profile = item.npc_profile;
      this.npc_story = item.npc_story;
      this.selectedFile= item.image_npc;
    },

    deleteHandlerNPC(item) {
      this.deleteIdNPC = item.id;
      this.npc_name = item.npc_name;
      console.log(item);
      this.dialogConfirmDeleteNPC = true;
    },

    deleteDataNPC() {
      this.loadingScreen = true;
      let id = this.deleteIdNPC;
      var url = this.$api + "/delete-npc/" + id;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDeleteNPC = false;
          this.axioDataNPC();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteNPC = false;
        });
    },

    initializeNPC() {
      this.list.headers = [
        {
          text: "Number",
          value: "no",
          filterable: false,
          width: "10%",
          align: "center",
          sortable: false,
        },
        {
          text: "Image",
          value: "image_npc",
          filterable: false,
          sortable: false,
          align: "center",
          width: "10%",
        },
        {
          text: "NPC Name",
          value: "npc_name",
          filterable: false,
          align: "center",
          sortable: false,
        },
        {
          text: "Published Date",
          value: "updated_at",
          filterable: false,
          align: "center",
          sortable: true,
        },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
      this.axioDataNPC();
    },

    axioDataNPC() {
      var url = this.$api + "/show-all-npc";

      // Use the 'url' variable somewhere in your code
      // ...

      this.$http.post(url).then((response) => {
        this.list.npcs = response.data.data;
        setTimeout(() => {
          this.loadingScreen = false;
        }, 300);
      });
    },

    submitNPC(val) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };
        let id = this.editIdNPC;

        var inputFoto = document.getElementById("file-foto"),
          dataFileFoto = inputFoto.files[0];

        this.NPCForm = new FormData();

        this.NPCForm.append("npc_name", this.npc_name);
        this.NPCForm.append("npc_profile", this.npc_profile);
        this.NPCForm.append("npc_story", this.npc_story);

        this.loadingScreen = true;

        if (val == "AddNPC") {
          var urlAddNPC = this.$api + "/create-npc";

          if (dataFileFoto) {
            this.NPCForm.append("image_npc", dataFileFoto);
          }

          this.$http
            .post(urlAddNPC, this.NPCForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.closeDialog();
              this.axioDataNPC();

              this.textMessage = this.error_message;
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "NPC Unsuccesfully Created";
              this.color = "secondary";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            });
        } else {
          var urlEditNPC = this.$api + "/update-npc/" + id;
          if (dataFileFoto) {
            this.NPCForm.append("image_npc", dataFileFoto);
          }

          this.$http
            .post(urlEditNPC, this.NPCForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.closeDialog();
              this.axioDataNPC();

              this.textMessage = this.error_message;
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "NPC Unsuccesfully updated";
              this.color = "secondary";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            });
        }

        setTimeout(() => {
          this.loadingScreen = false;
        }, 300);
      }
    },

    // End For NPC

    // FILE
    onFotoChange(e) {
      let file = e.target.files[0];
      if (
        file["type"] != "image/jpeg" &&
        file["type"] != "image/jpg" &&
        file["type"] != "image/png"
      ) {
        this.textMessage = "Format image only accepted for jpg, png, dan jpeg.";
        this.snackbar = true;
        this.color = "secondary";
      } else {
        let fotoData = new FileReader();

        fotoData.onloadend = () => {
          this.image64Foto = fotoData.result;
          this.fotoError = false;
        };

        fotoData.readAsDataURL(file);
      }
    },

    // For zoom image
    zoom(img) {
      this.getImage = img;
      this.dialogZoom = true;
      console.log(this.getImage);
    },

    // Close Dialog
    closeDialog() {
      this.dialogNPC = false;
    },

    // For Clear Form
    clearForm() {
      this.image_npc = "";
      this.npc_name = "";
      this.npc_profile = "";
      this.npc_story = "";
      this.image64Foto = "";
      this.fotoError= false;
      this.selectedFile= null; // Store the selected file
    },

    // For chech file is empty or not
    handleFileChange(event) {
      // Update the selectedFile data property when a file is selected
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.btn-img-profil {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  right: 10px;
  bottom: 10px;
  border-radius: 100%;
  background-color: rgba(51, 51, 51, 0.826);
}
.btn-img-profil i {
  font-size: var(--f-24);
  color: white !important;
}
.img-profil {
  display: block;
  height: 200px !important;
  width: 200px !important;
  border-radius: 100%;
  background-color: var(--white);
  border: 1px solid var(--border);
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: none;
}
/* object-fit */
.of-cover {
  object-fit: cover;
}
.img-zoom-full {
  height: 100%;
  width: 100%;
}
.w-img-oval {
  position: relative;
  height: 75px;
  width: 75px;

  .img-oval-zoom {
    visibility: collapse;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 75px;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: var(--transition1s);
  }

  .img-oval {
    height: 75px;
    width: 75px;
    object-fit: cover;
    border-radius: 100%;
  }

  .def-oval {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 75px;
    text-transform: capitalize;
    font-family: var(--font-secondary);
    font-size: 28px;
    color: var(--white) !important;
    border-radius: 100%;
    background-color: var(--secondary);
    border: 1px solid var(--secondary);
  }

  &:hover .img-oval-zoom {
    visibility: visible;
    opacity: 1;
    transition: var(--transition1s);
  }
}

.dashboard {
  padding: 20px;
}

.statistic {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}

@media only screen and (min-width: 601px) {
  .conatiner-size-my-profile {
    width: 60%;
  }
}

@media only screen and (max-width: 600px) {
  .conatiner-size-my-profile {
    width: 90%;
  }
}
</style>
