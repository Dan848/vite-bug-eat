<template>
  <!-- Aside Sticky Bar -->
  <div class="sticky-filters d-md-none text-white" @click="filtersOpen = true">
    <span class="fw-bold me-1">Filtri</span><i class="fa-solid fa-filter"></i>
  </div>
  <div class="container">
    <!-- Slider -->
    <SliderComponent :types="store.types" :imgStartUrl="store.imgStartUrl" @onClick="handleSlider"
      class="px-4 px-sm-2 px-lg-5" />
    <div class="row">
      <!-- Aside -->
      <SidebarComponent @onChange="getRestaurants" :items="store.types" :imgStartUrl="store.imgStartUrl"
        :class="filtersOpen ? 'd-block col' : 'd-none'" @onClick="filtersOpen = false" />
      <!-- Main (under Slider) -->
      <div class="col-12 col-md-8 col-lg-9 col-xl-10">
        <div class="container-fluid mt-5">
          <!-- Search Bar -->
          <div class="row justify-content-center">
            <form action="" method="GET" class="col-12">
              <div class="bm-form">
                <i class="fa fa-search"></i>
                <input type="text" class="form-control rounded-5" placeholder="Cerca un ristorante" />
              </div>
            </form>
          </div>
          <!-- Restaurant List -->
          <div class="row" id="restaurantRow">
            <div v-for="restaurant in store.restaurants"
              class="my-4 d-flex justify-content-center col-12 col-lg-6 col-xl-4">
              <router-link :to="{
                name: 'single-restaurant',
                params: { slug: restaurant.slug },
              }">
                <RestaurantCard :key="restaurant.id" :restaurant="restaurant" :imgStartUrl="store.imgStartUrl"
                  :isSelected="false" />
              </router-link>
            </div>
          </div>
          <!-- Pagination -->
          <div class="row">
            <ul class="pagination col-12 mt-3 mb-5">
              <li class="page-item">
                <button :class="{
                  'page-link': true,
                  disabled: store.currentPage === 1,
                }" @click="getRestaurants(store.currentPage - 1)">
                  <i class="fa-solid fa-angle-left"></i>
                </button>
              </li>
              <li class="page-item" v-for="n in store.lastPage">
                <button :class="{
                  'page-link': true,
                  active: store.currentPage === n,
                }" @click="getRestaurants(n)">
                  {{ n }}
                </button>
              </li>
              <li class="page-item">
                <button :class="{
                  'page-link': true,
                  disabled: store.currentPage === store.lastPage,
                }" @click="getRestaurants(store.currentPage + 1)">
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../data/store";
import RestaurantCard from "../components/RestaurantCard.vue";
import SliderComponent from "../components/SliderComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import axios from "axios";
export default {
  name: "RestaurantView",
  components: {
    RestaurantCard,
    SliderComponent,
    SidebarComponent,
  },
  //Data
  data() {
    return {
      store,
      filtersOpen: window.innerWidth <= 768 ? false : true
    };
  },
  //Methods
  methods: {
    handleSlider(id) {
      store.checkboxTypes = [];
      store.checkboxTypes.push(id);
      const type = store.checkboxTypes;
      this.getRestaurants(1, type);
    },
    getRestaurants(numPage, checkboxTypes) {
      let params = {
        page: numPage,
      };
      if (checkboxTypes) {
        store.scrollToElement("restaurantRow")
        params.types = checkboxTypes;
      }
      axios
        .get(`${store.apiURL}/restaurants`, {
          params,
        })
        .then((res) => {
          store.restaurants = res.data.results.data;
          store.currentPage = res.data.results.current_page;
          store.lastPage = res.data.results.last_page;
        });
    },
    getTypes() {
      axios.get(`${store.apiURL}/types`).then((res) => {
        store.types = res.data.results;
      });
    },
    handleWindowResize() {
      this.filtersOpen = window.innerWidth <= 768 ? false : true;
    },
  },
  //Mounted
  mounted() {
    this.getTypes();
    if (store.checkboxTypes) {
      this.getRestaurants(1, store.checkboxTypes); // Chiama la funzione getRestaurants con il tipo specificato
    } else {
      this.getRestaurants(1); // Altrimenti, chiama la funzione getRestaurants senza il tipo specificato
    }
    window.addEventListener('resize', this.handleWindowResize);
  },
  //Unmounted
  unmounted() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;


//From search bar
form {
  .bm-form {
    position: relative;

    .fa-search {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #9ca3af;
    }

    input {
      height: 55px !important;
      text-indent: 33px !important;

      &:focus {
        box-shadow: $primary;
      }
    }
  }
}

//Filter Sticky Bar
.sticky-filters {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 100px;
  left: 0;
  width: fit-content;
  padding: 0 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 1005;
  background: $primary;
  transition: .3s;

  &:hover {
    cursor: pointer;
    background-color: #8cad6c;
  }
}
</style>
