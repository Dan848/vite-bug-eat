<template>
  <div class="input-group">
    <div class="input-group-button">
      <input type="submit" class="button minus" value="-" disabled="disabled" />
    </div>
    <input class="input-group-field" value="0" type="number" />
    <div class="input-group-button">
      <input type="submit" class="button plus" value="+" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
/* Remove arrow in input group on Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
// INput group
.input-group {
  width: 150px;
  border-left: none;
  border-right: none;
  input[type="number"] {
    width: 50%;
    border-left: none;
    border-right: none;
    border-top: 1px solid $primary;
    border-bottom: 1px solid $primary;
  }
}
.plus,
.minus {
  border: 1px solid $primary;
  background-color: white;
  color: $primary;
  &:hover {
    background-color: $secondary;
  }
}
.plus {
  border-top-right-radius: 10px;
  border-end-end-radius: 10px;
  border-left: 0px;
}
.minus {
  border-top-left-radius: 10px;
  border-end-start-radius: 10px;
  border-right: 0px;
}
</style>
