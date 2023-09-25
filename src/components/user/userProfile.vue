<template>
  <div>
    <loading-screen :value="loadingScreen"></loading-screen>
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
            <v-container class="conatiner-size-my-profile p-0">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><!-- SEARCH -->
                    <div class="form-input" style="margin-left: 10px">
                      <v-text-field
                        v-model="list.search_npc"
                        class="p-0 m-0"
                        append-icon="mdi-magnify"
                        label="Search NPC"
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
                :headers="list.headersNPC"
                :items="list.npcs"
                :search="list.search_npc"
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
                  {{ items.pageStart }} - {{ items.pageStop }} of
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
          <template>
            <v-container class="conatiner-size-my-profile p-0">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><!-- SEARCH -->
                    <div class="form-input" style="margin-left: 10px">
                      <v-text-field
                        v-model="list.search_comic"
                        class="p-0 m-0"
                        append-icon="mdi-magnify"
                        label="Search Comic"
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
                      @click="addHandlerComic"
                    >
                      Add Comic
                    </v-btn></b-col
                  >
                </b-row>
              </b-container>

              <v-data-table
                :headers="list.headersComic"
                :items="list.comics"
                :search="list.search_comic"
              >
                <template v-slot:[`item.no`]="{ item }">
                  <template>{{ list.comics.indexOf(item) + 1 }}</template>
                </template>

                <template v-slot:[`item.thumbnail`]="{ item }">
                  <div style="display: grid; justify-content: center;">
                  <div
                    class="w-img-oval m-2"
                    @click="zoom($baseUrl + '/storage/' + item.thumbnail)"
                  >
                    <img
                      :src="$baseUrl + '/storage/' + item.thumbnail"
                      class="img-oval"
                    />
                    <a class="img-oval-zoom">
                      <i class="mdi mdi-eye f-28 text-white"></i>
                    </a>
                  </div>
                </div>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    dense
                    color="#36abcf"
                    @click="detailhandlerComic(item)"
                    class="data-table-icon mr-3"
                    >mdi-information</v-icon
                  >
                  <v-icon
                    dense
                    color="#ffbd03"
                    @click="editHandlerComic(item)"
                    class="data-table-icon mr-3"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    dense
                    color="#FF0000"
                    @click="deleteHandlerComic(item)"
                    class="data-table-icon"
                    >mdi-delete</v-icon
                  >
                </template>
                <template v-slot:[`footer.page-text`]="items">
                  {{ items.pageStart }} - {{ items.pageStop }} of
                  {{ items.itemsLength }}
                </template>
                <template v-slot:no-data>
                  <div color="white"><p class="p-0 m-0">Comic is empty</p></div>
                </template>
              </v-data-table>
            </v-container>
          </template>
        </b-tab>
        <!-- End Comic -->

        <!-- Portfolio -->
        <b-tab title="Portfolio">
          <template>
            <v-container class="conatiner-size-my-profile p-0">
              <b-container class="bv-example-row">
                <b-row style="justify-content: center;">
                  <v-btn
                      small
                      color="primary"
                      dark
                      class="mb-2 w-2"
                      style="text-transform: unset !important; width: 30%;"
                      @click="addHandlerPortfolio"
                    >
                      Add Portfolio
                    </v-btn>
                </b-row>
              </b-container>

              <v-data-table
                :headers="list.headersPortfolio"
                :items="list.portfolios"            
              >
                <template v-slot:[`item.no`]="{ item }">
                  <template>{{ list.portfolios.indexOf(item) + 1 }}</template>
                </template>

                <template v-slot:[`item.thumbnail`]="{ item }">
                  <div style="display: grid; justify-content: center;">
                  <div
                    class="w-img-oval m-2"
                    @click="zoom($baseUrl + '/storage/' + item.thumbnail)"
                  >
                    <img
                      :src="$baseUrl + '/storage/' + item.thumbnail"
                      class="img-oval"
                    />
                    <a class="img-oval-zoom">
                      <i class="mdi mdi-eye f-28 text-white"></i>
                    </a>
                  </div>
                  </div>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    dense
                    color="#ffbd03"
                    @click="editHandlerPortfolio(item)"
                    class="data-table-icon mr-3"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    dense
                    color="#FF0000"
                    @click="deleteHandlerPortfolio(item)"
                    class="data-table-icon"
                    >mdi-delete</v-icon
                  >
                </template>
                <template v-slot:[`footer.page-text`]="items">
                  {{ items.pageStart }} - {{ items.pageStop }} of
                  {{ items.itemsLength }}
                </template>
                <template v-slot:no-data>
                  <div color="white"><p class="p-0 m-0">Portfolio is empty</p></div>
                </template>
              </v-data-table>
            </v-container>
          </template>
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

        <!-- Logout -->
        <b-tab @click="logout">
          <template #title>
            <b-spinner style="color: red" type="grow" small></b-spinner>
            <i style="color: red">Logout</i>
          </template>
          <img
            style="height: 200px; margin-top: 100px"
            src="@/assets/CircleLoader.gif"
          />
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

    <!-- Dialog Delete Comic Handler -->
    <v-dialog v-model="dialogConfirmDeleteComic" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Comic</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span
            >Are you sure want to delete
            <b style="text-transform: capitalize">{{ judul }}</b
            >'s Comic?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDeleteComic = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteDataComic()"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Comic Handler -->

    <!-- Dialog Delete Sub Comic Handler -->
    <v-dialog v-model="dialogConfirmDeleteSubComic" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Comic</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span
            >Are you sure want to delete
            <b style="text-transform: capitalize">{{ judul }}</b
            >'s Sub Comic?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDeleteSubComic = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteDataSubComic()"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Sub Comic Handler -->

    <!-- Dialog Delete Portfolio -->
    <v-dialog v-model="dialogConfirmDeletePortfolio" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Portfolio</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span
            >Are you sure want to delete Portfolio?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDeletePortfolio = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteDataPortfolio()"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Portfolio -->

    <!-- Dialog Add and Edit NPC -->
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
          style="
            margin-bottom: 50px;
            padding-top: 30px;
            font-family: 'Georgia';
            font-weight: bold;
          "
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
              @keyup="uppercaseNPC"
              solo
              v-model="npc_name"
              type="text"
              class="input-form-primary"
              placeholder="Fill the NPC Name"
              variant="underline"
              autocomplete="false"
              hide-details="true"
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
              >NPC Profile</label
            >
            <div id="app">
              <vue-editor id="editor1" v-model="npc_profile" />
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
              <vue-editor id="editor2" v-model="npc_story" />
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

        <v-card-actions class="justify-end mt-5">
          <div
            v-if="
              !isNPCStoryValid ||
              !isNPCProfileValid ||
              !isNPCNameValid ||
              !isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
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
          <div
            v-if="
              isNPCStoryValid &&
              isNPCProfileValid &&
              isFileSelected &&
              isNPCNameValid
            "
          >
            <v-btn
              style="text-transform: unset !important"
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

          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="closeDialogAddandEditNPC"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add and Edit NPC -->

    <!-- Dialog Add and Edit Comic -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogComic"
      persistent
    >
      <v-card
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <h3
          class="f-24 f-md-20 f-secondary text-center m-b-50"
          style="
            margin-bottom: 50px;
            padding-top: 30px;
            font-family: 'Georgia';
            font-weight: bold;
          "
        >
          {{ inputType == "AddComic" ? "Add New Comic" : "Update Comic" }}
        </h3>
        <v-form
          ref="form"
          class="w-full"
          @submit.prevent="
            inputType == 'AddComic'
              ? submitNPC('AddComic')
              : submitComic('UpdateComic')
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
                v-if="image64Foto != '' || inputType == 'AddComic'"
                :src="image64Foto"
                class="img-profil border"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  v-if="thumbnail != null"
                  :src="$baseUrl + '/storage/' + thumbnail"
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
              >Comic Title</label
            >
            <v-text-field
              @keyup="uppercaseComic"
              solo
              v-model="judul"
              type="text"
              class="input-form-primary"
              placeholder="Fill the Comic Title"
              variant="underline"
              autocomplete="false"
              hide-details="true"
            >
            </v-text-field>
            <div style="height: 15px">
              <v-slide-y-transition>
                <div
                  v-if="!isComicTitleValid"
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
          <div
            style="padding-left: 50px; padding-right: 50px; margin-top: 15px"
          >
            <div id="app">
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Genre</label
                  >
                  <v-select
                    v-model="genre"
                    v-bind:items="items"
                    label="Genre"
                    solo
                    hide-details="true"
                  ></v-select>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isComicGenreValid"
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
                </v-col>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Volume</label
                  >
                  <v-text-field
                    solo
                    v-model="volume"
                    type="text"
                    class="input-form-primary"
                    placeholder="Fill with number only"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isComicVolumeValid"
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
                        This field is required and must be a number
                      </div>
                    </v-slide-y-transition>
                  </div>
                </v-col>
              </v-row>
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
              >Instagram Author</label
            >
            <div id="app">
              <v-text-field
                solo
                v-model="instagram_author"
                type="text"
                class="input-form-primary"
                placeholder="Fill your instagram profile url"
                variant="underline"
                hide-details="true"
              ></v-text-field>
              <div style="height: 15px">
                <v-slide-y-transition>
                  <div
                    v-if="!isComicInstagramAuthorValid"
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
                    Invalid Instagram URL
                  </div>
                </v-slide-y-transition>
              </div>
            </div>
          </div>
        </v-form>

        <v-card-actions class="justify-end mt-5">
          <div
            v-if="
              !isComicTitleValid ||
              !isComicGenreValid ||
              !isComicVolumeValid ||
              !isComicInstagramAuthorValid ||
              !isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              disabled
              color="indigo"
              class="btn-form-primary m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddComic'
                  ? submitComic('AddComic')
                  : submitComic('UpdateComic')
              "
              >{{
                inputType == "AddComic" ? "Add Comic" : "Update Comic"
              }}</v-btn
            >
          </div>
          <div
            v-if="
              isComicTitleValid &&
              isComicGenreValid &&
              isComicVolumeValid &&
              isComicInstagramAuthorValid &&
              isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              color="indigo"
              class="m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddComic'
                  ? submitComic('AddComic')
                  : submitComic('UpdateComic')
              "
              >{{
                inputType == "AddComic" ? "Add Comic" : "Update Comic"
              }}</v-btn
            >
          </div>

          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="closeDialogAddandEditComic"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add and Edit Comic -->

    <!-- Dialog Detail to Sub Comic -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="full"
      v-model="dialogDetailComic"
      persistent
    >
      <v-card
        style="min-height: 700px"
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <v-card-actions class="justify-end mb-5">
          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="dialogDetailComic = false"
            ><v-icon
              dense
              color="#FF0000"
              @click="snackbar = false"
              class="data-table-icon"
              >mdi-close</v-icon
            ></v-btn
          >
        </v-card-actions>
        <h3
          class="f-24 f-md-20 f-secondary text-center m-b-50"
          style="
            margin-bottom: 50px;
            padding-top: 30px;
            font-family: 'Georgia';
            font-weight: bold;
          "
        >
          {{ judulComic }}'s Sub Comic
        </h3>

        <template>
          <v-container class="conatiner-size-my-profile p-0">
            <b-container class="bv-example-row">
              <b-row>
                <b-col
                  ><!-- SEARCH -->
                  <div class="form-input" style="margin-left: 10px">
                    <v-text-field
                      v-model="list.search_subcomic"
                      class="p-0 m-0"
                      append-icon="mdi-magnify"
                      label="Search Sub Comic"
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
                    @click="addHandlerSubComic(itemComic)"
                  >
                    Add Sub Comic
                  </v-btn></b-col
                >
              </b-row>
            </b-container>

            <v-data-table
              :headers="list.headersSubComic"
              :items="list.subcomics"
              :search="list.search_subcomic"
            >
              <template v-slot:[`item.no`]="{ item }">
                <template>{{ list.subcomics.indexOf(item) + 1 }}</template>
              </template>

              <template v-slot:[`item.thumbnail`]="{ item }">
                <div style="display: grid; justify-content: center;">
                <div
                  class="w-img-oval m-2"
                  @click="zoom($baseUrl + '/storage/' + item.thumbnail)"
                >
                  <img
                    :src="$baseUrl + '/storage/' + item.thumbnail"
                    class="img-oval"
                  />
                  <a class="img-oval-zoom">
                    <i class="mdi mdi-eye f-28 text-white"></i>
                  </a>
                </div>
              </div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  dense
                  color="#ffbd03"
                  @click="editHandlerSubComic(item, itemComic)"
                  class="data-table-icon mr-3"
                  >mdi-pencil</v-icon
                >
                <v-icon
                  dense
                  color="#FF0000"
                  @click="deleteHandlerSubComic(item, itemComic)"
                  class="data-table-icon"
                  >mdi-delete</v-icon
                >
              </template>
              <template v-slot:[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} of
                {{ items.itemsLength }}
              </template>
              <template v-slot:no-data>
                <div color="white">
                  <p class="p-0 m-0">Sub Comic is empty</p>
                </div>
              </template>
            </v-data-table>
          </v-container>
        </template>
      </v-card>
    </v-dialog>
    <!-- End Dialog Detail to Sub Comic -->

    <!-- Dialog Add and Edit Sub Comic -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000px"
      v-model="dialogSubComic"
      persistent
    >
      <v-card
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <h3
          class="f-24 f-md-20 f-secondary text-center m-b-50"
          style="
            margin-bottom: 50px;
            padding-top: 30px;
            font-family: 'Georgia';
            font-weight: bold;
          "
        >
          {{
            inputType == "AddSubComic"
              ? "Add New Sub Comic"
              : "Update Sub Comic"
          }}
          in {{ judulComic }}
        </h3>
        <v-form
          ref="form"
          class="w-full"
          @submit.prevent="
            inputType == 'AddSubComic'
              ? submitNPC('AddSubComic')
              : submitComic('UpdateSubComic')
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
                v-if="image64Foto != '' || inputType == 'AddSubComic'"
                :src="image64Foto"
                class="img-profil border"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  v-if="thumbnail != null"
                  :src="$baseUrl + '/storage/' + thumbnail"
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
              >Sub Comic Title</label
            >
            <v-text-field
              @keyup="uppercaseComic"
              solo
              v-model="judul"
              type="text"
              class="input-form-primary"
              placeholder="Fill the Comic Title"
              variant="underline"
              autocomplete="false"
              hide-details="true"
            >
            </v-text-field>
            <div style="height: 15px">
              <v-slide-y-transition>
                <div
                  v-if="!isSubComicTitleValid"
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
          <div
            style="padding-left: 50px; padding-right: 50px; margin-top: 15px"
          >
            <div id="app">
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Content</label
                  >
                  <div
                    class="h-auto w-full d-flex align-center justify-center flex-column"
                  >
                    <label
                      for="file-foto-content"
                      class="br-full position-relative p-all-10"
                      :class="{ 'border-error-file': fotoError }"
                    >
                      <v-img
                      style="border-radius: 20%; !important"
                        v-if="image64FotoSubComic != '' || inputType == 'AddSubComic'"
                        :src="image64FotoSubComic"
                        class="img-profil border"
                        cover
                      ></v-img>
                      <div v-else>
                        <v-img
                        style="border-radius: 20%; !important"
                          v-if="content != null"
                          :src="$baseUrl + '/storage/' + content"
                          class="img-profil"
                          cover
                        ></v-img>
                      </div>
                      <input
                        type="file"
                        id="file-foto-content"
                        ref="fileFotoContent"
                        accept="image/*"
                        hidden
                        @change="handleFileChangeSubComic"
                        v-on:change="onFotoChangeSubComic"
                      />
                      <a class="btn-img-profil cp">
                        <i class="icon mdi mdi-pencil f-18"></i>
                      </a>
                    </label>
                    <div style="height: 15px">
                      <v-slide-y-transition>
                        <div
                          v-if="!isFileContentSelected"
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
                </v-col>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Chapter</label
                  >
                  <v-text-field
                    solo
                    v-model="chapter"
                    type="text"
                    class="input-form-primary"
                    placeholder="Fill with number only"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isSubComicChapterValid"
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
                        This field is required and must be a number
                      </div>
                    </v-slide-y-transition>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-form>

        <v-card-actions class="justify-end mt-5">
          <div
            v-if="
              !isSubComicTitleValid ||
              !isSubComicChapterValid ||
              !isFileContentSelected ||
              !isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              disabled
              color="indigo"
              class="btn-form-primary m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddSubComic'
                  ? submitSubComic('AddSubComic')
                  : submitSubComic('UpdateSubComic')
              "
              >{{
                inputType == "AddSubComic"
                  ? "Add Sub Comic"
                  : "Update Sub Comic"
              }}</v-btn
            >
          </div>
          <div
            v-if="
              isSubComicTitleValid &&
              isSubComicChapterValid &&
              isFileContentSelected &&
              isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              color="indigo"
              class="m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddSubComic'
                  ? submitSubComic('AddSubComic')
                  : submitSubComic('UpdateSubComic')
              "
              >{{
                inputType == "AddSubComic"
                  ? "Add Sub Comic"
                  : "Update Sub Comic"
              }}</v-btn
            >
          </div>

          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="closeDialogAddandEditSubComic"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add and Edit Sub Comic -->

    <!-- Dialog Add and Edit Portfolio -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000px"
      v-model="dialogPortfolio"
      persistent
    >
      <v-card
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <h3
          class="f-24 f-md-20 f-secondary text-center m-b-50"
          style="
            margin-bottom: 50px;
            padding-top: 30px;
            font-family: 'Georgia';
            font-weight: bold;
          "
        >
          {{
            inputType == "AddPortfolio"
              ? "Add New Portfolio"
              : "Update Portfolio"
          }}
        </h3>
        <v-form
          ref="form"
          class="w-full"
          @submit.prevent="
            inputType == 'AddPortfolio'
              ? submitNPC('AddPortfolio')
              : submitComic('UpdatePortfolio')
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
                style="border-radius: 20%; !important"
                v-if="image64Foto != '' || inputType == 'AddPortfolio'"
                :src="image64Foto"
                class="img-profil border"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  style="border-radius: 20%; !important"
                  v-if="thumbnail != null"
                  :src="$baseUrl + '/storage/' + thumbnail"
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
        </v-form>

        <v-card-actions class="justify-end mt-5">
          <div
            v-if="
              !isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              disabled
              color="indigo"
              class="btn-form-primary m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddPortfolio'
                  ? submitPortfolio('AddPortfolio')
                  : submitPortfolio('UpdatePortfolio')
              "
              >{{
                inputType == "AddPortfolio"
                  ? "Add Portfolio"
                  : "Update Portfolio"
              }}</v-btn
            >
          </div>
          <div
            v-if="
              isFileSelected
            "
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              color="indigo"
              class="m-t-35"
              :loading="loading"
              @click="
                inputType == 'AddPortfolio'
                  ? submitPortfolio('AddPortfolio')
                  : submitPortfolio('UpdatePOrtfolio')
              "
              >{{
                inputType == "AddPortfolio"
                  ? "Add Portfolio"
                  : "Update Portfolio"
              }}</v-btn
            >
          </div>

          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="dialogPortfolio = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add and Edit Portfolio -->

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
  </div>
</template>

<script>
import LoadingScreen from "@/components/loading-screen.vue";
import { VueEditor } from "vue2-editor";
import moment from "moment";

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

    // Comic
    items: ["foo", "bar", "fizz", "buzz"],
    dialogComic: false,
    dialogConfirmDeleteComic: false,
    dialogDetailComic: false,
    genre: "",
    volume: "",
    instagram_author: "",

    // Sub Comic
    dialogSubComic: false,
    dialogConfirmDeleteSubComic: false,
    content: "",
    chapter: "",
    image64FotoSubComic: "",

    // Portfolio
    dialogPortfolio: false,
    dialogConfirmDeletePortfolio: false,

    // Comic & Sub Comic & Portfolio 
    judul: "",
    thumbnail: "",

    // Form Comic
    ComicForm: new FormData(),

    // Form Sub Comic
    SubComicForm: new FormData(),
    judulComic: "",
    selectedFileSubComic: null,

    // From Portfolio
    PortfolioForm : new FormData(),

    // Forms
    inputType: "",
    image64Foto: "",
    fotoError: false,
    selectedFile: null, // Store the selected file
    getImage: null, // initialize getImage property here

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Addons
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
    },
    multiLine: true,
    dialogZoom: false,
    loadingScreen: true,
    loading: false,
    dialog: false,
    dialogDelete: false,
    loadingScreenLogout: "",

    list: {
      headersNPC: [],
      headersComic: [],
      headersSubComic: [],
      headersPortfolio: [],
      npcs: [],
      comics: [],
      subcomics: [],
      portfolios: [],
      search_npc: "",
      search_comic: "",
      search_subcomic: "",
      search_portfolio: "",
    },
  }),
  created() {
    this.initializeNPC();
    this.initializeComic();
    this.initializePortfolio();
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
      return this.npc_name.trim() !== ""; // Content is required (not empty)
    },
    isNPCProfileValid() {
      return this.npc_profile.trim() !== ""; // Content is required (not empty)
    },
    isNPCStoryValid() {
      return this.npc_story.trim() !== ""; // Content is required (not empty)
    },

    // Validation for Comic
    isComicTitleValid() {
      return this.judul.trim() !== ""; // Content is required (not empty)
    },
    isComicGenreValid() {
      return this.genre.trim() !== ""; // Content is required (not empty)
    },
    isComicVolumeValid() {
      const volume = this.volume.trim();
      return volume !== "" && /^\d+$/.test(volume); // Content is required (not empty) and contains only numbers
    },
    isComicInstagramAuthorValid() {
      // Regular expression to match a valid URL
      const urlPattern =
        /^(http|https):\/\/(www\.)?instagram\.com\/[\w-]+\/?$/i;

      // Use test method to check if input matches the URL pattern
      return urlPattern.test(this.instagram_author);
    },

    // Validation for Sub Comic
    isSubComicTitleValid() {
      return this.judul.trim() !== ""; // Content is required (not empty)
    },
    isSubComicContentValid() {
      return this.content.trim() !== ""; // Content is required (not empty)
    },
    isSubComicChapterValid() {
      const chapter = this.chapter.trim();
      return chapter !== "" && /^\d+$/.test(chapter); // Content is required (not empty) and contains only numbers
    },
    isFileContentSelected() {
      // Custom validation logic
      return this.selectedFileSubComic !== null; // File is required (not null)
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

    // For Portfolio

    editHandlerPortfolio(item) {
      this.clearForm();
      this.dialogPortfolio = true;
      this.inputType = "UpdatePortfolio";
      this.editUuidPortfolio = item.uuid;
      this.thumbnail = item.thumbnail;
      this.selectedFile= item.thumbnail;
    },

    deleteHandlerPortfolio(item) {
      this.deleteUuidPortfolio = item.uuid;
      this.dialogConfirmDeletePortfolio = true;
    },

    addHandlerPortfolio() {
      this.clearForm();
      this.inputType = "AddPortfolio";
      this.dialogPortfolio = true;
    },

    initializePortfolio() {
      this.list.headersPortfolio = [
        {
          text: "Number",
          value: "no",
          filterable: false,
          width: "10%",
          align: "center",
          sortable: false,
        },
        {
          text: "Thumbnail",
          value: "thumbnail",
          align: "center",
          filterable: false,
          sortable: false,
        },
        {
          text: "Published Date",
          value: "created_at",
          filterable: false,
          align: 'center',
          sortable: true,
        },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
      this.axioDataPortfolio();
    },

    axioDataPortfolio() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-portfolio";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.list.portfolios = response.data.data.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching SubComic data:", error);
          this.loadingScreen = false;
        });
    },
    deleteDataPortfolio() {
      this.loadingScreen = true;
      let uuid = this.deleteUuidPortfolio;
      var url = this.$api + "/delete-portfolio/" + uuid;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDeletePortfolio = false;
          this.textMessage = "Portfolio Succesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          this.axioDataPortfolio();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.textMessage = "Portfolio Unsuccesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteSubComic = false;
        });
    },

    submitPortfolio(val) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };
        let uuid = this.editUuidPortfolio;

        var inputFotoPortfolio = document.getElementById("file-foto"),
        dataFileFotoPortfolio = inputFotoPortfolio.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
        document.getElementById("file-foto").value = "";


        this.PortfolioFrom = new FormData();

        this.loadingScreen = true;

        if (val == "AddPortfolio") {
          var urlAddPortfolio = this.$api + "/create-portfolio";

          if (dataFileFotoPortfolio) {
            this.PortfolioForm.append("thumbnail", dataFileFotoPortfolio);
          }

          this.$http
            .post(urlAddPortfolio, this.PortfolioForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.dialogPortfolio = false;
              this.axioDataPortfolio();

              this.textMessage = "Portfolio Succesfully Created";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Portfolio Unsuccesfully Created";
              this.color = "secondary";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            });
        } else {
          var urlEditPortfolio = this.$api + "/update-portfolio/" + uuid;
          if (dataFileFotoPortfolio) {
            this.PortfolioForm.append("thumbnail", dataFileFotoPortfolio);
          }

          this.$http
            .post(urlEditPortfolio, this.PortfolioForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.dialogPortfolio = false;
              this.axioDataPortfolio();

              this.textMessage = "Portfolio Succesfully Updated";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Portfolio Unsuccesfully updated";
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
    // End For Portfolio



    // For Sub Comic

    editHandlerSubComic(item, itemComic) {
      this.clearForm();
      this.inputType = "UpdateComic";
      this.dialogSubComic = true;
      this.judulComic = itemComic.judul;
      this.detailIdComic = itemComic.id;
      this.editUuidSubComic = item.uuid;
      this.judul = item.judul;
      this.thumbnail = item.thumbnail;
      this.content = item.content;
      this.chapter = item.chapter;
      this.instagram_author = item.instagram_author;
      this.selectedFile = item.thumbnail;
      this.selectedFileSubComic = item.content;
    },

    deleteHandlerSubComic(item, itemComic) {
      this.deleteUuidSubComic = item.uuid;
      this.judul = item.judul;
      this.detailIdComic = itemComic.id;
      this.dialogConfirmDeleteSubComic = true;
    },

    addHandlerSubComic(itemComic) {
      this.clearForm();
      this.addIdComic = itemComic.id;
      this.judulComic = itemComic.judul;
      this.inputType = "AddSubComic";
      this.dialogSubComic = true;
    },

    closeDialogAddandEditSubComic() {
      this.dialogSubComic = false;
    },

    handleFileChangeSubComic(event) {
      // Update the selectedFile data property when a file is selected
      this.selectedFileSubComic = event.target.files[0];
    },

    onFotoChangeSubComic(e) {
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
        let fotoDataContent = new FileReader();

        fotoDataContent.onloadend = () => {
          this.image64FotoSubComic = fotoDataContent.result;
          this.fotoError = false;
        };

        fotoDataContent.readAsDataURL(file);
      }
    },

    initializeSubComic(detailIdComic) {
      this.list.headersSubComic = [
        {
          text: "Number",
          value: "no",
          filterable: false,
          width: "10%",
          align: "center",
          sortable: false,
        },
        {
          text: "Thumbnail",
          value: "thumbnail",
          align: "center",
          filterable: false,
          sortable: false,
        },
        {
          text: "Judul",
          value: "judul",
          sortable: false,
          align: "center",
          width: "30%",
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          filterable: false,
          sortable: false,
        },
        {
          text: "Published Date",
          value: "created_at",
          filterable: false,
          align: "center",
          sortable: true,         
        },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ];
      this.axioDataSubComic(detailIdComic);
    },

    axioDataSubComic(detailIdComic) {
      this.loadingScreen = true;
      let id = detailIdComic;
      var url = this.$api + "/show-all-subcomic/" + id;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.list.subcomics = response.data.data.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching SubComic data:", error);
          this.loadingScreen = false;
        });
    },

    deleteDataSubComic() {
      this.loadingScreen = true;
      let id = this.detailIdComic;
      let uuid = this.deleteUuidSubComic;
      var url = this.$api + "/delete-subkomik/" + uuid;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDeleteSubComic = false;
          this.textMessage = "Sub Comic Succesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          this.axioDataSubComic(id);
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.textMessage = "Sub Comic Unsuccesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteSubComic = false;
        });
    },

    submitSubComic(val) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };
        let id = this.addIdComic;
        let idComic = this.detailIdComic;
        let uuid = this.editUuidSubComic;

        var inputFotoComic = document.getElementById("file-foto"),
        dataFileFotoComic = inputFotoComic.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
        document.getElementById("file-foto").value = "";

        var inputContentComic = document.getElementById("file-foto-content"),
        dataFileContentComic = inputContentComic.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
        document.getElementById("file-foto-content").value = "";



        this.SubComicForm = new FormData();

        this.SubComicForm.append("judul", this.judul);
        this.SubComicForm.append("chapter", this.chapter);

        this.loadingScreen = true;

        if (val == "AddSubComic") {
          var urlAddSubComic = this.$api + "/create-subkomik/" + id;

          if (dataFileFotoComic) {
            this.SubComicForm.append("thumbnail", dataFileFotoComic);
          }

          if (dataFileContentComic) {
            this.SubComicForm.append("content", dataFileContentComic);
          }

          this.$http
            .post(urlAddSubComic, this.SubComicForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.closeDialogAddandEditSubComic();
              this.axioDataSubComic(idComic);

              this.textMessage = "Sub Comic Succesfully Created";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Sub Comic Unsuccesfully Created";
              this.color = "secondary";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            });
        } else {
          var urlEditSubComic = this.$api + "/update-subkomik/" + uuid;
          if (dataFileFotoComic) {
            this.SubComicForm.append("thumbnail", dataFileFotoComic);
          }

          if (dataFileContentComic) {
            this.SubComicForm.append("content", dataFileContentComic);
          }

          this.$http
            .post(urlEditSubComic, this.SubComicForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.closeDialogAddandEditSubComic();
              this.axioDataSubComic(idComic);

              this.textMessage = "Sub Comic Succesfully Updated";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Sub Comic Unsuccesfully updated";
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
    // End For Sub Comic

    // For Comic
    // For Uppercase Form
    uppercaseComic() {
      const words = this.judul.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
      this.judul = words.join(" ");
    },

    detailhandlerComic(item) {
      this.dialogDetailComic = true;
      this.itemComic = item;
      this.detailUuidComic = item.uuid;
      this.detailIdComic = item.id;
      this.judulComic = item.judul;
      this.initializeSubComic(this.detailIdComic);
    },

    editHandlerComic(item) {
      this.clearForm();
      this.inputType = "UpdateComic";
      this.dialogComic = true;
      this.editUuidComic = item.uuid;
      this.judul = item.judul;
      this.thumbnail = item.thumbnail;
      this.genre = item.genre;
      this.volume = item.volume;
      this.instagram_author = item.instagram_author;
      this.selectedFile = item.thumbnail;
      console.log(this.image64Foto);
    },

    deleteHandlerComic(item) {
      this.deleteUuidComic = item.uuid;
      this.judul = item.judul;
      this.dialogConfirmDeleteComic = true;
    },

    addHandlerComic() {
      this.clearForm();
      this.inputType = "AddComic";
      this.dialogComic = true;
    },

    deleteDataComic() {
      this.loadingScreen = true;
      let uuid = this.deleteUuidComic;
      var url = this.$api + "/delete-komik/" + uuid;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDeleteComic = false;
          this.textMessage = "Comic Succesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          this.axioDataComic();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.textMessage = "Comic Unsuccesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteComic = false;
        });
    },

    initializeComic() {
      this.list.headersComic = [
        {
          text: "Number",
          value: "no",
          filterable: false,
          width: "10%",
          align: "center",
          sortable: false,
        },
        {
          text: "Thumbnail",
          value: "thumbnail",
          align: "center",
          filterable: false,
          sortable: false,
        },
        {
          text: "Judul",
          value: "judul",
          sortable: false,
          align: "center",
          width: "30%",
        },
        {
          text: "Status",
          value: "status",
          align: "center",
          filterable: false,
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
      this.axioDataComic();
    },

    axioDataComic() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-comic";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.list.comics = response.data.data.map((x) => {
            return {
              ...x,
              updated_at: moment(x.updated_at).format("YYYY-MM-DD h:mm a"),
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

    submitComic(val) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };
        let uuid = this.editUuidComic;

        var inputFotoComic = document.getElementById("file-foto"),
          dataFileFotoComic = inputFotoComic.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
        document.getElementById("file-foto").value = "";

        this.ComicForm = new FormData();

        this.ComicForm.append("judul", this.judul);
        this.ComicForm.append("genre", this.genre);
        this.ComicForm.append("volume", this.volume);
        this.ComicForm.append("instagram_author", this.instagram_author);

        this.loadingScreen = true;

        if (val == "AddComic") {
          var urlAddComic = this.$api + "/create-komik";

          if (dataFileFotoComic) {
            this.ComicForm.append("thumbnail", dataFileFotoComic);
          }

          this.$http
            .post(urlAddComic, this.ComicForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.closeDialog();
              this.axioDataComic();

              this.textMessage = "Comic Succesfully Created";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Comic Unsuccesfully Created";
              this.color = "secondary";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            });
        } else {
          var urlEditComic = this.$api + "/update-komik/" + uuid;
          if (dataFileFotoComic) {
            this.ComicForm.append("thumbnail", dataFileFotoComic);
          }

          this.$http
            .post(urlEditComic, this.ComicForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              this.closeDialog();
              this.axioDataComic();

              this.textMessage = "Comic Succesfully Updated";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Comic Unsuccesfully updated";
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

    closeDialogAddandEditComic() {
      this.dialogComic = false;
    },

    // End Comic

    // For NPC

    // For Uppercase Form
    uppercaseNPC() {
      const words = this.npc_name.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
      this.npc_name = words.join(" ");
    },

    addHandlerNPC() {
      this.clearForm();
      this.inputType = "AddNPC";
      this.dialogNPC = true;
    },

    editHandlerNPC(item) {
      this.clearForm();
      this.inputType = "UpdateNPC";
      this.dialogNPC = true;
      this.editUuidNPC = item.uuid;
      this.image_npc = item.image_npc;
      this.npc_name = item.npc_name;
      this.npc_profile = item.npc_profile;
      this.npc_story = item.npc_story;
      this.selectedFile = item.image_npc;
      console.log(this.image64Foto);
    },

    deleteHandlerNPC(item) {
      this.deleteUuidNPC = item.uuid;
      this.npc_name = item.npc_name;
      this.dialogConfirmDeleteNPC = true;
    },

    deleteDataNPC() {
      this.loadingScreen = true;
      let uuid = this.deleteUuidNPC;
      var url = this.$api + "/delete-npc/" + uuid;
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
          this.textMessage = "NPC Succesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          this.axioDataNPC();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.textMessage = "NPC Unsuccesfully Created";
          this.snackbar = true;
          this.color = "green";
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteNPC = false;
        });
    },

    initializeNPC() {
      this.list.headersNPC = [
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
          align: "center",
          width: "30%",
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
      this.loadingScreen = true;
      var url = this.$api + "/show-all-npc";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.list.npcs = response.data.data.map((x) => {
            return {
              ...x,
              updated_at: moment(x.updated_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching NPC data:", error);
          this.loadingScreen = false;
        });
    },

    submitNPC(val) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };
        let uuid = this.editUuidNPC;

        var inputFoto = document.getElementById("file-foto"),
          dataFileFoto = inputFoto.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
        document.getElementById("file-foto").value = "";

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

              this.textMessage = "NPC Succesfully Created";
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
          var urlEditNPC = this.$api + "/update-npc/" + uuid;
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

              this.textMessage = "NPC Succesfully Updated";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "NPC Unsuccesfully Updated";
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

    closeDialogAddandEditNPC() {
      this.dialogNPC = false;
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
    },

    // Close Dialog
    closeDialog() {
      this.dialogNPC = false;
      this.dialogComic = false;
    },

    // For Clear Form
    clearForm() {
      // NPC
      this.image_npc = "";
      this.npc_name = "";
      this.npc_profile = "";
      this.npc_story = "";

      // Comic
      this.genre = "";
      this.volume = "";
      this.instagram_author = "";

      // Comic & Sub Comic
      this.judul = "";
      this.thumbnail = "";

      // Sub Comic
      this.content = "";
      this.chapter = "";
      this.image64FotoSubComic = "";

      // Addons
      this.image64Foto = "";
      this.fotoError = false;
      this.selectedFile = null; // Store the selected file
    },

    // For chech file is empty or not
    handleFileChange(event) {
      // Update the selectedFile data property when a file is selected
      this.selectedFile = event.target.files[0];
    },

    // For Logout
    logout() {
      this.loadingScreenLogout = true;

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
            this.loadingScreenLogout = false;
          }, 5000);
          this.$router.push({
            name: "login",
          });
        });
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
