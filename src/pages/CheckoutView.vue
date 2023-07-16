<template>
  <form id="pablo" class="container my-5">
    <div class="row justify-content-between">
      <CartComponent class="col-6" />
      <div class="col-6">
        <div>
          <div class="form-group">
            <label>Nome Intestatario</label>
            <div id="intestatario" class="form-control"></div>
          </div>
          <div class="form-group">
            <label>Credit Card Number</label>
            <div id="credito" class="form-control"></div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label>Expire Date</label>
                <div id="scadi" class="form-control"></div>
              </div>
              <div class="col-6">
                <label>CVV</label>
                <div id="civ" class="form-control"></div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary rounded-5 text-white fw-bold px-4 py-2 mt-3"
            @click="payWithCreditCard"
            :disabled="
              !this.hostedFieldInstance ||
              !store.cart.user_email ||
              !store.cart.user_name ||
              !store.cart.shipment_address
            "
          >
            Ordina e Paga
          </button>
        </div>
        <div class="mt-5 alert alert-sucess rounded-5">{{ successMsg }}</div>
        <div class="mt-5 alert alert-danger rounded-5">{{ errorMsg }}</div>
      </div>
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
      errorMsg: "",
      successMsg: "",
    };
  },
  methods: {
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
        axios.post(`${store.apiURL}/orders/store`, data).then((res) => {});
      } else {
        //Qualcuno stampa il messaggio
      }
    },
    // Al submit...
    payWithCreditCard(e) {
      const form = document.getElementById("pablo");
      if (form.checkValidity()) {
        e.preventDefault();
        //...se ho ricevuto il token da braintree...
        if (this.hostedFieldInstance) {
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
              this.errorMsg = err.message;
              console.log(err.message);
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
        res.data = this.successMsg;
        this.successMsg = "Il pagamento è andato a buon fine !!";
        console.log(this.successMsg);
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
                selector: "#credito",
                placeholder: "Enter Credit Card",
                maxCardLength: 16,
                maskInput: { character: "*", showLastFour: true },
                attribute: "aria-required",
                supportedCardBrands: { "card-brand-id": true },
              },
              cvv: {
                selector: "#civ",
                placeholder: "Enter CVV",
                maskInput: true,
                minlength: 3,
                maxlength: 3,
              },
              expirationDate: {
                selector: "#scadi",
                placeholder: "00 / 0000",
                expirationDate: "MM/YY",
              },
              cardholderName: {
                selector: "#intestatario",
                placeholder: "Es: Aniello Rossi",
              },
            },
          };
          return braintree.hostedFields.create(options);
        })
        .then((hostedFieldInstance) => {
          // Use hostedFieldInstance to send data to Braintree
          this.hostedFieldInstance = hostedFieldInstance;
        })
        .catch((err) => {
          this.errorMsg = err.message;
          console.log(this.errorMsg);
        });
    },

    //API genera token e...
    getToken() {
      axios.get(`${store.apiURL}/orders/generate`).then((res) => {
        //...chiama hosted fields
        store.token = res.data.token;
        this.getHostedFields(store.token);
      });
    },
  },
  mounted() {
    this.getToken();
  },
  unmounted() {
    this.hostedFieldInstance.teardown();
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
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
