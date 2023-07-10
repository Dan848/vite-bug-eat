<template>
  <div class="container">
    <!-- Slider -->
    <SliderComponent :types="store.types" :imgStartUrl="store.imgStartUrl" @onClick="handleSlider"/>
    <div class="row justify-content-center">
      <!-- Aside -->
      <div class="col-2 sidebar">
        <SidebarComponent :checkboxTypes="store.checkboxTypes" @onChange="getRestaurant" :items="store.types" :imgStartUrl="store.imgStartUrl" />
      </div>
      <!-- Main -->
      <div class="col-10">
        <div class="row mt-5">
          <!-- Page navigation -->
          <div class="row justify-content-between search">
            <form action="" method="GET" class="col-12 col-md-6">
              <div class="form">
                <i class="fa fa-search"></i>
                <input type="text" class="form-control form-input" placeholder="Cerca un ristorante">
              </div>
            </form>
            <!-- PAGINATION -->
            <ul class="pagination d-flex my-md-auto col-12 col-md-6 mt-3">
              <li class="page-item">
                <button :class="{ 'page-link': true, disabled: store.currentPage === 1 }"
                  @click="getRestaurant(store.currentPage - 1)">
                  <i class="fa-solid fa-angle-left"></i>
                </button>
              </li>
              <li class="page-item" v-for="n in store.lastPage">
                <button :class="{ 'page-link': true, active: store.currentPage === n }" @click="getRestaurant(n)">
                  {{ n }}
                </button>
              </li>
              <li class="page-item">
                <button :class="{
                  'page-link': true,
                  disabled: store.currentPage === store.lastPage,
                }" @click="getRestaurant(store.currentPage + 1)">
                  <i class="fa-solid fa-angle-right"></i>
                </button>
              </li>
            </ul>
          </div>
          <!-- Rstaurant List -->
          <div v-for="restaurant in store.restaurants"
            class="my-4 d-flex justify-content-center col-12 col-lg-6 col-xl-4">
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
import SliderComponent from "../components/SliderComponent.vue"
import SidebarComponent from "../components/SidebarComponent.vue"
import axios from "axios";
export default {
  name: "RestaurantView",
  components: {
    RestaurantCard,
    SliderComponent,
    SidebarComponent
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    handleSlider(id){
      store.checkboxTypes = [];
      store.checkboxTypes.push(id);
      const type = store.checkboxTypes;
      this.getRestaurant(1 , type)
    },
    getRestaurant(numPage, checkboxTypes) {
      let params = {
          page: numPage,
      };
      if (checkboxTypes){
        params.types = checkboxTypes;
      }
      axios.get(`${store.apiURL}/restaurants`, {
        params
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

@media screen and (max-width: 844px) {
  .sidebar {
    display: none;
  }

  ul {
    justify-content: center;
  }

  // .search{
  //   flex-direction: column;
  //   align-items: center !important;
  //   justify-content: center !important;
  //   margin-top: 1.5rem;
  // }
}

@media screen and (min-width: 845px) {
  ul {
    justify-content: end;
  }
}
</style>