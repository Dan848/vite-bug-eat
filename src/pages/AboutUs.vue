<template>
  <div class="container" v-if="store.teams">
    <div>
      <CartComponent v-if="store.cart.products.length > 0"/>
    </div>
    <h2 class="text-center my-5 pixel-text text-secondary">Conosci meglio il nostro Team!</h2>
    <div class="row align-items-stretch">
      <AboutUsCard v-for="team in store.teams" :key="team.id" :team="team" />

    </div>
  </div>

  <div v-else>
    <LoaderComponent />
  </div>
</template>

<script>
import { store } from "../data/store";
import AboutUsCard from "../components/AboutUsCard.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import CartComponent from "../components/CartComponent.vue";
export default {
  name: "AboutUs",
  components: {
    AboutUsCard,
    LoaderComponent,
    CartComponent
},
  data() {
    return {
      store,
    };
  },
  mounted() {
    store.show = false;
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/partials/variable.scss' as *;

.guest {
  width: 350px;

  .card {
    background-color: white;
    color: $primary;
  }

  .guest-star {
    position: absolute;
    right: 0;
    top: 0;
    margin-left: -50px;
    z-index: 5;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: #ccc;
    border: 3px solid #fff;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 100px;
      height: auto;
    }
  }
}
</style>
