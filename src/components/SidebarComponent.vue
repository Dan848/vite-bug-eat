<template>
  <div class="d-block">
    <div class="d-flex align-items-center mb-3 mt-5">
      <div class="fs-4">Filtri</div>
    </div>
    <hr>
    <ul class="list-unstyled m-0 p-0">
      <li class="p-0" v-for="item in items" :key="item.id">
        <label class="d-flex justify-content-between align-items-center">
          <input type="checkbox" class="" name="checkTypes[]" :id="'checkTypes[]' + item.id" v-model="store.checkboxTypes" :value="item.id" @change="$emit('onChange', 1, store.checkboxTypes)">
          {{ item.name }}
          <img :src="imgStartUrl + item.image" :alt="item.name" class="me-2">
        </label>
      </li>
    </ul>
  </div>
  <!-- <div>
      <button @click="openSidebar">Filtri</button>
      <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
      </div>
      <div class="main-content">
      </div>
    </div> -->
  <div class="sticky-filters d-md-none">
    <i class="fa-solid fa-filter"></i> <span class="fw-bold">Filtri</span>
  </div>
</template>

<script>
import {store} from "../data/store";
export default {
  name: 'SidebarComponent',
  props: {
    items: Object,
    imgStartUrl: String
  },
  data() {
    return{
      store,
      isOpen : false
    }
  },
  methods: {
    openSidebar() {
      this.isOpen = true; // Apre la sidebar
    },
  }
}
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
li{
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
    &:hover{
      border: 2px solid $primary;
    }
    &:has(input:checked){
      border: 2px solid $primary;
    }
  }
}
.sidebar {
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
}

.sidebar-open {
  transform: translateX(0);
}

.sticky-filters{
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0;
  // width: fit-content;
  // padding: 0 5px;
  // border-top-right-radius: 10px;
  // border-bottom-right-radius: 10px;
  // z-index: 1000;
  // background: $primary;
  // transition: .3s;
  // &:hover{
  //   cursor: pointer;
  //   background-color: #8cad6c;
  //   // transform: scale(1.05);
  // }
}
</style>