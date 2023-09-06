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
      <h5 style="margin-bottom: 0px;">{{ getNamaPersona }}</h5>
    </v-card-text>

    <div>
      <b-tabs align="center" style="padding-left: 0px">
        <b-tab title="Profile" active>
          <b-container>
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
                <br>
                <p class="ma-0 pa-0">Hobby : Memasak, Membaca Dongeng, minum teh, dan berjalan jalan.</p>
                <p class="ma-0 pa-0">Like : Bakso, Darah, orang yang mentaati peraturan, langit malam dan Rasi Bintang, Musik klasik.</p>
                <p class="ma-0 pa-0">Did not Like : Bakso, Darah, orang yang mentaati peraturan, langit malam dan Rasi Bintang, Musik klasik.</p>
                <br>
                <p class="ma-0 pa-0">Quotes :<br>“May God Forgive Your sin”</p>
                <h3 class="ma-0 pa-0" style="color: #a36e1e;">............</h3>


              </b-col>
              <b-col sm="4">
                <b-img fluid src="https://historicalartfantasia.files.wordpress.com/2022/11/fullbody-gilang-1-b-ilkom-m.-rafael-indrawan.png" alt="Character"></b-img>              
              </b-col>
            </b-row>
          </b-container>
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
  computed: {
    getNamaPersona() {
      return localStorage.getItem("nama_persona");
    },
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
