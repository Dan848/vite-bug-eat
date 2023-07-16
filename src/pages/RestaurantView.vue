<template>
  <div v-if="!isLoading">
    <!-- Aside Sticky Bar -->
    <div class="sticky-filters d-md-none text-white" @click="filtersOpen = true">
      <span class="fw-bold me-1">Filtri</span><i class="fa-solid fa-filter"></i>
    </div>
    <div class="container">
      <div>
        <CartComponent v-if="store.cart.products.length > 0"/>
      </div>
      <!-- Slider -->
      <SliderComponent :types="store.types" :imgStartUrl="store.imgStartUrl" @onClick="handleSlider"
        class="px-4 px-sm-2 px-lg-5" />
      <div class="row" id="restaurantRow">
        <!-- Aside -->
        <SidebarComponent @onChange="getRestaurants" :items="store.types" :imgStartUrl="store.imgStartUrl"
          :class="filtersOpen ? 'd-block col' : 'd-none'" @onClick="filtersOpen = false" @resetFilters="resetFilters" />
        <!-- Main (under Slider) -->
        <div class="col-12 col-md-8 col-lg-9 col-xl-10">
          <div class="container-fluid mt-5">
            <!-- Search Bar -->
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="bm-form">
                  <i class="fa fa-search"></i>
                  <input type="text" v-model="store.searchName" class="form-control rounded-5"
                    placeholder="Cerca un ristorante" @input="getRestaurants()" />
                </div>
              </div>

              <!-- Restaurant List -->
              <div class="row pt-3">
                <div class="col-12 d-flex flex-wrap" v-if="store.checkboxTypes.length > 0">
                  <span class="pe-1">Stai filtrando per:</span>
                  <div class="d-flex fw-bold" v-for="(type, index) in store.checkboxTypes" :key="index">
                    {{ getTypeName(type) }}
                    <div class="pe-1" v-if="index !== store.checkboxTypes.length - 1">
                      ,
                    </div>
                  </div>
                </div>
                <div class="col-12 pt-3">
                  <span>Ci sono:</span>
                  <span class="fw-bold px-2">{{ totalRestaurants }}</span>
                  <span>Ristoranti vicino a te</span>
                </div>
                <div v-for="restaurant in store.restaurants"
                  class="my-4 d-flex justify-content-center col-12 col-lg-6 col-xl-4">
                  <router-link :to="{
                    name: 'single-restaurant',
                    params: { slug: restaurant.slug },
                  }" v-if="restaurant.products.length > 0">
                    <RestaurantCard :key="restaurant.id" :restaurant="restaurant" :imgStartUrl="store.imgStartUrl"
                      :isSelected="false" />
                  </router-link>
                  <div v-else>
                    <RestaurantCard :key="restaurant.id" :restaurant="restaurant" :imgStartUrl="store.imgStartUrl"
                        :isSelected="false" />
                  </div>
                </div>
              </div>
              <!-- Pagination -->
              <div class="row" v-if="totalRestaurants > 0">
                <ul class="pagination col-12 mt-3 mb-5">
                  <li class="page-item">
                    <button :class="{
                      'page-link': true,
                      disabled: currentPage === 1,
                    }" class="btn-icon" @click="
  getRestaurants(currentPage - 1, store.checkboxTypes)
  ">
                      <i class="fa-solid fa-angle-left"></i>
                    </button>
                  </li>
                  <li class="page-item" v-for="n in lastPage">
                    <button :class="{
                      'page-link-current page-link': true,
                      active: currentPage === n,
                    }" class="btn-icon" @click="getRestaurants(n, store.checkboxTypes)">
                      {{ n }}
                    </button>
                  </li>
                  <li class="page-item">
                    <button :class="{
                      'page-link-current page-link': true,
                      disabled: currentPage === lastPage,
                    }" @click="
  getRestaurants(currentPage + 1, store.checkboxTypes)
  ">
                      <i class="fa-solid fa-angle-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <LoaderComponent />
  </div>
</template>

<script>
import { store } from "../data/store";
import RestaurantCard from "../components/RestaurantCard.vue";
import SliderComponent from "../components/SliderComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import CartComponent from "../components/CartComponent.vue";
import axios from "axios";
export default {
  name: "RestaurantView",
  components: {
    RestaurantCard,
    SliderComponent,
    SidebarComponent,
    LoaderComponent,
    CartComponent
},
  //Data
  data() {
    return {
      store,
      filtersOpen: window.innerWidth <= 768 ? false : true,
      currentPage: null,
      lastPage: null,
      totalRestaurants: null,
      isLoading: true
    };
  },
  //Methods
  methods: {
    handleSlider(id) {
      store.checkboxTypes = [];
      store.checkboxTypes.push(id);
      const type = store.checkboxTypes;
      this.getRestaurants(1);
    },

    //Axios Call
    //getRestaurant
    getRestaurants(numPage) {
      let params = {
        page: numPage,
      };
      if (store.checkboxTypes) {
        store.scrollToElement("restaurantRow");
        params.types = store.checkboxTypes;
      }
      if (store.searchName) {
        store.scrollToElement("restaurantRow");
        params.search = store.searchName;
      }
      axios
        .get(`${store.apiURL}/restaurants`, {
          params,
        })
        .then((res) => {
          store.restaurants = res.data.results.data;
          this.currentPage = res.data.results.current_page;
          this.lastPage = res.data.results.last_page;
          this.totalRestaurants = res.data.results.total
          this.isLoading = false
        });
    },
    //getTypes
    getTypes() {
      axios.get(`${store.apiURL}/types`).then((res) => {
        store.types = res.data.results;
      });
    },
    handleWindowResize() {
      this.filtersOpen = window.innerWidth <= 768 ? false : true;
    },
    getTypeName(typeId) {
      const type = store.types.find((type) => type.id === typeId);
      return type ? type.name : "";
    },
    resetFilters() {
      store.checkboxTypes = [];
      store.searchName = '';
      this.getRestaurants(1);
    }
  },
  //Mounted
  mounted() {
    store.restaurants = null;
    this.getTypes();
    this.getRestaurants(1);
    store.cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
    window.addEventListener("resize", this.handleWindowResize);
  },
  //Unmounted
  unmounted() {
    store.restaurants = null;
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

// PAGINATION
.pagination {
  gap: 12px;

  .btn-icon {
    width: 10px;
    height: 10px;
  }

  .page-link {
    height: 38px;
    width: 38px;
    border-radius: 50%;
    border: 1px solid $primary;

    cursor: pointer;
  }

  .page-link:visited {
    text-decoration: none;
    color: $primary;
    font-size: 18px;
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }

  .page-link:link {
    text-decoration: none;
  }

  .page-link:hover {
    background-color: #679c36;
    color: white;
  }

  .page-link:hover,
  .page-link:active,
  .page-link.page-link--current {
    background-color: $primary;
    color: #fff;
  }
}

//From search bar
div {
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
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #8cad6c;
  }
}
</style>
