<template>
    <div class="d-flex flex-column flex-shrink-0 mt-5">
      <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
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
        store
      }
    },
    methods: {
  
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
      cursor: pointer;
        &:hover img{
          border-radius: 50%;
          border: 2px solid $primary;
        }
      input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
      }
      input:checked+img {
          padding: 1px;
          border-radius: 50%;
          border: 2px solid $primary;
      }
      img {
          width: 35px;
          height: 35px;
      }
    }
  
  
  }
  </style>