<template>
  <v-main>
    <loading-screen
      :value="loadingScreen"
      style="z-index: 100"
    ></loading-screen>
    <div class="container" style="padding-top: 0px">
      <div class="d-flex mb-3 size-bar-home">
        <b-nav data-aos="fade-up" data-aos-duration="2000">
          <b-nav-item>
            <div v-if="this.myProfile.length != 0">
              <v-btn
                class="mx-2 button-merchan"
                fab
                dark
                small
                color="rgb(22, 128, 182)"
                @click="handlerOrderHistory"
              >
                <b-icon
                  class="icon-merchan"
                  icon="card-checklist"
                  aria-hidden="true"
                ></b-icon>
              </v-btn>
              <p style="margin: 0px; font-size: 13px">Your Order</p>
            </div>
            <div v-else>
              <v-btn
                class="mx-2 button-merchan"
                fab
                dark
                small
                color="rgb(22, 128, 182)"
                @click="handlerDetailUserNotLogin"
              >
                <b-icon
                  class="icon-merchan"
                  icon="card-checklist"
                  aria-hidden="true"
                ></b-icon>
              </v-btn>
              <p style="margin: 0px; font-size: 13px">Your Order</p>
            </div>
          </b-nav-item>
          <b-nav-item>
            <div v-if="this.myProfile.length != 0">
              <v-btn
                class="mx-2 button-merchan"
                fab
                dark
                small
                color="rgb(22, 128, 182)"
                @click="dialogCart = true"
              >
                <v-badge
                  :content="messageTotalCart"
                  :value="messageTotalCart"
                  color="rgb(212, 130, 0)"
                >
                  <b-icon
                    class="icon-merchan"
                    icon="cart"
                    aria-hidden="true"
                  ></b-icon>
                </v-badge>
              </v-btn>
              <p style="margin: 0px; font-size: 13px">Cart</p>
            </div>
            <div v-else>
              <v-btn
                class="mx-2 button-merchan"
                fab
                dark
                small
                color="rgb(22, 128, 182)"
                @click="handlerDetailUserNotLogin"
              >
                <v-badge
                  :content="messageTotalCart"
                  :value="messageTotalCart"
                  color="rgb(212, 130, 0)"
                >
                  <b-icon
                    class="icon-merchan"
                    icon="cart"
                    aria-hidden="true"
                  ></b-icon>
                </v-badge>
              </v-btn>
              <p style="margin: 0px; font-size: 13px">Cart</p>
            </div>
          </b-nav-item>
          <b-nav-item
            class="searchDiv"
            style="align-items: center; display: flex"
          >
          <div class="coolinput">
            <label for="input-name" class="text">Search merchandise</label>
            <input
              type="text"
              v-model="searchMerchandise"
                @keyup.enter="search"
                @input="handleInput"
              placeholder="Write merchandise title here..."
              name="input"
              class="input"
            />
          </div> 
          </b-nav-item>
        </b-nav>
      </div>

      <!-- Search -->
      <!-- Tampilkan hasil pencarian di sini -->
      <transition name="fade">
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          v-if="this.isInputOn == 1"
          style="margin-bottom: 70px; margin-top: 20px"
        >
          <p>Result for {{ searchMerchandise }}</p>
          <div class="row" v-if="searchResults.length > 0">
            <div class="row" style="justify-content: center; max-width: none">
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                v-for="result in searchResults"
                :key="result.id"
                @click="handlerDetailMerchandise(result)"
                class="card-merchandise"
              >
                <div class="image-size">
                  <img
                    class="image-merchandise"
                    style="
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      border-radius: 10px;
                    "
                    :src="$baseUrl + '/storage/' + result.thumbnail"
                    alt=""
                  />
                </div>
                <span class="title-merchandise">{{ result.nama }}</span>
                <span class="price-merchandise"
                  >Rp. {{ formatPrice(result.harga) }}</span
                >
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="row no-gutters"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <div
                class="col"
                style="
                  display: grid;
                  align-content: center;
                  justify-content: end;
                "
              >
                <p>No results found for {{ searchMerchandise }}</p>
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

      <div class="row" style="margin: 0px; padding: 0px; min-height: 300px">
        <div data-aos="fade-up" data-aos-duration="2000" v-if="dataMerchandises.length == 0" style="text-align: center;  align-items: center;  display: grid;">
          Get ready for some awesome merchandise coming your way! 🎉 <br> Stay loyal and keep those excitement levels high as you wait for us! 🚀 #ComingSoon
        </div>
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
            data-aos="fade-up"
            data-aos-duration="2000"
            v-for="dataMerchandise in dataMerchandises"
            :key="dataMerchandise.id"
            @click="handlerDetailMerchandise(dataMerchandise)"
            class="card-merchandise"
          >
            <div class="image-size">
              <img
                class="image-merchandise"
                style="
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 10px;
                "
                :src="$baseUrl + '/storage/' + dataMerchandise.thumbnail"
                alt=""
              />
            </div>
            <span class="title-merchandise">{{ dataMerchandise.nama }}</span>
            <span class="price-merchandise"
              >Rp. {{ formatPrice(dataMerchandise.harga) }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <v-dialog v-model="dialogDetail" width="800px">
        <v-card>
          <v-card-title class="lighten-2" style="padding: 0px">
            <div
              class="row no-gutters"
              style="padding: 0px; margin: 0px; margin-top: 10px"
            >
              <div
                class="col"
                style="
                  display: flex;
                  justify-content: start;
                  align-items: center;
                  margin-left: 10px;
                "
              >
                Detail
              </div>
              <div
                class="col"
                style="
                  display: flex;
                  justify-content: end;
                  align-items: center;
                  margin-right: 10px;
                "
              >
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

          <div
            class="row g-0"
            style="justify-content: center; margin-top: 10px"
          >
            <div
              class="col-md-5"
              style="justify-content: center; display: flex"
            >
              <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
                style="border-radius: 10px; margin: 5px; width: 90%"
              >
                <v-carousel-item
                  v-for="(imageMerchandise, i) in detailImageMerchandise"
                  :key="i"
                >
                  <v-sheet :color="generateRandomColor()" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="text-h2">
                        <img
                          @click="
                            zoom(
                              $baseUrl +
                                '/storage/' +
                                imageMerchandise.images_merchandise_path
                            )
                          "
                          class="image-merchandise"
                          style="
                            object-fit: cover;
                            max-width: 100%;
                            max-height: 100%;
                            cursor: zoom-in;
                          "
                          :src="
                            $baseUrl +
                            '/storage/' +
                            imageMerchandise.images_merchandise_path
                          "
                          alt=""
                        />
                      </div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
            <div class="col-md-5">
              <h5
                class="justify-center"
                style="margin: 5px 15px 15px; font-weight: bold"
              >
                {{ merchandiseName }}
              </h5>
              <div style="margin: 15px; margin-top: 5px">
                <div v-html="merchandiseDesc" style="text-align: ''"></div>
              </div>
              <div
                v-bind:class="{ 'disabled-div': myProfile.role == 'admin' }"
                v-if="merchandiseStock > 0 && this.myProfile.length != 0"
                style="margin: 5px 15px 15px"
              >
                <hr />
                <p>Order</p>
                <div
                  style="
                    justify-content: left;
                    display: flex;
                    padding-bottom: 5px;
                  "
                >
                  <p style="margin: 0px; text-align: left">
                    Stock: {{ merchandiseStock }}
                    <br />
                    Price : Rp. {{ formatPrice(merchandisePrice) }}
                  </p>
                </div>
                <b-form-spinbutton
                  id="sb-small"
                  size="sm"
                  placeholder="-"
                  v-model="totalPcs"
                  :max="merchandiseStock"
                ></b-form-spinbutton>
                <v-textarea
                  :counter="255"
                  placeholder="Notes"
                  required
                  v-model="notes"
                  auto-grow
                  outlined
                  style="top: 15px"
                ></v-textarea>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="totalPcs == 0"
                    disabled
                    fab
                    class="mx-2"
                    small
                    color="rgb(22, 128, 182)"
                    @click.stop="addToProducts(itemProduct)"
                  >
                    <b-icon icon="cart-plus" aria-hidden="true"></b-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-2"
                    fab
                    small
                    color="rgb(22, 128, 182)"
                    @click.stop="addToProducts(itemProduct)"
                  >
                    <b-icon
                      style="color: white"
                      icon="cart-plus"
                      aria-hidden="true"
                    ></b-icon>
                  </v-btn>
                </v-card-actions>
              </div>
              <div
                v-bind:class="{ 'disabled-div': myProfile.role == 'admin' }"
                v-else-if="merchandiseStock < 1 && this.myProfile.length != 0"
                class="disabled-div"
                style="margin: 5px 15px 15px"
              >
                <hr />
                <p>Order</p>
                <div
                  style="
                    justify-content: left;
                    display: flex;
                    padding-bottom: 5px;
                  "
                >
                  <p style="margin: 0px; text-align: left">
                    Stock: <span style="color: rgb(142, 0, 0)">Sold out</span>
                    <br />
                    Price : Rp. {{ formatPrice(merchandisePrice) }}
                  </p>
                </div>
                <b-form-spinbutton
                  id="sb-small"
                  size="sm"
                  placeholder="-"
                  v-model="totalPcs"
                  :max="merchandiseStock"
                ></b-form-spinbutton>
                <v-textarea
                  :counter="255"
                  placeholder="Notes"
                  required
                  v-model="notes"
                  auto-grow
                  outlined
                  style="top: 15px"
                ></v-textarea>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="totalPcs == 0"
                    disabled
                    fab
                    class="mx-2"
                    small
                    color="rgb(22, 128, 182)"
                    @click.stop="addToProducts(itemProduct)"
                  >
                    <b-icon icon="cart-plus" aria-hidden="true"></b-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-2"
                    fab
                    small
                    color="rgb(22, 128, 182)"
                    @click.stop="addToProducts(itemProduct)"
                  >
                    <b-icon
                      style="color: white"
                      icon="cart-plus"
                      aria-hidden="true"
                    ></b-icon>
                  </v-btn>
                </v-card-actions>
              </div>
              <div
                v-bind:class="{ 'disabled-div': myProfile.role == 'admin' }"
                v-else-if="this.myProfile.length == 0"
                class="disabled-div"
                style="margin: 5px 15px 15px"
              >
                <hr />
                <p>You need to log in to order merchandise</p>
                <div
                  style="
                    justify-content: left;
                    display: flex;
                    padding-bottom: 5px;
                  "
                >
                  <p style="margin: 0px; text-align: left">
                    Stock: {{ merchandiseStock }}
                    <br />
                    Price : Rp. {{ formatPrice(merchandisePrice) }}
                  </p>
                </div>
                <b-form-spinbutton
                  id="sb-small"
                  size="sm"
                  placeholder="-"
                  v-model="totalPcs"
                  :max="merchandiseStock"
                ></b-form-spinbutton>
                <v-textarea
                  :counter="255"
                  placeholder="Notes"
                  required
                  v-model="notes"
                  auto-grow
                  outlined
                  style="top: 15px"
                ></v-textarea>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="totalPcs == 0"
                    disabled
                    fab
                    class="mx-2"
                    small
                    color="rgb(22, 128, 182)"
                    @click.stop="addToProducts(itemProduct)"
                  >
                    <b-icon icon="cart-plus" aria-hidden="true"></b-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    class="mx-2"
                    fab
                    small
                    color="rgb(22, 128, 182)"
                    @click.stop="addToProducts(itemProduct)"
                  >
                    <b-icon
                      style="color: white"
                      icon="cart-plus"
                      aria-hidden="true"
                    ></b-icon>
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <!-- Doalog Cart -->
    <v-dialog
      v-model="dialogCart"
      width="1000px"
      transition="dialog-top-transition"
    >
      <template>
        <v-stepper v-model="e6" vertical>
          <div style="justify-content: end; display: flex; padding: 8px 16px">
            <v-btn
              @click="dialogCart = false"
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
          <v-stepper-step :complete="e6 > 1" step="1" style="padding-top: 0px">
            Order Items
          </v-stepper-step>

          <v-stepper-content step="1" style="overflow: scroll; height: auto">
            <v-card class="mb-3">
              <template>
                <v-data-table
                  :headers="headers"
                  :items="products"
                  class="elevation-1"
                  disable-pagination
                  hide-default-footer
                >
                  <template v-slot:[`item.namaProduct`]="{ item }">
                    <div
                      class="row no-gutters"
                      style="margin: 0px; padding: 0px; cursor: pointer"
                      @click.stop="
                        handlerDetailMerchandiseFromCart(item.uuidProduct)
                      "
                    >
                      <div class="col" style="max-width: 90px">
                        <div
                          style="width: 75px; height: 75px; cursor: zoom-in"
                          class="w-img-oval m-2"
                          @click.stop="
                            zoom($baseUrl + '/storage/' + item.thumbnailProduct)
                          "
                        >
                          <img
                            style="
                              width: 100%;
                              height: 100%;
                              border-radius: 20px;
                            "
                            :src="
                              $baseUrl + '/storage/' + item.thumbnailProduct
                            "
                            class="img-oval"
                          />
                        </div>
                      </div>
                      <div
                        class="col"
                        style="
                          justify-content: left;
                          display: flex;
                          align-items: center;
                        "
                      >
                        <p style="margin: 0px">{{ item.namaProduct }}</p>
                      </div>
                    </div>
                  </template>

                  <template v-slot:[`item.priceProduct`]="{ item }">
                    <p style="margin: 0px">
                      Rp. {{ formatPrice(item.priceProduct) }}
                    </p>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      dense
                      color="#316291"
                      @click="deleteHandlerItem(item)"
                    >
                      mdi-delete-circle-outline
                    </v-icon>
                  </template>

                  <template v-slot:[`item.quantity`]="{ item }">
                    <b-form-spinbutton
                      id="sb-small"
                      size="sm"
                      v-model="item.quantity"
                    ></b-form-spinbutton>
                  </template>
                </v-data-table>
              </template>
            </v-card>
            <v-btn
              v-if="this.products.length > 0"
              class="ma-2"
              outlined
              color="indigo"
              @click="e6 = 2"
              rounded
              style="text-transform: capitalize"
            >
              Continue
            </v-btn>
            <v-btn
              v-else
              disabled
              class="ma-2"
              outlined
              color="indigo"
              @click="e6 = 2"
              rounded
              style="text-transform: capitalize"
            >
              Continue
            </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            Shipping Form
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card class="mb-3">
              <template>
                <v-form v-model="valid">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="name"
                          :rules="nameRules"
                          label="Name"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="address"
                          :rules="addressRules"
                          label="Address"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="telephone"
                          :rules="telephoneRules"
                          label="Telephone"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <p>
                  Submit your order and pay the total order amount upfront and
                  settle the shipping cost after receiving the item.
                </p>
              </template>
            </v-card>
            <v-btn
              :disabled="!valid"
              class="ma-2"
              outlined
              color="indigo"
              rounded
              style="text-transform: capitalize"
              @click="submitDataOrderMerchandise"
            >
              Create Order
            </v-btn>
            <v-btn
              @click="e6 = 1"
              style="text-transform: capitalize"
              plain
              text
            >
              Back
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </template>
    </v-dialog>

    <!-- Dialog Your Order -->
    <v-dialog
      transition="dialog-top-transition"
      max-width="1000px"
      v-model="dialogOrderHistory"
    >
      <v-card
        style="min-height: 700px"
        class="position-relative m-x-auto p-x-25 p-y-50 br-10 bs-none min-w-full min-w-lg-full"
      >
        <v-card-actions class="justify-end">
          <v-btn
            @click="dialogOrderHistory = false"
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
        <h3
          class="f-24 f-md-20 f-secondary text-center"
          style="margin-bottom: 50px; font-family: 'Georgia'; font-weight: bold"
        >
          Your Order Transaction
        </h3>

        <template>
          <div style="display: flex; justify-content: start; padding-left: 15px;">
            <v-btn
              small
              color="primary"
              dark
              class="mb-2 w-2"
              style="
                text-transform: unset !important;
                border-radius: 20px;
              "
              @click="handlerRefresDataOrderMerchandise"
            >
              Refresh Data Sub Comic
            </v-btn>
          </div>          
          <v-container class="conatiner-size-my-profile p-0">
            <v-data-table
              :headers="headersOrderHistory"
              :items="dataOrderMerchandises"
              style="margin-left: 10px; margin-right: 10px"
            >
              <template v-slot:[`item.product`]="{ item }">
                <div>
                  <p>
                    {{
                      truncateText(getProductNames(item.uuid).join(", "), 25)
                    }}
                  </p>
                </div>
              </template>

              <template v-slot:[`item.no`]="{ item }">
                <template>{{
                  dataOrderMerchandises.indexOf(item) + 1
                }}</template>
              </template>

              <template v-slot:[`item.total_prices`]="{ item }">
                <template>Rp. {{ formatPrice(item.total_prices) }}</template>
              </template>

              <template v-slot:[`item.status`]="{ item }">
                <p v-if="item.status == 0" style="color: grey; margin: 0px">
                  Waiting for payment
                </p>
                <p
                  v-if="
                    item.status == 1 &&
                    item.buktiTf != null &&
                    myProfile.role != 'admin' &&
                    item.confirm_buktiTf == 0
                  "
                  style="color: rgb(0, 0, 0); margin: 0px"
                >
                  Waiting for confirmation payment by admin
                </p>
                <p
                  v-if="
                    item.status == 1 &&
                    item.buktiTf != null &&
                    myProfile.role == 'admin' &&
                    item.confirm_buktiTf == 0
                  "
                  style="color: grey; margin: 0px"
                >
                  <v-btn
                    text
                    color="blue"
                    @click.stop="handlerConfirmPayment(item)"
                    style="text-transform: capitalize; font-size: 13px"
                  >
                    <v-icon small>mdi-check-all</v-icon> Confirm Payment
                  </v-btn>
                </p>
                <p
                  v-if="item.status == 1 && item.confirm_buktiTf == 1"
                  style="color: blue; margin: 0px"
                >
                  Order being processed
                </p>
                <p
                  v-if="
                    item.status == 2 &&
                    item.confirm_buktiTf == 1 &&
                    item.noResi != null
                  "
                  style="color: #9d7a18; margin: 0px"
                >
                  Shiped
                </p>
                <p
                  v-if="
                    item.status == 3 &&
                    item.confirm_buktiTf == 1 &&
                    item.noResi != null
                  "
                  style="color: green; margin: 0px"
                >
                  Received
                </p>
              </template>

              <template v-slot:[`item.buktiTf`]="{ item }">
                <div
                  style="height: 50px; width: 50px; cursor: zoom-in"
                  v-if="item.buktiTf"
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
                  <div v-if="myProfile.role != 'admin'">
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
                      <span>Add Transfer Receipt</span>
                    </v-tooltip>
                  </div>
                  <div v-else>-</div>
                </div>
              </template>

              <template v-slot:[`item.noResi`]="{ item }">
                <div v-if="myProfile.role != 'admin'">
                  <p
                    v-if="item.noResi == null"
                    style="color: grey; margin: 0px"
                  >
                    -
                  </p>
                  <p v-else style="margin: 0px">{{ item.noResi }}</p>
                </div>
                <div v-else>
                  <div v-if="item.noResi == null">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="blue"
                          dark
                          icon
                          v-bind="attrs"
                          v-on="on"
                          @click.stop="handleAddNoResi(item.uuid)"
                        >
                          <v-icon small color="">mdi-upload</v-icon>
                        </v-btn>
                      </template>
                      <span>Add Shipment Tracking Number</span>
                    </v-tooltip>
                  </div>
                  <div v-else>
                    <p style="margin: 0px">{{ item.noResi }}</p>
                  </div>
                </div>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="blue"
                      dark
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="handleOrderproducts(item)"
                    >
                      <v-icon small color="">mdi-information-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Detail Product Ordered</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="item.buktiTf === null || item.buktiTf === ''"
                      color="red"
                      dark
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="handlerDeleteOrder(item.uuid)"
                    >
                      <v-icon small>mdi-cart-remove</v-icon>
                    </v-btn>
                    <v-btn v-else icon disabled>
                      <v-icon small>mdi-cart-remove</v-icon>
                    </v-btn>
                  </template>
                  <span>Cancel Order</span>
                </v-tooltip>
              </template>
              <template v-slot:[`footer.page-text`]="items">
                {{ items.pageStart }} - {{ items.pageStop }} of
                {{ items.itemsLength }}
              </template>
              <template v-slot:no-data>
                <div color="white">
                  <p class="p-0 m-0">There is no order history</p>
                </div>
              </template>
            </v-data-table>
          </v-container>
        </template>
      </v-card>
    </v-dialog>
    <!-- End Dialog Your Order -->

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
              @click.stop="submitFileBuktiTf(itemProductBuktiTf.uuid)"
            >
              Submit Transfer Receipt
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- End Dialog Add Bukti TF -->

    <!-- Dialog Detail Order Products Merchandise -->
    <v-dialog v-model="dialogDetailOrderProducts" width="800px">
      <v-card
        style="
          min-height: 600px;
          border-bottom-left-radius: unset !important;
          border-bottom-right-radius: unset !important;
        "
      >
      <div style="justify-content: end; display: flex; padding: 8px 16px; margin: 0px;">
            <v-btn
              @click="dialogDetailOrderProducts = false"
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
        <h5
          class="f-24 f-md-20 f-secondary text-center"
          style="
            margin-bottom: 20px;
            font-family: 'Georgia';
            font-weight: bold;
            padding-top: 30px;
          "
        >
          Detail Order
        </h5>
        <div>
          <p class="ma-0 pa-0">
            Recipient's Name : {{ dataOrderInDetailOrderProducts.nama }}
          </p>
          <p class="ma-0 pa-0">
            Address : {{ dataOrderInDetailOrderProducts.alamat }}
          </p>
          <p class="ma-0 pa-0">
            Phone Number : {{ dataOrderInDetailOrderProducts.tlp }}
          </p>
          <p class="ma-0 pa-0">
            Total Price : Rp.
            {{ formatPrice(dataOrderInDetailOrderProducts.total_prices) }}
          </p>
        </div>
        <center>
          <div>
            <!-- Update the v-for and :src attribute -->
            <div
              v-for="dataDetailOrderProductMerchandise in dataDetailOrderProductsMerchandise"
              :key="dataDetailOrderProductMerchandise.id"
            >
              <b-card
                no-body
                class="overflow-hidden"
                style="
                  max-width: 540px;
                  min-height: 130px;
                  padding: 0px;
                  margin: 7px;
                  border-radius: 20px;
                "
              >
                <div class="row no-gutters">
                  <div class="col-image col">
                    <!-- Use a computed property to get the matching merchandise -->
                    <b-card-img
                      style="
                        height: 120px;
                        width: 120px;
                        border-radius: 20px !important;
                        object-fit: cover;
                      "
                      :src="
                        getMerchandiseThumbnail(
                          dataDetailOrderProductMerchandise.UUIDProduk
                        )
                      "
                      alt="Image"
                      class="rounded-0"
                    ></b-card-img>
                  </div>
                  <div class="col" style="margin-right: 5px; margin-left: 5px">
                    <p
                      style="
                        text-align: start;
                        margin: 0px;
                        font-size: 13px;
                        font-weight: bold;
                      "
                    >
                      {{ dataDetailOrderProductMerchandise.namaProduk }}
                    </p>
                    <p style="text-align: start; margin: 0px; font-size: 13px">
                      Quantity :
                      {{ dataDetailOrderProductMerchandise.quantity }}
                    </p>
                    <p style="text-align: start; margin: 0px; font-size: 13px">
                      Notes:
                    </p>
                    <div
                      v-html="dataDetailOrderProductMerchandise.notes"
                      style="text-align: justify"
                    ></div>
                  </div>
                </div>
              </b-card>
            </div>
          </div>
        </center>
      </v-card>
      <template> </template>
    </v-dialog>
    <!-- End Dialog Detail Order Products Merchandise -->

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

    <!-- Dialog Delete Comic Handler -->
    <v-dialog v-model="dialogConfirmDelete" persistent max-width="400px">
      <v-card>
        <v-card-title class="dialog-confirm-title">
          <span class="headline white--text">Delete Order</span>
        </v-card-title>
        <v-card-text class="dialog-confirm-text">
          Are you sure want to cancel order?
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
            @click="deleteOrder"
            style="text-transform: unset !important"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Dialog Delete Comic Handler -->

    <!-- Dialog add no resi -->
    <v-dialog v-model="dialogAddNoResi" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Shipment Tracking Number</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="e.g. 343BVYGXXXX"
                  required
                  v-model="shipmentTrackingNumber"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            style="text-transform: capitalize"
            @click="dialogAddNoResi = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            style="text-transform: capitalize"
            @click="submitAddNoResi(uuidAddNoResi)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dialog add no resi -->

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

    <!-- Footer -->
    <div
      style="margin-top: 50px"
      data-aos="fade-up"
      data-aos-duration="2000"
      data-aos-offset="0"
    >
      <div class="footer-dark">
        <transition name="fade">
          <footer>
            <div class="container container-footer" style="justify-content: center; width: 50%">
              <div class="">
                <h3>Historical Art Fantasia</h3>
                <p>
                  "Be Creative, smart, and learning forever"
                </p>
              </div>
              <div class="col item social">
                <a                  
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                  ><b-icon icon="instagram" aria-hidden="true" @click="openInstagramFooter"></b-icon></a
                ><a
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                  ><b-icon icon="youtube" aria-hidden="true" @click="openYoutubeFooter"></b-icon></a
                ><a @click="openTiktokFooter"
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                  ><img 
                    src="@/assets/tiktok.png"
                    style="height: 33px"
                    class="d-inline-block align-top"
                    alt="Animation"
                  /></a
                ><a                  
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                >
                  <b-icon icon="mailbox" aria-hidden="true" @click="sendEmail"></b-icon
                ></a>
              </div>
              <p class="copyright">
                Historical Art Fantasia © 2023 || created by
                <span
                  @click="openNewPage"
                  class="hoverMyName"
                  style="cursor: pointer"
                  >Doni Dwi Irawan</span
                >
              </p>
            </div>
          </footer>
        </transition>
      </div>
    </div>
    <!-- Footer -->
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
    dataMerchandises: [],
    dataImageMerchandises: [],
    detailImageMerchandise: [],
    dataOrderMerchandises: [],
    dataOrderProductsMerchandise: [],
    dataDetailOrderProductsMerchandise: [],
    myProfile: [],
    dataOrderInDetailOrderProducts: [],

    // Search
    searchMerchandise: "",
    searchResults: [],
    isInputOn: 0,

    // Add To Cart
    totalPcs: 0,
    notes: "",
    merchandiseName: "",
    merchandiseDesc: "",
    merchandisePrice: "",
    merchandiseStock: "",
    itemProduct: [],

    // Handle upload bukti tf
    info: {
      images: [],
      sizes: [],
    },
    itemProductBuktiTf: [],
    BuktiTfForm: new FormData(),

    // // Handle add no resi
    uuidAddNoResi: "",
    shipmentTrackingNumber: "",

    // Cancel Order
    deleteUUIDOrderMerchandise: "",

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Cart
    products: [],
    messageTotalCart: 0,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    address: "",
    addressRules: [(v) => !!v || "Address is required"],
    telephone: "",
    telephoneRules: [
      (v) => !!v || "Telephone is required",
      (v) => /^[0-9]+$/.test(v) || "Telephone must be a number",
    ],
    totalPrices: 0,

    // Dialog
    dialogDetail: false,
    dialogCart: false,
    dialogLoader: false,
    dialogZoom: false,
    dialogOrderHistory: false,
    dialogAddBuktiTf: false,
    dialogConfirmDelete: false,
    dialogDetailOrderProducts: false,
    dialogAddNoResi: false,

    // Adds On
    getImage: null,
    loadingScreen: false,
    e6: 1,
    valid: false,
    headers: [
      {
        text: "Product",
        align: "center",
        sortable: false,
        value: "namaProduct",
      },
      {
        text: "Quantity",
        align: "center",
        value: "totalPcsProduct",
        sortable: false,
      },
      {
        text: "Price",
        align: "center",
        value: "priceProduct",
        sortable: false,
      },
      {
        text: "Notes",
        align: "center",
        value: "notesProduct",
        sortable: false,
      },
      { text: "Action", align: "center", value: "actions", sortable: false },
    ],

    headersOrderHistory: [
      {
        text: "Number",
        value: "no",
        filterable: false,
        width: "10%",
        align: "center",
        sortable: false,
      },
      { text: "Product", align: "center", value: "product", sortable: false },
      {
        text: "Total Order",
        width: "20%",
        align: "center",
        value: "total_prices",
        sortable: false,
      },
      {
        text: "Transfer Receipt",
        align: "center",
        value: "buktiTf",
        sortable: false,
      },
      {
        text: "Status",
        width: "20%",
        align: "center",
        value: "status",
        sortable: false,
      },
      {
        text: "Shipment Tracking Number",
        align: "center",
        value: "noResi",
        sortable: false,
      },
      {
        text: "Date",
        align: "center",
        value: "created_at",
        sortable: false,
      },
      {
        text: "Action",
        width: "15%",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],

    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      uuid: localStorage.getItem("uuid"),
      id: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
    },
  }),
  computed: {},
  created() {
    this.axioDataMerchandise();
    if (this.userLogin.token != null) {
      this.axioDataMyProfile();
      this.axioDataOrderMerchandise();
    }
  },
  watch: {
    dialogDetail(newVal) {
      // Check if dialogDetail is now false and reset detailImageMerchandise
      if (!newVal) {
        this.resetDetailImageMerchandise();
      }
    },
    dialogLoader(val) {
      if (!val) return;

      setTimeout(() => (this.dialogLoader = false), 500);
    },
  },
  methods: {
    handlerDetailUserNotLogin() {
      this.textMessage = "You need to log in to access this feature 🤭🤭🤭";
      this.snackbar = true;
      this.color = "blue-grey";
    },

    handleAddNoResi(uuidAddNoResi) {
      this.uuidAddNoResi = uuidAddNoResi;
      this.dialogAddNoResi = true;
    },

    handlerConfirmPayment(item) {
      this.confirmPayment(item.uuid);
    },

    handleOrderproducts(item) {
      this.axioGetDataDetailOrderProductsMerchandise(item.uuid);
      this.dataOrderInDetailOrderProducts = item;
      this.dialogDetailOrderProducts = true;
    },

    handlerDeleteOrder(itemUuid) {
      this.dialogConfirmDelete = true;
      this.deleteUUIDOrderMerchandise = itemUuid;
    },

    handlerAddBuktiTf(item) {
      this.dialogAddBuktiTf = true;
      this.itemProductBuktiTf = item;
    },

    handlerOrderHistory() {
      this.dialogOrderHistory = true;
      this.axioDataOrderMerchandise();
    },

    handlerRefresDataOrderMerchandise() {
      this.axioDataOrderMerchandise();
      this.textMessage = "Order merchandise shiny now ✨ Data buff  Ready to rock!";
      this.snackbar = true;
      this.color = "success";
    },

    handlerDetailMerchandiseFromCart(uuid) {
      const foundItem = this.dataMerchandises.find(
        (item) => item.uuid === uuid
      );
      if (foundItem) {
        this.handlerDetailMerchandise(foundItem);
      }
    },

    handlerDetailMerchandise(item) {
      console.log(this.myProfile, this.myProfile, "iniprofile");
      this.dialogDetail = true;
      this.itemProduct = item;
      this.merchandiseName = item.nama;
      this.merchandiseDesc = item.deskripsi;
      this.merchandiseStock = item.stok;
      this.merchandisePrice = item.harga;

      for (let i = 0; i < this.dataImageMerchandises.length; i++) {
        if (this.dataImageMerchandises[i].merchandise_id == item.id) {
          this.detailImageMerchandise.push(this.dataImageMerchandises[i]);
        }
      }
      console.log(item, this.totalPcs, this.detailImageMerchandise);
    },

    confirmPayment(uuidOrderMerchandise) {
      this.dialogLoader = true;
      var url =
        this.$api + "/confirmPaymentMerchandise/" + uuidOrderMerchandise;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .get(url, { headers: headers })
        .then(() => {
          this.axioDataOrderMerchandise();

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

    addToProducts(itemProduct) {
      this.dialogLoader = true;

      if (this.notes.length > 255) {
        this.textMessage = "Your notes exceeds the character limit 😔";
        this.snackbar = true;
        this.color = "blue-grey";
        this.dialogLoader = false;
      } else {
        // Menambahkan data baru ke dalam array products
        const newProduct = {
          totalPcsProduct: this.totalPcs,
          notesProduct: this.notes === "" ? "-" : this.notes,
          namaProduct: itemProduct.nama,
          uuidProduct: itemProduct.uuid,
          priceProduct: this.totalPcs * itemProduct.harga,
          thumbnailProduct: itemProduct.thumbnail,
        };

        this.products.push(newProduct);

        this.messageTotalCart = this.products.length;

        // Setelah menambahkan, bersihkan input
        this.totalPcs = 0;
        this.notes = "";

        this.textMessage =
          "The product has been successfully added to the cart 😊";
        this.snackbar = true;
        this.color = "success";

        setTimeout(() => {
          this.dialogLoader = false;
        }, 300);
      }
    },

    deleteHandlerItem(item) {
      this.dialogLoader = true;

      // Assuming 'products' is the array containing your items
      const index = this.products.indexOf(item);

      if (index !== -1) {
        // Remove the item from the 'products' array
        this.products.splice(index, 1);

        // You can perform additional logic here, such as making an API call to delete the item on the server
        // or showing a confirmation message to the user.

        this.textMessage =
          "The product has been successfully removed from the cart 😊";
        this.snackbar = true;
        this.color = "success";

        setTimeout(() => {
          this.dialogLoader = false;
        }, 300);
      }

      this.messageTotalCart = this.products.length;
    },

    deleteOrder() {
      this.dialogLoader = true;
      var url = this.$api + "/deleteOrder/" + this.deleteUUIDOrderMerchandise;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      this.$http
        .delete(url, { headers: headers })
        .then(() => {
          this.dialogConfirmDelete = false;
          this.axioDataOrderMerchandise();

          this.textMessage =
            "Ooops, you canceled or delete your order merchandise. Any problems? 😔";
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

    submitAddNoResi(uuidOrderMerchandise) {
      this.dialogLoader = true;
      var url = this.$api + "/submitAddNoResi/" + uuidOrderMerchandise;

      this.BuktiTfForm = new FormData();

      this.BuktiTfForm.append("noResi", this.shipmentTrackingNumber);

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Mengirim data ke backend Laravel menggunakan axios
      this.$http
        .post(url, this.BuktiTfForm, { headers: headers })
        .then(() => {
          this.axioDataOrderMerchandise();

          this.dialogAddNoResi = false;
          this.shipmentTrackingNumber = "";

          this.textMessage =
            "The tracking number has been successfully added. 😊";
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

    submitFileBuktiTf(uuid) {
      this.dialogLoader = true;
      var url = this.$api + "/submitFileBuktiTf/" + uuid;

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
        .then((response) => {
          // Handle respon dari backend jika diperlukan
          console.log(response.data);

          this.axioDataOrderMerchandise();
          this.axioDataMerchandise();

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

    submitDataOrderMerchandise() {
      this.dialogLoader = true;
      var url = this.$api + "/submit-products";

      // Iterasi melalui array produk
      for (let i = 0; i < this.products.length; i++) {
        // Tambahkan harga setiap produk ke totalPrices
        this.totalPrices += this.products[i].priceProduct;
      }

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Menyiapkan data yang akan dikirimkan ke backend
      const dataToSubmit = {
        nama: this.name,
        alamat: this.address,
        tlp: this.telephone,
        totalPrices: this.totalPrices,
        products: this.products, // Menambahkan array products ke dalam data yang akan dikirim
        // Anda juga dapat menambahkan properti lain sesuai kebutuhan
      };

      // Mengirim data ke backend Laravel menggunakan axios
      this.$http
        .post(url, dataToSubmit, { headers: headers })
        .then((response) => {
          // Handle respon dari backend jika diperlukan
          console.log(response.data);

          // Setelah mengirim, Anda dapat melakukan hal lain seperti membersihkan input
          this.name = "";
          this.address = "";
          this.telephone = "";
          this.totalPrices = 0;
          this.products = []; // Jika Anda ingin membersihkan array products setelah mengirim
          this.dialogCart = false;
          (this.products = []), (this.e6 = 1);
          this.messageTotalCart = this.products.length;

          this.textMessage =
            "Your order of service has been sent, please monitor the status of your order on the 'Your Order' menu 😊";
          this.snackbar = true;
          this.color = "success";

          this.axioDataMerchandise();
          this.axioDataOrderMerchandise();
          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch(() => {
          if (this.name.length > 255) {
            this.textMessage = "Your name exceeds the character limit 😔";
            this.snackbar = true;
            this.color = "blue-gray";
          } else if (this.address.length > 255) {
            this.textMessage = "Your address exceeds the character limit 😔";
            this.snackbar = true;
            this.color = "blue-grey";
          } else if (this.telephone.length > 255) {
            this.textMessage =
              "Your number phone exceeds the character limit 😔";
            this.snackbar = true;
            this.color = "blue-grey";
          }
          this.dialogLoader = false;
        });
    },

    axioGetDataDetailOrderProductsMerchandise(uuidMerchandise) {
      this.loadingScreen = true;
      var url =
        this.$api + "/getDataDetailOrderProductsMerchandise/" + uuidMerchandise;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataDetailOrderProductsMerchandise =
            response.data.dataDetailOrderProductsMerchandise.map((x) => {
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
          console.error("Error fetching Comic data:", error);
          this.loadingScreen = false;
        });
    },

    axioDataOrderMerchandise() {
      this.dialogLoader = true;
      var url = this.$api + "/getDataOrderMerchandise/" + this.userLogin.uuid;

      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataOrderMerchandises = response.data.dataOrderMerchandises.map(
            (x) => {
              return {
                ...x,
                created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
              };
            }
          );
          this.dataOrderProductsMerchandise =
            response.data.dataOrderProductsMerchandise;

          console.log(
            this.dataOrderMerchandises,
            this.dataOrderProductsMerchandise
          );
          // Menonaktifkan loading screen setelah 300ms
          setTimeout(() => {
            this.dialogLoader = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching Comic data:", error);
          this.dialogLoader = false;
        });
    },

    axioDataMerchandise() {
      this.loadingScreen = true;
      var url = this.$api + "/getDataMerchandise";

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.dataMerchandises = response.data.dataMerchandises.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });
          this.dataImageMerchandises = response.data.dataImageMerchandises;

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

          this.checkRoleAndDeleteIfMismatch();

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

    // LogoutAuto
    checkRoleAndDeleteIfMismatch() {
      console.log(this.userLogin.role, 'role matching', this.myProfile.role)
      if (this.userLogin.role !== this.myProfile.role) {
        // Roles don't match, delete the localStorage item
        this.logout();
        // You can perform other actions as needed
        console.log('Role mismatch. LocalStorage item deleted.');
      } else {
        // Roles match, you can perform other actions if needed
        console.log('Role match.');
      }
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

    // Adds On
    openNewPage() {
      const link =
        "https://www.linkedin.com/in/doni-dwi-irawan-818029182?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";
      window.open(link, "_blank");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    // For zoom image
    zoom(img) {
      this.getImage = img;
      this.dialogZoom = true;
    },
    // Reset array image merchan
    resetDetailImageMerchandise() {
      // Set detailImageMerchandise to an empty array
      this.detailImageMerchandise = [];
    },
    // Random Color
    generateRandomColor() {
      // Generate a random color in hexadecimal format
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    getMerchandiseThumbnail(UUIDProduk) {
      // Find the corresponding merchandise based on UUID
      const matchingMerchandise = this.dataMerchandises.find(
        (merchandise) => merchandise.uuid === UUIDProduk
      );

      // Check if matching merchandise is found
      if (matchingMerchandise) {
        // Return the dynamically generated URL
        return this.$baseUrl + "/storage/" + matchingMerchandise.thumbnail;
      } else {
        // Return a default URL or handle the case where no matching merchandise is found
        return "https://picsum.photos/400/400/?image=20";
      }
    },

    getProductNames(uuid) {
      return this.dataOrderProductsMerchandise
        .filter(
          (dataOrderProductMerchandise) =>
            dataOrderProductMerchandise.uuidOrderMerchandise === uuid
        )
        .map(
          (dataOrderProductMerchandise) =>
            dataOrderProductMerchandise.namaProduk
        );
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + " and more";
      }
      return text;
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

    // Search
    handleInput() {
      if (this.searchMerchandise.trim() === "") {
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
      this.searchResults = this.dataMerchandises.filter((merchandise) =>
        merchandise.nama
          .toLowerCase()
          .includes(this.searchMerchandise.toLowerCase())
      );
    },

    // Footer
    openInstagramFooter() {
      window.open('https://www.instagram.com/hafallart/', "_blank");
    },
    openYoutubeFooter() {
      window.open('https://www.youtube.com/@haforastudio9615', "_blank");
    },
    openTiktokFooter() {
      window.open('https://www.tiktok.com/@hafallart', "_blank");
    },
    sendEmail() {
      // Replace 'recipient@example.com' with the actual email address
      const emailAddress = 'haf3334444@gmail.com';

      // Construct the mailto link
      const mailtoLink = `mailto:${emailAddress}`;

      // Open the default email client with the mailto link
      window.location.href = mailtoLink;
    },
    // End Footer
  },
};
</script>

<style scoped>
.disabled-div {
  pointer-events: none; /* Prevents user interaction */
  opacity: 0.5; /* Visually indicates the disabled state */
  /* Add any other styles you want for the disabled state */
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
/* Zoom */
.img-zoom-full {
  height: 100%;
  width: 100%;
}
/* Card */
.card-merchandise {
  position: relative;
  width: 165px;
  height: 16.5em;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 120ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0.5em;
  padding-bottom: 3.4em;
  border-radius: 10px;
  margin: 5px;
}

.card-merchandise:hover {
  box-shadow: 0 8px 50px #23232333;
}

.card-merchandise .title-merchandise {
  font-size: 14px;
  position: absolute;
  left: 0.625em;
  bottom: 1.875em;
  font-weight: 400;
  color: #000;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 19ch;
}

.card-merchandise .price-merchandise {
  font-size: 14px;
  position: absolute;
  left: 0.625em;
  bottom: 0.625em;
  color: #000;
}

.card-merchandise:hover::after {
  bottom: 0;
  opacity: 1;
}

.card-merchandise:active {
  transform: scale(0.98);
}

.text-merchandise {
  max-width: 55px;
}

.image-size {
  width: 100%;
  height: 100%;
}

.card-merchandise:hover .image-size .image-merchandise {
  transform: scale(+102%);
}
.card-merchandise:hover .title-merchandise {
  transform: scale(+102%);
  color: #006598;
}
.card-merchandise:hover .price-merchandise {
  transform: scale(+102%);
  color: #006598;
}
/* /Card */

/* Search */
.coolinput {
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: static;
  width: 250px;
}

.coolinput label.text {
  font-size: 0.75rem;
  color: #006598;
  font-weight: 600;
  position: relative;
  top: 0.5rem;
  margin: 0 0 0 7px;
  padding: 0 3px;
  background: #ffffff;
  width: fit-content;
}

.coolinput input[type="text"].input {
  padding: 11px 10px;
  font-size: 14px;
  border: 2px #006598 solid;
  border-radius: 20px;
  background: #ffffff00;
  color: #006598;
}

.coolinput input[type="text"].input:focus {
  outline: none;
}
/* End Search */
.size-bar-home {
  padding-right: 150px;
  padding-left: 150px;
}

/* Footer */
.hoverMyName:hover {
  color: rgb(125, 213, 237);
}
.footer-dark {
  padding: 20px 0;
  color: #f0f9ff;
  background-color: #282d32;
}

.footer-dark h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 16px;
}

.footer-dark ul {
  padding: 0;
  list-style: none;
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 0;
}

.footer-dark ul a {
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
}

.footer-dark ul a:hover {
  opacity: 0.8;
}

.footer-dark .item.text p {
  opacity: 0.6;
  margin-bottom: 0;
}

.footer-dark .item.social {
  text-align: center;
}

.footer-dark .item.text {
  margin-bottom: 36px;
}

.footer-dark .item.social > a {
  font-size: 20px;
  width: 36px;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
  margin-left: 1.5px;
  margin-right: 1.5px;
  margin-top: 5px;
  color: #fff;
  opacity: 0.75;
}

.footer-dark .item.social > a:hover {
  opacity: 0.9;
}

.footer-dark .copyright {
  text-align: center;
  padding-top: 24px;
  opacity: 0.3;
  font-size: 13px;
  margin-bottom: 0;
}
/* /Footer */
@media (max-width: 767px) {
  .container-footer{
    width: 90% !important;
  }
  .searchDiv {
    width: 200px;
  }
  .size-bar-home {
    padding-right: 0px;
    padding-left: 0px;
  }

}

@media (max-width: 991px) {
  .size-bar-home {
    padding-right: 0px;
    padding-left: 0px;
  }
}
</style>
