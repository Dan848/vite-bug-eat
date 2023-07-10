<template>
  <div class="counter rounded-pill d-flex">
    <button @click="$emit('onMinus')" class="px-2 rounded-start-pill">-</button>
    <input
      class="text-center"
      :value="quantity"
      min="0"
      max="50"
      type="number"
      readonly
    />
    <button @click="$emit('onPlus')" class="px-2 rounded-end-pill">+</button>
  </div>
</template>

<script>
export default {
  props: {
    quantity: Number,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
/* Remove arrow in input group on Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

// Input group
.counter {
  max-width: 100%;
  border: 1px solid $primary;
  input {
    width: 100%;
    border: none;
    &:focus {
      border: none;
      border-left: none;
      outline: 0;
    }
  }
  button {
    border: none;
    background-color: white;
    color: $primary;
    &:hover {
      cursor: pointer;
      background-color: $primary;
      color: white;
    }
  }
}
</style>
