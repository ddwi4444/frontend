<template>
  <v-main>
    <loading-screen :value="loadingScreen"></loading-screen>

    <div class="container searchandorder" style="padding-top: 0px">
      <div class="d-flex mb-3 size-bar-home">
        <b-nav>
          <b-nav-item>
            <v-btn
              @click.stop="handlerOrderServiceHistory"
              class="mx-2 button-merchan"
              fab
              dark
              small
              color="rgb(22, 128, 182)"
            >
              <b-icon
                class="icon-merchan"
                icon="card-checklist"
                aria-hidden="true"
              ></b-icon>
            </v-btn>
            <p style="margin: 0px; font-size: 13px">Your Order</p>
          </b-nav-item>
          <b-nav-item
            class="searchDiv"
            style="align-items: center; display: flex"
          >
            <div class="search-box">
              <button
                class="btn-search"
                style="padding-top: 1.5px"
                @click="search"
              >
                <b-icon-search></b-icon-search>
              </button>
              <input
                type="text"
                class="input-search"
                v-model="searchServicer"
                @keyup.enter="search"
                @input="handleInput"
                placeholder="Type to Search..."
              />
            </div>
          </b-nav-item>
        </b-nav>
      </div>

      <!-- Search -->
      <!-- Tampilkan hasil pencarian di sini -->
      <transition name="fade">
        <div
          v-if="this.isInputOn == 1"
          style="margin-bottom: 70px; margin-top: 20px"
        >
          <p>Result for {{ searchServicer }}</p>
          <div class="row" v-if="searchResults.length > 0">
            <div class="row" style="justify-content: center; max-width: none">
              <div
                v-for="result in searchResults"
                :key="result.id"
                class="card-service"
              >
                <div
                  style="cursor: pointer"
                  class="card-details"
                  @click="handlerDetailServicer(result)"
                >
                  <div class="image-service-size" style="height: 120px">
                    <img
                      v-if="result.image != null"
                      style="object-fit: cover"
                      class="card__img-service"
                      :src="$baseUrl + '/storage/' + result.image"
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
                    style="
                      margin-bottom: 0px;
                      margin-top: 10px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      max-width: 19ch;
                    "
                  >
                    {{ result.nama_persona }}
                  </p>
                  <p v-if="result.projects.length > 1">
                    {{ result.projects }} Projects
                  </p>
                  <p v-else>{{ result.projects }} Project</p>
                </div>
                <button
                  @click="handlerDetailServicer(result)"
                  class="card-button-service"
                >
                  More info
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row no-gutters">
              <div
                class="col"
                style="
                  display: grid;
                  align-content: center;
                  justify-content: end;
                "
              >
                <p>No results found for {{ searchServicer }}</p>
              </div>
              <div
                class="col"
                style="
                  display: grid;
                  align-content: center;
                  justify-content: start;
                "
              >
                <img
                  src="@/assets/2953962.jpg"
                  style="height: 150px"
                  class="d-inline-block align-top"
                  alt="Animation"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- End Serach -->

      <div class="row" style="margin: 0px; padding: 0px">
        <div
          class="row"
          style="
            margin-top: 30px;
            justify-content: center;
            margin: 0px;
            padding: 0px;
          "
        >
          <div
            v-for="dataServicer in dataServicers"
            :key="dataServicer.id"
            class="card-service"
          >
            <div
              style="cursor: pointer"
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
                style="
                  margin-bottom: 0px;
                  margin-top: 10px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 19ch;
                "
              >
                {{ dataServicer.nama_persona }}
              </p>
              <p v-if="dataServicer.projects.length > 1">
                {{ dataServicer.projects }} Projects
              </p>
              <p v-else>{{ dataServicer.projects }} Project</p>
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
                  <center style="min-height: 350px">
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
                                    v-if="dataReviewer.image != null"
                                    :src="
                                      $baseUrl +
                                      '/storage/' +
                                      dataReviewer.image
                                    "
                                  />
                                  <img
                                    v-else
                                    :src="require('@/assets/userImage.jpg')"
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
                <div
                  v-if="
                    user_id_servicer != userLogin.id &&
                    myProfile.is_servicer == 0
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
                        Offering Cost in Rupiah
                      </div>
                      <div class="col-sm-7">
                        <b-form-input
                          id="input-1"
                          v-model="offering_cost"
                          trim
                          placeholder="e.g. 1.000.000 without character, just only number"
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
                        Contact Person
                      </div>
                      <div class="col-sm-7">
                        <b-form-input
                          id="input-1"
                          v-model="contactPerson"
                          trim
                          placeholder="Your contact like Telegram, Whatsapp, Instagram, etc"
                        ></b-form-input>
                        <v-slide-y-transition>
                          <div
                            v-if="!isCPValid"
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
                          >*Optional and only image</span
                        >
                      </div>
                      <div class="col-sm-7" style="text-align: start">
                        <b-form-file
                          style="width: 300px"
                          id="storyboard"
                          v-model="storyboard"
                          class="mt-3"
                          plain
                          accept=".png, .jpg, .jpeg"
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
                          !isDescValid ||
                          !isCPValid
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
                          isDescValid &&
                          isCPValid
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
                          Contact Person
                        </div>
                        <div class="col-sm-7">
                          <b-form-input
                            id="input-1"
                            v-model="contactPerson"
                            trim
                            placeholder="Your contact like Telegram, Whatsapp, Instagram, etc"
                          ></b-form-input>
                          <v-slide-y-transition>
                            <div
                              v-if="!isCPValid"
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
                            !isDescValid ||
                            !isCPValid
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
                            isDescValid &&
                            isCPValid
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

    <!-- Dialog Your Order -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000px"
      v-model="dialogOrderService"
    >
      <template>
        <v-card style="min-height: 650px">
          <v-card-actions class="justify-end">
            <v-btn
              @click="dialogOrderService = false"
              class="mx-1"
              fab
              dark
              small
              color="red"
              style="height: 20px; width: 20px"
            >
              <b-icon icon="x-lg" aria-hidden="true"></b-icon>
            </v-btn>
          </v-card-actions>
          <h5
            v-if="myProfile.is_servicer == 0 && myProfile.role != 'admin'"
            class="f-24 f-md-20 f-secondary text-center"
            style="
              margin-bottom: 20px;
              font-family: 'Georgia';
              font-weight: bold;
              padding-top: 30px;
            "
          >
            Your Order Service History
          </h5>
          <h5
            v-if="myProfile.is_servicer == 1"
            class="f-24 f-md-20 f-secondary text-center"
            style="
              margin-bottom: 20px;
              font-family: 'Georgia';
              font-weight: bold;
              padding-top: 30px;
            "
          >
            Order Proposal
          </h5>
          <h5
            v-if="myProfile.role == 'admin'"
            class="f-24 f-md-20 f-secondary text-center"
            style="
              margin-bottom: 20px;
              font-family: 'Georgia';
              font-weight: bold;
              padding-top: 30px;
            "
          >
            Order Service History (Admin)
          </h5>
          <v-container class="conatiner-size-my-profile p-0">
            <b-container class="bv-example-row">
              <b-row>
                <b-col
                  ><!-- SEARCH -->
                  <div class="form-input" style="margin-left: 10px">
                    <v-text-field
                      v-model="search_servicesTransaction"
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
              :headers="headersServicesTransaction"
              :items="dataServiceOrders"
              :search="search_servicesTransaction"
            >
              <template v-slot:[`item.no`]="{ item }">
                <template>{{ dataServiceOrders.indexOf(item) + 1 }}</template>
              </template>

              <template v-slot:[`item.offering_cost`]="{ item }">
                <template>
                  <template>Rp. {{ formatPrice(item.offering_cost) }}</template>
                </template>
              </template>

              <template v-slot:[`item.buktiTf`]="{ item }">
                <div style="justify-content: center; display: flex">
                  <div
                    v-if="item.buktiTf != null"
                    style="height: 50px; width: 50px; cursor: zoom-in"
                    class="w-img-oval m-2"
                    @click="zoom($baseUrl + '/storage/' + item.buktiTf)"
                  >
                    <img
                      style="
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                      "
                      :src="$baseUrl + '/storage/' + item.buktiTf"
                      class="img-oval"
                    />
                  </div>
                  <div v-else>
                    <div
                      v-if="
                        item.user_id_customer == myProfile.id &&
                        item.is_deal == 1
                      "
                    >
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <p
                            style="margin: 0px"
                            @click.stop="handlerAddBuktiTf(item)"
                            v-on="on"
                          >
                            <v-btn icon color="blue">
                              <v-icon small color="#5c5c5c">mdi-upload</v-icon>
                            </v-btn>
                          </p>
                        </template>
                        <span>Add Payment Receipt</span>
                      </v-tooltip>
                    </div>
                    <div v-else>-</div>
                  </div>
                </div>
              </template>

              <template v-slot:[`item.is_deal`]="{ item }">
                <template>
                  <div
                    style="color: gray"
                    v-if="item.is_deal == '0' && item.is_done == '0'"
                  >
                    Waiting for servicer confirmation
                  </div>
                  <div
                    style="color: red"
                    v-if="item.is_deal == '3' && item.is_done == '0'"
                  >
                    Sorry, the servicer can't take the order.
                  </div>
                  <div
                    style="color: rgb(156, 156, 0)"
                    v-else-if="
                      (item.is_deal == '1' &&
                        item.is_done == '0' &&
                        item.buktiTf === null) ||
                      item.buktiTf === ''
                    "
                  >
                    Waiting for payment
                  </div>
                  <div
                    style="color: rgb(71, 0, 142)"
                    v-else-if="
                      (item.is_deal == '1' &&
                        item.is_done == '0' &&
                        item.buktiTf !== null &&
                        myProfile.role !== 'admin' &&
                        item.confirm_buktiTf === 0) ||
                      item.buktiTf === ''
                    "
                  >
                    Waiting for confirm payment by Admin
                  </div>
                  <div
                    style="color: rgb(71, 0, 142)"
                    v-else-if="
                      (item.is_deal == '1' &&
                        item.is_done == '0' &&
                        item.buktiTf !== null &&
                        myProfile.role === 'admin' &&
                        item.confirm_buktiTf === 0) ||
                      item.buktiTf === ''
                    "
                  >
                    <v-btn
                      text
                      color="rgb(71, 0, 142)"
                      @click.stop="handlerConfirmPayment(item)"
                      style="text-transform: capitalize; font-size: 13px"
                    >
                      <v-icon small>mdi-check-all</v-icon> Confirm Payment
                    </v-btn>
                  </div>
                  <div
                    style="color: rgb(0, 0, 201)"
                    v-else-if="
                      (item.is_deal == '1' &&
                        item.is_done == '0' &&
                        item.buktiTf !== null &&
                        item.confirm_buktiTf === 1) ||
                      item.buktiTf === ''
                    "
                  >
                    Servicer processing the order
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
                  v-if="
                    item.is_deal == 0 && myProfile.id == item.user_id_customer
                  "
                  dense
                  color="#FF0000"
                  @click="deleteHandlerServiceTransaction(item)"
                  class="data-table-icon"
                  >mdi-delete</v-icon
                >
                <v-icon
                  v-else
                  disabled
                  dense
                  color="#FF0000"
                  @click="deleteHandlerServiceTransaction(item)"
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
        </v-card>
      </template>
    </v-dialog>
    <!-- End Dialog Your Order -->

    <!-- Dialog Detail Services Transaction -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000"
      v-model="dialogDetailServicesTransaction"
    >
      <v-card>
        <v-toolbar color="primary" style="background-color: #006598" dark
          >Detail Transaction</v-toolbar
        >
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
                      >waiting for servicer confirmation</span
                    >
                  </div>
                  <div
                    style="color: red"
                    v-else-if="this.is_deal == '3' && this.is_done == '0'"
                  >
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >sorry, the servicer can't take the order.</span
                    >
                  </div>
                  <div
                    style="color: rgb(156, 156, 0)"
                    v-else-if="
                      this.is_deal == '1' &&
                      this.is_done == '0' &&
                      this.buktiTfDetail === null
                    "
                  >
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >waiting for the payment</span
                    >
                  </div>
                  <div
                    style="color: rgb(71, 0, 142)"
                    v-else-if="
                      this.is_deal == '1' &&
                      this.is_done == '0' &&
                      this.buktiTfDetail !== null &&
                      this.confirm_BuktiTfDetail === 0
                    "
                  >
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >waiting for confirm payment by Admin</span
                    >
                  </div>
                  <div
                    style="color: rgb(0, 0, 201)"
                    v-else-if="
                      this.is_deal == '1' &&
                      this.is_done == '0' &&
                      this.confirm_BuktiTfDetail === 1
                    "
                  >
                    <span style="color: black; margin: 0px">is </span>
                    <span style="text-decoration: underline; font-weight: bold"
                      >servicer processing the order</span
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
              style="width: 50%; text-align: start; padding-bottom: 15px"
            >
              <p style="font-size: 19px; color: black; margin: 0px">
                {{ this.project_nameDetail }}
              </p>
              <p style="color: black; margin: 0px">
                Rp. {{ formatPrice(this.offering_costDetail) }}
              </p>
              <p style="color: black; margin: 0px; text-align: justify">
                {{ this.description }}
              </p>
              <p style="color: black; margin: 0px; text-align: justify">
                {{ this.contactPersonDetail }}
              </p>
              <div
                v-if="this.storyboardDetail != null"
                style="height: 150px; width: 150px; cursor: zoom-in"
                class="w-img-oval"
                @click="zoom($baseUrl + '/storage/' + storyboardDetail)"
              >
                <p style="color: black; margin: 0px; text-align: justify">
                  Storyboard :
                </p>
                <img
                  style="
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                  "
                  :src="$baseUrl + '/storage/' + this.storyboardDetail"
                  class="img-oval"
                />
              </div>
            </div>

            <hr style="width: 40%" />

            <div class="row no-gutters">
              <div
                class="col"
                style="display: flex; justify-content: end; margin-right: 5px"
              >
                <v-btn
                  v-if="
                    this.idServicer == this.userLogin.id && this.is_deal == '0'
                  "
                  style="text-transform: unset !important"
                  rounded
                  outlined
                  small
                  color="indigo"
                  class="btn-form-primary"
                  :loading="loading"
                  @click="takeOrder(uuidTransaksiLayanan)"
                  >Take Order</v-btn
                >
              </div>
              <div
                class="col"
                style="display: flex; justify-content: start; margin-right: 5px"
              >
                <v-btn
                  v-if="
                    this.idServicer == this.userLogin.id && this.is_deal == '0'
                  "
                  style="text-transform: unset !important"
                  rounded
                  outlined
                  small
                  color="red"
                  class="btn-form-primary"
                  :loading="loading"
                  @click="declinedOrder(uuidTransaksiLayanan)"
                  >Decline Order</v-btn
                >
              </div>
            </div>

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
              v-if="this.idServicer == this.userLogin.id && this.is_deal == 3"
              style="text-transform: unset !important"
              rounded
              disabled
              outlined
              small
              color="red"
              class="btn-form-primary mt-3"
              :loading="loading"
              >Order Declined</v-btn
            >

            <v-btn
              v-if="
                this.idCustomer == this.userLogin.id &&
                this.is_done == 0 &&
                this.is_deal == 1 &&
                this.buktiTfDetail !== null &&
                this.confirm_BuktiTfDetail === 1
              "
              style="text-transform: unset !important"
              rounded
              outlined
              small
              color="indigo"
              class="btn-form-primary mt-3"
              :loading="loading"
              @click="doneOrder(uuidTransaksiLayanan)"
              >Mark as Done</v-btn
            ><v-btn
              v-else-if="
                this.idCustomer == this.userLogin.id &&
                this.is_done == 0 &&
                this.is_deal == 0 &&
                this.buktiTfDetail !== null &&
                this.confirm_BuktiTfDetail !== 1
              "
              style="text-transform: unset !important"
              rounded
              outlined
              disabled
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
          <v-btn
            text
            @click="closeDialogDetailServicesTransaction"
            style="text-transform: capitalize"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Detail Services Transaction -->

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

    <!-- Dialog Add Bukti TF -->
    <v-dialog v-model="dialogAddBuktiTf" width="600" style="max-height: none">
      <v-card style="min-height: 400px; align-items: center; display: grid">
        <div id="app">
          <label
            class="input-file"
            style="padding-top: 15px; margin-bottom: 20px"
          >
            <b class="btn btn-primary">
              <v-icon dense color="white"> mdi-upload </v-icon> Choose a File</b
            >
            <input
              style="margin: 10px"
              ref="file"
              type="file"
              id="input-file"
              @change="fileChange"
            />
          </label>

          <center>
            <div
              style="width: 200px; height: 300px"
              v-if="this.info.images.length != 0"
            >
              <img
                style="
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 15px;
                "
                class="column is-one-quarter"
                v-for="(image, index) in info.images"
                :src="image"
                :key="'image_' + index"
              />
              <p
                v-for="(size, index) in info.sizes"
                :key="'size_' + index"
                style="margin: 0px"
              >
                {{ size }}
              </p>
            </div>
          </center>

          <div
            style="padding-top: 30px; padding-bottom: 15px"
            v-if="this.info.images.length != 0"
          >
            <button
              onmouseover="this.style.color='red';"
              onmouseout="this.style.color='';"
              @click="clearImages"
              style="margin: 10px"
            >
              Clear
            </button>
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              rounded
              style="text-transform: capitalize"
              @click.stop="submitFileBuktiTfService(itemServiceBuktiTf.uuid)"
            >
              Submit Payment Proof
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add Bukti TF -->

    <!-- Dialog Delete Comic Handler -->
    <v-dialog v-model="dialogConfirmDelete" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Order</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          Are you sure want to cancel order service?
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
            @click="deleteOrderService"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Comic Handler -->
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
    // Transkasi Layanan
    project_nameDetail: "",
    offering_costDetail: "",
    description: "",
    dialogDetailServicesTransaction: false,
    customer_name: "",
    order_number: "",
    is_deal: "",
    is_done: "",
    idCustomer: "",
    contactPersonDetail: "",
    idServicer: "",
    buktiTfDetail: "",
    confirm_BuktiTfDetail: 0,
    idTransaksiLayanan: "",
    uuidTransaksiLayanan: "",
    storyboardDetail: "",
    ReviewLayananForm: new FormData(),
    deleteUUIDOrderService: "",

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
    contactPerson: "",

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Review Layanan
    idServiceLayanan: "",
    rating: null,
    isi: "",
    editReview: null,
    canEditReview: null,

    //Search
    searchServicer: "",
    searchResults: [],
    isInputOn: 0,
    search_servicesTransaction: "",

    // Data
    dataServiceOrders: [],

    // Handle upload bukti tf
    info: {
      images: [],
      sizes: [],
    },
    BuktiTfForm: new FormData(),
    itemServiceBuktiTf: [],

    // Add ons
    loadingScreen: false,
    dialogOrderService: false,
    dialogAddBuktiTf: false,
    dialogZoom: false,
    dialogLoader: false,
    dialogConfirmDelete: false,
    myProfile: [],
    getImage: null, // initialize getImage property here
    loading: false,
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      uuid: localStorage.getItem("uuid"),
      id: localStorage.getItem("id"),
    },
    headersServicesTransaction: [
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
        sortable: true,
        filterable: false,
      },
      {
        text: "Payment Proof",
        value: "buktiTf",
        align: "center",
        sortable: false,
        filterable: false,
      },
      {
        text: "Status",
        value: "is_deal",
        filterable: false,
        align: "center",
        sortable: false,
      },
      {
        text: "Date",
        value: "created_at",
        filterable: false,
        align: "center",
        sortable: true,
      },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
        filterable: false,
        width: "15%",
      },
    ],
  }),
  created() {
    this.axioDataServicer();
    this.axioDataMyProfile();
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
    isCPValid() {
      return this.contactPerson.trim() !== ""; // Content is required (not empty)
    },
  },
  methods: {
    clickEditReview() {
      this.editReview = 1;
    },

    closeDialogDetailServicesTransaction() {
      this.dialogDetailServicesTransaction = false;
      this.editReview = 0;
      this.canEditReview = 0;
    },

    detailHandlerServicesTransaction(item) {
      this.dialogDetailServicesTransaction = true;
      this.uuidTransaksiLayanan = item.uuid;
      this.idTransaksiLayanan = item.id;
      this.project_nameDetail = item.project_name;
      this.customer_name = item.customer_name;
      this.order_number = item.uuid;
      this.is_deal = item.is_deal;
      this.is_done = item.is_done;
      this.buktiTfDetail = item.buktiTf;
      this.confirm_BuktiTfDetail = item.confirm_buktiTf;
      this.offering_costDetail = item.offering_cost;
      this.description = item.description;
      this.idCustomer = item.user_id_customer;
      this.idServicer = item.user_id_servicer;
      this.contactPersonDetail = item.contact_person;
      this.storyboardDetail = item.storyboard;

      // Review
      this.axioGetDataServiceReview(item.id);
    },

    deleteHandlerServiceTransaction(item) {
      this.dialogConfirmDelete = true;
      this.deleteUUIDOrderService = item.uuid;
    },

    handlerAddBuktiTf(item) {
      this.dialogAddBuktiTf = true;
      this.itemServiceBuktiTf = item;
    },

    handlerConfirmPayment(item) {
      this.confirmPayment(item.uuid);
    },

    handlerOrderServiceHistory() {
      this.axioDataOrderService();
      this.dialogOrderService = true;
    },

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

    axioDataOrderService() {
      this.loadingScreen = true;
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      var url = this.$api + "/getDataOrderService/" + this.userLogin.uuid;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.dataServiceOrders = response.data.dataServiceOrders.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

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

    axioDataServicer() {
      this.loadingScreen = true;
      var url = this.$api + "/get-servicer";

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataServicers = response.data.dataServicer;

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

    confirmPayment(uuidOrderService) {
      this.dialogLoader = true;
      var url = this.$api + "/confirmPaymentService/" + uuidOrderService;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .get(url, { headers: headers })
        .then(() => {
          this.axioDataOrderService();

          this.textMessage =
            "The transfer proof has been successfully confirmed 😊";
          this.snackbar = true;
          this.color = "success";

          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          this.dialogLoader = false;
        });
    },

    doneOrder(uuidTransaction) {
      this.dialogLoader = true;
      var url;

      url = this.$api + "/doneOrder/" + uuidTransaction;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then(() => {
          this.is_done = 1;
          this.axioDataOrderService();
          this.axioDataServicer();

          this.textMessage =
            "The service order is now complete, we look forward to your next order 😊👋";
          this.snackbar = true;
          this.color = "success";

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          this.dialogLoader = false;
        });
    },

    takeOrder(uuidTransaction) {
      this.dialogLoader = true;
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

          this.textMessage = "You have successfully taken this order 😊";
          this.snackbar = true;
          this.color = "success";

          this.axioDataOrderService();

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error taking order", error);
          this.dialogLoader = false;
        });
    },

    declinedOrder(uuidTransaction) {
      this.dialogLoader = true;
      var url;

      url = this.$api + "/declinedOrder/" + uuidTransaction;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;

          this.is_deal = 3;

          this.textMessage =
            "Ooopss, You declined this order. Any Problems? 😔";
          this.snackbar = true;
          this.color = "red";

          this.axioDataOrderService();

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          this.dialogLoader = false;
        });
    },

    deleteOrderService() {
      this.dialogLoader = true;
      var url =
        this.$api + "/deleteOrderService/" + this.deleteUUIDOrderService;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then((response) => {
          this.error_message = response.data.message;
          this.dialogConfirmDelete = false;

          this.textMessage =
            "Ooops, you canceled or delete your order service. Any problems? 😔";
          this.snackbar = true;
          this.color = "success";

          this.axioDataOrderService();

          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          this.dialogConfirmDelete = false;
          this.dialogLoader = false;
        });
    },

    submitReviewLayanan(uuidTransaksiLayanan, idTransaksiLayanan) {
      this.dialogLoader = true;
      if (this.$refs.form.validate()) {
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };

        this.ReviewLayananForm = new FormData();

        this.ReviewLayananForm.append("rating", this.rating);
        this.ReviewLayananForm.append("isi", this.isi);

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

            this.textMessage =
              "The review has been successfully added 😊. Thank you for using our services. We hope you have a wonderful day 🫰";
            this.snackbar = true;
            this.color = "success";

            setTimeout(() => {
              this.dialogLoader = false;
            }, 300);
          })
          .catch(() => {
            this.dialogLoader = false;
          });
      }
    },

    submitFileBuktiTfService(uuid) {
      this.dialogLoader = true;
      var url = this.$api + "/submitFileBuktiTfService/" + uuid;

      this.BuktiTfForm = new FormData();

      var inputFileBuktiTf = document.getElementById("input-file"),
        dataFileBuktiTf = inputFileBuktiTf.files[0];

      this.BuktiTfForm.append("buktiTf", dataFileBuktiTf);

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Mengirim data ke backend Laravel menggunakan axios
      this.$http
        .post(url, this.BuktiTfForm, { headers: headers })
        .then(() => {
          this.axioDataOrderService();

          document.getElementById("input-file").value = "";
          this.$refs.file.value = null;
          this.info.images = [];
          this.info.sizes = [];
          this.dialogAddBuktiTf = false;

          this.textMessage =
            "You have successfully uploaded the payment proof 😊";
          this.snackbar = true;
          this.color = "success";

          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          this.dialogLoader = false;
        });
    },

    submitServiceTransaction(user_id_servicer) {
      this.dialogLoader = true;
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
      this.TranskasiLayananForm.append("contact_person", this.contactPerson);

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
          this.contactPerson = "";

          this.textMessage =
            "Your order of service has been sent, please monitor the status of your order on the 'Your Order' menu 😊";
          this.snackbar = true;
          this.color = "success";

          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          if (this.project_name.length > 255) {
            this.textMessage =
              "Your project name exceeds the character limit 😔";
            this.snackbar = true;
            this.color = "blue-gray";
          } else if (this.desc.length > 255) {
            this.textMessage =
              "Your description of task exceeds the character limit 😔";
            this.snackbar = true;
            this.color = "blue-grey";
          } else if (this.contactPerson.length > 255) {
            this.textMessage =
              "Your contact person exceeds the character limit 😔";
            this.snackbar = true;
            this.color = "blue-grey";
          }
          this.dialogLoader = false;
        });
    },

    // Search
    handleInput() {
      if (this.searchServicer.trim() === "") {
        // Jika input kosong, setel isInputOn ke 0
        this.isInputOn = 0;
        // Atur searchResults menjadi array kosong
        this.searchResults = [];
      } else {
        // Jika input tidak kosong, setel isInputOn ke 1
        this.isInputOn = 1;
        // Lanjutkan dengan melakukan pencarian
        this.search();
      }
    },
    search() {
      // Gunakan filter untuk mencari data yang sesuai dengan searchTerm
      this.searchResults = this.dataServicers.filter((servicer) =>
        servicer.nama_persona
          .toLowerCase()
          .includes(this.searchServicer.toLowerCase())
      );
    },

    // Addons
    // For changing the format of currency
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    // For zoom image
    zoom(img) {
      this.getImage = img;
      this.dialogZoom = true;
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
    calculateFileSize(sizeInBytes) {
      const temp = sizeInBytes / 1024;
      if (temp < 1024) {
        return temp.toFixed(1) + "kb";
      } else {
        const sizeInMB = temp / 1024;
        return sizeInMB.toFixed(1) + " mb";
      }
    },
    fileChange(input) {
      const images_temp = input.target.files;

      for (let i = 0; i < images_temp.length; i++) {
        const img = new FileReader();
        img.readAsDataURL(images_temp[i]);

        img.onload = (e) => {
          const fileSize = this.calculateFileSize(e.total);

          console.log(e.target);
          this.info.sizes.push(fileSize);
          this.info.images.push(e.target.result);
        };
      }
    },
    clearImages() {
      this.$refs.file.value = null;
      this.info.images = [];
      this.info.sizes = [];
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.searchandorder {
  padding-left: 150px;
  padding-right: 150px;
}

.overflow-hidden .col-image {
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: start;
  max-width: 120px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.input-file {
  position: relative;
  overflow: hidden;
  padding: 0;
  display: block;
  max-width: 100%;
  cursor: pointer;
}

.input-file .btn {
  white-space: nowrap;
  display: inline-block;
  margin-right: 1em;
  vertical-align: top;
  background-color: #2992b9 !important;
  border-color: #2992b9 !important;
}

.input-file .material-icons {
  float: left;
  font-size: 16px;
  line-height: inherit;
  margin-right: 4px;
}

.input-file ins {
  white-space: nowrap;
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

.input-file:after {
  content: "";
  display: block;
  clear: both;
}

.input-file input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  top: -100px;
  z-index: -1;
}
.button-merchan:hover .icon-merchan {
  transform: scale(+140%);
}

/* Button Search */
.search-box {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search {
  height: 30px;
  width: 30px;
  border-style: solid;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: white;
  border-color: #006598;
  padding-right: 40px;
  color: #006598;
}
.input-search::placeholder {
  color: white;
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search {
  width: 50px;
  height: 30px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 25px;
  position: absolute;
  right: 0px;
  color: #006598;
  background-color: transparent;
  pointer-events: painted;
  justify-content: center;
}
.btn-search:focus ~ .input-search {
  width: 350px;
  border-radius: 0px;
  background-color: transparent;
  border: 0.5px solid #006598;
  border-radius: 25px;
  transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
}
.input-search:focus {
  width: 350px;
  border-radius: 0px;
  background-color: transparent;
  border: 0.5px solid #006598;
  border-radius: 25px;
  transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
}
/* /Button Search */
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
  font-size: 16px;
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

  .searchandorder {
    padding-left: 100px;
    padding-right: 100px;
  }

  .btn-search:focus ~ .input-search {
    width: 200px;
    border-radius: 0px;
    background-color: transparent;
    border: 0.5px solid #006598;
    border-radius: 25px;
    transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
  }

  .input-search:focus {
    width: 200px;
    border-radius: 0px;
    background-color: transparent;
    border: 0.5px solid #006598;
    border-radius: 25px;
    transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
  }
}
@media (max-width: 790px) {
  .searchandorder {
    padding-left: 0px;
    padding-right: 0px;
  }
  .testimonial-box {
    width: 90%;
  }
  .testimonial-heading h1 {
    font-size: 1.4rem;
  }
  .btn-search:focus ~ .input-search {
    width: 160px;
    border-radius: 0px;
    background-color: transparent;
    border: 0.5px solid #006598;
    border-radius: 25px;
    transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
  }

  .input-search:focus {
    width: 160px;
    border-radius: 0px;
    background-color: transparent;
    border: 0.5px solid #006598;
    border-radius: 25px;
    transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
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

@media only screen and (max-width: 600px) {
  .div-detail-order-services {
    width: 80% !important;
  }
}
/* /Testimonial/Review */
</style>
