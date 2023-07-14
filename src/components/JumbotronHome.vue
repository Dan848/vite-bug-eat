<template>
  <div class="jumbotron d-flex justify-content-center py-5">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <img src="/img/bees.gif" class="jumbo-logo" alt="" />
      <div class="pt-5 text-center">
        <h2>Qualcosa ronza in giro...</h2>
        <p class="fw-medium">...sono i nostri rider!</p>
      </div>
    </div>
  </div>

  <!-- SEARCHBAR -->

  <div class="row height d-flex justify-content-center align-items-center">
    <div class="col-md-6">
      <div>
        <div class="bm-form">
          <i class="fa fa-search" @click="navigateToRestaurantView"></i>
          <input type="text" v-model="store.searchName" class="form-control rounded-5" placeholder="Cerca un ristorante" @keyup.enter="navigateToRestaurantView"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from '../data/store';
export default {
  name: "JumbotronHome",

  data(){
    return {
      store
    }
  },
  methods: {
    navigateToRestaurantView() {
      if(store.searchName)
        this.$router.push({ name: 'restaurantView' });
    }
  }
};

</script>

<style lang="scss" scoped>
  @use "../assets/partials/variable.scss" as *;

  img {
  width: 200px;
}
  .invert{
    filter: invert(1);
  }

  h1,h4{
    font-weight: bold;
  }

div {
  .bm-form{
    position: relative;
    .fa-search{
      position: absolute;
      top: 20px;
      left: 20px;
      color: #9ca3af;
      cursor: pointer;
    }
    input{
      height: 55px!important;
      text-indent: 33px!important;
    }
  }
}


// <form action="" method="GET" class="col-12">
// <div class="bm-form">
// <i class="fa fa-search"></i>
// <input type="text" class="form-control form-input" placeholder="Cerca un ristorante" />
// </div>
// </form>
</style>
