<template>
  <div class="container">
    <SliderComponent :types="store.types" :imgStartUrl="store.imgStartUrl" />
    <div class="row">
      <div class="col-2">
        <SidebarComponent
          :types="store.types"
          :imgStartUrl="store.imgStartUrl"
        />
      </div>
      <div class="col-10">
        <div class="row mt-5">
          <!-- Page navigation -->
          <div class="row justify-content-between">
            <form action="" method="GET" class="col-auto">
              <div class="form">
                <i class="fa fa-search"></i>
                <input
                  type="text"
                  class="form-control form-input"
                  placeholder="Cerca un ristorante"
                />
              </div>
            </form>
            <ul
              class="pagination d-flex justify-content-end my-md-auto col mt-3"
            >
              <li class="page-item">
                <button
                  :class="{
                    'page-link': true,
                    disabled: store.currentPage === 1,
                  }"
                  @click="getRestaurant(store.currentPage - 1)"
                >
                  <i class="fa-solid fa-angle-left"></i>
                </button>
              </li>
              <li class="page-item" v-for="n in store.lastPage">
                <button
                  :class="{
                    'page-link': true,
                    active: store.currentPage === n,
                  }"
                  @click="getRestaurant(n)"
                >
                  {{ n }}
                </button>
              </li>
              <li class="page-item">
                <button
                  :class="{
                    'page-link': true,
                    disabled: store.currentPage === store.lastPage,
                  }"
                  @click="getRestaurant(store.currentPage + 1)"
                >
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </li>
            </ul>
          </div>

          <div
            v-for="restaurant in store.restaurants"
            class="my-4 d-flex justify-content-center col-12 col-lg-6 col-xl-4"
          >
            <router-link
              :to="{
                name: 'single-restaurant',
                params: { slug: restaurant.slug },
              }"
            >
              <RestaurantCard
                :key="restaurant.id"
                :restaurant="restaurant"
                :imgStartUrl="store.imgStartUrl"
                :isSelected="false"
              />
            </router-link>
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
  name: "RestaurantListView",
  components: {
    RestaurantCard,
    SliderComponent,
    SidebarComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getRestaurant(numPage) {
      axios
        .get(`${store.apiURL}/restaurants`, {
          params: {
            page: numPage,
          },
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
  },
  mounted() {
    this.getRestaurant(1);
    this.getTypes();
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

//form search bar
form {
  input[type="text"] {
    border-radius: 80px;
  }
}
.form {
  position: relative;
}

.form .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #9ca3af;
}

.form span {
  position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;
}

.left-pan {
  padding-left: 7px;
}

.left-pan i {
  padding-left: 10px;
}

.form-input {
  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
}

.form-input:focus {
  box-shadow: $primary;
}
</style>
