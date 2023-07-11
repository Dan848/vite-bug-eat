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
            class="cart py-2 px-3 flex-column"
            :class="cartOpen ? 'd-flex' : 'd-none'">
            <!-- Cart Title -->
            <i class="fa-solid fa-xmark fs-4 fw-bolder d-md-none"
              @click="cartOpen = false">
            </i>
            <h3 class="text-center fw-bold mt-3 pb-0 px-3">Il tuo ordine</h3>
            <div class="h6 text-center" :class="{'d-none' : !cart.restaurant.name}">Presso: <span class="fw-medium">{{ cart.restaurant.name }}</span></div>
            <hr class="mb-2" :class="{'d-none' : !cart.products.length}" />
            <ul class="list-unstyled overflow-y-auto cart-products container-fluid">
              <!-- Single Product -->
              <li
                v-for="(product, index) in cart.products"
                :class="{ 'border-top': index != 0 }"
                class="py-2 row align-items-center">
                <div class="col-4">{{ product.name }}</div>
                <div class="col-4">
                  <CounterProduct
                    @onMinus="removeCart(product, index)"
                    @onPlus="addCart(product)"
                    :quantity="product.quantity"
                  />
                </div>
                <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                  <div class="">{{ (product.price * product.quantity).toFixed(2) }}€</div>
                  <i @click.stop="deleteItem(index, product)"
                    class="fa-solid fa-trash ms-2 delete-item p-1">
                  </i>
                </div>
              </li>
            </ul>
            <!-- Cart Total -->
            <hr class="my-2 px-2" />
            <div class="py-1 px-2 d-flex justify-content-between align-items-center fw-bold mb-2">
              <div>Totale</div>
              <div>{{ cart.totalPrice.toFixed(2) }}€</div>
            </div>
            <!-- Cart Pay Button -->
            <div class="d-flex flex-column justify-content-center align-items-center  mb-2">
              <button class="btn btn-primary rounded-5 fw-bold text-white mb-3">
                Vai al pagamento
              </button>
              <div class="text-center text-decoration-underline small px-2" @click="clearLocalStorage">
                Svuota Carrello
              </div>
            </div>

          </div>
          <!-- /Cart Card -->
          <!-- Cart Bubble -->
          <div
            class="sticky-bubble d-flex justify-content-center align-items-center d-md-none rounded-circle"
            @click="cartOpen = true"
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
import axios from "axios";
export default {
  name: "RestaurantListView",
  components: {
    ProductCard,
    CounterProduct,
  },
  data() {
    return {
      store,
      cartOpen: window.innerWidth >= 768 ? true : false,
      cartItems: [],
      cart: {
        restaurant: {},
        products: [],
        totalPrice: 0,
      },
    };
  },
  methods: {

    // Add Item
    addCart(item) {
      const cart = JSON.parse(localStorage.getItem("cart")) || this.cart;
      const newItem = item;

      if (cart.restaurant == null || cart.restaurant.id != newItem.restaurant_id) {
        cart.products = [];
        cart.totalPrice = 0;
        cart.restaurant = store.restaurant;
        newItem.quantity = 1;
        cart.products.push(newItem);
      } else{
        if (cart.products.some(product => product.id === newItem.id)) {
        const cartItem = cart.products.find(product => product.id === newItem.id);
        cartItem.quantity++;
        } else{
          newItem.quantity = 1;
          cart.products.push(newItem);
        }
      }
      cart.totalPrice += parseFloat(newItem.price);
      localStorage.setItem("cart", JSON.stringify(cart));
      this.cart = cart;
    },

    // Minus Item
    removeCart(item, index) {
      const cart = JSON.parse(localStorage.getItem("cart")) || this.cart;
      const cartItem = cart.products.find(product => product.id === item.id);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        cart.products.splice(index, 1);
      }
      cart.totalPrice -= parseFloat(cartItem.price);
      if (cart.totalPrice == 0) {
        cart.restaurant = {};
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.cart = cart;
    },

    // Delete
    deleteItem(index, item) {
      const cart = JSON.parse(localStorage.getItem("cart")) || this.cart;
      const cartItem = item;
      cart.products.splice(index, 1);
      cart.totalPrice -= parseFloat(cartItem.price * cartItem.quantity);
      if (cart.totalPrice == 0) {
        cart.restaurant = {};
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.cart = cart;
    },
    clearLocalStorage() {
      localStorage.clear();
      this.cart = {
        restaurant: {},
        products: [],
        totalPrice: 0,
      };
    },
    //Axios Start
    getRestaurant() {
      axios
        .get(`${store.apiURL}/restaurants/${this.$route.params.slug}`)
        .then((res) => {
          store.restaurant = res.data.results;
        });
    },
    //Axios End
    //Scroll to Top Page Start
    scrollToTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },

    handleWindowResize() {
      this.cartOpen = window.innerWidth <= 768 ? false : true;
    },
  },

  mounted() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || this.cart;
    this.getRestaurant();
    this.scrollToTop();
    window.addEventListener("resize", this.handleWindowResize);

    const cartData = localStorage.getItem("cart");
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
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
// OFF CANVAS

//BOTTOM PAGE
.menu-cart {
  margin-top: 120px;
  margin-bottom: 4rem;
  border-bottom: #8cad6c;

  .col {
    // OFFCANVAS CART
    .cart {
      max-width: 100%;
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      z-index: 1010;
      border: 1px solid $primary;
      margin-top: none !important;
      .fa-xmark {
        position: absolute;
        top: 18px;
        right: 16px;
        cursor: pointer;
        background-color: $primary;
        color: white;
        border-radius: 50%;
        padding: 0.4rem 0.5rem;
      }
      ul {
        max-height: calc(100vh - 286px);
        .delete-item {
          color: rgb(226, 0, 0);
          cursor: pointer;
        }
      }
      .small {
        cursor: pointer;
      };
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
// CART
@media screen and (min-width: 768px) {
  .menu-cart {
    .col {
      .cart {
        max-width: 100%;
        position: -webkit-sticky !important;
        position: sticky !important;
        top: 0;
        border: 1px solid $primary;
        margin-top: 1rem;
        border-radius: 2rem;
      }
    }
  }
}
</style>
