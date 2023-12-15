<template>
  <div>
    <loading-screen :value="loadingScreen"></loading-screen>
    <div>
      <div class="container">
        <div class="row">
          <b-tabs content-class="mt-5 pa-0" align="center">
            <!-- Forum Tab -->
            <b-tab title="Forum" class="cta hover-underline-animation" active>
              <center>
                <div class="text-box-school">
                  <div class="box-container">
                    <h6
                      style="
                        font-family: 'Georgia';
                        padding-bottom: 0px;
                        margin: 10px;
                      "
                    >
                      Create Forum
                    </h6>
                    <v-form
                      class="form"
                      ref="form"
                      @submit.prevent
                      style="max-width: none !important"
                    >
                      <div>
                        <div class="d-flex flex-row align-items-start">
                          <img
                            class="rounded-circle mx-3"
                            src="https://i.imgur.com/RpzrMR2.jpg"
                            width="40"
                          />
                          <v-textarea
                            filled
                            auto-grow
                            label="Have a questions?"
                            rows="4"
                            row-height="30"
                            v-model="isi"
                            style="margin: 0px; padding: 0px; width: 100%"
                            hide-details="true"
                          ></v-textarea>
                        </div>
                        <div class="mt-2 text-right"></div>
                      </div>

                      <center>
                        <label for="file-upload" style="font-size: 12px"
                          ><v-icon small style="margin-right: 4px"
                            >fas fa-images</v-icon
                          >Add Images</label
                        >
                        <input
                          type="file"
                          id="file-upload"
                          ref="fileFoto"
                          accept="image/*"
                          multiple
                          @change="handleFileUpload"
                        />
                        <div
                          class="image-container"
                          style="justify-content: center"
                        >
                          <div
                            v-for="(image, index) in images"
                            :key="index"
                            class="image-item"
                          >
                            <img
                              :src="image.previewUrl"
                              alt="Preview"
                              class="profile-pic"
                              @click="showImage(index)"
                            />
                            <button
                              class="remove-button"
                              @click="removeImage(index)"
                              style="
                                width: 20px;
                                height: 20px;
                                display: grid;
                                align-content: center;
                                place-content: center;
                                align-items: center;
                              "
                            >
                              x
                            </button>
                          </div>
                        </div>
                        <div
                          v-if="showModal"
                          class="modal"
                          @click.self="closeModal"
                        >
                          <div class="modal-content">
                            <span class="close" @click="closeModal"
                              >&times;</span
                            >
                            <img
                              :src="selectedImage.previewUrl"
                              alt="Preview"
                              class="modal-image"
                            />
                          </div>
                        </div>
                      </center>

                      <div>
                        <div
                          class="formatting"
                          style="display: block !important"
                        >
                          <div v-if="isIsiValid">
                            <v-btn
                              class="mx-2"
                              fab
                              dark
                              color="primary"
                              @click="
                                inputType == 'addForum'
                                  ? submitForum('AddForum')
                                  : submitForum('UpdateForum')
                              "
                              style="margin-top: 10px; margin-right: 10px"
                            >
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                height="18"
                                width="18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linejoin="round"
                                  stroke-linecap="round"
                                  stroke-width="2.5"
                                  stroke="#ffffff"
                                  d="M12 5L12 20"
                                ></path>
                                <path
                                  stroke-linejoin="round"
                                  stroke-linecap="round"
                                  stroke-width="2.5"
                                  stroke="#ffffff"
                                  d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                                ></path>
                              </svg>
                            </v-btn>
                          </div>
                          <div v-else>
                            <v-btn
                              class="mx-2"
                              fab
                              disabled
                              @click="
                                inputType == 'addForum'
                                  ? submitForum('AddForum')
                                  : submitForum('UpdateForum')
                              "
                              style="margin-top: 10px; margin-right: 10px"
                            >
                              <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                height="18"
                                width="18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linejoin="round"
                                  stroke-linecap="round"
                                  stroke-width="2.5"
                                  stroke="#ffffff"
                                  d="M12 5L12 20"
                                ></path>
                                <path
                                  stroke-linejoin="round"
                                  stroke-linecap="round"
                                  stroke-width="2.5"
                                  stroke="#ffffff"
                                  d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                                ></path>
                              </svg>
                            </v-btn>
                          </div>
                        </div>
                      </div>
                    </v-form>
                  </div>
                </div>
              </center>

              <v-divider></v-divider>

              <b-container fluid class="p-4 bg-transparent">
                <center>
                  <div
                    class="card-school mt-5"
                    v-for="(dataForum, index) in dataForums"
                    :key="dataForum.id"
                  >
                    <div>
                      <div class="comment-container-school">
                        <div class="user">
                          <div class="user-pic">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linejoin="round"
                                fill="#707277"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="#707277"
                                d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                              ></path>
                              <path
                                stroke-width="2"
                                fill="#707277"
                                stroke="#707277"
                                d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                              ></path>
                            </svg>
                          </div>
                          <div class="user-info">
                            <span
                              style="
                                padding: 0px;
                                margin: 0px;
                                text-transform: capitalize;
                              "
                              >{{ dataForum.post_by }}</span
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
                                  {{ dataForum.created_at }}
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
                              >
                                <!-- <a
                                @click="editHandlerForum(dataForum)"
                                style="
                                  color: #4898ff;
                                  font-weight: 600;
                                  font-size: 10px;
                                  margin-left: 10px;
                                "
                                >Edit</a
                              > -->
                              </div>
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
                                  @click="deleteHandlerComic(dataForum)"
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
                        <!-- <div v-html="dataForum.isi"></div> -->
                        <div
                          style="font-style: none; !important align-items: none;"
                          v-html="convertLinks(dataForum.isi)"
                        ></div>
                        <template>
                          <center>
                            <v-row v-if="dataImagesForums[index]">
                              <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                              <v-col
                                v-for="dataImagesForum in dataImagesForums"
                                :key="dataImagesForum.id"
                                v-if="dataForum.id == dataImagesForum.forum_id"
                                class="d-flex child-flex"
                                cols="4"
                              >
                                <v-img
                                  style="cursor: zoom-in"
                                  :src="
                                    $baseUrl +
                                    '/storage/' +
                                    dataImagesForum.images_forum_path
                                  "
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  @click="
                                    zoom(
                                      $baseUrl +
                                        '/storage/' +
                                        dataImagesForum.images_forum_path
                                    )
                                  "
                                >
                                </v-img>
                              </v-col>
                            </v-row>
                          </center>
                        </template>
                      </div>

                      <hr
                        class="rounded"
                        style="width: 90%; padding: 0px; margin: 0px"
                      />

                      <div class="row">
                        <v-btn
                          @click="
                            detailForumHandler(dataForum, dataImagesForums)
                          "
                          v-ripple="false"
                          dense
                          text
                          plain
                          color="primary"
                          style="
                            justify-content: start;
                            text-transform: capitalize !important;
                            width: 20px;
                            margin-left: 20px;
                            font-size: 13px;
                          "
                        >
                          <v-icon small style="margin-right: 4px"
                            >fas fa-info</v-icon
                          >
                          Detail Question
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </center>
              </b-container>
            </b-tab>
            <!-- End Forum Tab -->

            <!-- Announcement Tab -->
            <b-tab title="Announcement" class="cta hover-underline-animation">
              <b-container fluid class="p-4 bg-transparent" style="padding-top: 8px !important; padding-left: 12px !important; padding-right: 12px !important;">
                <center>
                  <div
                    v-if="userLogin.role == 'admin' || userLogin.role == 'osis'"
                    class="text-box-school"
                  >
                    <div class="box-container">
                      <h6
                        style="
                          font-family: 'Georgia';
                          padding-bottom: 0px;
                          margin: 10px;
                        "
                      >
                        Create Announcement
                      </h6>
                      <v-form
                        class="form"
                        ref="form"
                        @submit.prevent
                        style="max-width: none !important"
                      >
                        <div>
                          <div class="d-flex flex-row align-items-start">
                            <img
                              class="rounded-circle mx-3"
                              src="https://i.imgur.com/RpzrMR2.jpg"
                              width="40"
                            />
                            <v-textarea
                              filled
                              auto-grow
                              label="Have a questions?"
                              rows="4"
                              row-height="30"
                              v-model="isi"
                              style="margin: 0px; padding: 0px; width: 100%"
                              hide-details="true"
                            ></v-textarea>
                          </div>
                          <div class="mt-2 text-right"></div>
                        </div>

                        <center>
                          <label
                            for="file-upload-announcement"
                            style="font-size: 12px"
                            ><v-icon small style="margin-right: 4px"
                              >fas fa-images</v-icon
                            >Add Images</label
                          >
                          <input
                            type="file"
                            id="file-upload-announcement"
                            ref="fileFotoAnnouncement"
                            accept="image/*"
                            multiple
                            @change="handleFileUploadAnnouncement"
                          />
                          <div
                            class="image-container"
                            style="justify-content: center"
                          >
                            <div
                              v-for="(image, index) in imagesAnnouncement"
                              :key="index"
                              class="image-item"
                            >
                              <img
                                :src="image.previewUrl"
                                alt="Preview"
                                class="profile-pic"
                                @click="showImageAnnouncement(index)"
                              />
                              <button
                                class="remove-button"
                                @click="removeImageAnnouncement(index)"
                                style="
                                  width: 30%;
                                  height: 30%;
                                  justify-content: center;
                                  display: grid;
                                  align-content: center;
                                "
                              >
                                x
                              </button>
                            </div>
                          </div>
                          <div
                            v-if="showModal"
                            class="modal"
                            @click.self="closeModal"
                          >
                            <div class="modal-content">
                              <span class="close" @click="closeModal"
                                >&times;</span
                              >
                              <img
                                :src="selectedImage.previewUrl"
                                alt="Preview"
                                class="modal-image"
                              />
                            </div>
                          </div>
                        </center>

                        <div>
                          <div
                            class="formatting"
                            style="display: block !important"
                          >
                            <div v-if="isIsiValid">
                              <v-btn
                                class="mx-2"
                                fab
                                dark
                                color="primary"
                                @click="
                                  inputType == 'addForum'
                                    ? submitAnnouncement('AddAnnouncement')
                                    : submitAnnouncement('UpdateAnnouncement')
                                "
                                style="margin-top: 10px; margin-right: 10px"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  height="18"
                                  width="18"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="2.5"
                                    stroke="#ffffff"
                                    d="M12 5L12 20"
                                  ></path>
                                  <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="2.5"
                                    stroke="#ffffff"
                                    d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                                  ></path>
                                </svg>
                              </v-btn>
                            </div>
                            <div v-else>
                              <v-btn
                                class="mx-2"
                                fab
                                disabled
                                @click="
                                  inputType == 'addForum'
                                    ? submitAnnouncement('AddAnnouncement')
                                    : submitAnnouncement('UpdateAnnouncement')
                                "
                                style="margin-top: 10px; margin-right: 10px"
                              >
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  height="18"
                                  width="18"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="2.5"
                                    stroke="#ffffff"
                                    d="M12 5L12 20"
                                  ></path>
                                  <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="2.5"
                                    stroke="#ffffff"
                                    d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                                  ></path>
                                </svg>
                              </v-btn>
                            </div>
                          </div>
                        </div>
                      </v-form>
                    </div>
                  </div>

                  <b-container fluid class="p-4 bg-transparent">
                <center>
                  <div
                    class="card-school mt-5"
                    v-for="(dataAnnouncement, index) in dataAnnouncements"
                    :key="dataAnnouncement.id"
                  >
                    <div>
                      <div class="comment-container-school">
                        <div class="user">
                          <div class="user-pic">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              height="20"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linejoin="round"
                                fill="#707277"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="#707277"
                                d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                              ></path>
                              <path
                                stroke-width="2"
                                fill="#707277"
                                stroke="#707277"
                                d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                              ></path>
                            </svg>
                          </div>
                          <div class="user-info">
                            <span
                              style="
                                padding: 0px;
                                margin: 0px;
                                text-transform: capitalize;
                              "
                              >{{ dataAnnouncement.post_by }}</span
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
                                  {{ dataAnnouncement.created_at }}
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
                              >
                                <!-- <a
                                @click="editHandlerForum(dataForum)"
                                style="
                                  color: #4898ff;
                                  font-weight: 600;
                                  font-size: 10px;
                                  margin-left: 10px;
                                "
                                >Edit</a
                              > -->
                              </div>
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
                                  @click="deleteHandlerComic(dataAnnouncement)"
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
                        <!-- <div v-html="dataForum.isi"></div> -->
                        <div
                          style="font-style: none; !important align-items: none;"
                          v-html="convertLinks(dataAnnouncement.isi)"
                        ></div>
                        <template>
                          <center>
                            <v-row v-if="dataImagesAnnouncements[index]">
                              <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                              <v-col
                                v-for="dataImagesAnnouncement in dataImagesAnnouncements"
                                :key="dataImagesAnnouncement.id"
                                v-if="dataAnnouncement.id == dataImagesAnnouncement.announcement_id"
                                class="d-flex child-flex"
                                cols="4"
                              >
                                <v-img
                                  style="cursor: zoom-in"
                                  :src="
                                    $baseUrl +
                                    '/storage/' +
                                    dataImagesAnnouncement.images_announcement_path
                                  "
                                  aspect-ratio="1"
                                  class="grey lighten-2"
                                  @click="
                                    zoom(
                                      $baseUrl +
                                        '/storage/' +
                                        dataImagesAnnouncement.images_announcement_path
                                    )
                                  "
                                >
                                </v-img>
                              </v-col>
                            </v-row>
                          </center>
                        </template>
                      </div>

                      <hr
                        class="rounded"
                        style="width: 90%; padding: 0px; margin: 0px"
                      />

                    </div>
                  </div>
                </center>
              </b-container>


                </center>
              </b-container>
            </b-tab>
            <!-- End Announcement Tab -->
          </b-tabs>
        </div>
      </div>
    </div>

    <!-- Dialog Detail Forum -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogDetailForum"
      persistent
    >
      <v-card
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <b-container fluid class="bg-transparent">
          <v-card-actions style="max-height: none">
            <a class="btn-close small" @click="handlerCloseDialogForum"> </a>
          </v-card-actions>
          <center>
            <div
              class="card-school"
              v-for="(dataForum, index) in dataForums"
              :key="dataForum.id"
              style="width: 100%"
            >
              <div v-if="dataImagesForums[index]">
                <div
                  class="comment-container-school"
                  style="padding-bottom: 0px"
                  v-if="dataForum.id == idForum"
                >
                  <h3
                    class="f-24 f-md-20 f-secondary text-center"
                    style="
                      margin-bottom: 50px;
                      padding-top: 30px;
                      font-family: 'Georgia';
                      font-weight: bold;
                    "
                  >
                    Detail Forum
                  </h3>
                  <div class="user">
                    <div class="user-pic">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linejoin="round"
                          fill="#707277"
                          stroke-linecap="round"
                          stroke-width="2"
                          stroke="#707277"
                          d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                        ></path>
                        <path
                          stroke-width="2"
                          fill="#707277"
                          stroke="#707277"
                          d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                        ></path>
                      </svg>
                    </div>
                    <div class="user-info">
                      <span
                        style="
                          padding: 0px;
                          margin: 0px;
                          text-transform: capitalize;
                        "
                        >{{ dataForum.post_by }}</span
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
                            {{ dataForum.created_at }}
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
                        >
                          <!-- <a
                                @click="editHandlerForum(dataForum)"
                                style="
                                  color: #4898ff;
                                  font-weight: 600;
                                  font-size: 10px;
                                  margin-left: 10px;
                                "
                                >Edit</a
                              > -->
                        </div>
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
                            @click="deleteHandlerComic(dataForum)"
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
                  <!-- <div v-html="dataForum.isi"></div> -->
                  <div>{{ isiDataForum }}</div>
                  <template>
                    <center>
                      <v-row>
                        <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                        <v-col
                          v-for="dataImagesForum in dataImagesForums"
                          :key="dataImagesForum.id"
                          v-if="dataForum.id == dataImagesForum.forum_id"
                          class="d-flex child-flex"
                          cols="4"
                        >
                          <v-img
                            style="cursor: zoom-in"
                            :src="
                              $baseUrl +
                              '/storage/' +
                              dataImagesForum.images_forum_path
                            "
                            aspect-ratio="1"
                            class="grey lighten-2"
                            @click="
                              zoom(
                                $baseUrl +
                                  '/storage/' +
                                  dataImagesForum.images_forum_path
                              )
                            "
                          >
                          </v-img>
                        </v-col>
                      </v-row>
                    </center>
                  </template>
                  <hr />
                </div>

                <div
                  class="row"
                  style="margin: 0px"
                  v-if="dataForum.id == idForum"
                >
                  <v-btn
                    @click="commentForumButton(dataForum.id)"
                    v-ripple="false"
                    dense
                    text
                    plain
                    color="primary"
                    style="
                      justify-content: start;
                      text-transform: none !important;
                      width: 20px;
                      margin-left: 20px;
                      font-size: 13px;
                    "
                  >
                    <v-icon small style="margin-right: 4px"
                      >fas fa-comment-dots</v-icon
                    >
                    Leave an Answer
                  </v-btn>
                </div>

                <div v-if="comment_forum == dataForum.id" class="p-3">
                  <v-expand-transition>
                    <div>
                      <div class="d-flex flex-row align-items-start mb-2">
                        <img
                          class="rounded-circle mx-3"
                          src="https://i.imgur.com/RpzrMR2.jpg"
                          width="40"
                        /><v-textarea
                          filled
                          auto-grow
                          label="Have a questions?"
                          rows="4"
                          row-height="30"
                          v-model="isiKomen"
                          style="margin: 0px; padding: 0px; width: 100%"
                          hide-details="true"
                        ></v-textarea>
                      </div>

                      <center>
                        <label for="file-upload-komen" style="font-size: 12px"
                          ><v-icon small style="margin-right: 4px"
                            >fas fa-images</v-icon
                          >Add Images</label
                        >
                        <input
                          type="file"
                          id="file-upload-komen"
                          ref="fileFotoKomen"
                          accept="image/*"
                          multiple
                          @change="handleFileUploadKomen"
                        />
                        <div
                          class="image-container"
                          style="justify-content: center"
                        >
                          <div
                            v-for="(image, index) in imagesKomen"
                            :key="index"
                            class="image-item"
                          >
                            <img
                              :src="image.previewUrl"
                              alt="Preview"
                              class="profile-pic"
                              @click="showImageKomen(index)"
                            />
                            <button
                              class="remove-button"
                              @click="removeImageKomen(index)"
                              style="
                                width: 30%;
                                height: 30%;
                                justify-content: center;
                                display: grid;
                                align-content: center;
                              "
                            >
                              x
                            </button>
                          </div>
                        </div>
                        <div
                          v-if="showModal"
                          class="modal"
                          @click.self="closeModal"
                        >
                          <div class="modal-content">
                            <span class="close" @click="closeModal"
                              >&times;</span
                            >
                            <img
                              :src="selectedImage.previewUrl"
                              alt="Preview"
                              class="modal-image"
                            />
                          </div>
                        </div>
                      </center>
                      <div class="mt-2 text-right">
                        <v-btn
                          @click="
                            inputType == 'addForum'
                              ? submitKomenForum('AddKomenForum', dataForum.id)
                              : submitKomenForum('UpdateKomenForum')
                          "
                          class="button-login-register primary"
                          style="text-transform: unset !important"
                          type="button"
                          :loading="loading"
                        >
                          Post Answer
                        </v-btn>
                      </div>
                    </div>
                  </v-expand-transition>
                </div>
              </div>
            </div>

            <p
              style="
                margin-top: 16px;
                margin-bottom: 10px;
                font-family: 'Georgia';
              "
            >
              Answers
            </p>

            <center>
              <div
                v-for="dataKomenForum in dataKomenForums"
                :key="dataKomenForum.id"
                v-if="dataKomenForum.forum_id == idForum"
                class="card-school mt-5"
              >
                <div style="padding: 20px">
                  <div>
                    <p>There are no comments</p>
                  </div>
                  <div class="comment-react"></div>
                  <div class="comment-container-school">
                    <div class="user">
                      <div class="user-pic">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linejoin="round"
                            fill="#707277"
                            stroke-linecap="round"
                            stroke-width="2"
                            stroke="#707277"
                            d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                          ></path>
                          <path
                            stroke-width="2"
                            fill="#707277"
                            stroke="#707277"
                            d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                          ></path>
                        </svg>
                      </div>
                      <div class="user-info">
                        <span>{{ dataKomenForum.komen_by }}</span>
                        <p>{{ dataKomenForum.created_at }}</p>
                      </div>
                    </div>
                    <p class="comment-content">
                      {{ dataKomenForum.isi }}
                    </p>
                  </div>
                  <center>
                    <v-row>
                      <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
                      <v-col
                        v-for="dataImagesKomenForum in dataImagesKomenForums"
                        :key="dataImagesKomenForum.id"
                        v-if="
                          dataKomenForum.id ==
                          dataImagesKomenForum.komenForum_id
                        "
                        class="d-flex child-flex"
                        cols="4"
                      >
                        <v-img
                          style="cursor: zoom-in"
                          :src="
                            $baseUrl +
                            '/storage/' +
                            dataImagesKomenForum.images_komenForum_path
                          "
                          aspect-ratio="1"
                          class="grey lighten-2"
                          @click="
                            zoom(
                              $baseUrl +
                                '/storage/' +
                                dataImagesKomenForum.images_komenForum_path
                            )
                          "
                        >
                        </v-img>
                      </v-col>
                    </v-row>
                  </center>
                </div>
              </div>
            </center>
          </center>
          <v-card-actions style="max-height: none">
            <a
              class="btn-close small"
              @click="dialogDetailForum = false"
              style="visibility: hidden"
            >
            </a>
          </v-card-actions>
        </b-container>
      </v-card>
    </v-dialog>
    <!-- End Dialog Detail Forum -->

    <!-- Dialog Edit Forum -->
    <!-- <v-dialog
      transition="dialog-top-transition"
      max-width="1000px"
      v-model="dialogForum"
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
          {{ "Edit Portfolio" }}
        </h3>
        <v-form
          ref="form"
          class="w-full"
          @submit.prevent="submitForum('editPortfolio')"
        >
          <div class="m-3">
            <v-textarea
              filled
              auto-grow
              label="Have a questions?"
              rows="4"
              row-height="30"
              v-model="isi"
              style="margin: 0px; padding: 0px"
              hide-details="true"
            ></v-textarea>
          </div>
        </v-form>

        <v-card-actions class="justify-end mt-5">
          <div>
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              disabled
              color="indigo"
              class="btn-form-primary m-t-35"
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
          <div>
            <v-btn
              style="text-transform: unset !important"
              rounded
              outlined
              color="indigo"
              class="m-t-35"
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
            @click="dialogForum = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- End Dialog Edit Forum -->

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
    <!-- End Snackbar -->

    <!-- Dialog Zooom Image -->
    <v-dialog v-model="dialogZoom" width="900" style="max-height: none">
      <v-card style="max-height: none">
        <v-card-actions style="max-height: none">
          <a class="btn-close" @click="dialogZoom = false"> </a>
        </v-card-actions>

        <v-card-text class="m-0" style="max-height: none">
          <img
            style="width: 100%"
            :src="getImage"
            class="img-zoom-full of-cover"
          />
        </v-card-text> </v-card
      >this.axioDataKomenForum();
    </v-dialog>
    <!-- End Dialog Zooom Image -->

    <!-- Dialog Delete Forum -->
    <v-dialog v-model="dialogConfirmDeleteForum" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title"> </v-card-title>
        <v-card-text class="dialog-confirm-text">
          <span>Are you sure want to delete this forum?</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="grey"
            plain
            @click="dialogConfirmDeleteForum = false"
            style="text-transform: unset !important"
            >Cancel</v-btn
          >
          <v-btn
            class="ma-1"
            color="error"
            plain
            @click="deleteDataForum()"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Forum -->
  </div>
</template>

<script>
import LoadingScreen from "@/components/loading-screen.vue";
import moment from "moment";

export default {
  name: "main-view",
  components: {
    "loading-screen": LoadingScreen,
  },
  data: () => ({
    // Detail Forum
    dialogDetailForum: false,

    // Forum
    isi: "",
    isiDataForum: "",
    post_by: "",
    created_at: "",
    idForum: "",
    dataForums: [],
    dataImagesForums: [],
    dataImagesForum: [],
    dialogForum: false,
    dialogConfirmDeleteForum: false,

    // Form Forum
    ForumForm: new FormData(),
    images: [],
    showModal: false,
    selectedImage: null,

    // Announcement
    imagesAnnouncement: [],
    dataAnnouncements: [],
    dataAnnouncement: [],
    dataImagesAnnouncements: [],
    dataImagesAnnouncement: [],
    AnnouncementForm: new FormData(),

    // Images
    dialogConfirmDeleteImage: false,

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Comment Forum
    KomenForumForm: new FormData(),
    comment_forum: false,
    isiKomen: "",
    imagesKomen: [],
    dataKomenForums: [],
    dataImagesKomenForums: [],
    dataKomenDetailForum: [],

    // User
    dataUsersKomen: [],
    dataUsersAnnouncement: [],
    dataUsersForum: [],

    // Addons
    inputType: "addForum",
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      role: localStorage.getItem("role"),
    },
    getImage: null, // initialize getImage property here
    dialogZoom: false,
    loadingScreen: false,
    loading: false,
  }),
  mounted() {
    // Panggil API backend di sini dan isi data ke dalam items
    // Contoh penggunaan axios untuk mengambil data dari backend
    this.axioDataForum();
    this.axioDataKomenForum();
    this.axioDataAnnouncement();
  },
  computed: {
    // Validation for Isi
    isIsiValid() {
      return this.isi.trim() !== ""; // Content is required (not empty)
    },
  },
  methods: {
    // Announcement
    handleFileUploadAnnouncement(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagesAnnouncement.push({
            file: files[i],
            previewUrl: e.target.result,
          });
        };
        reader.readAsDataURL(files[i]);
      }
    },

    removeImageAnnouncement(index) {
      this.imagesAnnouncement.splice(index, 1);

      // Reset the file input element for the selected index by setting its value to an empty string
      // Reset the file input element by setting its value to an empty string
      const fileInput = document.getElementById("file-upload-announcement");
      if (fileInput) {
        fileInput.value = "";
      }
    },

    showImageAnnouncement(index) {
      this.selectedImage = this.imagesAnnouncement[index];
      this.showModal = true;
    },

    submitAnnouncement(val) {
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };
      console.log(val);
      this.AnnouncementForm = new FormData();

      this.AnnouncementForm.append("isi", this.isi);

      // Check if there are images to append
      if (this.imagesAnnouncement.length > 0) {
        // Iterate through images in this.images and append them to the FormData
        for (let i = 0; i < this.imagesAnnouncement.length; i++) {
          this.AnnouncementForm.append(
            "images_announcement_path[]",
            this.imagesAnnouncement[i].file
          );
        }
      }

      this.loadingScreen = true;

      if (val == "AddAnnouncement") {
        var urlAddAnnouncement = this.$api + "/create-announcement";

        this.$http
          .post(urlAddAnnouncement, this.AnnouncementForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.axioDataAnnouncement();
            this.isi = "";
            this.imagesAnnouncement = [];
            this.inputType = "addForum";

            this.textMessage = "Announcement Succesfully Created";
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
        var urlEditForum = this.$api + "/update-forum/";

        this.$http
          .post(urlEditForum, this.ForumForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.axioDataAnnouncement();
            this.isi = "";

            this.textMessage = "Announcement Succesfully Updated";
            this.snackbar = true;
            this.color = "green";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          })
          .catch((error) => {
            console.log(error);

            this.snackbar = true;
            this.textMessage = "Forum Unsuccesfully Updated";
            this.color = "secondary";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          });
      }

      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },

    axioDataAnnouncement() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-announcement";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataImagesAnnouncements = response.data.dataImagesAnnouncement;
          this.dataUsersAnnouncement = response.data.dataUser;
          this.dataAnnouncements = response.data.dataAnnouncement.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format(
                "dddd, M/DD/YYYY, h:mm a"
              ),
            };
          });
          console.log(this.dataForum);
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

      console.log(this.dataUsers, this.dataAnnouncements, "announcement data");
    },
    // End Announcement

    // Komen
    handleFileUploadKomen(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagesKomen.push({
            file: files[i],
            previewUrl: e.target.result,
          });
        };
        reader.readAsDataURL(files[i]);
      }
    },

    removeImageKomen(index) {
      this.imagesKomen.splice(index, 1);

      // Reset the file input element for the selected index by setting its value to an empty string
      // Reset the file input element by setting its value to an empty string
      const fileInput = document.getElementById("file-upload-komen");
      if (fileInput) {
        fileInput.value = "";
      }
    },

    showImageKomen(index) {
      this.selectedImage = this.imagesKomen[index];
      this.showModal = true;
    },

    commentForumButton(id) {
      console.log(this.comment_forum);
      if (this.comment_forum == id) {
        this.comment_forum = false;
      } else {
        this.comment_forum = id;
      }
    },

    submitKomenForum(val, idForum) {
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };
      console.log(val);
      this.KomenForumForm = new FormData();

      this.KomenForumForm.append("isi", this.isiKomen);

      // Check if there are images to append
      if (this.imagesKomen.length > 0) {
        // Iterate through images in this.images and append them to the FormData
        for (let i = 0; i < this.imagesKomen.length; i++) {
          this.KomenForumForm.append(
            "images_komenForum_path[]",
            this.imagesKomen[i].file
          );
        }
      }

      this.loading = true;

      if (val == "AddKomenForum") {
        var urlAddForum = this.$api + "/create-komenForum/" + idForum;

        this.$http
          .post(urlAddForum, this.KomenForumForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.axioDataKomenForum();
            this.isiKomen = "";
            this.imagesKomen = [];
            this.inputType = "addForum";

            this.textMessage = "Comment Succesfully Created";
            this.snackbar = true;
            this.color = "green";
            setTimeout(() => {
              this.loading = false;
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
        var urlEditForum = this.$api + "/update-forum/";

        this.$http
          .post(urlEditForum, this.KomenForumForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.axioDataKomenForum();
            this.isi = "";

            this.textMessage = "Forum Succesfully Updated";
            this.snackbar = true;
            this.color = "green";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          })
          .catch((error) => {
            console.log(error);

            this.snackbar = true;
            this.textMessage = "Forum Unsuccesfully Updated";
            this.color = "secondary";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          });
      }

      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },

    axioDataKomenForum() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-komenForum";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataImagesKomenForums = response.data.dataImagesKomenForum;
          this.dataUsersKomen = response.data.dataUser;
          this.dataKomenForums = response.data.dataKomenForum.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format(
                "dddd, M/DD/YYYY, h:mm a"
              ),
            };
          });
          console.log(this.dataForum);
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

      console.log(this.dataUsers, this.dataKomenForums, "ts");
    },
    // End Komen

    // Detail Forum
    detailForumHandler(dataForum, dataImagesForum) {
      console.log(dataImagesForum);
      this.dataForum = dataForum;
      this.dialogDetailForum = true;
      this.isiDataForum = dataForum.isi;
      this.post_by = dataForum.post_by;
      this.created_at = dataForum.created_at;
      this.idForum = dataForum.id;
      this.imagesForum = dataImagesForum;
      console.log(
        this.isi,
        this.imagesForum,
        this.post_by,
        this.loadingScreen,
        "tesloading"
      );
    },

    handlerCloseDialogForum() {
      this.dialogDetailForum = false;
      this.isi = "";
      this.comment_forum = false;
    },
    // End Detail Forum

    // Forum
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({
            file: files[i],
            previewUrl: e.target.result,
          });
        };
        reader.readAsDataURL(files[i]);
      }
    },

    removeImage(index) {
      this.images.splice(index, 1);

      // Reset the file input element for the selected index by setting its value to an empty string
      // Reset the file input element by setting its value to an empty string
      const fileInput = document.getElementById("file-upload");
      if (fileInput) {
        fileInput.value = "";
      }
    },

    showImage(index) {
      this.selectedImage = this.images[index];
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedImage = null;
    },

    deleteHandlerComic(dataForum) {
      this.deleteUuidForum = dataForum.uuid;
      this.dialogConfirmDeleteForum = true;
    },

    deleteDataForum() {
      this.loadingScreen = true;
      let uuid = this.deleteUuidForum;
      var url = this.$api + "/delete-forum/" + uuid;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDeleteForum = false;
          this.textMessage = "Forum Succesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          this.axioDataForum();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.textMessage = "Forum Unsuccesfully Deleted";
          this.snackbar = true;
          this.color = "green";
          setTimeout(() => {
            this.loadingScreen = false;
          }, 300);
          this.dialogConfirmDeleteForum = false;
        });
    },

    axioDataForum() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-forum";
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataImagesForums = response.data.imagesForum;
          this.dataForums = response.data.data.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format(
                "dddd, M/DD/YYYY, h:mm a"
              ),
            };
          });
          console.log(this.dataForum);
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

      console.log(this.dataForums, "tees");
    },

    // // Submit Forum
    submitForum(val) {
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };
      console.log(val);
      this.ForumForm = new FormData();

      this.ForumForm.append("isi", this.isi);

      // Check if there are images to append
      if (this.images.length > 0) {
        // Iterate through images in this.images and append them to the FormData
        for (let i = 0; i < this.images.length; i++) {
          this.ForumForm.append("images_forum_path[]", this.images[i].file);
        }
      }

      this.loadingScreen = true;

      if (val == "AddForum") {
        var urlAddForum = this.$api + "/create-forum";

        this.$http
          .post(urlAddForum, this.ForumForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.axioDataForum();
            this.isi = "";
            this.images = [];
            this.inputType = "addForum";

            this.textMessage = "Forum Succesfully Created";
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
        var urlEditForum = this.$api + "/update-forum/";

        this.$http
          .post(urlEditForum, this.ForumForm, { headers: headers })
          .then((response) => {
            this.error_message = response.data.message;
            console.log(this.error_message);

            this.axioDataForum();
            this.isi = "";

            this.textMessage = "Forum Succesfully Updated";
            this.snackbar = true;
            this.color = "green";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          })
          .catch((error) => {
            console.log(error);

            this.snackbar = true;
            this.textMessage = "Forum Unsuccesfully Updated";
            this.color = "secondary";
            setTimeout(() => {
              this.loadingScreen = false;
            }, 300);
          });
      }

      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // End Forum

    // For zoom image
    zoom(img) {
      this.getImage = img;
      this.dialogZoom = true;
    },

    // Addons
    convertLinks(text) {
      const regex = /https?:\/\/[^\s]+/g;
      return text.replace(regex, (url) => {
        return `<a href="${url}" target="_blank">${url}</a>`;
      });
    },
  },
};
</script>

<style scoped>
/* Card */
.card-school {
  width: 80%;
  height: fit-content;
  background-color: #f1f1f1;
  box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
    0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
    0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 17px 17px 27px 27px;
}
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

.text-box-school {
  width: 100%;
  height: fit-content;
  background-color: #f1f1f1;
  padding: 8px;
  border-radius: 17px 17px 17px 17px;
}

.text-box-school .box-container {
  background-color: #ffffff;
  border-radius: 21px 21px 21px 21px;
  padding: 8px;
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

.text-box-school .formatting {
  display: grid;
  grid-template-columns: auto auto auto auto auto 1fr;
}

.text-box-school .formatting button {
  width: 30px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 50%;
  border: 0;
  outline: none;
}

.text-box-school .formatting button:hover {
  background-color: #f1f1f1;
}

.text-box-school .formatting .send {
  width: 30px;
  height: 30px;
  background-color: #0a84ff;
  margin: 0 0 0 auto;
}

.text-box-school .formatting .send:hover {
  background-color: #026eda;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
/* /Card */

/* Button Hover */
.cta {
  border: none;
  background: none;
}

.cta span {
  padding-bottom: 7px;
  text-transform: uppercase;
}

.hover-underline-animation {
  position: relative;
  color: black;
  padding-bottom: 10px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000000;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
/* /Button Hover */

/* Style for the file input */
input[type="file"] {
  display: none;
}

/* Style for the file input label */
label {
  padding: 10px 20px;
  background-color: #4285f4;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

label:hover {
  background-color: #3367d6;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.image-item {
  position: relative;
  margin: 10px;
}

.profile-pic {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 20%;
  cursor: pointer;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #d32f2f;
}

/* Modal styles */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 800px;
  height: 80%;
}

.modal-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 35px;
  font-weight: bold;
  color: #f1f1f1;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .style-detail-card-forum {
    padding: 0px;
    margin: 0px;
    width: 100px !important;
    display: grid;
    align-items: center;
  }

  .card-school {
    width: 100%;
    height: fit-content;
    background-color: #f1f1f1;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 17px 17px 27px 27px;
  }

  .comment-content {
    margin: 0px;
  }
}

@media only screen and (max-width: 900px) {
  .card-school {
    width: 100%;
    height: fit-content;
    background-color: #f1f1f1;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 17px 17px 27px 27px;
  }

  .comment-content {
    margin: 0px;
  }
}
</style>
