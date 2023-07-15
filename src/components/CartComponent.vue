<template>
    <div>
        <!-- Cart Card -->
        <div class="cart py-2 px-3 flex-column" :class="isOpen ? 'd-flex' : 'd-none'">
            <!-- Cart Title -->
            <i class="fa-solid fa-xmark fs-4 fw-bolder d-md-none" @click="isOpen = false">
            </i>
            <h3 class="text-center fw-bold mt-3 pb-0 px-3">I tuoi dati</h3>
            <hr class="mt-0">
            <!-- USER DATA -->
            <!-- Name and Surname -->
            <div :class="{'form-empty' : store.cart.user_name.length > 0}" class="form-floating  mb-2">
                <input  @input="dataToCart(store.cart.user_name)" @focus="handleFocus('user_name')" @blur="handleBlur('user_name')" v-model="store.cart.user_name" id="user_name"
                    name="user_name" type="text" class="form-control" maxlength="100" placeholder="Aniello Rossi"
                    required>
                <label for="name">Nome e Cognome *</label>
                <div><i class="fa-solid fa-user"></i></div>
            </div>
            <!-- /Name and Surname -->
            <!-- E-Mail -->
            <div :class="{'form-empty' : store.cart.user_email}" class="form-floating mb-2">
                <input  @input="dataToCart(store.cart.user_email)" @focus="handleFocus('user_email')" @blur="handleBlur('user_email')" v-model="store.cart.user_email" id="user_email"
                    name="user_email" type="email" class="form-control" maxlength="255" placeholder="luigiverdi@mail.com"
                    required>
                <label for="name">E-mail *</label>
                <div><i class="fa-solid fa-envelope"></i></div>
            </div>
            <!-- /E-Mail -->
            <!-- Address -->
            <div :class="{'form-empty' : store.cart.shipment_address}" class="form-floating mb-2">
                <input  @input="dataToCart(store.cart.shipment_address)" @focus="handleFocus('shipment_address')" @blur="handleBlur('shipment_address')" v-model="store.cart.shipment_address"
                    id="shipment_address" name="shipment_address" type="text" class="form-control" maxlength="255"
                    placeholder="Via Alberobello 18" required>
                <label for="name">Indirizzo *</label>
                <div><i class="fa-solid fa-location-dot"></i></div>
            </div>
            <!-- /Address -->
            <!-- /USER DATA -->
            <hr class=" mt-0 mb-3">
            <!-- ORDERS -->
            <h3 class="text-center fw-bold pb-0 px-3">Il tuo ordine</h3>
            <!-- Restaurant Name -->
            <div class="h6 text-center" :class="{ 'd-none': !store.cart.restaurant.name }">
                Presso: <span class="fw-medium">{{ store.cart.restaurant.name }}</span>
            </div>
            <hr class="mb-3 mt-0" :class="{ 'd-none': !store.cart.products.length }" />
            <!-- Product List -->
            <ul :class="{'d-none' : store.cart.products.length < 1}" class="list-unstyled overflow-y-auto cart-products container-fluid">
                <!-- Single Product -->
                <li v-for="(product, index) in store.cart.products" :class="{ 'border-top': index != 0 }"
                    class="py-2 row align-items-center">
                    <!-- Prod Name -->
                    <div class="col-4">{{ product.name }}</div>
                    <!-- Prod Counter -->
                    <div class="col-4">
                        <CounterProduct @onMinus="removeCart(product, index)" @onPlus="store.addCart(product)"
                            :quantity="product.quantity" />
                    </div>
                    <!-- Prod Price -->
                    <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div>{{ (product.price * product.quantity).toFixed(2) }}€</div>
                        <i @click.stop="deleteItem(index, product)" class="fa-solid fa-trash ms-2 delete-item p-1">
                        </i>
                    </div>
                </li>
            </ul>
            <div class="max-quantity" v-if="store.cart.products.length > 0">Max 50 unità per prodotto</div>
            <hr class="my-2 px-2" />
            <!-- Cart Total -->
            <div class="py-1 px-2 d-flex justify-content-between align-items-center fw-bold mb-2">
                <div>Totale</div>
                <div>{{ store.cart.totalPrice.toFixed(2) }}€</div>
            </div>
            <!-- Cart Footer Button -->
            <div class="d-flex flex-column justify-content-center align-items-center  mb-2">
                <button @click="this.$router.push('/checkout')" :class="{'d-none' : $route.name === 'checkout'}" class="btn btn-primary rounded-5 fw-bold text-white mb-3" :disabled="store.cart.products. length < 1">
                    Vai al pagamento
                </button>

                <div :class="{'d-none' : $route.name === 'checkout'}" class="text-center text-decoration-underline small px-2" @click="modalOpen = true">
                    Svuota Carrello
                </div>
                <router-link v-if="store.cart.restaurant.slug" :to="{ name: 'single-restaurant', params: { slug: store.cart.restaurant.slug } }" :class="{'d-none' : !($route.name === 'checkout')}" class="text-center text-black text-decoration-underline small px-2">
                    Torna al ristorante
                </router-link>
            </div>
        </div>
        <!-- /Cart Card -->

        <!-- Cart Bubble -->
        <div class="sticky-bubble d-flex justify-content-center align-items-center d-md-none rounded-circle"
            @click="isOpen = true">
            <i class="fa-solid fa-cart-shopping fs-3"></i>
            <span class="rounded-circle item-counter" v-if="store.cart.products.length > 0">{{ store.cart.products.length }}</span>
        </div>
        <!-- /Cart Bubble -->

        <!-- Delete Cart Modal -->
        <ModalComponent @onClick="clearLocalStorage" btnOne="Annulla" btnTwo="Svuota" :class="{ 'show d-block': modalOpen }"
            @closeModal="modalOpen = false" :body="modalBody" header="Svuota Carrello" />

    </div>
</template>

<script>
import axios from "axios";
import { store } from "../data/store";
import CounterProduct from "./CounterProduct.vue";
import ModalComponent from "./ModalComponent.vue";
export default {
    name: "CartComponent",
    components: {
        CounterProduct,
        ModalComponent
    },
    data() {
        return {
            store,
            isOpen: window.innerWidth >= 768 ? true : false,
            modalOpen: false,
            modalBody: 'Sei sicuro di voler svuotare il carrello?'
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

            this.modalOpen = false;
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
        dataToCart(data) {
            const item = data;
            const cart = store.cart;
            localStorage.setItem("cart", JSON.stringify(cart));
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
        sendForm() {
            if (store.cart.products.length >= 1) {
                const data = {
                    user_email: store.cart.user_email,
                    shipment_address: store.cart.shipment_address,
                    total_price: store.cart.totalPrice,
                    date_time: this.formatDateTime(new Date()),
                    products: store.cart.products,
                };
                axios.post(`${store.apiURL}/orders/store`, data).then((res) => {
                })
            } else {
                //Qualcuno stampa il messaggio
            }
        },
        //Change Input when Filled
        handleFocus(id){
            const element = document.getElementById(id);
            const parentElement = element.parentElement;
            parentElement.classList.remove("form-empty");
        },
        handleBlur(id){
            const element = document.getElementById(id);
            const parentElement = element.parentElement;
            if(element.value != ""){
                parentElement.classList.add("form-empty");
            }
        }
    },
    computed: {
        cartProducts(){
            return count(store.cart.products);
        }
    },
    mounted() {
        //Initialize cart
        store.cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
        //Handle Resize For Cart
        window.addEventListener("resize", this.handleWindowResize);
    },
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
    max-height: 100vh;
    overflow-y: auto;
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
        font-weight: 500;
        max-height: 100vh;
        min-height: 100px;
        .delete-item {
            color: #d93646;
            cursor: pointer;
        }
    }

    .small {
        cursor: pointer;
    };

    .form-floating {
        input {
            border-radius: 80px;
            transition: all 0.5s;
            padding-left: 2rem;
            font-weight: 500;
        }
        label{
            opacity: 1;
            transition: all 1s;
            background: transparent!important;
        }
        div{
            width: 20px;
            display: flex;
            justify-content: center;
            position: absolute;
            top: 5px;
            left: 10px;
            opacity: 0;
            transition: all 0.2s;
            color: white;
        }
    }

    .form-empty{
        margin-bottom: 0.5rem!important;

        input{
            border: none;
            padding-top: 14px;
            padding-bottom: 14px;
            margin-top: 0;
            margin-bottom: 0;
            height: 18px;
            min-height: 10px;
            transition: all 0.5s;
            background-color: #ececec;
            color: black;
            font-weight: 500;
            // background-color: #ececec;
        }
        label{
            opacity: 0;
            transition: all 0.3s;
            background: transparent!important;
        }
        div{
            width: 20px;
            display: flex;
            justify-content: center;
            position: absolute;
            top: 5px;
            left: 10px;
            opacity: 1;
            transition: all 2s;
            color: black;
        }
        //if u are still writing
        &:has(input:focus){
            input:focus {
            height: calc(3.5rem + calc(var(--bs-border-width) * 2));
            min-height: calc(3.5rem + calc(var(--bs-border-width) * 2));
            padding-top: 1.625rem;
            padding-bottom: 0.625rem;
            border-radius: 80px;
            transition: all 0.5s;
            padding-left: 2rem;
            background-color: white;
            color: black;
            border: 1px solid #ececec;
            }
        label{
            opacity: 1;
            transition: all 1s;
            background: transparent!important;
        }
        div{
            width: 20px;
            display: flex;
            justify-content: center;
            position: absolute;
            top: 5px;
            left: 10px;
            opacity: 0;
            transition: all 0.2s;
            color: white;
        }
        }
    }
    .max-quantity {
        font-size: .7rem;
        text-align: end;
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
    cursor: pointer;
    &:hover {
        background-color: #8cad6c;
    }
    .item-counter{
        background-color: #bc2d3b;
        color: white;
        font-size: .7rem;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        padding: 0 6px;
    }
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
        ul{
            max-height: 100vh;
            min-height: 100px;
        }
    }

}
</style>