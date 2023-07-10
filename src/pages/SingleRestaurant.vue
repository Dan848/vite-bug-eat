<template>
  <div v-if="store.restaurant">
    <!-- Top Page -->
    <div class="background">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Restaurant Card Info -->
          <div class="col">
            <!-- Card Start -->
            <div
              class="rounded-5 border py-2 px-3 d-flex flex-column bg-primary text-white"
            >
              <!-- Name -->
              <h1 class="text-center fw-medium py-2 px-3">
                {{ store.restaurant.name }}
              </h1>
              <!-- Types -->
              <div class="text-center px-3">
                <span
                  :class="`me-1 mb-5`"
                  v-for="(type, index) in store.restaurant.types"
                >
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
    <!-- Main Page -->
    <div class="container menu-cart">
      <h2 class="fw-bold">Menù</h2>
      <div class="row">
        <!-- Menù Col -->
        <div class="col-12 col-md-6 col-lg-7 col-xxl-8">
          <ul class="list-unstyled">
            <ProductCard
              @click="addCart(product)"
              v-for="(product, index) in store.restaurant.products"
              :product="product"
              :key="product.id"
            />
          </ul>
        </div>
        <!-- Cart Col -->
        <div class="col">
          <!-- Cart Card -->
          <div
            class="cart d-none d-md-block mt-3 rounded-5 py-2 px-3 d-flex flex-column"
          >
            <!-- Cart Title -->
            <h3 class="text-center fw-bold mt-3 pb-0 px-3">Il tuo ordine</h3>
            <hr class="mb-2" />
            <ul class="list-unstyled cart-products container-fluid">
              <!-- Single Product -->
              <li
                v-for="(product, index) in cart.products"
                :class="{ 'border-top': index != 0 }"
                class="py-2 row align-items-center"
              >
                <div class="col-4">{{ product.name }}</div>
                <div class="col-4">
                  <CounterProduct
                    @onMinus="removeCart(product, index)"
                    @onPlus="addCart(product)"
                    :quantity="product.quantity"
                  />
                </div>
                <div class="col-4 text-end text-nowrap">
                  <div class="text-end d-inline">{{ (product.price * product.quantity).toFixed(2) }}€</div>
                  <i
                    @click.stop="deleteItem(index, product)"
                    class="fa-solid fa-trash ms-2 delete-item p-1"
                  ></i>
                </div>
              </li>
              <!-- Cart Total -->
              <hr class="my-2 row" />
              <li class="py-1 row align-items-center fw-bold">
                <div class="col-5">Totale</div>
                <div class="col text-end">
                  {{ cart.totalPrice.toFixed(2) }}€
                </div>
              </li>
            </ul>
            <!-- Cart Pay Button -->
            <div class="d-flex justify-content-center mb-3">
              <button class="btn btn-primary rounded-5 fw-bold text-white">
                Vai al pagamento
              </button>
            </div>
          </div>
          <!-- /Cart Card -->
          <!-- Cart Bubble -->
          <div
            class="sticky-bubble d-flex justify-content-center align-items-center d-md-none rounded-circle"
            :class="{ 'd-none': cartStickyHide }"
          >
            <i class="fa-solid fa-cart-shopping fs-3"></i>
          </div>
          <!-- /Cart Bubble -->
        </div>
        <!-- /Cart Col -->
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../data/store";
import ProductCard from "../components/ProductCard.vue";
import CounterProduct from "../components/CounterProduct.vue";
import axios, { all } from "axios";
export default {
  name: "RestaurantListView",
  components: {
    ProductCard,
    CounterProduct,
  },
  data() {
    return {
      store,
      cart: {
        restaurantId: null,
        products: [],
        totalPrice: 0,
      },
    };
  },
  methods: {
    addCart(item) {
      // Recupera l'array esistente dal Local Storage o inizializza un array vuoto
      const cart = this.cart;
      const newItem = item;

      if (cart.products.includes(newItem)) {
        newItem.quantity++;
      } else {
        newItem.quantity = 1;
        cart.products.push(newItem);
      }
      cart.totalPrice += parseFloat(newItem.price);
      // Salva l'array aggiornato nel Local Storage
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    removeCart(item, index) {
      const cart = this.cart;
      const cartItem = item;
      console.log(cartItem);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        cart.products.splice(index, 1);
      }
      cart.totalPrice -= parseFloat(cartItem.price);
      // Salva l'array aggiornato nel Local Storage
    },
    //Axios Start
    getRestaurant() {
      axios
        .get(`${store.apiURL}/restaurants/${this.$route.params.slug}`)
        .then((res) => {
          store.restaurant = res.data.results;
        });
    },
    getProducts() {
      axios
        .get(`${store.apiURL}/restaurants/${this.$route.params.slug}/products`)
        .then((res) => {
          store.products = res.data.results;
          console.log(res);
        });
    },
    //Axios End
    //Scroll to Top Page Start
    scrollToTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    deleteItem(index, item) {
      const cart = this.cart;
      const cartItem = item;
      cart.products.splice(index, 1);
      console.log(cartItem.quantity);
      cart.totalPrice -= parseFloat(cartItem.price * cartItem.quantity);
    },
  },

  mounted() {
    this.getRestaurant();
    this.scrollToTop();
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

  .col {
    .cart {
      max-width: 100%;
      position: -webkit-sticky !important;
      position: sticky !important;
      top: 0;
      border: 1px solid $primary;
    }

    .delete-item {
      background-color: white;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
    .sticky-bubble {
      position: fixed;
      width: 50px;
      height: 50px;
      bottom: 10px;
      right: 5px;
      background-color: $primary;
      color: white;
      &:hover {
        cursor: pointer;
        background-color: #8cad6c;
      }
    }
  }
}
</style>
