<template>
  <HomeSection />

  <!-- Types slider -->
  <div class="d-flex justify-content-center my-5">
    <div class="w-75">
      <SliderComponent
        :types="store.types"
        :imageBaseUrl="store.imageBaseUrl"
      />
    </div>
  </div>
</template>

<script>
import HomeSection from "../components/HomeSection.vue";
import SliderComponent from "../components/SliderComponent.vue";
import axios from "axios";
import { store } from "../data/store";
export default {
  name: "HomeView",
  components: {
    HomeSection,
    SliderComponent,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getTypes() {
      axios.get(`${store.apiUrl}/types`).then((res) => {
        store.types = res.data.results;
      });
    },
  },
  mounted() {
    this.getTypes();
  },
};
</script>

<style lang="scss" scoped></style>
