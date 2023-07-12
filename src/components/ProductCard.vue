<template>
  <li class="py-3 my-3 px-4 rounded-5" :id="'product-' + product.id">
    <h3 class="fw-bold">{{ product.name }}</h3>
    <p class="text-" v-if="product.description">{{ product.description }}</p>
    <div class="d-flex justify-content-between align-items-center">
      <div>{{ product.price }}€</div>
      <!-- <CounterProduct/> -->
    </div>
  </li>
</template>

<script>
export default {
  props: { product: Object },
  components: {
  },
};
</script>

<style lang="scss" scoped>
li {
  border: 1px solid #495f34;
  transition: 0.3s;
  &:hover {
    cursor: pointer;

    box-shadow: 0px 0px 18px 0px #789f52;
  }
}
</style>
