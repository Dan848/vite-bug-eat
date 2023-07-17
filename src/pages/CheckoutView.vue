<template>
  <form id="paymentForm" class="container my-5">
    <div class="row justify-content-between flex-column flex-md-row align-items-center align-items-md-start">
      <CartComponent class="col-12 col-md-6 mb-5 mb-md-0" />
      <div class="col-12 col-md-6">
        <h2 class="text-center mt-3 fw-medium">Dati pagamento</h2>
        <!-- Form Payment -->
        <div class="position-relative fw-medium">
          <div class="form-group">
            <label>Nome Titolare</label>
            <div id="holder" class="form-control"></div>
          </div>
          <div class="form-group">
            <label>Numero Carta</label>
            <div id="credit" class="form-control"></div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label>Data di Scadenza</label>
                <div id="expire" class="form-control"></div>
              </div>
              <div class="col-6">
                <label>CVV</label>
                <div id="cvv" class="form-control"></div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-primary rounded-5 text-white fw-bold px-4 py-2 mt-3"
              @click="payWithCreditCard"
              :disabled="
                !this.hostedFieldInstance ||
                !store.cart.user_email ||
                !store.cart.user_name ||
                !store.cart.shipment_address
              ">
              Ordina e Paga
            </button>
          </div>
          <div v-if="message" :class="error ? 'alert-danger' : 'alert-success'" class="mt-5 alert rounded-5">
            {{ message }}
          </div>
          <div class="loader" :class="{ 'd-none': !isLoading }">
            <i :class="{'d-none' : completeOrder}" class="fa-solid fa-circle-notch fa-spin"></i> <i :class="{'d-none' : !completeOrder}" class="fa-solid fa-circle-check"></i>
            <span class="fs-3">{{ loadingMessage }}</span>  
          </div>
        </div>
      </div>
      <!-- /Form -->
    </div>
  </form>
</template>

<script>
import { store } from "../data/store";
import CartComponent from "../components/CartComponent.vue";
import axios from "axios";
import braintree from "braintree-web";

export default {
  name: "CheckoutView",
  components: {
    CartComponent,
  },
  data() {
    return {
      store,
      hostedFieldInstance: false,
      nonce: "",
      isLoading: true,
      loadingMessage: 'Caricamento...',
      message: "",
      error: false,
      completeOrder: false
    };
  },
  methods: {
    //Format data
    formatDateTime(dateTime) {
      const year = dateTime.getFullYear();
      const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
      const day = dateTime.getDate().toString().padStart(2, "0");
      const hours = dateTime.getHours().toString().padStart(2, "0");
      const minutes = dateTime.getMinutes().toString().padStart(2, "0");
      const seconds = dateTime.getSeconds().toString().padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    //Send form data
    sendForm() {
      this.loadingMessage = "Invio Ordine"
        const data = {
          restaurant_email: store.cart.restaurant.email,
          user_email: store.cart.user_email,
          shipment_address: store.cart.shipment_address,
          total_price: store.cart.totalPrice,
          date_time: this.formatDateTime(new Date()),
          products: store.cart.products,
        }
        axios.post(`${store.apiURL}/orders/store`, data).then((res) => {
          if(res.data.success){
            this.loadingMessage = "Ordine effettuato. Controlla l'email. A breve verrai reindirizzato alla lista dei ristoranti"
            this.completeOrder = true
            setTimeout(() => {
              store.cart.restaurant = {};
              store.cart.products = [];
              store.cart.totalPrice = 0;
              localStorage.setItem("cart", JSON.stringify(store.cart));
                this.$router.push('/restaurantview');
            }, 6000);
          }
        });
    },
    // Al submit...
    payWithCreditCard(e) {
      const form = document.getElementById("paymentForm");
      if (form.checkValidity()) {
        e.preventDefault();
        //...se ho ricevuto il token da braintree...
        if (this.hostedFieldInstance) {
          this.loadingMessage = "Pagamento in corso..."
          this.isLoading = true;
          //...genera un altro token da inviare per pagare
          this.hostedFieldInstance
            .tokenize()
            .then((payload) => {
              //token
              this.nonce = payload.nonce;
              //API make-payment
              this.postPayment();
            })
            .catch((err) => {
              this.error = true
              this.isLoading = false
              if(err.message == "All fields are empty. Cannot tokenize empty card fields."){
                this.message = 'I campi sono vuoti, completali tutti';
              } else if(err.message == "Some payment input fields are invalid. Cannot tokenize invalid card fields."){
                this.message = "Alcuni campi inseriti non sono validi";
              } else {
                this.message = err.message;
              }
            });
        }
      }
    },
    //API make-payment
    postPayment() {
      store.cart = JSON.parse(localStorage.getItem("cart"));
      const data = {
        token: this.nonce,
        amount: store.cart.totalPrice,
      };
      axios.post(`${store.apiURL}/orders/make-payment`, data).then((res) => {
        if(res.data.success){
          this.message = res.data.message;
          this.error = false;
          this.loadingMessage = "Pagamento effettuato"
          this.sendForm();
        } else {
          this.message = res.data.message;
          this.error = true;
        }
      });
    },
    //Genera Campi Editabili da Braintree
    getHostedFields(token) {
      braintree.client
        .create({
          authorization: token,
          locale: "it_IT",
        })
        .then((clientInstance) => {
          let options = {
            client: clientInstance,
            styles: {
              input: {
                "font-size": "16px",
                ".invalid": "braintree-invalid-class",
                ".valid": "braintree-valid-class",
                ".input": ".braintree-input-class",
              },
            },
            fields: {
              number: {
                selector: "#credit",
                placeholder: "4111 1111 1111 1111",
                maxCardLength: 16,
                maskInput: { character: "*", showLastFour: true },
                attribute: "aria-required",
                supportedCardBrands: { "card-brand-id": true },
              },
              cvv: {
                selector: "#cvv",
                placeholder: "Es: 404",
                maskInput: true,
                minlength: 3,
                maxlength: 3,
              },
              expirationDate: {
                selector: "#expire",
                placeholder: "MM / AAAA",
                expirationDate: "MM/YY",
              },
              cardholderName: {
                maxlength: 55,
                selector: "#holder",
                placeholder: "Es: Aniello Rossi",
              },
            },
          };
          return braintree.hostedFields.create(options);
        })
        .then((hostedFieldInstance) => {
          // Use hostedFieldInstance to send data to Braintree
          this.hostedFieldInstance = hostedFieldInstance;
          this.isLoading = false;
        })
        .catch((err) => {
          this.message = err.message;
          this.error = true;
          this.isLoading = false;
        });
    },

    //API genera token e...
    getToken() {
      this.isLoading = true;
      axios.get(`${store.apiURL}/orders/generate`).then((res) => {
        //...chiama hosted fields
        store.token = res.data.token;
        this.getHostedFields(store.token);
      });
    },
  },
  mounted() {
    store.cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
    if(store.cart.products.length <1){
      this.$router.push('/restaurantview')
    }
    this.getToken();
  },
  unmounted() {
    if(this.hostedFieldInstance){
      this.hostedFieldInstance.teardown();
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
.loader {
  background: white;
  color: $primary;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 4rem;
}

.form-control {
  border-radius: 80px;
  // padding: 2rem 1rem;
  background-color: #ececec;
  width: 100%;
  height: 50px;
  border: 2px solid grey !important;
  transition: all 1s;
}

.braintree-hosted-fields-input {
  color: black;
  border: 2px solid grey !important;
}
.braintree-hosted-fields-valid {
  color: green;
  border: 2px solid $primary !important;
}
.braintree-hosted-fields-invalid {
  color: red;
  border: 2px solid red !important;
}
</style>
