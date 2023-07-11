<template>
  <div class="jumbotron d-flex justify-content-center py-5">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <img src="public/img/general/logo-white.png" class="invert" alt="">
      <img src="public/img/bees.gif" class="jumbo" alt="" />
      <div class="pt-5">
        <h1>Qualcosa ronza in giro...</h1>
        <h4 class="py-3">...sono i nostri rider!</h4>
      </div>
    </div>
  </div>

  <div class="row height d-flex justify-content-center align-items-center">
    <div class="col-md-6">
      <div class="form d-flex align-items-center gap-3">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="form-control form-input"
          placeholder="Cerca il ristorante più vicino a te..."
        />
      </div>
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
</style>
