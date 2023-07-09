<template>
  <div v-if="store.restaurant">
    <div class="background">
      <div class="container">
        <div class="row justify-content-center">
          <!-- Restaurant Info -->
          <div class="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-5 restaurant-card">
            <div class="card d-flex position-relative bg-primary text-white">
              <div
                class="border-0 d-flex flex-column align-items-center pt-3"
              >
                <h1 class="text-center">{{ store.restaurant.name }}</h1>
                <div class="d-flex justify-content-center types">
                  <span
                    :class="`span-${index}`"
                    v-for="(type, index) in store.restaurant.types"
                  >
                    {{ type.name }}
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
        </div>
      </div>
    </div>
    
    <div class="container menu">
      <h2>Il nostro Menu</h2>
      <div class="row">
        <div class="col-12 col-md-8">
          <ul class="list-unstyled product">
            <ProductCard v-for="(product, index) in store.restaurant.products" :product="store.restaurant.products[index]"/>
          </ul>
        </div>
        <!-- Cart -->
        <div class="col-4">
          <div class="cart card d-none d-md-block px-3 py-1 mt-3" :class="{'sticky' : cartSticky}">
            <h4 class="text-center fw-bold">Il tuo ordine</h4>
            <hr>
            <ul class="list-unstyled cart-products">
              <li class="d-flex justify-content-between align-items-center">
                <span>Nuggets di Cheddar e Jalapenos</span>
                <CounterProduct/>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                piatto 2
                <CounterProduct/>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                piatto 3
                <CounterProduct/>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                piatto 4
                <CounterProduct/>
              </li>
            </ul>
            <hr>
            <div class="d-flex justify-content-center pb-3">
              <button class="btn btn-primary rounded-4">Vai al pagamento</button>
            </div>
          </div>
          <div class="sticky-cart d-flex justify-content-center align-items-center d-md-none  bg-primary rounded-circle">
            <i class="fa-solid fa-cart-shopping fs-3"></i>
          </div>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../data/store";
import RestaurantCard from "../components/RestaurantCard.vue";
import SliderComponent from "../components/SliderComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import ProductCard from "../components/ProductCard.vue";
import CounterProduct from "../components/CounterProduct.vue";
import axios from "axios";
export default {
  name: "RestaurantListView",
  components: {
    RestaurantCard,
    SliderComponent,
    SidebarComponent,
    ProductCard,
    CounterProduct
  },
  data() {
    return {
      store,
      cartSticky: false
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
    getProducts() {
      axios
        .get(`${store.apiURL}/restaurants/${this.$route.params.slug}/products`)
        .then((res) => {
          store.products = res.data.results;
          console.log(res);
        });
    },
    scrollToTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    handleScroll() {
      // const cart = this.$refs.cart.offset().top;
      const currentPosition = window.scrollTo();
      const scrollTop = document.documentElement.scrollTop;
      this.cartSticky = scrollTop > 450;
      console.log(scrollTop);
    }
  },
  mounted() {
    this.getRestaurant();
    this.scrollToTop();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
.background {
  padding-top: 3rem;
  background: url("https://img.freepik.com/free-photo/view-arrangement-with-delicious-burgers_23-2148308811.jpg?w=1380&t=st=1688546437~exp=1688547037~hmac=a251e4ce6bfab4f64a3f9fc6d908c08d6a953e71c43bcc2d407669927dd52fec");
  background-position: center;
  background-size: cover;
  .row {
    position: relative;
    bottom: -100px;
  }
}
.card-body{
  background: #8cad6c;
  border-bottom-right-radius: 35px;
  border-bottom-left-radius: 35px;
}
.card {
  background: white;
  border-radius: 35px;
  .span-1 {
    &::before {
      color: rgb(60, 76, 79);
      content: "•";
      margin: 0 0.5rem;
      padding: 0 !important;
    }
  }
  .span-2 {
    &::before {
      color: rgb(60, 76, 79);
      content: "•";
      margin: 0 0.5rem;
    }
  }
}
.menu {
  margin-top: 120px;
  margin-bottom: 4rem;
  .product li{
    border-radius: 20px;
    transition: 0.3s;
    .input-group{
      transform: scale(2);
    }
    &:hover{
      cursor: pointer;
      background-color: lightgray;
      .input-group{
        display: block !important;
      } 
    } 
      
      
   
  }
}
.cart-products{
  li{
    margin-bottom: 1rem;
    font-size: .8rem;
    span{
      width: 70%;
    }
    div{
      width: 30%;
    }
  }
  .input-group{
    min-width: 40%;
  }
}
.cart{
  max-width: 300px;
  
}
.sticky-cart{
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 20px;
  right: 5px;
}
.sticky {
    position: fixed;
    top: 0;
    min-width: 216px;
  }

@media screen and (min-width: 845px) and (max-width: 991px){
  .cart{
    max-width: 216px;
  }
}
</style>
