<template>
  <div>
    <loading-screen :value="loadingScreen"></loading-screen>

    <div>
      <div
        class="d-flex mb-3 size-bar-home"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div style="width: 100%">
          <b-nav tabs style="padding-top: 3px; align-items: center">
            <b-nav-item
              v-if="isCategoryOn == 1"
              active
              @click="handlerClickCategory"
              >Category</b-nav-item
            >
            <b-nav-item v-else @click="handlerClickCategory"
              >Category</b-nav-item
            >
            <b-nav-item
              v-if="isKomikTodayOn == 1"
              active
              @click="handlerClickKomikToday"
              >Today Updates</b-nav-item
            >
            <b-nav-item v-else @click="handlerClickKomikToday"
              >Today Updates</b-nav-item
            >
            <b-nav-item
              v-if="isFavoriteOn == 1"
              active
              @click="handlerClickFavoriteLandingPage"
              >Favorites</b-nav-item
            >
            <b-nav-item v-else @click="handlerClickFavoriteLandingPage"
              >Favorites</b-nav-item
            >
            <transition name="fade">
              <b-nav-item
                v-if="
                  isCategoryOn == 1 || isFavoriteOn == 1 || isKomikTodayOn == 1
                "
                @click.stop="handlerClickCloseAll"
                ><v-icon
                  dense
                  color="red"
                  class="data-table-icon hover-heart"
                  style="cursor: pointer"
                >
                  mdi-close
                </v-icon>
              </b-nav-item>
            </transition>
          </b-nav>

          <div class="coolinput">
            <label for="input-name" class="text">Search comic</label>
            <input
              type="text"
              v-model="searchTerm"
              @keyup.enter="search"
              @input="handleInput"
              placeholder="Write comic title here..."
              name="input"
              class="input"
            />
          </div>
        </div>
      </div>
      <center>
        <div
          v-if="isCategoryOn == 1"
          class="mb-2"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <v-tabs
            class="tabs-category"
            show-arrows
            style="overflow-x: auto; overflow-y: hidden; flex-wrap: nowrap"
          >
            <v-tabs-slider color="lighten-3"></v-tabs-slider>
            <v-tab
              v-for="(item, i) in itemsGenre"
              :key="item"
              :href="'#tab-' + i"
              @click="handlerGetComicByCategori(item)"
              style="text-transform: capitalize !important"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </div>
      </center>
    </div>

    <!-- Search -->
    <!-- Tampilkan hasil pencarian di sini -->
    <div
      v-if="this.isInputOn == 1"
      style="margin-bottom: 70px; margin-top: 20px"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <p>Result for {{ searchTerm }}</p>
      <div class="row" v-if="searchResults.length > 0">
        <div class="row" style="justify-content: center; max-width: none">
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="card card-with-bg"
            :style="{
              'background-image':
                'url(' + $baseUrl + '/storage/' + result.thumbnail + ')',
            }"
          >
            <div class="card-info" @click.stop="handlerClickCard(result)">
              <div class="card-title" style="cursor: pointer">
                {{ result.judul }}
              </div>
              <div class="card-subtitle" style="cursor: pointer">
                {{ result.post_by }}
              </div>
              <div class="card-social">
                <div class="row no-gutters">
                  <div
                    class="col"
                    style="
                      font-size: 12px;
                      color: white;
                      align-items: center;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <v-icon
                      dense
                      x-small
                      color="#e0e0e0"
                      class="data-table-icon"
                      style="padding-right: 3px"
                      >mdi-eye</v-icon
                    >
                    {{ result.jumlah_view }}
                  </div>
                  <div
                    class="col"
                    v-if="hasFavorite(result.uuid, userLogin.uuid)"
                  >
                    <!-- Display content when there is a matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFC0CB"
                      class="data-table-icon hover-heart"
                      @click.stop="handlerClickFavorite(result.uuid)"
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                  <div v-else class="col">
                    <!-- Display content when there is no matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFFFFF"
                      class="data-table-icon hover-heart"
                      @click.stop="handlerClickFavorite(result.uuid)"
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row no-gutters">
          <div
            class="col"
            style="display: grid; align-content: center; justify-content: end"
          >
            <p>No results found for {{ searchTerm }}</p>
          </div>
          <div
            class="col"
            style="display: grid; align-content: center; justify-content: start"
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
    <!-- End Serach -->

    <!-- Landing Page -->
    <transition name="fade">
      <div
        class="container"
        v-if="
          isCategoryOn == 0 &&
          isFavoriteOn == 0 &&
          isKomikTodayOn == 0 &&
          isKomikCategoryOn == 0
        "
      >
        <h5
          data-aos="fade-up"
          data-aos-duration="2000"
          style="
            text-align: center;
            color: #333333;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: 'Georgia';
          "
        >
          Latest Updates
        </h5>
        <!-- Beri 5 card untuk terbaru -->
        <div class="row" style="padding: 0px; margin: 0px;">
          <div class="row" style="justify-content: center; padding: 0px; margin: 0px; max-width: none">
            <div v-if="dataTodays.length == 0">
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
                  <p>There is no comic latest update</p>
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
            <div
              v-else
              class="row"
              style="justify-content: center; max-width: none"
            >
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-for="dataLatest in dataLatests"
              :key="dataLatest.id"
              class="card card-with-bg"
              :style="{
                'background-image':
                  'url(' + $baseUrl + '/storage/' + dataLatest.thumbnail + ')',
              }"
            >
              <div class="card-info" @click.stop="handlerClickCard(dataLatest)">
                <div class="card-title" style="cursor: pointer">
                  {{ dataLatest.judul }}
                </div>
                <div class="card-subtitle" style="cursor: pointer">
                  {{ dataLatest.post_by }}
                </div>
                <div class="card-social">
                  <div class="row no-gutters">
                    <div
                      class="col"
                      style="
                        font-size: 12px;
                        color: white;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <v-icon
                        dense
                        x-small
                        color="#e0e0e0"
                        class="data-table-icon"
                        style="padding-right: 3px"
                        >mdi-eye</v-icon
                      >
                      {{ dataLatest.jumlah_view }}
                    </div>
                    <div
                      class="col"
                      v-if="hasFavorite(dataLatest.uuid, userLogin.uuid)"
                    >
                      <!-- Display content when there is a matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFC0CB"
                        class="data-table-icon hover-heart"
                        @click.stop="handlerClickFavorite(dataLatest.uuid)"
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                    <div v-else class="col">
                      <!-- Display content when there is no matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFFFFF"
                        class="data-table-icon hover-heart"
                        @click.stop="handlerClickFavorite(dataLatest.uuid)"
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          class="row"
          style="
            margin-top: 100px;
            margin-bottom: 60px;
            margin-left: 1px;
            margin-right: 1px;
            border: 2px;
            border-style: solid;
            border-radius: 20;
          "
        >
          <h5
            data-aos="fade-up"
            data-aos-duration="2000"
            style="
              text-align: center;
              color: #333333;
              font-family: 'Georgia';
              font-size: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 20px;
              margin-bottom: 20px;
            "
          >
            Popular This Week
          </h5>
          <div class="section" style="margin-bottom: 30px">
            <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
              <div v-if="dataTodays.length == 0">
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
                  <p>There is no comic popular this week</p>
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
            <div
              v-else
              class="row"
              style="justify-content: center; max-width: none"
            >
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                v-for="dataPopular in dataPopulars"
                :key="dataPopular.id"
                class="card card-with-bg"
                :style="{
                  'background-image':
                    'url(' +
                    $baseUrl +
                    '/storage/' +
                    dataPopular.thumbnail +
                    ')',
                }"
              >
                <div
                  class="card-info"
                  @click.stop="handlerClickCard(dataPopular)"
                >
                  <div class="card-title" style="cursor: pointer">
                    {{ dataPopular.judul }}
                  </div>
                  <div class="card-subtitle" style="cursor: pointer">
                    {{ dataPopular.post_by }}
                  </div>
                  <div class="card-social">
                    <div class="row no-gutters">
                      <div
                        class="col"
                        style="
                          font-size: 12px;
                          color: white;
                          align-items: center;
                          display: flex;
                          justify-content: center;
                        "
                      >
                        <v-icon
                          dense
                          x-small
                          color="#e0e0e0"
                          class="data-table-icon"
                          style="padding-right: 3px"
                          >mdi-eye</v-icon
                        >
                        {{ dataPopular.jumlah_view }}
                      </div>
                      <div
                        class="col"
                        v-if="hasFavorite(dataPopular.uuid, userLogin.uuid)"
                      >
                        <!-- Display content when there is a matching favorite -->
                        <v-icon
                          small
                          dense
                          color="#FFC0CB"
                          class="data-table-icon hover-heart"
                          @click.stop="handlerClickFavorite(dataPopular.uuid)"
                          style="cursor: pointer"
                        >
                          mdi-heart
                        </v-icon>
                      </div>
                      <div v-else class="col">
                        <!-- Display content when there is no matching favorite -->
                        <v-icon
                          small
                          dense
                          color="#FFFFFF"
                          class="data-table-icon hover-heart"
                          @click.stop="handlerClickFavorite(dataPopular.uuid)"
                          style="cursor: pointer"
                        >
                          mdi-heart
                        </v-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        <h5
          data-aos="fade-up"
          data-aos-duration="2000"
          style="
            text-align: center;
            color: #333333;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: 'Georgia';
          "
        >
          Daily Updates
        </h5>
        <!-- Beri 5 card untuk terbaru -->
        <div class="row" style="padding: 0px; margin: 0px;">
          <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
            <div v-if="dataTodays.length == 0">
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
                  <p>There is no comic updates today</p>
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
            <div
              v-else
              class="row"
              style="justify-content: center; max-width: none"
            >
              <div
                data-aos="fade-up"
                data-aos-duration="2000"
                v-for="dataToday in dataTodays"
                :key="dataToday.id"
                class="card card-with-bg"
                :style="{
                  'background-image':
                    'url(' + $baseUrl + '/storage/' + dataToday.thumbnail + ')',
                }"
              >
                <div
                  class="card-info"
                  @click.stop="handlerClickCard(dataToday)"
                >
                  <div class="card-title" style="cursor: pointer">
                    {{ dataToday.judul }}
                  </div>
                  <div class="card-subtitle" style="cursor: pointer">
                    {{ dataToday.post_by }}
                  </div>
                  <div class="card-social">
                    <div class="row no-gutters">
                      <div
                        class="col"
                        style="
                          font-size: 12px;
                          color: white;
                          align-items: center;
                          display: flex;
                          justify-content: center;
                        "
                      >
                        <v-icon
                          dense
                          x-small
                          color="#e0e0e0"
                          class="data-table-icon"
                          style="padding-right: 3px"
                          >mdi-eye</v-icon
                        >
                        {{ dataToday.jumlah_view }}
                      </div>
                      <div
                        class="col"
                        v-if="hasFavorite(dataToday.uuid, userLogin.uuid)"
                      >
                        <!-- Display content when there is a matching favorite -->
                        <v-icon
                          small
                          dense
                          color="#FFC0CB"
                          class="data-table-icon hover-heart"
                          @click.stop="handlerClickFavorite(dataToday.uuid)"
                          style="cursor: pointer"
                        >
                          mdi-heart
                        </v-icon>
                      </div>
                      <div v-else class="col">
                        <!-- Display content when there is no matching favorite -->
                        <v-icon
                          small
                          dense
                          color="#FFFFFF"
                          class="data-table-icon hover-heart"
                          @click.stop="handlerClickFavorite(dataToday.uuid)"
                          style="cursor: pointer"
                        >
                          mdi-heart
                        </v-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- Landing Page -->

    <!-- Untuk Category Card -->
    <div
      data-aos="fade-up"
      data-aos-duration="2000"
      v-if="
        isCategoryOn == 1 &&
        this.isFavoriteOn == 0 &&
        isKomikTodayOn == 0 &&
        isKomikCategoryOn == 0
      "
      class="container"
      style="margin-bottom: 70px; min-height: 400px"
    >
      <h5
        data-aos="fade-up"
        data-aos-duration="1500"
        style="
          text-align: center;
          color: #333333;
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: 'Georgia';
          cursor: pointer;
          text-transform: capitalize;
        "
        onmouseover="this.style.color='#006598'; this.style.backgroundColor='transparent';"
        onmouseout="this.style.color='#333333'; this.style.backgroundColor='transparent';"
      >
        {{ itemsGenre[0] }}
      </h5>
      <!-- Beri 5 card untuk terbaru -->
      <div class="row" style="padding: 0px; margin: 0px;">
        <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
          <transition name="fade">
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              v-if="dataKomikCategorys1.length == 0"
              style="height: 200px; align-content: center; display: grid"
            >
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
                  <p>There is no {{ itemsGenre[0] }} comics</p>
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
          </transition>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            v-for="dataKomikCategory1 in dataKomikCategorys1"
            :key="dataKomikCategory1.id"
            class="card card-with-bg"
            :style="{
              'background-image':
                'url(' +
                $baseUrl +
                '/storage/' +
                dataKomikCategory1.thumbnail +
                ')',
            }"
          >
            <div
              class="card-info"
              @click.stop="handlerClickCard(dataKomikCategory1)"
            >
              <div class="card-title" style="cursor: pointer">
                {{ dataKomikCategory1.judul }}
              </div>
              <div class="card-subtitle" style="cursor: pointer">
                {{ dataKomikCategory1.post_by }}
              </div>
              <div class="card-social">
                <div class="row no-gutters">
                  <div
                    class="col"
                    style="
                      font-size: 12px;
                      color: white;
                      align-items: center;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <v-icon
                      dense
                      x-small
                      color="#e0e0e0"
                      class="data-table-icon"
                      style="padding-right: 3px"
                      >mdi-eye</v-icon
                    >
                    {{ dataKomikCategory1.jumlah_view }}
                  </div>
                  <div
                    class="col"
                    v-if="hasFavorite(dataKomikCategory1.uuid, userLogin.uuid)"
                  >
                    <!-- Display content when there is a matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFC0CB"
                      class="data-table-icon hover-heart"
                      @click.stop="
                        handlerClickFavorite(dataKomikCategory1.uuid)
                      "
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                  <div v-else class="col">
                    <!-- Display content when there is no matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFFFFF"
                      class="data-table-icon hover-heart"
                      @click.stop="
                        handlerClickFavorite(dataKomikCategory1.uuid)
                      "
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5
        data-aos="fade-up"
        data-aos-duration="1500"
        style="
          margin-top: 70px;
          text-align: center;
          color: #333333;
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: 'Georgia';
          cursor: pointer;
          text-transform: capitalize;
        "
        onmouseover="this.style.color='#006598'; this.style.backgroundColor='transparent';"
        onmouseout="this.style.color='#333333'; this.style.backgroundColor='transparent';"
      >
        {{ itemsGenre[1] }}
      </h5>
      <!-- Beri 5 card untuk terbaru -->
      <div class="row" style="padding: 0px; margin: 0px;">
        <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
          <transition name="fade">
            <div
              v-if="dataKomikCategorys2.length == 0"
              style="height: 200px; align-content: center; display: grid"
            >
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
                  <p>There is no {{ itemsGenre[1] }} comics</p>
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
          </transition>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            v-for="dataKomikCategory2 in dataKomikCategorys2"
            :key="dataKomikCategory2.id"
            class="card card-with-bg"
            :style="{
              'background-image':
                'url(' +
                $baseUrl +
                '/storage/' +
                dataKomikCategory2.thumbnail +
                ')',
            }"
          >
            <div
              class="card-info"
              @click.stop="handlerClickCard(dataKomikCategory2)"
            >
              <div class="card-title" style="cursor: pointer">
                {{ dataKomikCategory2.judul }}
              </div>
              <div class="card-subtitle" style="cursor: pointer">
                {{ dataKomikCategory2.post_by }}
              </div>
              <div class="card-social">
                <div class="row no-gutters">
                  <div
                    class="col"
                    style="
                      font-size: 12px;
                      color: white;
                      align-items: center;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <v-icon
                      dense
                      x-small
                      color="#e0e0e0"
                      class="data-table-icon"
                      style="padding-right: 3px"
                      >mdi-eye</v-icon
                    >
                    {{ dataKomikCategory2.jumlah_view }}
                  </div>
                  <div
                    class="col"
                    v-if="hasFavorite(dataKomikCategory2.uuid, userLogin.uuid)"
                  >
                    <!-- Display content when there is a matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFC0CB"
                      class="data-table-icon hover-heart"
                      @click.stop="
                        handlerClickFavorite(dataKomikCategory2.uuid)
                      "
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                  <div v-else class="col">
                    <!-- Display content when there is no matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFFFFF"
                      class="data-table-icon hover-heart"
                      @click.stop="
                        handlerClickFavorite(dataKomikCategory2.uuid)
                      "
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5
        data-aos="fade-up"
        data-aos-duration="1500"
        style="
          margin-top: 70px;
          text-align: center;
          color: #333333;
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: 'Georgia';
          cursor: pointer;
          text-transform: capitalize;
        "
        onmouseover="this.style.color='#006598'; this.style.backgroundColor='transparent';"
        onmouseout="this.style.color='#333333'; this.style.backgroundColor='transparent';"
      >
        {{ itemsGenre[2] }}
      </h5>
      <!-- Beri 5 card untuk terbaru -->
      <div class="row" style="padding: 0px; margin: 0px;">
        <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
          <transition name="fade">
            <div
              v-if="dataKomikCategorys3.length == 0"
              style="height: 200px; align-content: center; display: grid"
            >
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
                  <p>There is no {{ itemsGenre[2] }} comics</p>
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
          </transition>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            v-for="dataKomikCategory3 in dataKomikCategorys3"
            :key="dataKomikCategory3.id"
            class="card card-with-bg"
            :style="{
              'background-image':
                'url(' +
                $baseUrl +
                '/storage/' +
                dataKomikCategory3.thumbnail +
                ')',
            }"
          >
            <div
              class="card-info"
              @click.stop="handlerClickCard(dataKomikCategory3)"
            >
              <div class="card-title" style="cursor: pointer">
                {{ dataKomikCategory3.judul }}
              </div>
              <div class="card-subtitle" style="cursor: pointer">
                {{ dataKomikCategory3.post_by }}
              </div>
              <div class="card-social">
                <div class="row no-gutters">
                  <div
                    class="col"
                    style="
                      font-size: 12px;
                      color: white;
                      align-items: center;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <v-icon
                      dense
                      x-small
                      color="#e0e0e0"
                      class="data-table-icon"
                      style="padding-right: 3px"
                      >mdi-eye</v-icon
                    >
                    {{ dataKomikCategory3.jumlah_view }}
                  </div>
                  <div
                    class="col"
                    v-if="hasFavorite(dataKomikCategory3.uuid, userLogin.uuid)"
                  >
                    <!-- Display content when there is a matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFC0CB"
                      class="data-table-icon hover-heart"
                      @click.stop="
                        handlerClickFavorite(dataKomikCategory3.uuid)
                      "
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                  <div v-else class="col">
                    <!-- Display content when there is no matching favorite -->
                    <v-icon
                      small
                      dense
                      color="#FFFFFF"
                      class="data-table-icon hover-heart"
                      @click.stop="
                        handlerClickFavorite(dataKomikCategory3.uuid)
                      "
                      style="cursor: pointer"
                    >
                      mdi-heart
                    </v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Untuk Category Card -->

    <!-- Untuk Get by Comic Category Card -->
    <transition name="fade">
      <div
        v-if="
          isCategoryOn == 1 &&
          this.isFavoriteOn == 0 &&
          isKomikCategoryOn == 1 &&
          isKomikTodayOn == 0
        "
        class="container"
        style="margin-bottom: 70px"
      >
        <h5
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-offset="0"
          style="
            text-align: center;
            color: #333333;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: 'Georgia';
            text-transform: capitalize;
          "
        >
          {{ this.category }}
        </h5>
        <!-- Beri 5 card untuk terbaru -->
        <div class="row" style="padding: 0px; margin: 0px;">
          <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-if="dataKomiksByCategory.length == 0"
              style="height: 200px; align-content: center; display: grid"
            >
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
                  <p>There is no comic {{ this.category }}</p>
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
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-for="dataKomikByCategory in paginateDataKomikCategory"
              :key="dataKomikByCategory.id"
              class="card card-with-bg"
              :style="{
                'background-image':
                  'url(' +
                  $baseUrl +
                  '/storage/' +
                  dataKomikByCategory.thumbnail +
                  ')',
              }"
            >
              <div
                class="card-info"
                @click.stop="handlerClickCard(dataKomikByCategory)"
              >
                <div class="card-title" style="cursor: pointer">
                  {{ dataKomikByCategory.judul }}
                </div>
                <div class="card-subtitle" style="cursor: pointer">
                  {{ dataKomikByCategory.post_by }}
                </div>
                <div class="card-social">
                  <div class="row no-gutters">
                    <div
                      class="col"
                      style="
                        font-size: 12px;
                        color: white;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <v-icon
                        dense
                        x-small
                        color="#e0e0e0"
                        class="data-table-icon"
                        style="padding-right: 3px"
                        >mdi-eye</v-icon
                      >
                      {{ dataKomikByCategory.jumlah_view }}
                    </div>
                    <div
                      class="col"
                      v-if="
                        hasFavorite(dataKomikByCategory.uuid, userLogin.uuid)
                      "
                    >
                      <!-- Display content when there is a matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFC0CB"
                        class="data-table-icon hover-heart"
                        @click.stop="
                          handlerClickFavorite(dataKomikByCategory.uuid)
                        "
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                    <div v-else class="col">
                      <!-- Display content when there is no matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFFFFF"
                        class="data-table-icon hover-heart"
                        @click.stop="
                          handlerClickFavorite(dataKomikByCategory.uuid)
                        "
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination controls with limited page numbers -->
          <div
            class="pagination"
            v-if="paginateDataKomikCategory.length != 0"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <button @click="prevPageCategory" :disabled="currentPage === 1">
              Previous
            </button>
            <span
              v-for="pageNumber in visiblePageNumbersDataCategory"
              :key="pageNumber"
            >
              <button
                @click="gotoPageCategory(pageNumber)"
                :class="{ active: pageNumber === currentPage }"
              >
                {{ pageNumber }}
              </button>
            </span>
            <button
              @click="nextPageCategory"
              :disabled="currentPage * pageSize >= dataKomiksByCategory.length"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- Untuk Get by Comic Category Card -->

    <!-- Untuk Today Card -->
    <transition name="fade">
      <div
        v-if="
          isCategoryOn == 0 &&
          this.isFavoriteOn == 0 &&
          isKomikCategoryOn == 0 &&
          isKomikTodayOn == 1
        "
        class="container"
        style="margin-bottom: 70px"
      >
        <h5
          data-aos="fade-up"
          data-aos-duration="2000"
          style="
            text-align: center;
            color: #333333;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: 'Georgia';
          "
        >
          Today Updates
        </h5>
        <!-- Beri 5 card untuk terbaru -->
        <div class="row" style="padding: 0px; margin: 0px;">
          <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-if="paginateDataKomikToday.length == 0"
              style="height: 200px; align-content: center; display: grid"
            >
              <div class="row no-gutters">
                <div
                  class="col"
                  style="
                    display: grid;
                    align-content: center;
                    justify-content: end;
                  "
                >
                  <p>There is no updates comic today</p>
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
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-for="dataKomikTodayShow in paginateDataKomikToday"
              :key="dataKomikTodayShow.id"
              class="card card-with-bg"
              :style="{
                'background-image':
                  'url(' +
                  $baseUrl +
                  '/storage/' +
                  dataKomikTodayShow.thumbnail +
                  ')',
              }"
            >
              <div
                class="card-info"
                @click.stop="handlerClickCard(dataKomikTodayShow)"
              >
                <div class="card-title" style="cursor: pointer">
                  {{ dataKomikTodayShow.judul }}
                </div>
                <div class="card-subtitle" style="cursor: pointer">
                  {{ dataKomikTodayShow.post_by }}
                </div>
                <div class="card-social">
                  <div class="row no-gutters">
                    <div
                      class="col"
                      style="
                        font-size: 12px;
                        color: white;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <v-icon
                        dense
                        x-small
                        color="#e0e0e0"
                        class="data-table-icon"
                        style="padding-right: 3px"
                        >mdi-eye</v-icon
                      >
                      {{ dataKomikTodayShow.jumlah_view }}
                    </div>
                    <div
                      class="col"
                      v-if="
                        hasFavorite(dataKomikTodayShow.uuid, userLogin.uuid)
                      "
                    >
                      <!-- Display content when there is a matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFC0CB"
                        class="data-table-icon hover-heart"
                        @click.stop="
                          handlerClickFavorite(dataKomikTodayShow.uuid)
                        "
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                    <div v-else class="col">
                      <!-- Display content when there is no matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFFFFF"
                        class="data-table-icon hover-heart"
                        @click.stop="
                          handlerClickFavorite(dataKomikTodayShow.uuid)
                        "
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination controls with limited page numbers -->
          <div
            class="pagination"
            v-if="paginateDataKomikToday.length != 0"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <button @click="prevPageTodayUpdates" :disabled="currentPage === 1">
              Previous
            </button>
            <span
              v-for="pageNumber in visiblePageNumbersDataKomikToday"
              :key="pageNumber"
            >
              <button
                @click="gotoPageTodayUpdates(pageNumber)"
                :class="{ active: pageNumber === currentPage }"
              >
                {{ pageNumber }}
              </button>
            </span>
            <button
              @click="nextPageTodayUpdates"
              :disabled="currentPage * pageSize >= dataKomikTodaysShow.length"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Untuk Today Card -->

    <!-- Untuk Favorite Card -->
    <transition name="fade">
      <div
        v-if="
          isFavoriteOn == 1 &&
          isCategoryOn == 0 &&
          isKomikCategoryOn == 0 &&
          isKomikTodayOn == 0
        "
        class="container"
        style="margin-bottom: 70px"
      >
        <h5
          data-aos="fade-up"
          data-aos-duration="2000"
          style="
            text-align: center;
            color: #333333;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: 'Georgia';
          "
        >
          Your Favorite
        </h5>
        <!-- Beri 5 card untuk terbaru -->
        <div class="row" style="padding: 0px; margin: 0px;">
          <div class="row" style="justify-content: center; max-width: none; padding: 0px; margin: 0px;">
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-if="paginateDataFavorite.length == 0"
              style="height: 200px; align-content: center; display: grid"
            >
              <div class="row no-gutters">
                <div
                  class="col"
                  style="
                    display: grid;
                    align-content: center;
                    justify-content: end;
                  "
                >
                  <p>There is no favorite comic</p>
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
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              v-for="dataKomikFavoriteShow in paginateDataFavorite"
              :key="dataKomikFavoriteShow.id"
              class="card card-with-bg"
              :style="{
                'background-image':
                  'url(' +
                  $baseUrl +
                  '/storage/' +
                  dataKomikFavoriteShow.thumbnail +
                  ')',
              }"
            >
              <div
                class="card-info"
                @click.stop="handlerClickCard(dataKomikFavoriteShow)"
              >
                <div class="card-title" style="cursor: pointer">
                  {{ dataKomikFavoriteShow.judul }}
                </div>
                <div class="card-subtitle" style="cursor: pointer">
                  {{ dataKomikFavoriteShow.post_by }}
                </div>
                <div class="card-social">
                  <div class="row no-gutters">
                    <div
                      class="col"
                      style="
                        font-size: 12px;
                        color: white;
                        align-items: center;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <v-icon
                        dense
                        x-small
                        color="#e0e0e0"
                        class="data-table-icon"
                        style="padding-right: 3px"
                        >mdi-eye</v-icon
                      >
                      {{ dataKomikFavoriteShow.jumlah_view }}
                    </div>
                    <div
                      class="col"
                      v-if="
                        hasFavorite(dataKomikFavoriteShow.uuid, userLogin.uuid)
                      "
                    >
                      <!-- Display content when there is a matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFC0CB"
                        class="data-table-icon hover-heart"
                        @click.stop="
                          handlerClickFavorite(dataKomikFavoriteShow.uuid)
                        "
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                    <div v-else class="col">
                      <!-- Display content when there is no matching favorite -->
                      <v-icon
                        small
                        dense
                        color="#FFFFFF"
                        class="data-table-icon hover-heart"
                        @click.stop="
                          handlerClickFavorite(dataKomikFavoriteShow.uuid)
                        "
                        style="cursor: pointer"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination controls with limited page numbers -->
          <div
            class="pagination"
            v-if="paginateDataFavorite.length != 0"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <button @click="prevPageFavorite" :disabled="currentPage === 1">
              Previous
            </button>
            <span
              v-for="pageNumber in visiblePageNumbersDataFavorite"
              :key="pageNumber"
            >
              <button
                @click="gotoPageFavorite(pageNumber)"
                :class="{ active: pageNumber === currentPage }"
              >
                {{ pageNumber }}
              </button>
            </span>
            <button
              @click="nextPageFavorite"
              :disabled="
                currentPage * pageSize >= dataKomikFavoritesShow.length
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- End Untuk Favorite Card -->

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
  </div>
</template>

<script>
import LoadingScreen from "@/components/loading-screen.vue";
import moment from "moment";

export default {
  components: {
    "loading-screen": LoadingScreen,
  },
  data: () => ({
    // Komik
    dataComics: [],
    dataLatests: [],
    dataPopulars: [],
    dataTodays: [],
    dataKomikFavorites: [],
    dataKomikFavoritesShow: [],
    dataKomikTodaysShow: [],
    dataKomiksByCategory: [],
    dataKomikCategorys1: [],
    dataKomikCategorys2: [],
    dataKomikCategorys3: [],

    // Pagination Favorite Card
    currentPage: 1,
    pageSize: 21,

    // Search
    searchTerm: "",
    searchResults: [],

    // Snackbar
    snackbar: false,
    textMessage: "",
    color: "",

    // Adds on
    itemsGenre: [
"Drama", "Fantasy", "Kingdom", "Comedy", "Action", "Slice of Life", "Romantic", "Thriller", "Horror", "Local"],
    isCategoryOn: 0,
    isFavoriteOn: 0,
    isKomikTodayOn: 0,
    isKomikCategoryOn: 0,
    isInputOn: 0,
    myProfile: [],
    category: "",
    loadingScreen: false,
    userLogin: {
      token: localStorage.getItem("token"), // initialize with a valid token or empty string
      uuid: localStorage.getItem("uuid"),
      role: localStorage.getItem("role"),
      id: localStorage.getItem("id"),
    },
  }),
  created() {
    this.axioDataKomik();
    if (this.userLogin.token != null) {
      this.axioDataMyProfile();
    }
  },
  computed: {
    // Komik Favorite
    paginateDataFavorite() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dataKomikFavoritesShow.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages
    totalPagesDataFavorite() {
      return Math.ceil(this.dataKomikFavoritesShow.length / this.pageSize);
    },
    // Calculate the visible page numbers based on the current page
    visiblePageNumbersDataFavorite() {
      const totalVisiblePages = 4;
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(totalVisiblePages / 2)
      );
      const endPage = Math.min(
        this.totalPagesDataFavorite,
        startPage + totalVisiblePages - 1
      );
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },

    // Komik Today
    paginateDataKomikToday() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dataKomikTodaysShow.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages
    totalPagesDataKomikToday() {
      return Math.ceil(this.dataKomikTodaysShow.length / this.pageSize);
    },
    // Calculate the visible page numbers based on the current page
    visiblePageNumbersDataKomikToday() {
      const totalVisiblePages = 4;
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(totalVisiblePages / 2)
      );
      const endPage = Math.min(
        this.totalPagesDataKomikToday,
        startPage + totalVisiblePages - 1
      );
      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },

    // Komik Kategori
    paginateDataKomikCategory() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dataKomiksByCategory.slice(startIndex, endIndex);
    },
    // Calculate the total number of pages
    totalPagesDataCategory() {
      return Math.ceil(this.dataKomiksByCategory.length / this.pageSize);
    },
    // Calculate the visible page numbers based on the current page
    visiblePageNumbersDataCategory() {
      const totalVisiblePages = 4;
      const startPage = Math.max(
        1,
        this.currentPage - Math.floor(totalVisiblePages / 2)
      );
      const endPage = Math.min(
        this.totalPagesDataCategory,
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
    hasFavorite(komikUuid, userUuid) {
      return this.dataKomikFavorites.some(
        (favorite) =>
          favorite.komik_uuid === komikUuid && favorite.user_uuid === userUuid
      );
    },

    handlerClickCard(item) {
      this.addJumlahView(item.uuid);
      this.$router.push({
        name: "haf-detail-comic",
        params: {
          slug: item.slug,
          uuid: item.uuid,
        },
      });
    },

    handlerClickCloseAll() {
      this.isCategoryOn = 0;
      this.isFavoriteOn = 0;
      this.isKomikTodayOn = 0;
      this.isKomikCategoryOn = 0;
      this.currentPage = 1;
      this.isInputOn = 0;
      this.axioDataKomik();
    },

    handlerGetComicByCategori(item) {
      this.getComicByCategori(item);
      this.isKomikCategoryOn = 1;
      this.isCategoryOn = 1;
      this.isFavoriteOn = 0;
      this.isKomikTodayOn = 0;
      this.currentPage = 1;
      this.axioDataKomik();
    },

    handlerClickKomikToday() {
      this.isKomikTodayOn = 1 - this.isKomikTodayOn;
      this.isCategoryOn = 0;
      this.isFavoriteOn = 0;
      this.isKomikCategoryOn = 0;
      this.currentPage = 1;
      this.axioDataKomik();
      this.axioDataKomikTodaysShow();
    },

    handlerClickCategory() {
      this.isCategoryOn = 1 - this.isCategoryOn;
      this.isFavoriteOn = 0;
      this.isKomikTodayOn = 0;
      this.isKomikCategoryOn = 0;
      this.currentPage = 1;
      this.axioDataKomik();
      this.axioDataKomikCategorysShow();
    },

    handlerClickFavoriteLandingPage() {
      if (this.myProfile.length != 0) {
        this.isFavoriteOn = 1 - this.isFavoriteOn;
        this.isCategoryOn = 0;
        this.currentPage = 1;
        this.isKomikTodayOn = 0;
        this.axioDataKomik();
        this.axioDataKomikFavoriteShow();
      } else {
        this.textMessage =
          "You need to log in to see your favorite comic 🤭🤭🤭";
        this.snackbar = true;
        this.color = "blue-grey";
      }
    },

    handlerClickFavorite(uuidKomik) {
      if (this.myProfile.length != 0) {
        this.loadingScreen = true;
        // Set the headers
        var headers = {
          Authorization: "Bearer " + this.userLogin.token,
        };

        var url =
          this.$api + "/klikFavorite/" + uuidKomik + "/" + this.userLogin.uuid;

        this.$http
          .get(url, { headers: headers })
          .then((response) => {
            this.axioDataKomik();
            this.axioDataKomikFavoriteShow();

            if (response.data.iyaFavorite == 1) {
              this.textMessage = "Comic added to favorites 😍";
              this.snackbar = true;
              this.color = "success";
            } else {
              this.textMessage = "Comic removed from favorites 😔";
              this.snackbar = true;
              this.color = "blue-grey";
            }

            // Use $nextTick to ensure the DOM is updated before triggering the watcher
            // this.$nextTick(() => {
            //   // Trigger the watcher manually
            //   this.currentPage = 1;
            //   (this.totalPagesDataFavorite, 'total data pages')
            // });

            console.log(this.totalPagesDataFavorite, "totalpages");

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
      } else {
        this.textMessage =
          "You need to log in to add favorite this comic 🤭🤭🤭";
        this.snackbar = true;
        this.color = "blue-grey";
      }
    },

    addJumlahView(uuid_komik) {
      this.loadingScreen = true;

      var url = this.$api + "/addJumlahView/" + uuid_komik;

      this.$http
        .get(url)
        .then((response) => {
          this.respone = response.data.response;

          this.axioDataKomik();
          this.axioDataKomikCategorysShow();
          this.axioDataKomikTodaysShow();

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

    getComicByCategori(category) {
      this.loadingScreen = true;

      var url = this.$api + "/getComicByCategori/" + category;

      this.$http
        .get(url)
        .then((response) => {
          this.dataKomiksByCategory = response.data.dataKomiksByCategory.map(
            (x) => {
              return {
                ...x,
                created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
              };
            }
          );
          this.category = response.data.category;

          console.log(this.dataKomiksByCategory);

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

    axioDataKomikCategorysShow() {
      this.loadingScreen = true;

      var url =
        this.$api +
        "/getDataKomikCategorysShow/" +
        this.itemsGenre[0] +
        "/" +
        this.itemsGenre[1] +
        "/" +
        this.itemsGenre[2];

      this.$http
        .get(url)
        .then((response) => {
          this.dataKomikCategorys1 = response.data.dataKomikCategorys1;
          this.dataKomikCategorys2 = response.data.dataKomikCategorys2;
          this.dataKomikCategorys3 = response.data.dataKomikCategorys3;

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

    axioDataKomikTodaysShow() {
      this.loadingScreen = true;

      var url = this.$api + "/getDataKomikTodayShow";

      if (this.userLogin.token != null) {
        this.axioDataKomikFavorite();
      }

      this.$http
        .get(url)
        .then((response) => {
          this.dataKomikTodaysShow = response.data.dataKomikTodaysShow;

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

    axioDataKomikFavoriteShow() {
      this.loadingScreen = true;
      // Set the headers
      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      var url = this.$api + "/getDataKomikFavoriteShow/" + this.userLogin.uuid;

      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.dataKomikFavoritesShow = response.data.dataKomikFavoritesShow;

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

    axioDataKomikFavorite() {
      this.loadingScreen = true;
      var url;

      var headers = {
        Authorization: "Bearer " + this.userLogin.token,
      };

      url = this.$api + "/getDataKomikFavorite/" + this.userLogin.uuid;

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url, { headers: headers })
        .then((response) => {
          this.dataKomikFavorites = response.data.dataKomikFavorites.map(
            (x) => {
              return {
                ...x,
                created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
              };
            }
          );

          console.log(this.dataKomikFavorites);

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

    axioDataKomik() {
      this.loadingScreen = true;
      var url;

      url = this.$api + "/getDataKomik";

      if (this.userLogin.token != null) {
        this.axioDataKomikFavorite();
      }

      // Gunakan 'url' dalam permintaan POST
      this.$http
        .get(url)
        .then((response) => {
          this.dataLatests = response.data.dataLatest.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          this.dataPopulars = response.data.dataPopular.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          this.dataTodays = response.data.dataToday.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          this.dataComics = response.data.dataComics.map((x) => {
            return {
              ...x,
              created_at: moment(x.created_at).format("YYYY-MM-DD h:mm a"),
            };
          });

          console.log(this.dataLatests);

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

    // Search
    handleInput() {
      if (this.searchTerm.trim() === "") {
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
      this.searchResults = this.dataComics.filter((comic) =>
        comic.judul.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },

    // Adds on
    // Handle next page  for data favorite
    nextPageFavorite() {
      this.loadingScreen = true;
      if (
        this.currentPage * this.pageSize <
        this.dataKomikFavoritesShow.length
      ) {
        this.currentPage++;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle previous page
    prevPageFavorite() {
      this.loadingScreen = true;
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle going to a specific page
    gotoPageFavorite(pageNumber) {
      this.loadingScreen = true;
      this.currentPage = pageNumber;
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },

    // Handle next page  for data komik by category
    nextPageCategory() {
      this.loadingScreen = true;
      if (this.currentPage * this.pageSize < this.dataKomiksByCategory.length) {
        this.currentPage++;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle previous page
    prevPageCategory() {
      this.loadingScreen = true;
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle going to a specific page
    gotoPageCategory(pageNumber) {
      this.loadingScreen = true;
      this.currentPage = pageNumber;
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },

    // Handle next page  for data komik today updates
    nextPageTodayUpdates() {
      this.loadingScreen = true;
      if (this.currentPage * this.pageSize < this.dataKomikTodaysShow.length) {
        this.currentPage++;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle previous page
    prevPageTodayUpdates() {
      this.loadingScreen = true;
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    // Handle going to a specific page
    gotoPageTodayUpdates(pageNumber) {
      this.loadingScreen = true;
      this.currentPage = pageNumber;
      setTimeout(() => {
        this.loadingScreen = false;
      }, 300);
    },
    openNewPage() {
      const link =
        "https://www.linkedin.com/in/doni-dwi-irawan-818029182?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";
      window.open(link, "_blank");
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

/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to .fade-leave-active below version 2.1.8 {
  opacity: 0;
} */

.tabs-category {
  width: 50%;
}
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
  color: #257dd4;
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
  border: 2px #257dd4 solid;
  border-radius: 20px;
  background: #ffffff00;
  color: #257dd4;
}

.coolinput input[type="text"].input:focus {
  outline: none;
}
/* End Search */

.size-bar-home {
  padding-right: 150px;
  padding-left: 150px;
}

/* Card */
/* If you want to apply additional styles to the div */
.card-with-bg {
  background-size: cover;
  background-position: center;
}
.card img {
  width: 100%; /* Ensure that the image takes up 100% of the container's width */
  height: 100%; /* Ensure that the image takes up 100% of the container's height */
  object-fit: cover; /* Apply the object-fit: cover style to handle resizing and positioning */
}
.card {
  width: 165px;
  height: 254px;
  margin: 2px;
  padding: 2rem 1.5rem;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  --bs-card-border-width: 0px !important;
  cursor: pointer;
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease 0s, opacity 0.2s ease 0s;
  position: absolute;
  bottom: 0px;
  width: 100%;
  margin-left: 0px;
  left: 0px;
  border-radius: 5px;
  background: linear-gradient(
    to bottom,
    rgba(183, 228, 255, 0.03),
    rgb(0, 0, 0)
  );
  height: 200px;
  transition: transform 0.5s ease-in-out;
}

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

@media (min-width: 768px) {
  .tabs-category {
    width: 70%;
  }
}

@media (max-width: 767px) {
  .container-footer{
    width: 90% !important;
  }
  .tabs-category {
    width: 90%;
  }
  .footer-dark .item:not(.social) {
    text-align: center;
    padding-bottom: 20px;
  }

  .size-bar-home {
    padding-right: 50px;
    padding-left: 50px;
  }

  .footer-dark .item.text {
    margin-bottom: 0;
  }

}

@media (max-width: 991px) {
  .footer-dark .item.social {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
