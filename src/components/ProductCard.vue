<template>
  <li
    class="py-3 my-3 px-4 rounded-5 d-flex justify-content-between align-items-center"
    :id="'product-' + product.id"
  >
    <div>
      <h3 class="fw-bold">{{ product.name }}</h3>
      <p class="text-" v-if="product.description">{{ product.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="badge rounded-pill">{{ product.price }}€</div>
        <!-- <CounterProduct/> -->
      </div>
    </div>
    <div class="fa-solid fa-plus fs-3"></div>
  </li>
</template>

<script>
export default {
  props: { product: Object },
  components: {},
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

li {
  border: 1px solid #979ca5;
  transition: 0.3s;

  &:hover {
    cursor: pointer;

    box-shadow: 0px 0px 18px 0px #789f52;
    border: 1px solid $primary;

    .fa-plus {
      color: $primary;
    }
  }

  .fa-plus {
    color: #979ca5;
  }
  .badge {
    background-color: #789f52 !important;
    color: white;
    font-weight: 400;
    font-size: small;
  }
}
</style>
