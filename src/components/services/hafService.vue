<template>
  <v-main>
    <div class="container">
      <div class="row">
        <div class="row" style="margin-top: 30px; justify-content: center">
          <h4>Recommended</h4>
          <div class="card-service">
            <div class="card-details">
              <div class="image-service-size" style="height: 100%; width: 100%">
                <img
                  class="card__img-service"
                  src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
              </div>
              <p
                class="text-title"
                style="margin-bottom: 0px; margin-top: 10px"
              >
                Vishnji Kiyokama
              </p>
              <p>30 Projects</p>
            </div>
            <button @click="dialogDetail = true" class="card-button-service">
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
              src="https://cdn1.katadata.co.id/media/images/thumb/2022/11/10/Ilustrasi_Ciri-ciri_Orang_Yang_Bersyukur-2022_11_10-13_22_48_d368708753bdc5c3131472013522d76c_960x640_thumb.jpg"
              alt="Avatar"
            />
          </v-card-title>

          <v-card-text>
            <v-row align="center" class="">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-row>
            <div class="grey--text mt-3">4.5 (413)</div>
          </v-card-text>

          <div>
            <b-tabs
              content-class="mt-5"
              align="center"
              style="padding-left: 0px"
            >
              <b-tab title="Portfolio" active>
                <b-container fluid class="p-4 bg-transparent">
                  <b-row>
                    <b-col>
                      <b-img
                        thumbnail
                        fluid
                        src="https://picsum.photos/250/250/?image=54"
                        alt="Image 1"
                      ></b-img>
                    </b-col>
                    <b-col>
                      <b-img
                        thumbnail
                        fluid
                        src="https://picsum.photos/250/250/?image=58"
                        alt="Image 2"
                      ></b-img>
                    </b-col>
                    <b-col>
                      <b-img
                        thumbnail
                        fluid
                        src="https://picsum.photos/250/250/?image=59"
                        alt="Image 3"
                      ></b-img>
                    </b-col>
                  </b-row>
                </b-container>
              </b-tab>
              <b-tab title="Review">
                <div style="display: flex">
                  <center>
                    <!--BOX-1-------------->
                    <div class="testimonial-box">
                      <!--top------------------------->
                      <div class="box-top">
                        <!--profile----->
                        <div class="profile">
                          <!--img---->
                          <div class="profile-img">
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                            />
                          </div>
                          <!--name-and-username-->
                          <div class="name-user">
                            <strong>Liam mendes</strong>
                            <span>20 May 2012</span>
                          </div>
                        </div>
                        <!--reviews------>
                        <div class="reviews">
                          <v-rating
                            :value="3.8"
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
                      <div class="client-comment" style="text-align: justify">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Exercitationem, quaerat quis? Provident
                          temporibus architecto asperiores nobis maiores nisi a.
                          Quae doloribus ipsum aliquam tenetur voluptates
                          incidunt blanditiis sed atque cumque.
                        </p>
                      </div>
                    </div>
                    <div class="testimonial-box">
                      <!--top------------------------->
                      <div class="box-top">
                        <!--profile----->
                        <div class="profile">
                          <!--img---->
                          <div class="profile-img">
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                            />
                          </div>
                          <!--name-and-username-->
                          <div class="name-user">
                            <strong>Liam mendes</strong>
                            <span>20 May 2012</span>
                          </div>
                        </div>
                        <!--reviews------>
                        <div class="reviews">
                          <v-rating
                            :value="3.8"
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
                      <div class="client-comment" style="text-align: justify">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Exercitationem, quaerat quis? Provident
                          temporibus architecto asperiores nobis maiores nisi a.
                          Quae doloribus ipsum aliquam tenetur voluptates
                          incidunt blanditiis sed atque cumque.
                        </p>
                      </div>
                    </div>
                    <div class="testimonial-box">
                      <!--top------------------------->
                      <div class="box-top">
                        <!--profile----->
                        <div class="profile">
                          <!--img---->
                          <div class="profile-img">
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                            />
                          </div>
                          <!--name-and-username-->
                          <div class="name-user">
                            <strong>Liam mendes</strong>
                            <span>20 May 2012</span>
                          </div>
                        </div>
                        <!--reviews------>
                        <div class="reviews">
                          <v-rating
                            :value="3.8"
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
                      <div class="client-comment" style="text-align: justify">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Exercitationem, quaerat quis? Provident
                          temporibus architecto asperiores nobis maiores nisi a.
                          Quae doloribus ipsum aliquam tenetur voluptates
                          incidunt blanditiis sed atque cumque.
                        </p>
                      </div>
                    </div>
                  </center>
                </div>
              </b-tab>
              <b-tab title="Order">
                <div>
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
                        v-model="name"
                        :state="state"
                        trim
                      ></b-form-input>
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
                        v-model="name"
                        :state="state"
                        trim
                      ></b-form-input>
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
                        v-model="name"
                        :state="state"
                        trim
                      ></b-form-input>
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
                    </div>
                    <div class="col-sm-7" style="text-align: start">
                      <b-form-file
                        style="width: 300px"
                        v-model="file2"
                        class="mt-3"
                        plain
                      ></b-form-file>
                      <div class="mt-3">
                        Selected file: {{ file2 ? file2 : "" }}
                      </div>
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
                    ></div>
                    <div class="col-sm-7" style="text-align: start">
                      <v-btn small color="primary" dark> Order </v-btn>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-main>
</template>

<style>
/* Card */
.card-service {
  width: 190px;
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
  cursor: pointer;
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
.testimonial-box:hover {
  transform: translateY(-10px);
  transition: all ease 0.3s;
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

<script lang="ts">
export default {
  computed: {
    state() {
      return this.name.length >= 4;
    },
    invalidFeedback() {
      if (this.name.length > 0) {
        return "Enter at least 4 characters.";
      }
      return "Please enter something.";
    },
  },
  data() {
    return {
      dialogDetail: false,
      name: "",
      file2: null,
    };
  },
};
</script>
