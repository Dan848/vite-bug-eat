<template>
  <div class="jumbotron d-flex justify-content-center py-5">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <img src="public/img/bees.gif" class="jumbo-logo" alt="" />
      <div class="pt-5 text-center">
        <h2>Qualcosa ronza in giro...</h2>
        <p class="fw-medium">...sono i nostri rider!</p>
      </div>
    </div>
  </div>

  <div class="row height d-flex justify-content-center align-items-center">
    <div class="col-md-6">
      <form action="" method="GET" class="col-12">
        <div class="bm-form">
          <i class="fa fa-search"></i>
          <input type="text" class="form-control rounded-5" placeholder="Cerca un ristorante" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "JumbotronHome",
};
</script>

<style lang="scss" scoped>
  @use "../assets/partials/variable.scss" as *;
  .jumbo
  {
    width: 450px;
  }
  .invert{
    filter: invert(1);
  }

  h1,h4{
    font-weight: bold;
  }

form {
  .bm-form{
    position: relative;
    .fa-search{
      position: absolute;
      top: 20px;
      left: 20px;
      color: #9ca3af;
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
