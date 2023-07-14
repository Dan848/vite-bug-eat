<template>
  <div v-if="store.restaurant">
    <!-- Restaurant Background and Info -->
    <div class="background">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col">
            <!-- Restaurant Card Start -->
            <div class="rounded-5 border py-2 px-3 d-flex flex-column bg-primary text-white">
              <!-- Name -->
              <h1 class="text-center fw-medium py-2 px-3">
                {{ store.restaurant.name }}
              </h1>
              <!-- Types -->
              <div class="text-center px-3">
                <span :class="`me-1 mb-5`" v-for="(type, index) in store.restaurant.types">
                  {{
                    index == store.restaurant.types.length - 1
                    ? type.name
                    : type.name + " •"
                  }}
                </span>
                <div class="mt-2 mb-3">{{ store.restaurant.address }}</div>
              </div>
              <!-- Contacts -->
              <div class="container-fluid border-top py-2">
                <div class="row flex-column justify-content-center">
                  <div class="col-12 text-center">
                    <div class="">{{ store.restaurant.email }}</div>
                  </div>
                  <div class="col-12 text-center">
                    <div>{{ store.restaurant.phone_num }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product and Cart -->
    <div class="container menu-cart">
      <h2 class="fw-bold">Menù</h2>
      <div class="row">
        <!-- Menù Col -->
        <div class="col-12 col-md-6 col-lg-7 col-xxl-8">
          <ul class="list-unstyled">
            <ProductCard @click="checkRestaurant(product)" v-for="(product, index) in store.restaurant.products"
              :product="product" :key="product.id" />
          </ul>
        </div>
        <!-- Cart Col -->
        <CartComponent class="col" />
      </div>
    </div>
  </div>
  <ModalComponent @onClick="addCartModal(modalItem)" btnOne="Annulla" btnTwo="Conferma"
    :class="{ 'show d-block': openModal }" @closeModal="openModal = false"
    :body="`Stai già ordinando da ${store.cart.restaurant.name}, sei sicuro di voler svuotare e ordinare da un altro ristorante?`"
    header="Conferma" />
</template>

<script>
import { store } from "../data/store";
import ProductCard from "../components/ProductCard.vue";
import CartComponent from "../components/CartComponent.vue";
import ModalComponent from "../components/ModalComponent.vue";
import axios from "axios";
export default {
  name: "RestaurantListView",
  components: {
    ProductCard,
    CartComponent,
    ModalComponent,
  },
  data() {
    return {
      store,
      openModal: false,
      modalItem: null
    };
  },
  methods: {

    //Get Restaurant
    getRestaurant() {
      axios
        .get(`${store.apiURL}/restaurants/${this.$route.params.slug}`)
        .then((res) => {
          store.restaurant = res.data.results;
        });
    },
    //Check restaurant id
    checkRestaurant(item) {
      const cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
      const newItem = item;

      if (cart.restaurant.id == newItem.restaurant_id || Object.keys(cart.restaurant).length == 0) {
        store.addCart(newItem);

      } else {
        this.openModal = true;
        return this.modalItem = newItem;
      }
    },
    addCartModal(item) {
      store.addCart(item);
      this.openModal = false;
    }
  },

  mounted() {
    //Get Restaurant 
    this.getRestaurant();
    // const cartData = localStorage.getItem("cart");
    // if (cartData) {
    //   store.cartItems = JSON.parse(cartData);
    // }
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

//   Light Green #8cad6c;
//Top Page
.background {
  padding-top: 3rem;
  background: url("https://img.freepik.com/free-photo/view-arrangement-with-delicious-burgers_23-2148308811.jpg?w=1380&t=st=1688546437~exp=1688547037~hmac=a251e4ce6bfab4f64a3f9fc6d908c08d6a953e71c43bcc2d407669927dd52fec");
  background-position: center;
  background-size: cover;

  .col {
    position: relative;
    bottom: -100px;
    max-width: 550px;
  }
}

.bm-border {
  border-bottom: 1px solid $primary;
}

//BOTTOM PAGE
.menu-cart {
  margin-top: 120px;
  margin-bottom: 4rem;
  border-bottom: #8cad6c;
}
</style>
