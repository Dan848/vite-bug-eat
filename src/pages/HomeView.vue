<template>
  <div v-if="store.types != null">
    <div class="container-fluid">
      <div class="container">
        <JumbotronHome />
      </div>
    </div>

    <!-- Types slider -->
    <div class="container d-flex justify-content-center my-5 px-4 px-lg-5">
      <SliderComponent :types="store.types" :imgStartUrl="store.imgStartUrl" />
    </div>

    <div v-for="section in store.sections">
      <HomeSection :section="section" />
    </div>

    <div>
      <CartComponent />
    </div>
  </div>

  <div v-else>
    <LoaderComponent />
  </div>
</template>

<script>
import HomeSection from "../components/HomeSection.vue";
import SliderComponent from "../components/SliderComponent.vue";
import JumbotronHome from "../components/JumbotronHome.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import CartComponent from "../components/CartComponent.vue";
import axios from "axios";
import { store } from "../data/store";
export default {
  name: "HomeView",
  components: {
    HomeSection,
    JumbotronHome,
    SliderComponent,
    LoaderComponent,
    CartComponent
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getTypes() {
      axios.get(`${store.apiURL}/types`).then((res) => {
        store.types = res.data.results
      })
    }
  },
  mounted() {
    store.searchName = "";
    store.show = false;
    store.types = null;
    this.getTypes();
    console.log(store.restaurants);
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

// SEARCH BAR
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
  box-shadow: none;
  border: none;
}

// END SEARCH BAR

//JUMBOTRON

.jumbo-logo {
  width: 250px;
}

h2 {
  text-align: left;
}

p {
  font-size: 1.4rem;
  text-align: right;
}
</style>