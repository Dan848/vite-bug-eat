<template>
  <li class="py-3 my-3 px-4 rounded-5 d-flex justify-content-between align-items-center" :id="'product-' + product.id">
    <div>
      <h3 class="fw-bold">{{ product.name }}</h3>
      <p class="text-" v-if="product.description">{{ product.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div>{{ product.price }}€</div>
        <!-- <CounterProduct/> -->
      </div>
    </div>
    <div class="fa-solid fa-plus fs-3"></div>
  </li>
</template>

<script>
import CounterProduct from "../components/CounterProduct.vue";
export default {
  props: { product: Object },
  components: {
    CounterProduct,
  },
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
}
</style>
