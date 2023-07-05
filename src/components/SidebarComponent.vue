<template>
  <div class="d-flex flex-column flex-shrink-0 mt-5">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Filtri</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="item in types">
        <a href="#" class="nav-link" aria-current="page">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SidebarComponent',
  props: {
    types: Object
  },
  data() {
    return{}
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
li{
  margin: .2rem 0;
  border: 1px solid transparent;
  color: black;
  a{
    color: black;
  }
  &:hover{
    border: 1px solid $primary;
    border-radius: 80px;
  }
}
</style>