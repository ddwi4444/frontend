<template>
  <v-main>
    <div class="container">
      <div class="d-flex mb-3 size-bar-home">
        <b-nav>
          <b-nav-item>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="blue"
              @click="dialogCart = true"
            >
              <b-icon icon="cart" aria-hidden="true"></b-icon>
            </v-btn>
          </b-nav-item>
          <b-nav-item>
            <div class="search-box" style="padding-top: 3px">
              <button class="btn-search">
                <b-icon-search></b-icon-search>
              </button>
              <input
                type="text"
                class="input-search"
                placeholder="Type to Search..."
              />
            </div>
          </b-nav-item>
        </b-nav>
      </div>

      <div class="row">
        <div class="row" style="margin-top: 30px; justify-content: center">
          <h4>Recommended</h4>
          <div @click="dialogDetail = true" class="card-merchandise">
            <div class="image-size">
              <img
                class="image-merchandise"
                style="width: 100%; height: 100%; object-fit: cover"
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
            </div>
            <span class="title-merchandise">Cool Chair</span>
            <span class="price-merchandise">$100</span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <v-dialog v-model="dialogDetail" width="800px">
        <v-card>
          <v-card-title class="lighten-2" style="padding: 0px">
            <div class="row" style="padding: 0px; margin: 0px">
              <div
                class="col-md-6"
                style="display: flex; justify-content: start"
              >
                Detail
              </div>
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

          <div
            class="row g-0"
            style="justify-content: center; margin-top: 10px"
          >
            <div class="col-md-5">
              <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="text-h2">
                        <img
                          class="image-merchandise"
                          style="object-fit: cover"
                          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                          alt=""
                        />
                      </div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
            <div class="col-md-5">
              <h5 class="justify-center">Jacket</h5>
              <p style="text-align: justify; margin: 15px; margin-top: 5px">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <v-form style="margin: 5px 15px 15px">
                <hr />
                <p>Order</p>
                <b-form-spinbutton
                  id="sb-small"
                  size="sm"
                  placeholder="-"
                ></b-form-spinbutton>
                <v-text-field
                  :counter="10"
                  label="Notes"
                  required
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="mx-2" fab dark small color="blue">
                    <b-icon icon="cart-plus" aria-hidden="true"></b-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>

    <!-- Doalog Cart -->
    <div class="text-center">
      <v-dialog v-model="dialogCart" width="800px">
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
            <v-stepper-step
              :complete="e6 > 1"
              step="1"
              style="padding-top: 0px"
            >
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
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon dense color="#316291" @click="this.detailHandler(item)"
                        >mdi-delete-circle-outline</v-icon
                      >
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
              <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">
              Shipping From
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
                    Your order will be proccess by admin and summary the
                    shipping cost. You have to transfer the bill after admin
                    accepted your order.
                  </p>
                </template>
              </v-card>
              <v-btn :disabled="!valid" color="primary" @click="e6 = 1">
                Create Order
              </v-btn>
              <v-btn @click="e6 = 1" text> Back </v-btn>
            </v-stepper-content>
          </v-stepper>
        </template>
      </v-dialog>
    </div>
  </v-main>
</template>

<style>
/* Card */
.card-merchandise {
  position: relative;
  width: 11.875em;
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
}

.card-merchandise .title-merchandise {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  position: absolute;
  left: 0.625em;
  bottom: 1.875em;
  font-weight: 400;
  color: #000;
}

.card-merchandise .price-merchandise {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 0.9em;
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
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: #2277b3;
  padding-right: 40px;
  color: rgb(44, 180, 243);
}
.input-search::placeholder {
  color: rgba(44, 180, 243, 0.5);
  font-size: 18px;
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
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
  justify-content: center;
  margin-top: 2px;
}
.btn-search:focus ~ .input-search {
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(44, 180, 243, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
.input-search:focus {
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom: 1px solid rgba(44, 180, 243, 0.5);
  transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}
/* /Button Search */
</style>

<script lang="ts">
export default {
  data() {
    return {
      e6: 1,
      dialogDetail: false,
      dialogCart: false,
      valid: false,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      address: "",
      addressRules: [(v) => !!v || "Address is required"],
      telephone: "",
      telephoneRules: [(v) => !!v || "Telephone is required"],
      headers: [
        {
          text: "Product",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Quantity", value: "quantity", sortable: false },
        { text: "Price", value: "price", sortable: false },
        { text: "Note", value: "note", sortable: false },
        { text: "Action", value: "actions", sortable: false },
      ],
      products: [
        {
          name: "Frozen Yogurt",
          quantity: 1,
          price: "Rp. 70.000",
          note: "Try make changes to the first text box in the data-table for testing purpose and check the console it updates the items object on typing",
        },
        {
          name: "Frozen Yogurt",
          quantity: 2,
          price: "Rp. 70.000",
          note: "Try make changes to the first text box in the data-table for testing purpose and check the console it updates the items object on typing",
        },
        {
          name: "Frozen Yogurt",
          quantity: 3,
          price: "Rp. 70.000",
          note: "Try make changes to the first text box in the data-table for testing purpose and check the console it updates the items object on typing",
        },
      ],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  methods: {
    detailHandler(item) {
      console.log(item);
    },
  },
};
</script>
