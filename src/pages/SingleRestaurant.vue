<template>
  <div v-if="store.restaurant">
    <div class="container background d-flex justify-content-center">
      <div class="d-flex">
        <div class="row">

          <!-- Restaurant Info -->
          <div class="col-8">
            <div class="card d-flex">
              <div class="card-header border-0 d-flex flex-column align-items-center">
                <h1>{{ store.restaurant.name }}</h1>
                <div class="d-flex justify-content-center types">
                  <span :class="`span-${index}` " v-for="(type,index) in store.restaurant.types">
                    {{type.name}}
                    <img src="" alt="">
                  </span>
                </div>
                <p>{{ store.restaurant.address }}</p>
              </div>
              <div class="card-body d-flex flex-column align-items-center pb-0">
                <p class="m-0">{{ store.restaurant.email }}</p>
                <p>{{ store.restaurant.phone_num }}</p>
              </div>
            </div>
          </div>

          <!-- Cart -->
          <div class="col-4">
            <div class="cart card">
              <h1>sugnu u carrellu</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container menu">
      <h2>Il nostro Menu</h2>
      <div class="card col-8">
        ul
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
    getRestaurant() {
      axios
        .get(`${store.apiURL}/restaurants/${this.$route.params.slug}`)
        .then((res) => {
          store.restaurant = res.data.results;
        });
    },
    scrollToTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  },
  mounted() {
    this.getRestaurant();
    this.scrollToTop();
  },
};
</script>

<style lang="scss" scoped>
.background{
  padding-top: 3rem;
  background: url('https://img.freepik.com/free-photo/view-arrangement-with-delicious-burgers_23-2148308811.jpg?w=1380&t=st=1688546437~exp=1688547037~hmac=a251e4ce6bfab4f64a3f9fc6d908c08d6a953e71c43bcc2d407669927dd52fec');
  background-position: center;
  background-size: cover;
  .row{
    position: relative;
    bottom: -100px;
  }
}
.card{
  background: white;
  border-radius: 35px;
  padding: 1rem;
  .span-1{
    &::before{
    color: rgb(60, 76, 79);
    content: "•";
    margin: 0 .5rem;
    padding: 0 !important;
    }
  }
  .span-2{
    &::before{
    color: rgb(60, 76, 79);
    content: "•";
    margin: 0 .5rem;
    }
  }
}
.menu{
  margin-top: 120px;
  .card{
    padding-right: 1rem;
  }
  
  padding: 1rem;
}
</style>
