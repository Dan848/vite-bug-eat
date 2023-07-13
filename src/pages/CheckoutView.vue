<template>
    <div class="container my-5">
        <div class="row justify-content-between">
            <div class="col-6">
                <form>
                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <div class="input-group">
                            <input type="number" id="amount" class="form-control" placeholder="Enter Amount">
                        </div>
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
                    <button type="submit" class="btn btn-primary rounded-5 w-100 mt-3" @click.prevent="payWithCreditCard">Submit</button>
                </form>
            </div>
            <div class="col-6">
                <div id="dropin-wrapper">
                    <div id="checkout-message"></div>
                    <div id="dropin-container"></div>
                    <button id="submit-button">Submit payment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { store } from "../data/store";
import axios from "axios";
import braintree from 'braintree-web';
import dropin from 'braintree-web-drop-in';

export default {
  name: "CheckoutView",
  components: {

  },
  data() {
    return {
      store,
      hostedFieldInstance: false,
      nonce: "",
      error: ""
    };
  },
  methods: {
    payWithCreditCard() {
       if(this.hostedFieldInstance)
       {
           this.hostedFieldInstance.tokenize().then(payload => {
               nonce = payload.nonce
           })
           .catch(err => {
            this.error = err.message;;
           })
       }
   },
   pay(){
    console.log(this.hostedFieldInstance)
    console.log("dentro")
   }
  },
  mounted() {
        //Personalized
        braintree.client.create({
            authorization: "sandbox_ndqhp77s_p9wgxwybzjzsmg23",
            locale: 'it_IT',
       })
       .then(clientInstance => {
           let options = {
               client: clientInstance,
               styles: {
                   input: {
                       'font-size': '14px',
                   }
               },
               fields: {
                   number: {
                       selector: '#credito',
                       placeholder: 'Enter Credit Card'
                   },
                   cvv: {
                       selector: '#civ',
                       placeholder: 'Enter CVV'
                   },
                   expirationDate: {
                       selector: '#scadi',
                       placeholder: '00 / 0000'
                   }
               }
           }
           return braintree.hostedFields.create(options)
       })
       .then(hostedFieldInstance => {
            // Use hostedFieldInstance to send data to Braintree
            this.hostedFieldInstance = hostedFieldInstance;
       })
       .catch(err => {
       });
       console.log(this.hostedFieldInstance)
       //Drop In
        dropin.create({
            authorization: "sandbox_ndqhp77s_p9wgxwybzjzsmg23",
            container: '#dropin-container',
            locale: 'it_IT',
            // ...plus remaining configuration
        }, (error, dropinInstance) => {
            // Use `dropinInstance` here
            // Methods documented at https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html
            if (error) {
                console.log(error.message);
            }
            });
   }
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
</style>