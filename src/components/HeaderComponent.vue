<template>
    <header class="bg-primary">
      <nav class="navbar fw-semibold container navbar-expand-lg">
        <div class="container-fluid">
          <!-- {{ --Logo --}} -->
          <a class="" href="/">
            <img class="logo" src="/img/general/logo-white.png" alt="logo" />
          </a>
  
          <!-- {{ --Burger Menù-- }} -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" @click="show = !show">
            <span class="navbar-toggler-icon"></span>
          </button>
          <!-- {{ --Navbar Start-- }} -->
          <div class="drop-menu collapse navbar-collapse justify-content-between bg-primary rounded-bottom-5"
            id="navbarNavDropdown" :class="{ show: show }">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <!-- {{ --Simple Anchor Link-- }} -->
              <li class="px-3 text-uppercase pb-2 pb-lg-0" v-for="(item, index) in store.headerLinks"
                @click="getActive(index)">
  
                <router-link :to="{ name: item.routeName }" :class="index === currentIndex ? 'active' : ''">
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  import { store } from "../data/store";
  export default {
    name: "HeaderComponent",
    data() {
      return {
        store,
        show: false,
        currentIndex: 0
      };
    },
    methods: {
      getActive(index) {
        this.currentIndex = index
  
        console.log(this.currentIndex);
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @use "../assets/partials/variable.scss" as *;
  
  
  
  .navbar {
    height: 60px;
    display: flex;
    align-items: center;
  
    .logo {
      width: 100px;
    }
  
    .drop-menu {
      z-index: 1010;
  
      li a {
        font-size: 1rem;
        color: white;
  
        &:hover {
          padding-bottom: 10px;
          border-bottom: 2px solid $secondary;
          color: $secondary;
        }
      }
    }
  }
  
  .active {
    padding-bottom: 10px;
    border-bottom: 2px solid $secondary;
    color: $secondary !important;
  }
  
  @media screen and (max-width:768px) {
    li a {
      text-decoration: none;
      font-size: 1rem;
      color: white;
  
      &:hover {
        padding-bottom: 0px;
        border-bottom: 0px solid $secondary;
        color: white;
      }
    }
  }
  </style>