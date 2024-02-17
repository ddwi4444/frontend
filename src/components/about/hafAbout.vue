<template>
  <v-main>
    <loading-screen :value="loadingScreen"></loading-screen>

    <div style="padding-top: 35px" data-aos="zoom-in" data-aos-duration="2000">
      <H1 style="font-family: Georgia, serif; margin: 0px"
        >Historical Art Fantasia</H1
      >
      <p style="font-family: Georgia, serif; margin: 0px; font-weight: lighter">
        "Be Creative, smart, and learning forever"
      </p>
    </div>

    <div data-aos="fade-up" data-aos-duration="2000">
      <center>
        <b-nav
          tabs
          style="
            align-items: center;
            justify-content: center;
            display: flex;
            padding-top: 50px;
          "
        >
          <b-nav-item
            v-if="isAboutHafOn == 1"
            active
            @click="handlerClickAboutHaf"
            >About HAF</b-nav-item
          >
          <b-nav-item v-else @click="handlerClickAboutHaf"
            >About HAF</b-nav-item
          >
          <b-nav-item
            v-if="isStudentsHafOn == 1"
            active
            @click="handlerClickStudentsHaf"
            >HAF Students Book</b-nav-item
          >
          <b-nav-item v-else @click="handlerClickStudentsHaf"
            >HAF Students Book</b-nav-item
          >
          <b-nav-item v-if="isNpcHafOn == 1" active @click="handlerClickNpcHaf"
            >HAF NPC Book</b-nav-item
          >
          <b-nav-item v-else @click="handlerClickNpcHaf"
            >HAF NPC Book</b-nav-item
          >
        </b-nav>
      </center>
    </div>

    <!-- Untuk About Haf -->
    <transition name="fade">
      <div
        v-if="isAboutHafOn == 1 && this.isStudentsHafOn == 0 && isNpcHafOn == 0"
        class="container"
        style="padding-top: 20px"
      >
        <center>
          <div style="width: 60%" class="containerAboutHaf">
            <img
              data-aos="fade-up"
              data-aos-duration="2000"
              style="width: 250px; margin-bottom: 30px"
              src="@/assets/logoHAF2.png"
            />

            <p data-aos="fade-up" data-aos-duration="2000">
              <span style="font-weight: bold">HAF</span> Adalah Singkatan dari
              <span style="font-weight: bold">Historical Art Fantasia</span>,
              yang Memiliki arti Historical (Sejarah), Art (Seni), Fantasia
              (Fantasi/dunia fantasi/Bertemakan Fantasi). HAF pertama kali di
              cetuskan oleh Arga Diagsena yang kemudian mengajak adiknya yang
              bernama Gilang Laeth Vonellon bergabung. HAF sendiri dalam
              kisahnya adalah sekolah/akademi fantasi yang dibangun di atas
              tanah negeri Selatan yang luas. Negeri Selatan dikenal sebagai
              negeri yang berhasil bangkit dari keterpurukannya dan menjadi
              negri yang makmur. Rakyat nya dikenal menjunjung tinggi ilmu
              pengetahuan juga keindahan seni. Negeri Selatan diberkahi dengan
              Bunga Daffodil yang menjaga wilayahnya. Bunga daffodil tersebut
              tumbuh banyak di seluruh negri. tepat di sekolah HAF, kristal
              penjaga seluruh negri berdiam dan terus dijaga keberadaanya oleh
              seluruh siswa dan pengurus disana.
            </p>
            <p data-aos="fade-up" data-aos-duration="2000">
              HAF pertamakali diresmikan pada tanggal
              <span style="font-weight: bold">02 Agustus 2019</span> oleh
              keempat pengurus awalnya. Keempatnya adalah pengurus HAF yang
              mengabdi bersama para anggota OSIS HAF, membangun HAF yang sudah
              mencapai tahun ketiga nya berdiri dengan total sejauh ini menuju
              season 5. Grup ini sendiri mengusung konsep sekolah/akademi
              bergaya eropa dan memiliki konsep luxury & aesthetic.
            </p>

            <hr
              data-aos="fade-up"
              data-aos-duration="2000"
              style="color: #4a1d00 !important; border: 1px solid !important"
            />

            <H3
              data-aos="fade-up"
              data-aos-duration="2000"
              style="
                font-family: Georgia, serif;
                margin: 0px;
                background-color: #683c1f;
                color: white;
                height: 50px;
                align-items: center;
                display: flex;
                margin-bottom: 30px;
                justify-content: center;
              "
              >Our Students Project</H3
            >

            <h4
              data-aos="fade-up"
              data-aos-duration="2000"
              @click="openNewPageYoutubeOtomo"
              class="hafProject"
              style="
                margin: 0px;
                margin-top: 20px;
                cursor: pointer;
                margin-bottom: 20px;
              "
            >
              🎮 HAF Otomo Game Project 🎮
            </h4>

            <div
              class="youtube-container"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <iframe
                width="600"
                height="400"
                :src="youtubeEmbedUrl1"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>

            <h4
              data-aos="fade-up"
              data-aos-duration="2000"
              @click="openNewPageMVMusic"
              class="hafProject"
              style="
                margin: 0px;
                margin-top: 40px;
                cursor: pointer;
                margin-bottom: 20px;
              "
            >
              🎶 HAF MV Cover Project 🎶
            </h4>

            <div
              class="youtube-container"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <iframe
                width="600"
                height="400"
                :src="youtubeEmbedUrl2"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </center>
      </div>
    </transition>
    <!-- End Untuk About Haf -->

    <!-- Untuk Students HAF -->
    <transition name="fade">
      <div
        v-if="isAboutHafOn == 0 && this.isStudentsHafOn == 1 && isNpcHafOn == 0"
        class="container"
        style="padding-top: 20px"
      >
        <center>
          <div style="width: 60%" class="containerAboutHaf">
            <H3
              style="font-family: Georgia, serif; margin: 0px"
              data-aos="fade-up"
              data-aos-duration="2000"
              >Student Year Book · S4</H3
            >

            <img
              style="width: 100%; margin-bottom: 30px; margin-top: 20px"
              data-aos="fade-up"
              data-aos-duration="2000"
              src="@/assets/hafstudents.jpg"
            />

            <p style="margin: 0" data-aos="fade-up" data-aos-duration="2000">
              Selamat datang di Student Year Book HAF season 4. Segala rekam
              jejak dari para siswa HAF terkumpul disini dengan berbagai cerita
              dan juga petualangan di dalamnya.
            </p>
            <p data-aos="fade-up" data-aos-duration="2000">
              Bukalah buku menuju dunia impianmu,Historical Art Fantasia akan
              membawamu menuju tempat yang indah di negeri selatan.
            </p>

            <p
              style="font-size: 10px"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              *Silahkan click gambar karakter yang kamu ingin lihat biodata dan
              backstorynya
            </p>

            <H4
              data-aos="fade-up"
              data-aos-duration="2000"
              style="
                font-family: Georgia, serif;
                margin: 0px;
                background-color: #683c1f;
                color: white;
                height: 50px;
                align-items: center;
                display: flex;
                margin-bottom: 30px;
                justify-content: center;
                border-radius: 20px;
              "
              >HAF Students Council</H4
            >

            <div
              class="section"
              style="margin-bottom: 30px; margin: 0px; padding: 0px"
            >
              <div
                class="row"
                style="
                  justify-content: center;
                  max-width: none;
                  margin: 0px;
                  padding: 0px;
                "
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  class="cardSNPC"
                  v-for="filteredStudent in filteredStudentsOsis"
                  :key="filteredStudent.id"
                  :class="{ cardSNPCHover: filteredStudent.quotes != null }"
                >
                  <div
                    @click.stop="
                      handlerClickDetailProfile(
                        filteredStudent.story_character,
                        filteredStudent.nama_persona
                      )
                    "
                    class="cardSNPC"
                    style="
                      padding: 0px;
                      margin: 0px;
                      background-size: cover;
                      background-position: center;
                    "
                    :class="{ cardSNPCHover: filteredStudent.quotes != null }"
                    :style="{
                      'background-image':
                        'url(' +
                        $baseUrl +
                        '/storage/' +
                        filteredStudent.image +
                        ')',
                    }"
                  >
                    <div class="detailsSNPC">
                      <label>{{ filteredStudent.nama_persona }}</label>
                      <p style="text-align: justify !important">
                        "{{ filteredStudent.quotes }}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <H4
              data-aos="fade-up"
              data-aos-duration="2000"
              style="
                font-family: Georgia, serif;
                margin: 0px;
                margin-top: 30px;
                background-color: #683c1f;
                color: white;
                height: 50px;
                align-items: center;
                display: flex;
                justify-content: center;
                border-radius: 20px;
              "
              >HAF Students</H4
            >

            <div
              class="flex"
              style="
                justify-content: start !important;
                display: flex !important;
                margin-bottom: 30px;
                width: 90%;
              "
            >
              <div
                class="coolinput"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <label for="input-name" class="text">Search student</label>
                <input
                  type="text"
                  v-model="searchStudent"
                  @keyup.enter="searchStudent"
                  @input="handleInputStudent"
                  placeholder="Write student name here..."
                  name="input"
                  class="input"
                />
              </div>
            </div>

            <transition name="fade">
              <div
                v-if="isInputOnStudent == 1"
                class="section"
                style="margin-bottom: 30px; margin: 0px; padding: 0px"
              >
                <div
                  class="row"
                  style="
                    justify-content: center;
                    max-width: none;
                    margin: 0px;
                    padding: 0px;
                  "
                >
                  <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    class="cardSNPC"
                    v-for="filteredStudent in searchResultsStudent"
                    :key="filteredStudent.id"
                    :class="{ cardSNPCHover: filteredStudent.quotes != null }"
                  >
                    <div
                      @click.stop="
                        handlerClickDetailProfile(
                          filteredStudent.story_character,
                          filteredStudent.nama_persona
                        )
                      "
                      class="cardSNPC"
                      style="
                        padding: 0px;
                        margin: 0px;
                        background-size: cover;
                        background-position: center;
                      "
                      :class="{ cardSNPCHover: filteredStudent.quotes != null }"
                      :style="{
                        'background-image':
                          'url(' +
                          $baseUrl +
                          '/storage/' +
                          filteredStudent.image +
                          ')',
                      }"
                    >
                      <div class="detailsSNPC">
                        <label>{{ filteredStudent.nama_persona }}</label>
                        <p style="text-align: justify !important">
                          "{{ filteredStudent.quotes }}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div
                v-if="isInputOnStudent == 0"
                class="section"
                style="margin-bottom: 30px; margin: 0px; padding: 0px"
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  class="row"
                  style="
                    justify-content: center;
                    max-width: none;
                    margin: 0px;
                    padding: 0px;
                  "
                >
                  <div
                    class="cardSNPC"
                    v-for="filteredStudent in paginateDataStudent"
                    :key="filteredStudent.id"
                    :class="{ cardSNPCHover: filteredStudent.quotes != null }"
                  >
                    <div
                      @click.stop="
                        handlerClickDetailProfile(
                          filteredStudent.story_character,
                          filteredStudent.nama_persona
                        )
                      "
                      class="cardSNPC"
                      style="
                        padding: 0px;
                        margin: 0px;
                        background-size: cover;
                        background-position: center;
                      "
                      :class="{ cardSNPCHover: filteredStudent.quotes != null }"
                      :style="{
                        'background-image':
                          'url(' +
                          $baseUrl +
                          '/storage/' +
                          filteredStudent.image +
                          ')',
                      }"
                    >
                      <div class="detailsSNPC">
                        <label>{{ filteredStudent.nama_persona }}</label>
                        <p style="text-align: justify !important">
                          "{{ filteredStudent.quotes }}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Pagination controls with limited page numbers -->
                  <div
                    class="pagination"
                    v-if="paginateDataStudent.length != 0"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-offset="0"
                  >
                    <button
                      @click="prevPageStudent"
                      :disabled="currentPage === 1"
                    >
                      Previous
                    </button>
                    <span
                      style="padding: 0px !important"
                      v-for="pageNumber in visiblePageNumbersDataStudent"
                      :key="pageNumber"
                    >
                      <button
                        @click="gotoPageStudent(pageNumber)"
                        :class="{ active: pageNumber === currentPage }"
                      >
                        {{ pageNumber }}
                      </button>
                    </span>
                    <button
                      @click="nextPageStudent"
                      :disabled="
                        currentPage * pageSize >= filteredStudentsStudent.length
                      "
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </center>
      </div>
    </transition>
    <!-- End Untuk Students HAF -->

    <!-- Untuk NPC -->
    <transition name="fade">
      <div
        v-if="isAboutHafOn == 0 && this.isStudentsHafOn == 0 && isNpcHafOn == 1"
        class="container"
        style="padding-top: 20px"
      >
        <center>
          <div style="width: 60%" class="containerAboutHaf">
            <H3
              style="font-family: Georgia, serif; margin: 0px"
              data-aos="fade-up"
              data-aos-duration="2000"
              >HAF NPC Book</H3
            >

            <img
              style="width: 100%; margin-bottom: 30px; margin-top: 20px"
              data-aos="fade-up"
              data-aos-duration="2000"
              src="@/assets/enemies-karzer.jpg"
            />

            <p data-aos="fade-up" data-aos-duration="2000">
              Selamat datang di ‘HAF NPC BOOK’. Dunia HAF yang luas penuh dengan
              berbagai makhluk dan karakter yang berbeda beda. mari mengenal
              mereka dan masuk lebih jauh ke dalam dunia HAF.
              <br />
              Bukalah buku menuju dunia impianmu, Historical Art Fantasia akan
              membawamu menuju tempat yang indah di dalam buku nya yang ajaib.
            </p>

            <p
              data-aos="fade-up"
              data-aos-duration="2000"
              style="font-size: 10px"
            >
              *Silahkan click gambar karakter yang kamu ingin lihat biodata dan
              backstorynya
            </p>

            <H4
              data-aos="fade-up"
              data-aos-duration="2000"
              style="
                font-family: Georgia, serif;
                margin: 0px;
                background-color: #683c1f;
                color: white;
                height: 50px;
                align-items: center;
                display: flex;
                justify-content: center;
                border-radius: 20px;
              "
              >NPC List</H4
            >

            <div
              class="flex"
              style="
                justify-content: start !important;
                display: flex !important;
                margin-bottom: 30px;
                width: 90%;
              "
            >
              <div
                class="coolinput"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <label for="input-name" class="text">Search NPC</label>
                <input
                  type="text"
                  v-model="searchNPC"
                  @keyup.enter="searchNPC"
                  @input="handleInputNPC"
                  placeholder="Write NPC name here..."
                  name="input"
                  class="input"
                />
              </div>
            </div>

            <transition name="fade">
              <div
                v-if="isInputOnNPC == 1"
                class="section"
                style="margin-bottom: 30px; margin: 0px; padding: 0px"
              >
                <div
                  class="row"
                  style="
                    justify-content: center;
                    max-width: none;
                    margin: 0px;
                    padding: 0px;
                  "
                >
                  <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    class="cardSNPC"
                    v-for="npc in searchResultsNPC"
                    :key="npc.id"
                  >
                    <div
                      @click.stop="
                        handlerClickDetailNPC(
                          npc.npc_name,
                          npc.npc_profile,
                          npc.npc_story,
                          npc.image_npc
                        )
                      "
                      class="cardSNPC"
                      style="
                        padding: 0px;
                        margin: 0px;
                        background-size: cover;
                        background-position: center;
                      "
                      :style="{
                        'background-image':
                          'url(' + $baseUrl + '/storage/' + npc.image_npc + ')',
                      }"
                    >
                      <div class="detailsSNPCNPC">
                        <label>{{ npc.npc_name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade">
              <div
                v-if="isInputOnNPC == 0"
                class="section"
                style="margin-bottom: 30px; margin: 0px; padding: 0px"
              >
                <div
                  class="row"
                  style="
                    justify-content: center;
                    max-width: none;
                    margin: 0px;
                    padding: 0px;
                  "
                >
                  <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    class="cardSNPC"
                    v-for="npc in paginateDataNPC"
                    :key="npc.id"
                  >
                    <div
                      @click.stop="
                        handlerClickDetailNPC(
                          npc.npc_name,
                          npc.npc_profile,
                          npc.npc_story,
                          npc.image_npc
                        )
                      "
                      class="cardSNPC"
                      style="
                        padding: 0px;
                        margin: 0px;
                        background-size: cover;
                        background-position: center;
                      "
                      :style="{
                        'background-image':
                          'url(' + $baseUrl + '/storage/' + npc.image_npc + ')',
                      }"
                    >
                      <div class="detailsSNPCNPC">
                        <label>{{ npc.npc_name }}</label>
                      </div>
                    </div>
                  </div>

                  <!-- Pagination controls with limited page numbers -->
                  <div
                    class="pagination"
                    v-if="paginateDataNPC.length != 0"
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    data-aos-offset="0"
                  >
                    <button @click="prevPageNPC" :disabled="currentPage === 1">
                      Previous
                    </button>
                    <span
                      style="padding: 0px !important"
                      v-for="pageNumber in visiblePageNumbersDataNPC"
                      :key="pageNumber"
                    >
                      <button
                        @click="gotoPageNPC(pageNumber)"
                        :class="{ active: pageNumber === currentPage }"
                      >
                        {{ pageNumber }}
                      </button>
                    </span>
                    <button
                      @click="nextPageNPC"
                      :disabled="currentPage * pageSize >= npcs.length"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </center>
      </div>
    </transition>
    <!-- End Untuk NPC -->

    <!-- Dialog Detail Profil -->
    <div class="text-center">
      <v-dialog v-model="dialogDetailProfil" width="800px">
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
                  justify-content: end;
                  align-items: center;
                  margin-right: 10px;
                "
              >
                <v-btn
                  @click="dialogDetailProfil = false"
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

          <h5
            style="
              margin-bottom: 20px;
              font-family: 'Georgia';
              font-weight: bold;
              padding-top: 20px;
            "
          >
            Detail Profile {{ nama_personaDetailProfile }}
          </h5>

          <b-container class="conatiner-size-my-profile">
            <b-row>
              <b-col sm="7">
                <p class="ma-0 pa-0">Name : {{ nama_personaDetailProfile }}</p>
                <p class="ma-0 pa-0">Racial : {{ rasDetailProfile }}</p>
                <p class="ma-0 pa-0">Age : {{ umurDetailProfile }}</p>
                <p class="ma-0 pa-0">
                  Birth Date : {{ tanggal_lahirDetailProfile }}
                </p>
                <p class="ma-0 pa-0">Zodiac : {{ zodiakDetailProfile }}</p>
                <p class="ma-0 pa-0">MBTI : {{ MBTIDetailProfile }}</p>
                <p class="ma-0 pa-0">
                  Body Weight : {{ berat_badanDetailProfile }} kg
                </p>
                <p class="ma-0 pa-0">
                  Body Tall : {{ tinggi_badanDetailProfile }} cm
                </p>
                <br />
                <p class="ma-0 pa-0">Hobby : {{ hobiDetailProfile }}</p>
                <p class="ma-0 pa-0">Like : {{ likeDetailProfile }}</p>
                <p class="ma-0 pa-0">
                  Did not Like : {{ did_not_likeDetailProfile }}
                </p>
                <br />
                <p class="ma-0 pa-0">
                  Quotes :<br />“{{ quotesDetailProfile }}”
                </p>
                <h3 class="ma-0 pa-0" style="color: #a36e1e">............</h3>
                <v-btn
                  v-if="ig_accDetailProfile != null"
                  color="#1d5069"
                  class="ma-2 white--text"
                  @click="openInstagramInNewTab(ig_accDetailProfile)"
                  style="
                    text-transform: capitalize;
                    font-size: 12px;
                    border-radius: 20px;
                  "
                >
                  Visit Instagram Account
                  <v-icon right dark> mdi-instagram </v-icon>
                </v-btn>
              </b-col>
              <b-col sm="5" style="align-items: center; display: flex">
                <b-img
                  fluid
                  style="
                    cursor: zoom-in;
                    object-fit: contain;
                    border-radius: 20px;
                  "
                  @click="zoom($baseUrl + '/storage/' + imageDetailProfile)"
                  :src="$baseUrl + '/storage/' + imageDetailProfile"
                  alt="Image Profile"
                ></b-img>
              </b-col>
            </b-row>
            <hr
              style="color: #4a1d00 !important; border: 1px solid !important"
            />
            <center>
              <div
                v-html="story_characterDetailProfile"
                style="text-align: ''; width: 80%"
              ></div>
            </center>
          </b-container>
        </v-card>
      </v-dialog>
    </div>
    <!-- End Dialog Detail Profil -->

    <!-- Dialog Detail NPC -->
    <div class="text-center">
      <v-dialog v-model="dialogDetailNPC" width="800px">
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
                  justify-content: end;
                  align-items: center;
                  margin-right: 10px;
                "
              >
                <v-btn
                  @click="dialogDetailNPC = false"
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

          <h5
            style="
              margin-bottom: 20px;
              font-family: 'Georgia';
              font-weight: bold;
              padding-top: 20px;
            "
          >
            Detail NPC {{ npc_nameDetailNPC }}
          </h5>

          <b-container class="conatiner-size-my-profile">
            <b-row>
              <b-col sm="7">
                <div v-html="npc_profileDetailNPC" style="text-align: ''"></div>
              </b-col>
              <b-col sm="5" style="align-items: center; display: flex">
                <b-img
                  fluid
                  style="
                    cursor: zoom-in;
                    object-fit: contain;
                    border-radius: 10px;
                  "
                  @click="zoom($baseUrl + '/storage/' + image_npcDetailNPC)"
                  :src="$baseUrl + '/storage/' + image_npcDetailNPC"
                  alt="Image NPC"
                ></b-img>
              </b-col>
            </b-row>
            <hr
              style="color: #4a1d00 !important; border: 1px solid !important"
            />
            <center>
              <div
                v-html="npc_storyDetailNPC"
                style="text-align: ''; width: 80%"
              ></div>
            </center>
          </b-container>
        </v-card>
      </v-dialog>
    </div>
    <!-- End Dialog Detail NPC -->

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

    <center>
      <hr
        data-aos="fade-up"
        data-aos-duration="2000"
        style="
          color: #4a1d00 !important;
          border: 1px solid !important;
          margin-top: 50px;
          width: 50%;
        "
      />
      <H5
        data-aos="fade-up"
        data-aos-duration="2000"
        style="font-family: Georgia, serif; margin: 0px; margin-bottom: 20px"
        >Historical Art Fantasia</H5
      >
      <p data-aos="fade-up" data-aos-duration="2000">
        Dilarang mengambil, meniru, mengklaim, baik itu art, peraturan, seragam,
        story, ataupun properti milik
        <br />
        <span style="font-weight: bold">HAF (seluruh siswa dan osis).</span>
      </p>
      <hr
        data-aos="fade-up"
        data-aos-duration="2000"
        style="
          color: #4a1d00 !important;
          border: 1px solid !important;
          width: 50%;
        "
      />
    </center>

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
            <div
              class="container container-footer"
              style="justify-content: center; width: 50%"
            >
              <div class="">
                <h3>Historical Art Fantasia</h3>
                <p>"Be Creative, smart, and learning forever"</p>
              </div>
              <div class="col item social">
                <a
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                  ><b-icon
                    icon="instagram"
                    aria-hidden="true"
                    @click="openInstagramFooter"
                  ></b-icon></a
                ><a
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                  ><b-icon
                    icon="youtube"
                    aria-hidden="true"
                    @click="openYoutubeFooter"
                  ></b-icon></a
                ><a
                  @click="openTiktokFooter"
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                  ><img
                    src="@/assets/tiktok.png"
                    style="height: 33px"
                    class="d-inline-block align-top"
                    alt="Animation" /></a
                ><a
                  onmouseover="this.style.transform='translateY(-10%)';"
                  onmouseout="this.style.transform='translateY(0)';"
                >
                  <b-icon
                    icon="mailbox"
                    aria-hidden="true"
                    @click="sendEmail"
                  ></b-icon
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
import LoadingScreen from "@/components/loading-screen.vue";
import moment from "moment";

export default {
  components: {
    "loading-screen": LoadingScreen,
  },
  data: () => ({
    // Data
    dataStudents: [],
    npcs: [],

    // Data Detail NPC
    npc_nameDetailNPC: "",
    npc_profileDetailNPC: "",
    nama_authorDetailNPC: "",
    npc_storyDetailNPC: "",
    image_npcDetailNPC: "",

    // Data Detail Profile
    nama_personaDetailProfile: "",
    bioDetailProfile: "",
    imageDetailProfile: "",
    ig_accDetailProfile: "",
    umurDetailProfile: "",
    tanggal_lahirDetailProfile: "",
    zodiakDetailProfile: "",
    rasDetailProfile: "",
    tinggi_badanDetailProfile: "",
    berat_badanDetailProfile: "",
    MBTIDetailProfile: "",
    hobiDetailProfile: "",
    likeDetailProfile: "",
    did_not_likeDetailProfile: "",
    quotesDetailProfile: "",
    story_characterDetailProfile: "",

    // Search
    searchStudent: "",
    searchResultsStudent: [],
    isInputOnStudent: 0,
    searchNPC: "",
    searchResultsNPC: [],
    isInputOnNPC: 0,

    // Dialog
    dialogDetailProfil: false,
    dialogDetailNPC: false,
    dialogZoom: false,

    // Pagination Favorite Card
    currentPage: 1,
    pageSize: 10,

    // Youtube Embed
    videoId1:
      "https://www.youtube.com/watch?v=aRg_-196XVQ&list=PLwPxx-wrGFZ4LrCqfZiKM3GisoaDhHV0m", // Replace with the actual video ID
    videoId2:
      "https://www.youtube.com/watch?v=SqlCXuNRsb8&list=PLwPxx-wrGFZ7SnrhKZCF5_48aSxhhsWC3", // Replace with the actual video ID

    // Adds on
    isAboutHafOn: 1,
    isStudentsHafOn: 0,
    isNpcHafOn: 0,
    getImage: null,
    loadingScreen: false,
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      uuid: localStorage.getItem("uuid"),
      role: localStorage.getItem("role"),
      id: localStorage.getItem("id"),
    },
  }),
  created() {
    this.axioDataGetStudents();
    this.axioDataNPC();
  },
  computed: {
    youtubeEmbedUrl1() {
      return `https://www.youtube.com/embed/${this.videoId1}`;
    },
    youtubeEmbedUrl2() {
      return `https://www.youtube.com/embed/${this.videoId2}`;
    },
    filteredStudentsOsis() {
      return this.dataStudents.filter((student) => student.role === "osis");
    },
    filteredStudentsStudent() {
      return this.dataStudents.filter((student) => student.role === "student");
    },

    paginateDataStudent() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredStudentsStudent.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages
    totalPagesDataStudent() {
      return Math.ceil(this.filteredStudentsStudent.length / this.pageSize);
    },
    // Calculate the visible page numbers based on the current page
    visiblePageNumbersDataStudent() {
      const totalVisiblePages = 4;
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(totalVisiblePages / 2)
      );
      const endPage = Math.min(
        this.totalPagesDataStudent,
        startPage + totalVisiblePages - 1
      );
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },

    paginateDataNPC() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.npcs.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages
    totalPagesDataNPC() {
      return Math.ceil(this.npcs.length / this.pageSize);
    },
    // Calculate the visible page numbers based on the current page
    visiblePageNumbersDataNPC() {
      const totalVisiblePages = 4;
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(totalVisiblePages / 2)
      );
      const endPage = Math.min(
        this.totalPagesDataNPC,
        startPage + totalVisiblePages - 1
      );
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },
  },
  watch: {},
  methods: {
    handlerClickDetailNPC(npc_name, npc_profile, npc_story, image_npc) {
      // Assuming dataStudents is an array of objects
      const matchingNPCs = this.npcs.filter(
        (npc) =>
          npc.npc_name === npc_name &&
          npc.npc_profile === npc_profile &&
          npc.npc_story === npc_story &&
          npc.image_npc === image_npc
      );

      // Ensure there is at least one matching student
      if (matchingNPCs.length > 0) {
        // Access the first matching student
        const firstMatchingNPC = matchingNPCs[0];

        // Assign values to properties
        this.npc_nameDetailNPC = firstMatchingNPC.npc_name;
        this.npc_profileDetailNPC = firstMatchingNPC.npc_profile;
        this.nama_authorDetailNPC = firstMatchingNPC.nama_author;
        this.npc_storyDetailNPC = firstMatchingNPC.npc_story;
        this.image_npcDetailNPC = firstMatchingNPC.image_npc;

        this.dialogDetailNPC = true;
      } else {
        console.log("No matching npcs found.");
      }
    },

    handlerClickDetailProfile(storyCharDetailProfil, personaNameDetailProfil) {
      // Assuming dataStudents is an array of objects
      const matchingStudents = this.dataStudents.filter(
        (student) =>
          student.story_character === storyCharDetailProfil &&
          student.nama_persona === personaNameDetailProfil
      );

      // Ensure there is at least one matching student
      if (matchingStudents.length > 0) {
        // Access the first matching student
        const firstMatchingStudent = matchingStudents[0];

        // Assign values to properties
        this.nama_personaDetailProfile = firstMatchingStudent.nama_persona;
        this.bioDetailProfile = firstMatchingStudent.bio;
        this.imageDetailProfile = firstMatchingStudent.image;
        this.ig_accDetailProfile = firstMatchingStudent.ig_acc;
        this.umurDetailProfile = firstMatchingStudent.umur;
        this.tanggal_lahirDetailProfile = firstMatchingStudent.tanggal_lahir;
        this.zodiakDetailProfile = firstMatchingStudent.zodiak;
        this.rasDetailProfile = firstMatchingStudent.ras;
        this.tinggi_badanDetailProfile = firstMatchingStudent.tinggi_badan;
        this.berat_badanDetailProfile = firstMatchingStudent.berat_badan;
        this.MBTIDetailProfile = firstMatchingStudent.MBTI;
        this.hobiDetailProfile = firstMatchingStudent.hobi;
        this.likeDetailProfile = firstMatchingStudent.like;
        this.did_not_likeDetailProfile = firstMatchingStudent.did_not_like;
        this.quotesDetailProfile = firstMatchingStudent.quotes;
        this.story_characterDetailProfile =
          firstMatchingStudent.story_character;

        this.dialogDetailProfil = true;
      } else {
        console.log("No matching students found.");
      }
    },

    handlerClickAboutHaf() {
      this.isAboutHafOn = 1 - this.isAboutHafOn;
      this.isStudentsHafOn = 0;
      this.isNpcHafOn = 0;
    },

    handlerClickStudentsHaf() {
      this.isAboutHafOn = 0;
      this.isStudentsHafOn = 1 - this.isStudentsHafOn;
      this.isNpcHafOn = 0;
    },

    handlerClickNpcHaf() {
      this.isAboutHafOn = 0;
      this.isStudentsHafOn = 0;
      this.isNpcHafOn = 1 - this.isNpcHafOn;
    },

    // Axio
    axioDataNPC() {
      this.loadingScreen = true;
      var url = this.$api + "/show-all-npc-about-haf";

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          // Memformat data NPC dan menyimpannya dalam this.list.npcs
          this.npcs = response.data.data.map((x) => {
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

    axioDataGetStudents() {
      this.loadingScreen = true;
      var url;

      url = this.$api + "/getDataStudents";

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataStudents = response.data.dataStudents.map((x) => {
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

    // Search
    handleInputStudent() {
      if (this.searchStudent.trim() === "") {
        // Jika input kosong, setel isInputOn ke 0
        this.isInputOnStudent = 0;
        // Atur searchResults menjadi array kosong
        this.searchResultsStudent = [];
      } else {
        // Jika input tidak kosong, setel isInputOn ke 1
        this.isInputOnStudent = 1;
        // Lanjutkan dengan melakukan pencarian
        this.searchStudentMethod();
      }
    },
    searchStudentMethod() {
      // Gunakan filter untuk mencari data yang sesuai dengan searchTerm
      this.searchResultsStudent = this.dataStudents.filter((dataStudent) =>
        dataStudent.nama_persona
          .toLowerCase()
          .includes(this.searchStudent.toLowerCase())
      );
    },
    handleInputNPC() {
      if (this.searchNPC.trim() === "") {
        // Jika input kosong, setel isInputOn ke 0
        this.isInputOnNPC = 0;
        // Atur searchResults menjadi array kosong
        this.searchResultsStudent = [];
      } else {
        // Jika input tidak kosong, setel isInputOn ke 1
        this.isInputOnNPC = 1;
        // Lanjutkan dengan melakukan pencarian
        this.searchNPCMethod();
      }
    },
    searchNPCMethod() {
      // Gunakan filter untuk mencari data yang sesuai dengan searchTerm
      this.searchResultsNPC = this.npcs.filter((npc) =>
        npc.npc_name.toLowerCase().includes(this.searchNPC.toLowerCase())
      );
    },

    // Link to go
    openNewPage() {
      const link =
        "https://www.linkedin.com/in/doni-dwi-irawan-818029182?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";
      window.open(link, "_blank");
    },
    openNewPageYoutubeOtomo() {
      const link =
        "https://www.youtube.com/playlist?list=PLwPxx-wrGFZ4LrCqfZiKM3GisoaDhHV0m";
      window.open(link, "_blank");
    },
    openNewPageMVMusic() {
      const link =
        "https://www.youtube.com/playlist?list=PLwPxx-wrGFZ7SnrhKZCF5_48aSxhhsWC3";
      window.open(link, "_blank");
    },
    openInstagramInNewTab(akun_ig) {
      window.open(akun_ig, "_blank");
    },

    // Adds On
    // For zoom image
    zoom(img) {
      this.getImage = img;
      this.dialogZoom = true;
    },

    // Footer
    openInstagramFooter() {
      window.open("https://www.instagram.com/hafallart/", "_blank");
    },
    openYoutubeFooter() {
      window.open("https://www.youtube.com/@haforastudio9615", "_blank");
    },
    openTiktokFooter() {
      window.open("https://www.tiktok.com/@hafallart", "_blank");
    },
    sendEmail() {
      // Replace 'recipient@example.com' with the actual email address
      const emailAddress = "haf3334444@gmail.com";

      // Construct the mailto link
      const mailtoLink = `mailto:${emailAddress}`;

      // Open the default email client with the mailto link
      window.location.href = mailtoLink;
    },
    // End Footer

    // Handle next page  for data favorite
    nextPageStudent() {
      this.loadingScreen = true;
      if (this.currentPage * this.pageSize < this.dataStudents.length) {
        this.currentPage++;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle previous page
    prevPageStudent() {
      this.loadingScreen = true;
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle going to a specific page
    gotoPageStudent(pageNumber) {
      this.loadingScreen = true;
      this.currentPage = pageNumber;
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },

    // Handle next page  for data favorite
    nextPageNPC() {
      this.loadingScreen = true;
      if (this.currentPage * this.pageSize < this.npcs.length) {
        this.currentPage++;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle previous page
    prevPageNPC() {
      this.loadingScreen = true;
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle going to a specific page
    gotoPageNPC(pageNumber) {
      this.loadingScreen = true;
      this.currentPage = pageNumber;
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
  },
};
</script>

<style scoped>
/* Paginate */
/* Add your styling here if needed */
.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.pagination button {
  cursor: pointer;
  margin: 0 6px;
  font-size: 15px;
}

.pagination button:hover {
  cursor: pointer;
  margin: 0 6px;
  font-size: 15px;
  color: #006598;
}

.pagination button.active {
  color: #006598;
}
/* end Paginate */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.hafProject:hover {
  color: #915300;
}

/* Search */
.coolinput {
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: static;
  width: 300px;
}

.coolinput label.text {
  font-size: 0.75rem;
  color: rgb(104, 60, 31);
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
  border: 2px rgb(104, 60, 31) solid;
  border-radius: 20px;
  background: #ffffff00;
  color: rgb(104, 60, 31);
}

.coolinput input[type="text"].input:focus {
  outline: none;
}
/* End Search */

/* Card */
.cardSNPC {
  width: 133px;
  height: 254px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  position: relative;
  border-radius: 20px;
  background-color: #cf9875c4;
  object-fit: cover;
  background-image: url();
  padding: 0px;
  margin: 4px;
  cursor: pointer;
}

.detailsSNPC > p {
  font-size: 0.8em;
  margin-top: 0.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
}

.detailsSNPC > label {
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
}

.detailsSNPC {
  text-align: start;
  color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  height: 2.6em;
  transition: height 0.5s ease-in-out;
  padding: 0.6em;
  overflow: hidden;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cardSNPCHover:hover > .detailsSNPC {
  height: 5rem;
}

.cardSNPC:hover > .detailsSNPCNPC {
  background-color: rgba(0, 0, 0, 0.8);
  transition: ease-in-out;
}

.detailsSNPCNPC > label {
  font-weight: bold;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
}

.detailsSNPCNPC {
  text-align: start;
  color: white;
  box-shadow: 0 3px 10px black;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  height: 2.6em;
  transition: height 0.5s ease-in-out;
  padding: 0.6em;
  overflow: hidden;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
/* End Card */

/* Youtube Embed */
.youtube-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
/* End Youtube Embed */

/*Card footer*/
.card-social {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 8px;
  transform: translateY(+270%);
  transition: transform 0.5s ease-in-out;
}

.card-social__item {
  list-style: none;
}

.card-social__item svg {
  display: block;
  height: 18px;
  width: 18px;
  fill: #ffffff;
  cursor: pointer;
  transition: fill 0.2s ease, transform 0.2s ease;
}

/*Text*/
.card-title {
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  line-height: 2rem;
  margin-bottom: 0px;
  transform: translateY(+225%);
  transition: transform 0.5s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 19ch;
}

.card-subtitle {
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
  transform: translateY(+440%);
  transition: transform 0.5s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 19ch;
}

/*Hover*/
.card:hover {
  box-shadow: 0 8px 50px #23232333;
}

.card::after .card-info {
  height: 254px;
  transition: transform 0.5s ease-in-out;
}

.card:hover .card-title {
  transform: translateY(+205%);
  color: #ff9f1e;
  transition: transform 0.5s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 19ch;
}

.card:hover .card-subtitle {
  color: antiquewhite;
  transform: translateY(+400%);
  transition: transform 0.5s ease-in-out;
}

.card .hover-heart:hover {
  color: pink !important;
}

/* .card:hover .card-social{
  transform: translateY(+340%);
  color: #ff9f1e;
  transition: transform 0.5s ease-in-out;
} */

.card-social__item svg:hover {
  fill: #232323;
  transform: scale(1.1);
}

.card-avatar:hover {
  transform: scale(1.1);
}
/* /Card */

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

/* Zoom */
.img-zoom-full {
  height: 100%;
  width: 100%;
}

@media (max-width: 767px) {
  .containerAboutHaf {
    width: 90% !important;
  }

  .container-footer {
    width: 90% !important;
  }
  .coolinput {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: static;
    width: 240px;
  }
}
</style>
