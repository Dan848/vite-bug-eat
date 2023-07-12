<template>
    <div>
        <!-- Cart Card -->
        <form @submit.prevent="sendForm()" class="cart py-2 px-3 flex-column" :class="isOpen ? 'd-flex' : 'd-none'">
            <!-- Cart Title -->
            <i class="fa-solid fa-xmark fs-4 fw-bolder d-md-none"
                @click="isOpen = false">
            </i>
            <h3 class="text-center fw-bold mt-3 pb-0 px-3">I tuoi dati</h3>
            <hr>
            <!-- Input text -->
                <div class="form-floating mb-3">  
                    <input @input="dataToCart(store.cart.user_email)" v-model="store.cart.user_email" id="user_email" name="user_email" type="email"
                        class="form-control" maxlength="255" placeholder="luigiverdi@mail.com" required>
                    <label for="name">E-mail *</label>
                </div>
                <div class="form-floating mb-3">
                    <input @input="dataToCart(store.cart.shipment_address)" v-model="store.cart.shipment_address"  id="shipment_address" name="shipment_address" type="text"
                        class="form-control" maxlength="255" placeholder="Via Alberobello 18" required>
                    <label for="name">Indirizzo *</label>
                </div>

                <hr class="mb-4">
                <!-- /Input text -->
                <h3 class="text-center fw-bold mt-3 pb-0 px-3">Il tuo ordine</h3>
                <!-- Restaurant Name -->
                <div class="h6 text-center" :class="{'d-none' : !store.cart.restaurant.name}">
                    Presso: <span class="fw-medium">{{ store.cart.restaurant.name }}</span>
                </div>
                <hr class="mb-2" :class="{'d-none' : !store.cart.products.length}" />
                <!-- Product List -->
                <ul class="list-unstyled overflow-y-auto cart-products container-fluid">
                    <!-- Single Product -->
                    <li
                    v-for="(product, index) in store.cart.products"
                    :class="{ 'border-top': index != 0 }"
                    class="py-2 row align-items-center">
                        <!-- Prod Name -->
                        <div class="col-4">{{ product.name }}</div>
                        <!-- Prod Counter -->
                        <div class="col-4">
                            <CounterProduct
                            @onMinus="removeCart(product, index)"
                            @onPlus="store.addCart(product)"
                            :quantity="product.quantity"
                            />
                        </div>
                        <!-- Prod Price -->
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                            <div>{{ (product.price * product.quantity).toFixed(2) }}€</div>
                            <i @click.stop="deleteItem(index, product)"
                            class="fa-solid fa-trash ms-2 delete-item p-1">
                            </i>
                        </div>
                    </li>
                </ul>
                <span class="max-quantity-span" v-if="store.cart.products.length > 0">Max 50 unità per prodotto</span>
                <hr class="my-2 px-2" />
                <!-- Cart Total -->
                <div class="py-1 px-2 d-flex justify-content-between align-items-center fw-bold mb-2">
                    <div>Totale</div>
                    <div>{{ store.cart.totalPrice.toFixed(2) }}€</div>
                </div>
                <!-- Cart Footer Button -->
                <div class="d-flex flex-column justify-content-center align-items-center  mb-2">
                    <button type="submit" class="btn btn-primary rounded-5 fw-bold text-white mb-3">
                    Vai al pagamento
                    </button>
                    <!-- <router-link :to="{
                    name: 'checkout',
                    params: { id:1 } }" class="btn btn-primary rounded-5 fw-bold text-white mb-3">
                    Vai al pagamento
                    </router-link> -->
                    <div class="text-center text-decoration-underline small px-2" @click="clearLocalStorage">
                    Svuota Carrello
                </div>
                </div>
        </form>
        <!-- /Cart Card -->
        <!-- Cart Bubble -->
        <div class="sticky-bubble d-flex justify-content-center align-items-center d-md-none rounded-circle"
        @click="isOpen = true">
            <i class="fa-solid fa-cart-shopping fs-3"></i>
        </div>
        <!-- /Cart Bubble -->
    </div>
</template>

<script>
import axios from "axios";
import { store } from "../data/store";
import CounterProduct from "./CounterProduct.vue";
export default {
    name: "CartComponent",
    components: {
        CounterProduct
    },
    data() {
        return {
            store,
            isOpen: window.innerWidth >= 768 ? true : false,
        }
    },
    methods: {
        // Minus Item
        removeCart(item, index) {
            const cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
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
            store.cart = cart;
        },
        // Delete Item
        deleteItem(index, item) {
            const cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
            const cartItem = item;
            cart.products.splice(index, 1);
            cart.totalPrice -= parseFloat(cartItem.price * cartItem.quantity);
            if (cart.totalPrice == 0) {
            cart.restaurant = {};
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            store.cart = cart;
        },
        // Clear Local Storage
        clearLocalStorage() {
            store.cart.restaurant = {};
            store.cart.products = [];
            store.cart.totalPrice = 0;
            localStorage.setItem("cart", JSON.stringify(store.cart));

        },
        //Handle Resize
        handleWindowResize() {
            this.isOpen = window.innerWidth <= 768 ? false : true;
        },
        //Remove Scrollbar when Offcanvas
        setBodyOverflow() {
            if (this.cartOpen) {
            document.body.style.overflow = 'hidden';
            } else {
            document.body.style.overflow = '';
            }
        },
        //Add Email and Address to Cart
        dataToCart(data){
            const item = data;
            const cart = store.cart;
            localStorage.setItem("cart", JSON.stringify(cart));

            console.log(item);
        },
        //Format data
        formatDateTime(dateTime) {
            const year = dateTime.getFullYear();
            const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
            const day = dateTime.getDate().toString().padStart(2, '0');
            const hours = dateTime.getHours().toString().padStart(2, '0');
            const minutes = dateTime.getMinutes().toString().padStart(2, '0');
            const seconds = dateTime.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        //Send form data
        sendForm(){
            const data = {
                user_email: store.cart.user_email,
                shipment_address: store.cart.shipment_address,
                total_price: store.cart.totalPrice,
                date_time: this.formatDateTime(new Date()),
                products: store.cart.products,
            };
            axios.post(`${store.apiURL}/orders/store`, data).then((res) => {
                console.log(res.data)
            })
        },

    },
    mounted(){
        //Initialize cart
        store.cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
        //Handle Resize For Cart
        window.addEventListener("resize", this.handleWindowResize);
    },
    //Computed
    computed:{

    }
}
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
    //OffCanvas
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
        max-height: calc(100vh - 563px);
        .delete-item {
          color: rgb(226, 0, 0);
          cursor: pointer;
        }
      }
      .small {
        cursor: pointer;
      };

      .form-floating{
        input{
            border-radius: 80px;
        }
      }
    }
    //Bubble
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
    .max-quantity-span{
      font-size: .7rem;
      text-align: end;
    }
    //Card
    @media screen and (min-width: 768px) {
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
</style>