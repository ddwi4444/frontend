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
      <p>Doni Dwi Irawan</p>
    </v-card-text>

    <div>
      <b-tabs content-class="mt-5" align="center" style="padding-left: 0px">
        <b-tab title="Profile" active>
          <div>
            
          </div>
        </b-tab>
        <b-tab title="Review">
          <div style="display: flex">
            <center></center>
          </div>
        </b-tab>
        <b-tab title="Order">
          <div></div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-view",
  data() {
    return {};
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.statistic {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
