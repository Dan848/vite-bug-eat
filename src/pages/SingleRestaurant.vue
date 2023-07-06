<template>
  <div v-if="store.restaurant">
    <div class="container">
      <h1>{{ store.restaurant.name }}</h1>
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
    // getTypes() {
    //   axios.get(`${store.apiURL}/types`).then((res) => {
    //     store.types = res.data.results;
    //   });
    // },
  },
  mounted() {
    this.getRestaurant();
    // this.getTypes();
  },
};
</script>

<style lang="scss" scoped></style>
