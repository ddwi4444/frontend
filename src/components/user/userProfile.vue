<template>
  <div>
    <loading-screen :value="loadingScreen"></loading-screen>
    <v-card-title
      class="lighten-2"
      style="margin-top: 0px; padding-top: 0px; justify-content: center"
    >
      <div
        @click="zoom($baseUrl + '/storage/' + imageProfile)"
        style="cursor: zoom-in"
      >
        <img
          v-if="image == null"
          src="@/assets/userImage.jpg"
          class="img-profil border"
          style="margin-top: 10px"
          cover
        />
        <div v-else>
          <v-img
            v-if="image != null"
            :src="$baseUrl + '/storage/' + imageProfile"
            class="img-profil"
            cover
            style="margin-top: 10px"
          ></v-img>
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <h4 style="text-transform: capitalize">
        {{ getNamaPersona }}
        <v-btn @click="editHandlerProfile" icon x-small color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </h4>
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
                  style="cursor: zoom-in; height: 500px;"
                  @click="zoom($baseUrl + '/storage/' + imageProfile)"
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
                  <div style="display: grid; justify-content: center">
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
                <b-row style="justify-content: center">
                  <v-btn
                    small
                    color="primary"
                    dark
                    class="mb-2 w-2"
                    style="text-transform: unset !important; width: 30%"
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
                  <div style="display: grid; justify-content: center">
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
                  <div color="white">
                    <p class="p-0 m-0">Portfolio is empty</p>
                  </div>
                </template>
              </v-data-table>
            </v-container>
          </template>
        </b-tab>
        <!-- End Portfolio -->

        <!-- Merchandise -->
        <b-tab title="Merchandise">
          <template>
            <v-container class="conatiner-size-my-profile p-0">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><!-- SEARCH -->
                    <div class="form-input" style="margin-left: 10px">
                      <v-text-field
                        v-model="list.search_merchandise"
                        class="p-0 m-0"
                        append-icon="mdi-magnify"
                        label="Search Merchandise"
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
                      @click="addHandlerMerchandise"
                    >
                      Add Merchandise
                    </v-btn></b-col
                  >
                </b-row>
              </b-container>

              <v-data-table
                :headers="list.headersMerchandise"
                :items="list.merchandises"
              >
                <template v-slot:[`item.no`]="{ item }">
                  <template>{{ list.merchandises.indexOf(item) + 1 }}</template>
                </template>

                <template v-slot:[`item.thumbnail`]="{ item }">
                  <div style="display: grid; justify-content: center">
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
                    @click="editHandlerMerchandise(item)"
                    class="data-table-icon mr-3"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    dense
                    color="#FF0000"
                    @click="deleteHandlerMerchandise(item)"
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
                    <p class="p-0 m-0">Merchandise is empty</p>
                  </div>
                </template>
              </v-data-table>
            </v-container>
          </template>
        </b-tab>
        <!-- End Merchandise -->

        <!-- Your Order -->
        <b-tab title="Your Order">
          <div></div>
        </b-tab>
        <!-- End Your Order -->

        <!-- Your Activity -->
        <b-tab title="Your Activity">
          <template>
            <v-container class="conatiner-size-my-profile p-0">
              <b-container class="bv-example-row">
                <b-row>
                  <b-col
                    ><!-- SEARCH -->
                    <div class="form-input" style="margin-left: 10px">
                      <v-text-field
                        v-model="list.search_servicesTransaction"
                        class="p-0 m-0"
                        append-icon="mdi-magnify"
                        label="Search Transactions"
                        single-line
                        hide-details
                      ></v-text-field></div
                  ></b-col>
                  <b-col></b-col>
                </b-row>
              </b-container>

              <v-data-table
                :headers="list.headersServicesTransaction"
                :items="list.servicesTransactions"
                :search="list.search_servicesTransaction"
              >
                <template v-slot:[`item.no`]="{ item }">
                  <template>{{
                    list.servicesTransactions.indexOf(item) + 1
                  }}</template>
                </template>

                <template v-slot:[`item.offering_cost`]="{ item }">
                  <template>
                    <template
                      >Rp. {{ formatPrice(item.offering_cost) }}</template
                    >
                  </template>
                </template>

                <template v-slot:[`item.is_deal`]="{ item }">
                  <template>
                    <div
                      style="color: gray"
                      v-if="item.is_deal == '0' && item.is_done == '0'"
                    >
                      Delivered
                    </div>
                    <div
                      style="color: blue"
                      v-else-if="item.is_deal == '1' && item.is_done == '0'"
                    >
                      On-Process
                    </div>
                    <div style="color: green" v-else-if="item.is_done == '1'">
                      Done
                    </div>
                  </template>
                </template>

                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    dense
                    color="#36abcf"
                    @click="detailHandlerServicesTransaction(item)"
                    class="data-table-icon mr-3"
                    >mdi-information</v-icon
                  >
                  <v-icon
                    v-if="item.is_deal == 0"
                    dense
                    color="#FF0000"
                    @click="deleteHandlerMerchandise(item)"
                    class="data-table-icon"
                    >mdi-delete</v-icon
                  >
                  <v-icon
                    v-else
                    disabled
                    dense
                    color="#FF0000"
                    @click="deleteHandlerMerchandise(item)"
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
                    <p class="p-0 m-0">Services Transaction is empty</p>
                  </div>
                </template>
              </v-data-table>
            </v-container>
          </template>
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
    <v-dialog
      v-model="dialogConfirmDeleteSubComic"
      persistent
      max-width="400px"
    >
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
    <v-dialog
      v-model="dialogConfirmDeletePortfolio"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Portfolio</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span>Are you sure want to delete Portfolio?</span>
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

    <!-- Dialog Delete Merchandise Handler -->
    <v-dialog
      v-model="dialogConfirmDeleteMerchandise"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Merchandise</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span
            >Are you sure want to delete
            <b style="text-transform: capitalize">{{ nama }}</b
            >'s Merchandise?</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDeleteMerchandise = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteDataMerchandise()"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Merchandise Handler -->

    <!-- Dialog Edit Profile -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogEditProfile"
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
          Edit Profile
        </h3>
        <v-form ref="form" class="w-full" @submit.prevent>
          <div
            class="h-auto w-full d-flex align-center justify-center flex-column m-b-25 mt-5"
          >
            <label
              for="file-foto-profile"
              class="br-full position-relative p-all-10"
              :class="{ 'border-error-file': fotoError }"
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              Photo Profile
              <v-img
                v-if="image == null || image64FotoProfile != ''"
                :src="image64FotoProfile"
                class="img-profil border"
                style="margin-top: 10px"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  :src="$baseUrl + '/storage/' + image"
                  class="img-profil border"
                  cover
                  style="margin-top: 10px"
                ></v-img>
              </div>
              <input
                type="file"
                id="file-foto-profile"
                ref="fileFotoprofile"
                accept="image/*"
                hidden
                @change="handleFileChangeProfile"
                v-on:change="onFotoChangeProfile"
              />
              <a class="btn-img-profil cp">
                <i class="icon mdi mdi-pencil f-18"></i>
              </a>
            </label>
            <div style="height: 15px">
              <v-slide-y-transition>
                <div
                  v-if="!isFileProfileSelected"
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
            style="padding-left: 50px; padding-right: 50px; margin-top: 15px"
          >
            <div id="app">
              <div
                style="
                  padding-left: 50px;
                  padding-right: 50px;
                  margin-top: 30px;
                "
              >
                <label
                  style="
                    justify-content: start;
                    display: grid;
                    margin-bottom: 10px;
                    font-family: 'Georgia';
                  "
                  >Persona Name</label
                >
                <div id="app">
                  <v-text-field
                    @keyup="uppercaseProfile"
                    solo
                    v-model="persona_name"
                    type="text"
                    class="input-form-primary"
                    placeholder="Fill your instagram profile url"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isPersonaNameValid"
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
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Persona Name</label
                  >
                  <v-text-field
                    solo
                    v-model="bio"
                    type="text"
                    class="input-form-primary"
                    placeholder="Describe your bio here"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isBioValid"
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
                    >Age</label
                  >
                  <v-text-field
                    solo
                    v-model="age"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. 17 "
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isAgeValid"
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
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Racial</label
                  >
                  <v-text-field
                    solo
                    v-model="racial"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. Half Demon-Vampire"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isRacialValid"
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
                    >Birth Date</label
                  >
                  <v-date-picker v-model="birth_date"></v-date-picker>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isBirthDateValid"
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
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Zodiac</label
                  >
                  <v-text-field
                    solo
                    v-model="zodiac"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. Taurus"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isZodiacValid"
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
                    >MBTI</label
                  >
                  <v-text-field
                    solo
                    v-model="mbti"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. INFJ-T"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isMBTIValid"
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
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Body Weight</label
                  >
                  <v-text-field
                    solo
                    v-model="body_weight"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. 55"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isBodyWeightValid"
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
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Body Tall</label
                  >
                  <v-text-field
                    solo
                    v-model="body_tall"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. 185"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isBodyTallValid"
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
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Like</label
                  >
                  <v-text-field
                    solo
                    v-model="like"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. Flowers, Meatball, etc"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isLikeValid"
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
                    >Didn't Like</label
                  >
                  <v-text-field
                    solo
                    v-model="did_not_like"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. Bold Book, Vampire, etc"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isDidNotLikeValid"
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
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Hobby</label
                  >
                  <v-text-field
                    solo
                    v-model="hobby"
                    type="text"
                    class="input-form-primary"
                    placeholder="e.g. Writing, Reading, etc"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isHobbyValid"
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
                    >Quotes</label
                  >
                  <v-text-field
                    solo
                    v-model="quotes"
                    type="text"
                    class="input-form-primary"
                    placeholder="Your best quotes"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isQuotesValid"
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
              </v-row>
              <div
                style="
                  padding-left: 50px;
                  padding-right: 50px;
                  margin-top: 30px;
                "
              >
                <label
                  style="
                    justify-content: start;
                    display: grid;
                    margin-bottom: 10px;
                    font-family: 'Georgia';
                  "
                  >Instagram Account</label
                >
                <div id="app">
                  <v-text-field
                    solo
                    v-model="ig_acc"
                    type="text"
                    class="input-form-primary"
                    placeholder="Fill your instagram profile url"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isIgAccValid"
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
              <div
                style="
                  padding-left: 50px;
                  padding-right: 50px;
                  margin-top: 30px;
                "
              >
                <label
                  style="
                    justify-content: start;
                    display: grid;
                    margin-bottom: 10px;
                    font-family: 'Georgia';
                  "
                  >Story Character</label
                >
                <div id="app">
                  <vue-editor id="editor1" v-model="story_character" />
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isStoryCharacterValid"
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
            </div>
          </div>
        </v-form>

        <v-card-actions class="justify-end mt-5">
          <!-- <div
            v-if="
              !isPersonaNameValid ||
              !isBioValid ||
              !isAgeValid ||
              !isRacialValid ||
              !isBirthDateValid ||
              !isZodiacValid ||
              !isMBTIValid ||
              !isBodyWeightValid ||
              !isBodyTallValid ||
              !isLikeValid ||
              !isDidNotLikeValid ||
              !isHobbyValid ||
              !isQuotesValid ||
              !isIgAccValid ||
              !isStoryCharacterValid ||
              !isFileProfileSelected
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
              @click="submitUpdateProfile(getUUIDProfile)"
              >Save Profile</v-btn
            >
          </div> -->
          <div
          >
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              color="indigo"
              class="m-t-35"
              :loading="loading"
              @click="submitUpdateProfile(getUUIDProfile)"
              >Save Profile</v-btn
            >
          </div>

          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="dialogEditProfile = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Edit Profile-->

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
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              NPC Image
              <v-img
                v-if="image64Foto != '' || inputType == 'AddNPC'"
                :src="image64Foto"
                class="img-profil border"
                cover
                style="margin-top: 10px"
              ></v-img>
              <div v-else>
                <v-img
                  v-if="image_npc != null"
                  :src="$baseUrl + '/storage/' + image_npc"
                  class="img-profil"
                  cover
                  style="margin-top: 10px"
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
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              Comic Thumbnail
              <v-img
                v-if="image64Foto != '' || inputType == 'AddComic'"
                :src="image64Foto"
                class="img-profil border"
                cover
                style="margin-top: 10px"
              ></v-img>
              <div v-else>
                <v-img
                  v-if="thumbnail != null"
                  :src="$baseUrl + '/storage/' + thumbnail"
                  class="img-profil"
                  cover
                  style="margin-top: 10px"
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
          {{ judulComic }}'s Comic
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
                <div style="display: grid; justify-content: center">
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
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              Sub Comic Thumbnail
              <v-img
                v-if="image64Foto != '' || inputType == 'AddSubComic'"
                :src="image64Foto"
                class="img-profil border"
                cover
                style="margin-top: 10px"
              ></v-img>
              <div v-else>
                <v-img
                  v-if="thumbnail != null"
                  :src="$baseUrl + '/storage/' + thumbnail"
                  class="img-profil"
                  cover
                  style="margin-top: 10px"
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
                        v-if="
                          image64FotoSubComic != '' ||
                          inputType == 'AddSubComic'
                        "
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
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              Portfolio Image
              <v-img
                style="border-radius: 20%; margin-top: 10px; !important"
                v-if="image64Foto != '' || inputType == 'AddPortfolio'"
                :src="image64Foto"
                class="img-profil border"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  style="border-radius: 20%; margin-top: 10px;  !important "
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
          <div v-if="!isFileSelected">
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
          <div v-if="isFileSelected">
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

    <!-- Dialog Add and Edit Merchandise -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogMerchandise"
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
            inputType == "AddMerchandise"
              ? "Add New Merchandise"
              : "Update Merchandise"
          }}
        </h3>
        <v-form
          ref="form"
          class="w-full"
          @submit.prevent
        >
          <div
            class="h-auto w-full d-flex align-center justify-center flex-column m-b-25 mt-5"
          >
            <label
              for="file-foto"
              class="br-full position-relative p-all-10"
              :class="{ 'border-error-file': fotoError }"
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              Product Thumbnail
              <v-img
                v-if="image64Foto != '' || inputType == 'AddMerchandise'"
                :src="image64Foto"
                class="img-profil border"
                style="margin-top: 10px"
                cover
              ></v-img>
              <div v-else>
                <v-img
                  v-if="thumbnail != null"
                  :src="$baseUrl + '/storage/' + thumbnail"
                  class="img-profil"
                  cover
                  style="margin-top: 10px"
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
              >Product Name</label
            >
            <v-text-field
              @keyup="uppercaseMerchandise"
              solo
              v-model="nama"
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
                  v-if="!isMerchandiseProductTitleValid"
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
              >Product Description</label
            >
            <div id="app">
              <vue-editor id="editor3" v-model="deskripsi" />
              <div style="height: 15px">
                <v-slide-y-transition>
                  <div
                    v-if="!isMerchandiseDescriptionValid"
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
                    >Price</label
                  >
                  <v-text-field
                    solo
                    v-model="harga"
                    type="text"
                    class="input-form-primary"
                    placeholder="Price ex (100.000)"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isMerchandisePriceValid"
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
                <v-col cols="12" sm="6">
                  <label
                    style="
                      justify-content: start;
                      display: grid;
                      margin-bottom: 10px;
                      font-family: 'Georgia';
                    "
                    >Stock</label
                  >
                  <v-text-field
                    solo
                    v-model="stok"
                    type="text"
                    class="input-form-primary"
                    placeholder="Fill with number only"
                    variant="underline"
                    hide-details="true"
                  ></v-text-field>
                  <div style="height: 15px">
                    <v-slide-y-transition>
                      <div
                        v-if="!isMerchandiseStockValid"
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
            style="padding-left: 50px; padding-right: 50px; margin-top: 50px"
          >
            <label
              style="
                justify-content: start;
                display: grid;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
              >Merchandise Images</label
            >
            <v-file-input
              chips
              multiple
              solo
              hide-details="true"
              accept="image/*"
              id="images_merchandise_path"
              v-model="images_merchandise_path"
              :clearable="false"
            ></v-file-input>
            <div style="height: 15px">
              <v-slide-y-transition>
                <div
                  v-if="!isFileSelectedImagesMerchandise"
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
        </v-form>

        <v-card-actions class="justify-end mt-5">
          <div
            v-if="
              !isMerchandiseProductTitleValid ||
              !isMerchandiseDescriptionValid ||
              !isMerchandisePriceValid ||
              !isMerchandiseStockValid ||
              !isFileSelectedImagesMerchandise ||
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
                inputType == 'AddMerchandise'
                  ? submitMerchandise('AddMerchandise')
                  : submitMerchandise('UpdateMerchandise')
              "
              >{{
                inputType == "AddMerchandise"
                  ? "Add Merchandise"
                  : "Update Merchandise"
              }}</v-btn
            >
          </div>
          <div
            v-if="
              isMerchandiseProductTitleValid &&
              isMerchandiseDescriptionValid &&
              isMerchandisePriceValid &&
              isMerchandiseStockValid &&
              isFileSelectedImagesMerchandise &&
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
                inputType == 'AddMerchandise'
                  ? submitMerchandise('AddMerchandise')
                  : submitMerchandise('UpdateMerchandise')
              "
              >{{
                inputType == "AddMerchandise"
                  ? "Add Merchandise"
                  : "Update Merchandise"
              }}</v-btn
            >
          </div>

          <v-btn
            style="text-transform: unset !important"
            plain
            text
            @click="dialogMerchandise = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add and Edit Merchandise -->

    <!-- Dialog Detail Services Transaction -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogDetailServicesTransaction"
    >
      <v-card>
        <v-toolbar color="primary" dark>Detail Transaction</v-toolbar>
        <v-row style="margin: 0px">
          <v-col cols="12" sm="8" class="mt-5">
            <div class="style-transaksi-layanan-1">
              <p class="text-h5 pa-5" style="color: black; margin: 0px">
                Thank you, {{ this.customer_name }}
              </p>
              <p style="color: black; margin: 0px">
                Your order transaction services with the order number :
              </p>
              <p style="color: rgb(205, 133, 63); margin: 5px">
                {{ this.order_number }}
                <span>
                  <div
                    style="color: gray"
                    v-if="this.is_deal == '0' && this.is_done == '0'"
                  >
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >delivered</span
                    >
                  </div>
                  <div
                    style="color: blue"
                    v-else-if="this.is_deal == '1' && this.is_done == '0'"
                  >
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >on-process</span
                    >
                  </div>
                  <div style="color: green" v-else-if="this.is_done == '1'">
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >done</span
                    >
                  </div>
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="style-transaksi-layanan-2 mt-5" cols="12" sm="3">
            <div>
              <img
                v-if="this.is_deal == '0' && this.is_done == '0'"
                src="@/assets/Buy Online.gif"
                class="d-inline-block align-top"
                alt="Logo HAF"
                style="height: 140px"
              />
              <img
                v-else-if="this.is_deal == '1' && this.is_done == '0'"
                src="@/assets/Online Sales.gif"
                class="d-inline-block align-top"
                alt="Logo HAF"
                style="height: 140px"
              />
              <img
                v-else-if="this.is_done == '1'"
                src="@/assets/Packaging For Delivery.gif"
                class="d-inline-block align-top"
                alt="Logo HAF"
                style="height: 140px"
              />
            </div>
          </v-col>
        </v-row>

        <v-card-text>
          <center>
            <div
              class="ma-5 div-detail-order-services"
              style="width: 50%; text-align: start"
            >
              <p style="font-size: 19px; color: black; margin: 0px">
                {{ this.project_name }}
              </p>
              <p style="color: black; margin: 0px">
                Rp. {{ formatPrice(this.offering_cost) }}
              </p>
              <p style="color: black; margin: 0px; text-align: justify">
                {{ this.description }}
              </p>
            </div>

            <hr style="width: 40%" />

            <v-btn
              v-if="this.idServicer == this.userLogin.id && this.is_deal == '0'"
              style="text-transform: unset !important"
              rounded
              outlined
              small
              color="indigo"
              class="btn-form-primary mt-3"
              :loading="loading"
              @click="takeOrder(uuidTransaksiLayanan)"
              >Take Order</v-btn
            >

            <v-btn
              v-if="this.idServicer == this.userLogin.id && this.is_deal == '1'"
              style="text-transform: unset !important"
              rounded
              disabled
              outlined
              small
              color="indigo"
              class="btn-form-primary mt-3"
              :loading="loading"
              >Order Taken</v-btn
            >

            <v-btn
              v-if="this.idCustomer == this.userLogin.id && this.is_done == '0'"
              style="text-transform: unset !important"
              rounded
              outlined
              small
              color="indigo"
              class="btn-form-primary mt-3"
              :loading="loading"
              @click="doneOrder(uuidTransaksiLayanan)"
              >Mark as Done</v-btn
            >

            <div
              v-if="
                this.is_done == '1' &&
                this.editReview == '1' &&
                this.idCustomer == this.userLogin.id &&
                this.is_deal == '1'
              "
            >
              <div v-if="this.idCustomer == this.userLogin.id">
                <p style="color: black; margin: 0px">
                  Rate services
                  <v-btn
                    v-if="this.canEditReview == null && this.is_done == '1'"
                    @click="clickEditReview"
                    icon
                    x-small
                    style="font-size: 0.875rem"
                    color="primary"
                  >
                    <v-icon style="font-size: 0.875rem">mdi-pencil</v-icon>
                  </v-btn>
                </p>
              </div>
              <v-form
                class="form div-detail-order-services"
                ref="form"
                @submit.prevent
              >
                <div class="text-center">
                  <v-rating
                    v-model="rating"
                    color="orange"
                    icon-label="custom icon label text {0} of {1}"
                  ></v-rating>
                  <center>
                    <div style="width: 60%; margin-top: 10px; margin-top: 7px">
                      <v-textarea
                        placeholder="Share your experience with our order services here."
                        auto-grow
                        outlined
                        rows="4"
                        row-height="30"
                        shaped
                        hide-details
                        v-model="isi"
                      ></v-textarea>
                    </div>
                  </center>
                </div>
                <v-btn
                  style="text-transform: unset !important"
                  rounded
                  outlined
                  small
                  color="indigo"
                  class="btn-form-primary mt-3"
                  :loading="loading"
                  @click="
                    submitReviewLayanan(
                      uuidTransaksiLayanan,
                      idTransaksiLayanan
                    )
                  "
                  >Send Review</v-btn
                >
              </v-form>
            </div>
            <div v-else>
              <div v-if="this.is_deal == '1' && this.is_done == '1'">
                <div v-if="this.idCustomer == this.userLogin.id">
                  <p style="color: black; margin: 0px">
                    Rate services
                    <v-btn
                      v-if="this.canEditReview == null && this.is_done == '1'"
                      @click="clickEditReview"
                      icon
                      x-small
                      style="font-size: 0.875rem"
                      color="primary"
                    >
                      <v-icon style="font-size: 0.875rem">mdi-pencil</v-icon>
                    </v-btn>
                  </p>
                </div>
                <div
                  class="div-detail-order-services"
                  v-if="this.idCustomer == this.userLogin.id"
                  disabled
                  style="
                    pointer-events: none;
                    filter: alpha(opacity=50);
                    opacity: 0.5;
                  "
                >
                  <v-form
                    class="form div-detail-order-services"
                    ref="form"
                    @submit.prevent
                  >
                    <div class="text-center">
                      <v-rating
                        v-model="rating"
                        color="orange"
                        icon-label="custom icon label text {0} of {1}"
                      ></v-rating>
                      <center>
                        <div
                          style="width: 60%; margin-top: 10px; margin-top: 7px"
                        >
                          <v-textarea
                            placeholder="Share your experience with our order services here."
                            auto-grow
                            outlined
                            rows="4"
                            row-height="30"
                            shaped
                            hide-details
                            v-model="isi"
                          ></v-textarea>
                        </div>
                      </center>
                    </div>
                    <v-btn
                      style="text-transform: unset !important"
                      rounded
                      outlined
                      small
                      color="indigo"
                      class="btn-form-primary mt-3"
                      :loading="loading"
                      @click="
                        submitReviewLayanan(
                          uuidTransaksiLayanan,
                          idTransaksiLayanan
                        )
                      "
                      >Send Review</v-btn
                    >
                  </v-form>
                </div>
              </div>
            </div>
          </center>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="closeDialogDetailServicesTransaction"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Detail Services Transaction -->

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
    // Profile
    myProfile: [],
    dialogEditProfile: false,
    image: null,
    image64FotoProfile: "",
    selectedFileProfile: null,
    persona_name: "",
    bio: "",
    age: "",
    racial: "",
    birth_date: "",
    zodiac: "",
    mbti: "",
    body_weight: "",
    body_tall: "",
    like: "",
    did_not_like: "",
    hobby: "",
    quotes: "",
    ig_acc: "",
    story_character: "",
    ProfileForm: new FormData(),
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    imageProfile: localStorage.getItem("image"),

    // NPC
    dialogConfirmDeleteNPC: false,
    dialogNPC: false,
    image_npc: "",
    npc_name: "",
    npc_profile: "",
    npc_story: "",

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

    // Merchandise
    dialogMerchandise: false,
    dialogConfirmDeleteMerchandise: false,
    nama: "",
    deskripsi: "",
    harga: "",
    stok: "",

    // Transkasi Layanan
    project_name: "",
    offering_cost: "",
    description: "",
    dialogDetailServicesTransaction: false,
    customer_name: "",
    order_number: "",
    is_deal: "",
    is_done: "",
    idTransaksiLayanan: "",
    uuidTransaksiLayanan: "",
    ReviewLayananForm: new FormData(),

    // Transkasi Layanan

    // Review Layanan
    idServiceLayanan: "",
    rating: null,
    isi: "",
    editReview: null,
    canEditReview: null,
    idCustomer: "",
    idServicer: "",

    // Comic & Sub Comic & Portfolio & Merchandise
    judul: "",
    thumbnail: "",

    // FORM NPC
    NPCForm: new FormData(),

    // Form Comic
    ComicForm: new FormData(),

    // Form Sub Comic
    SubComicForm: new FormData(),
    judulComic: "",
    selectedFileSubComic: null,

    // From Portfolio
    PortfolioForm: new FormData(),

    // Form Merchandise
    MerchandiseForm: new FormData(),
    images_merchandise_path: [],

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
      uuid: localStorage.getItem("uuid"),
      role: localStorage.getItem("role"),
      id: localStorage.getItem("id"),
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
      headersMerchandise: [],
      headersServicesTransaction: [],
      npcs: [],
      comics: [],
      subcomics: [],
      portfolios: [],
      merchandises: [],
      servicesTransactions: [],
      search_npc: "",
      search_comic: "",
      search_subcomic: "",
      search_portfolio: "",
      search_merchandise: "",
      search_servicesTransaction: "",
    },
  }),
  created() {
    this.initializeNPC();
    this.initializeComic();
    this.initializePortfolio();
    this.initializeMerchandise();
    this.initializeServicesTranscation();
    this.axioDataMyProfile();
  },
  computed: {
    getNamaPersona() {
      return localStorage.getItem("nama_persona");
    },
    getUUIDProfile() {
      return localStorage.getItem("uuid");
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    loggedIn() {
      return localStorage.getItem("token") != null;
    },

    // Validate for Profile
    isPersonaNameValid() {
      return this.persona_name.trim() !== ""; // Content is required (not empty)
    },
    isBioValid() {
      return this.bio.trim() !== ""; // Content is required (not empty)
    },
    isAgeValid() {
      const age = this.age.trim();
      return age !== "" && /^\d+$/.test(age); // Content is required (not empty) and contains only numbers
    },
    isRacialValid() {
      return this.racial.trim() !== ""; // Content is required (not empty)
    },
    isBirthDateValid() {
      return this.birth_date.trim() !== ""; // Content is required (not empty)
    },
    isZodiacValid() {
      return this.zodiac.trim() !== ""; // Content is required (not empty)
    },
    isMBTIValid() {
      return this.mbti.trim() !== ""; // Content is required (not empty)
    },
    isBodyWeightValid() {
      const body_weight = this.body_weight.trim();
      return body_weight !== "" && /^\d+$/.test(body_weight);
    },
    isBodyTallValid() {
      const body_tall = this.body_tall.trim();
      return body_tall !== "" && /^\d+$/.test(body_tall);
    },
    isLikeValid() {
      return this.like.trim() !== ""; // Content is required (not empty)
    },
    isDidNotLikeValid() {
      return this.did_not_like.trim() !== ""; // Content is required (not empty)
    },
    isHobbyValid() {
      return this.hobby.trim() !== ""; // Content is required (not empty)
    },
    isQuotesValid() {
      return this.quotes.trim() !== ""; // Content is required (not empty)
    },
    isIgAccValid() {
      // Regular expression to match a valid URL
      const urlPattern =
        /^(http|https):\/\/(www\.)?instagram\.com\/[\w-]+\/?$/i;

      // Use test method to check if input matches the URL pattern
      return urlPattern.test(this.ig_acc);
    },
    isStoryCharacterValid() {
      return this.story_character.trim() !== ""; // Content is required (not empty)
    },
    isFileProfileSelected() {
      return this.selectedFileProfile !== null; // File is required (not null)
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
      return this.selectedFileSubComic !== null; // File is required (not null)
    },

    // Validation for Merchandise
    isMerchandiseProductTitleValid() {
      return this.nama.trim() !== ""; // Content is required (not empty)
    },
    isMerchandiseDescriptionValid() {
      return this.deskripsi.trim() !== ""; // Content is required (not empty)
    },
    isMerchandisePriceValid() {
      const harga = this.harga.trim();
      return harga !== "" && /^(\d+|\d+\.\d*|\d+,\d*)$/.test(harga);
    },
    isMerchandiseStockValid() {
      const stok = this.stok.trim();
      return stok !== "" && /^\d+$/.test(stok); // Content is required (not empty) and contains only numbers
    },
    isFileSelectedImagesMerchandise() {
      console.log(this.images_merchandise_path);
      return (
        this.images_merchandise_path !== null &&
        this.images_merchandise_path.length > 0
      );
    },

    // Validator for File required
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
    // Review Layanan\
    closeDialogDetailServicesTransaction() {
      this.dialogDetailServicesTransaction = false;
      this.editReview = 0;
      this.canEditReview = 0;
    },

    clickEditReview() {
      this.editReview = 1;
    },

    axioGetDataServiceReview(id) {
      this.loadingScreen = true;
      var url;

      url = this.$api + "/get-reviewLayanan/" + id;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.dataServiceReview = response.data.data;

          if (this.dataServiceReview != null) {
            this.rating = this.dataServiceReview.rating;
            this.isi = this.dataServiceReview.isi;
            this.canEditReview = this.dataServiceReview.rating;
          } else if (this.dataServiceReview == null) {
            this.rating = null;
            this.isi = "";
            this.canEditReview = null;
          }

          console.log(
            this.dataServiceReview,
            this.canEditReview,
            "tes canedit review"
          );

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

    submitReviewLayanan(uuidTransaksiLayanan, idTransaksiLayanan) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };

        this.ReviewLayananForm = new FormData();

        this.ReviewLayananForm.append("rating", this.rating);
        this.ReviewLayananForm.append("isi", this.isi);

        this.loadingScreen = true;

        var url =
          this.$api +
          "/create-reviewLayanan/" +
          uuidTransaksiLayanan +
          "/" +
          idTransaksiLayanan;

        this.$http
          .post(url, this.ReviewLayananForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.canEditReview = 1;
            this.editReview = null;

            this.textMessage = "Succes added review service transaction";
            this.snackbar = true;
            this.color = "green";

            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          })
          .catch((error) => {
            console.log(error);

            this.snackbar = true;
            this.textMessage = "Unsucces added review service transaction";
            this.color = "secondary";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          });
      }
    },
    // End Review Layanan

    // Services Transaction
    takeOrder(uuidTransaction) {
      this.loadingScreen = true;
      var url;

      url = this.$api + "/takeOrder/" + uuidTransaction;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;

          this.is_deal = 1;
          this.initializeServicesTranscation();

          this.textMessage = "Order taken successfully";
          this.snackbar = true;
          this.color = "green";

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error taking order", error);
          this.loadingScreen = false;
        });
    },

    doneOrder(uuidTransaction) {
      this.loadingScreen = true;
      var url;

      url = this.$api + "/doneOrder/" + uuidTransaction;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;

          this.is_done = 1;
          this.initializeServicesTranscation();

          this.textMessage = "Order marked as done";
          this.snackbar = true;
          this.color = "green";

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error taking order", error);
          this.loadingScreen = false;
        });
    },

    detailHandlerServicesTransaction(item) {
      this.dialogDetailServicesTransaction = true;
      this.uuidTransaksiLayanan = item.uuid;
      this.idTransaksiLayanan = item.id;
      this.project_name = item.project_name;
      this.customer_name = item.customer_name;
      this.order_number = item.uuid;
      this.is_deal = item.is_deal;
      this.is_done = item.is_done;
      this.offering_cost = item.offering_cost;
      this.description = item.description;
      this.idCustomer = item.user_id_customer;
      this.idServicer = item.user_id_servicer;

      // Review
      this.axioGetDataServiceReview(item.id);
    },

    axioDataServicesTransaction() {
      this.loadingScreen = true;
      var url;

      if (this.userLogin.role == "admin") {
        url = this.$api + "/show-all-transkasiLayanan";
      } else {
        url = this.$api + "/show-transkasiLayanan/" + this.userLogin.id;
      }

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.list.servicesTransactions = response.data.data.map((x) => {
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
          console.error("Error fetching myprofile data:", error);
          this.loadingScreen = false;
        });
    },

    initializeServicesTranscation() {
      this.list.headersServicesTransaction = [
        {
          text: "Number",
          value: "no",
          filterable: false,
          width: "10%",
          align: "center",
          sortable: false,
        },
        {
          text: "Project Name",
          value: "project_name",
          align: "center",
          sortable: false,
        },
        {
          text: "Offering Cost",
          value: "offering_cost",
          align: "center",
          sortable: false,
        },
        {
          text: "Description",
          value: "description",
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
        {
          text: "Status",
          value: "is_deal",
          filterable: false,
          align: "center",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          sortable: false,
          width: "10%",
        },
      ];
      this.axioDataServicesTransaction();
    },
    // End for Services Transaction

    // For Profile
    allowedDates: (val) => parseInt(val.split("-")[2], 10) % 2 === 0,

    uppercaseProfile() {
      const words = this.persona_name.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
      this.persona_name = words.join(" ");
    },

    editHandlerProfile() {
      this.clearForm();
      this.axioDataMyProfile();
      if (this.myProfile.umur != null) {
        this.dialogEditProfile = true;
        this.image = this.myProfile.image;
        this.selectedFileProfile = this.myProfile.image;
        this.persona_name = this.myProfile.nama_persona;
        this.bio = this.myProfile.bio;
        this.age = this.myProfile.umur;
        this.racial = this.myProfile.ras;
        this.birth_date = this.myProfile.tanggal_lahir;
        this.zodiac = this.myProfile.zodiak;
        this.mbti = this.myProfile.MBTI;
        this.body_weight = this.myProfile.berat_badan;
        this.body_tall = this.myProfile.tinggi_badan;
        this.like = this.myProfile.like;
        this.did_not_like = this.myProfile.did_not_like;
        this.hobby = this.myProfile.hobi;
        this.quotes = this.myProfile.quotes;
        this.ig_acc = this.myProfile.ig_acc;
        this.story_character = this.myProfile.story_character;
      } else {
        this.dialogEditProfile = true;
        this.persona_name = this.myProfile.nama_persona;
      }

      console.log(
        this.myProfile.nama_persona,
        "editprofile",
        this.myProfile.image,
        "haha",
        this.myProfile.image
      );
    },

    handleFileChangeProfile(event) {
      // Update the selectedFile data property when a file is selected
      this.selectedFileProfile = event.target.files[0];
    },

    onFotoChangeProfile(e) {
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
        let fotoDataProfile = new FileReader();

        fotoDataProfile.onloadend = () => {
          this.image64FotoProfile = fotoDataProfile.result;
          this.fotoError = false;
        };

        fotoDataProfile.readAsDataURL(file);
      }
    },

    submitUpdateProfile(uuid) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };

        var inputFoto = document.getElementById("file-foto-profile"),
          dataFileFoto = inputFoto.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"

        localStorage.removeItem("image");
        localStorage.removeItem("nama_persona");

        this.ProfileForm = new FormData();

        this.ProfileForm.append("nama_persona", this.persona_name);
        this.ProfileForm.append("bio", this.bio);
        this.ProfileForm.append("umur", this.age);
        this.ProfileForm.append("ras", this.racial);
        this.ProfileForm.append("tanggal_lahir", this.birth_date);
        this.ProfileForm.append("zodiak", this.zodiac);
        this.ProfileForm.append("MBTI", this.mbti);
        this.ProfileForm.append("berat_badan", this.body_weight);
        this.ProfileForm.append("tinggi_badan", this.body_tall);
        this.ProfileForm.append("like", this.like);
        this.ProfileForm.append("did_not_like", this.did_not_like);
        this.ProfileForm.append("hobi", this.hobby);
        this.ProfileForm.append("quotes", this.quotes);
        this.ProfileForm.append("ig_acc", this.ig_acc);
        this.ProfileForm.append("story_character", this.story_character);

        if (dataFileFoto) {
          this.ProfileForm.append("image", dataFileFoto);
        }

        this.loadingScreen = true;

        var urlAddProfile = this.$api + "/update-user/" + uuid;

        this.$http
          .post(urlAddProfile, this.ProfileForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            this.myProfile = response.data.myProfile;
            console.log(this.error_message);

            document.getElementById("file-foto-profile").value = "";
            this.image64FotoProfile = null;

            this.dialogEditProfile = false;

            this.textMessage = "Profile Succesfully Updated";
            this.snackbar = true;
            this.color = "green";

            localStorage.setItem("nama_persona", this.myProfile.nama_persona);
            localStorage.setItem("image", this.myProfile.image);

            this.reloadPage();

            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          })
          .catch((error) => {
            console.log(error);

            this.snackbar = true;
            this.textMessage = "Profile Unsuccesfully Updated";
            this.color = "secondary";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          });
      }
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
          this.image = response.data.myProfile.image;

          console.log(
            response.data.myProfile,
            "myProfile",
            response.data.myProfile.image,
            this.image
          );

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
    // End For Profile

    // For Merchandise
    // For Uppercase Form
    uppercaseMerchandise() {
      const words = this.nama.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
      this.nama = words.join(" ");
    },

    editHandlerMerchandise(item) {
      this.clearForm();
      this.dialogMerchandise = true;
      this.inputType = "UpdateMerchandise";
      this.editUuidMerchandise = item.uuid;
      this.thumbnail = item.thumbnail;
      this.nama = item.nama;
      this.deskripsi = item.deskripsi;
      this.harga = item.harga;
      this.stok = item.stok;
      this.selectedFile = item.thumbnail;
    },

    deleteHandlerMerchandise(item) {
      this.deleteUuidMerchandise = item.uuid;
      this.dialogConfirmDeleteMerchandise = true;
      this.nama = item.nama;
    },

    addHandlerMerchandise() {
      this.clearForm();
      this.inputType = "AddMerchandise";
      this.dialogMerchandise = true;
    },

    deleteDataMerchandise() {
      this.loadingScreen = true;
      let uuid = this.deleteUuidMerchandise;
      var url = this.$api + "/delete-merchandise/" + uuid;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDeleteMerchandise = false;
          this.textMessage = "Merchandise Succesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          this.axioDataMerchandise();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.textMessage = "Merchandise Unsuccesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteMerchandise = false;
        });
    },

    initializeMerchandise() {
      this.list.headersMerchandise = [
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
          text: "Product Name",
          value: "nama",
          align: "center",
          sortable: false,
        },
        {
          text: "Price",
          value: "harga",
          align: "center",
          filterable: false,
        },
        {
          text: "Stock",
          value: "stok",
          align: "center",
          filterable: false,
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
      this.axioDataMerchandise();
    },

    axioDataMerchandise() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-merchandise";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.list.merchandises = response.data.data.map((x) => {
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

    submitMerchandise(val) {
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };
        let uuid = this.editUuidMerchandise;

        var inputFoto = document.getElementById("file-foto"),
          dataFileFoto = inputFoto.files[0];
        // Setelah form dikirim, kosongkan input file dengan ID "file-foto"

        var inputImagesMerchandisePath = document.getElementById(
          "images_merchandise_path"
        );
        var dataFileImagesMerchandisePath = inputImagesMerchandisePath.files;

        this.MerchandiseForm = new FormData();

        this.MerchandiseForm.append("nama", this.nama);
        this.MerchandiseForm.append("deskripsi", this.deskripsi);
        this.MerchandiseForm.append("stok", this.stok);
        this.MerchandiseForm.append("harga", this.harga);

        this.loadingScreen = true;

        if (val == "AddMerchandise") {
          var urlAddMerchandise = this.$api + "/create-merchandise";

          if (dataFileFoto) {
            this.MerchandiseForm.append("thumbnail", dataFileFoto);
          }

          if (dataFileImagesMerchandisePath.length > 0) {
            // Iterate through selected files and append them to the FormData
            for (let i = 0; i < dataFileImagesMerchandisePath.length; i++) {
              this.MerchandiseForm.append(
                "images_merchandise_path[]",
                dataFileImagesMerchandisePath[i]
              );
            }
          }

          this.$http
            .post(urlAddMerchandise, this.MerchandiseForm, { headers: headers })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              document.getElementById("file-foto").value = "";

              this.dialogMerchandise = false;
              this.axioDataMerchandise();

              this.textMessage = "Merchandise Succesfully Created";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Merchandise Unsuccesfully Created";
              this.color = "secondary";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            });
        } else {
          var urlEditMerchandise = this.$api + "/update-merchandise/" + uuid;
          if (dataFileFoto) {
            this.MerchandiseForm.append("thumbnail", dataFileFoto);
          }

          this.$http
            .post(urlEditMerchandise, this.MerchandiseForm, {
              headers: headers,
            })
            .then((response) => {
              this.error_message = response.data.message;
              console.log(this.error_message);

              document.getElementById("file-foto").value = "";

              this.dialogMerchandise = false;
              this.axioDataMerchandise();

              this.textMessage = "Merchandise Succesfully Updated";
              this.snackbar = true;
              this.color = "green";
              setTimeout(() => {
                this.loadingScreen = false;
              }, 300);
            })
            .catch((error) => {
              console.log(error);

              this.snackbar = true;
              this.textMessage = "Merchandise Unsuccesfully Updated";
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

    // End For Merchandise

    // For Portfolio
    editHandlerPortfolio(item) {
      this.clearForm();
      this.dialogPortfolio = true;
      this.inputType = "UpdatePortfolio";
      this.editUuidPortfolio = item.uuid;
      this.thumbnail = item.thumbnail;
      this.selectedFile = item.thumbnail;
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
          align: "center",
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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

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

              document.getElementById("file-foto").value = "";

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
          text: "Sub Comic Title",
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

        var inputContentComic = document.getElementById("file-foto-content"),
          dataFileContentComic = inputContentComic.files[0];

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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto-content").value = "";

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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto-content").value = "";

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
          text: "Comic Title",
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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

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

              // Setelah form dikirim, kosongkan input file dengan ID "file-foto"
              document.getElementById("file-foto").value = "";

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

    // Reload Page
    reloadPage() {
      window.location.reload();
    },

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

      // Merchandise
      this.nama = "";
      this.deskripsi = "";
      this.harga = "";
      this.stok = "";
      this.images_merchandise_path = [];

      // Addons
      this.image64Foto = "";
      this.fotoError = false;
      this.selectedFile = null; // Store the selected file
    },

    // For changing the format of currency
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
          localStorage.removeItem("uuid");
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

.style-transaksi-layanan-1 {
  justify-content: end;
  display: grid;
}

.style-transaksi-layanan-2 {
  justify-content: start;
  display: grid;
}

@media only screen and (min-width: 601px) {
  .conatiner-size-my-profile {
    width: 80%;
  }

  .style-transaksi-layanan-1 {
    justify-content: none;
    display: grid;
  }

  .style-transaksi-layanan-2 {
    justify-content: none;
    display: grid;
  }
}

@media only screen and (max-width: 600px) {
  .div-detail-order-services {
    width: 80% !important;
  }

  .style-transaksi-layanan-1 {
    justify-content: none;
    display: block;
  }

  .style-transaksi-layanan-2 {
    justify-content: none;
    display: block;
  }
  .conatiner-size-my-profile {
    width: 100%;
  }
}
</style>
