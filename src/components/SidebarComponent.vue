<template>
  <div class="sidebar">
    <div class="d-flex align-items-center justify-content-between mb-3 mt-5">
      <div class="fs-4">Filtri <span><i class="fa-solid fa-filter fs-5"></i></span></div>

      <div>
        <!-- Reset Filters button -->
        <i class="fa-regular fa-trash-can fs-5" role="button" @click="$emit('resetFilters')"></i>

        <!-- Exit button in mobile resolution -->
        <button class="btn text-decoration-underline d-md-none" @click="$emit('onClick')">Esci</button>
      </div>

    </div>
    <hr>
    <ul class="list-unstyled m-0 p-0">
      <li class="p-0" v-for="item in items" :key="item.id">
        <label class="d-flex justify-content-between align-items-center">
          <input type="checkbox" class="" name="checkTypes[]" :id="'checkTypes[]' + item.id" v-model="store.checkboxTypes"
            :value="item.id" @change="$emit('onChange', 1, store.checkboxTypes)">
          {{ item.name }}
          <img :src="imgStartUrl + item.image" :alt="item.name" class="me-2">
        </label>
      </li>
    </ul>
    <hr class="d-md-none">
    <div class="text-center d-md-none mb-3">
      <button class="btn btn-primary rounded-5 fw-bold text-white py-2 px-5 fs-4" @click="$emit('onClick')">Salva</button>
    </div>
  </div>
</template>

<script>
import { store } from "../data/store";
export default {
  name: 'SidebarComponent',
  props: {
    items: Object,
    imgStartUrl: String,
  },
  data() {
    return {
      store,
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1100;
  background: white;
  overflow-y: auto;

  li {
    label {
      background-color: #ececec;
      padding: .3rem .5rem;
      margin: .3rem 0;
      color: black;
      border-radius: 80px;
      border: 2px solid transparent;
      cursor: pointer;

      input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
      }

      input:checked+img {
        padding: 1px;
        border-radius: 50%;
        border: 2px solid lightgray;
        filter: grayscale(1);
      }

      img {
        width: 35px;
        height: 35px;
      }

      &:hover {
        border: 2px solid $primary;
      }

      &:has(input:checked) {
        border: 2px solid $primary;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .sidebar {
    position: inherit;
  }
}
</style>