<template>
  <div class="container">
    <div>
      
    </div>
    
    <div class="row mt-5">
      <!-- Page navigation -->
      <div class="d-flex justify-content-between">
        <h1 class="my-auto">Lista Ristoranti</h1>
        <ul class="pagination d-flex justify-content-end my-auto">
            <li class="page-item"><button :class="{ 'page-link': true, 'disabled': store.currentPage === 1 }"
                    @click="getRestaurant(store.currentPage - 1)"><i class="fa-solid fa-angle-left"></i></button></li>
            <li class="page-item" v-for="n in store.lastPage"><button
                    :class="{ 'page-link': true, 'active': store.currentPage === n }" @click="getRestaurant(n)">{{ n
                    }}</button>
            </li>

            <li class="page-item"><button
                    :class="{ 'page-link': true, 'disabled': store.currentPage === store.lastPage }"
                    @click="getRestaurant(store.currentPage + 1)"><i class="fa-solid fa-angle-right"></i></button></li>
        </ul>
      </div>
      
      <div v-for="restaurant in store.restaurants"
          class="mb-5 d-flex justify-content-center col-12 col-sm-6 col-md-4 col-lg-3 g-5">
              <RestaurantCardComponent :key="restaurant.id" :restaurant="restaurant" :imgStartUrl="store.imgStartUrl"
                  :isSelected="false" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../data/store";
import HomeSection from "../components/HomeSection.vue";
import RestaurantCardComponent from "../components/RestaurantCardComponent.vue";
import axios from "axios";
export default {
  name: "RestaurantListView",
  components: {
    HomeSection,
    RestaurantCardComponent
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getRestaurant(numPage) {
      axios.get(`${store.apiURL}/restaurants`, {
        params: {
          'page': numPage
        }
      }).then((res) => {
        store.restaurants = res.data.results.data;
        store.currentPage = res.data.results.current_page;
        store.lastPage = res.data.results.last_page;
      })
    }
  },
  mounted() {
    this.getRestaurant(1);
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
</style>
