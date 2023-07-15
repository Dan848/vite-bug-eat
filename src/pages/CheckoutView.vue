<template>
  <div class="container my-5">
    <div class="row justify-content-between">
      <CartComponent class="col-6" />
      <div class="col-6">
        <div>Che succede se scrivo qui</div>
        <form>
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
            class="btn btn-primary rounded-5 w-100 mt-3"
            @click.prevent="payWithCreditCard"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../data/store";
import CartComponent from "../components/CartComponent.vue";
import axios from "axios";
import braintree from "braintree-web";
import dropin from "braintree-web-drop-in";

export default {
  name: "CheckoutView",
  components: {
    CartComponent,
  },
  data() {
    return {
      store,
      token: "",
      hostedFieldInstance: false,
      nonce: "",
      error: "",
    };
  },
  methods: {
    // Al submit...
    payWithCreditCard() {
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
            this.error = err.message;
            console.log(err.message);
          });
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
        console.log(res.data);
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
          console.log(err.message);
          this.error = err.message;
        });
    },

    //API genera token e...
    getToken() {
      axios.get(`${store.apiURL}/orders/generate`).then((res) => {
        //...chiama hosted fields
        this.getHostedFields(res.data.token);
      });
    },
  },
  mounted() {
    this.getToken();
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
  border: 2px solid $primary;
}
.braintree-input-class {
  color: black;
}
.braintree-valid-class {
  color: green;
}
.braintree-invalid-class {
  color: red;
}
</style>
