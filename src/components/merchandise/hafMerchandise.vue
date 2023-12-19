<template>
  <v-main>
    <loading-screen
      :value="loadingScreen"
      style="z-index: 100"
    ></loading-screen>
    <div class="container" style="padding-top: 0px">
      <div class="d-flex mb-3 size-bar-home">
        <b-nav>
          <b-nav-item>
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
          </b-nav-item>
          <b-nav-item>
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
                v-model="searchMerchandise"
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
          <p>Result for {{ searchMerchandise }}</p>
          <div class="row" v-if="searchResults.length > 0">
            <div class="row" style="justify-content: center; max-width: none">
              <div
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
            <div class="row no-gutters">
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
          <h4>Recommended</h4>
          <div
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
              <div style="margin: 5px 15px 15px">
                <hr />
                <p>Order</p>
                <b-form-spinbutton
                  id="sb-small"
                  size="sm"
                  placeholder="-"
                  v-model="totalPcs"
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
    <v-dialog v-model="dialogCart" width="1000px">
      <template>
        <v-stepper v-model="e6" vertical>
          <div
            style="
              justify-content: end;
              display: flex;
              margin-top: 20px;
              margin-right: 20px;
            "
          >
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

          <v-stepper-content step="1">
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
            style="text-transform: unset !important"
            plain
            text
            @click="dialogOrderHistory = false"
            ><v-icon dense color="#FF0000" class="data-table-icon"
              >mdi-close</v-icon
            ></v-btn
          >
        </v-card-actions>
        <h3
          class="f-24 f-md-20 f-secondary text-center"
          style="margin-bottom: 50px; font-family: 'Georgia'; font-weight: bold"
        >
          Your Order Tansaction
        </h3>

        <template>
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
                      @click.stop="handleOrderproducts(item.uuid)"
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
        <h5
          class="f-24 f-md-20 f-secondary text-center"
          style="
            margin-bottom: 20px;
            font-family: 'Georgia';
            font-weight: bold;
            padding-top: 30px;
          "
        >
          Detail Poduct Ordered
        </h5>
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

    <!-- Loading -->
    <v-dialog v-model="dialogLoader" hide-overlay persistent width="300">
      <v-card color="#006598" dark>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card>
    </v-dialog>
    <!-- End Loading -->

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

    // Search
    searchMerchandise: "",
    searchResults: [],
    isInputOn: 0,

    // Add To Cart
    totalPcs: 0,
    notes: "",
    merchandiseName: "",
    merchandiseDesc: "",
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
    },
  }),
  computed: {},
  created() {
    this.axioDataMerchandise();
    this.axioDataOrderMerchandise();
    this.axioDataMyProfile();
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
    handleAddNoResi(uuidAddNoResi) {
      this.uuidAddNoResi = uuidAddNoResi;
      this.dialogAddNoResi = true;
    },

    handlerConfirmPayment(item) {
      this.confirmPayment(item.uuid);
    },

    handleOrderproducts(itemUuid) {
      this.axioGetDataDetailOrderProductsMerchandise(itemUuid);
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
      this.dialogDetail = true;
      this.itemProduct = item;
      this.merchandiseName = item.nama;
      this.merchandiseDesc = item.deskripsi;

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
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.axioDataOrderMerchandise();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
          this.dialogConfirmDelete = false;
        });
    },

    addToProducts(itemProduct) {
      this.dialogLoader = true;

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
        .then((response) => {
          this.error_message = response.data.message;
          console.log(this.error);
          this.dialogConfirmDelete = false;
          this.axioDataOrderMerchandise();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error);
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
        .then((response) => {
          // Handle respon dari backend jika diperlukan
          console.log(response.data);

          this.axioDataOrderMerchandise();

          this.dialogAddNoResi = false;
          this.shipmentTrackingNumber = "";
        })
        .catch((error) => {
          // Handle error jika ada
          console.error(error);
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
        })
        .catch((error) => {
          // Handle error jika ada
          console.error(error);
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
          this.e6 = 1;
          this.messageTotalCart = this.products.length;

          this.axioDataMerchandise();
          this.axioDataOrderMerchandise();
        })
        .catch((error) => {
          // Handle error jika ada
          console.error(error);
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
      this.loadingScreen = true;
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
            this.loadingScreen = false;
          }, 300);
        })
        .catch((error) => {
          // Menangani kesalahan jika terjadi
          console.error("Error fetching Comic data:", error);
          this.loadingScreen = false;
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

.size-bar-home {
  padding-right: 150px;
  padding-left: 150px;
}

@media (max-width: 767px) {
  .searchDiv {
    width: 200px;
  }
  .size-bar-home {
    padding-right: 0px;
    padding-left: 0px;
  }

  .btn-search:focus ~ .input-search {
    width: 250px;
    border-radius: 0px;
    background-color: transparent;
    border: 0.5px solid #006598;
    border-radius: 25px;
    transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
  }

  .input-search:focus {
    width: 250px;
    border-radius: 0px;
    background-color: transparent;
    border: 0.5px solid #006598;
    border-radius: 25px;
    transition: all 0.5s cubic-bezier(0, 0.11, 0.35, 2);
  }
}

@media (max-width: 991px) {
  .size-bar-home {
    padding-right: 0px;
    padding-left: 0px;
  }
}
</style>
