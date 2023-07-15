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
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" @click="store.show = !store.show">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- {{ --Navbar Start-- }} -->
        <div class="drop-menu collapse navbar-collapse justify-content-between bg-primary rounded-bottom-5"
          id="navbarNavDropdown" :class="{ show: store.show }">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <!-- {{ --Simple Anchor Link-- }} -->
            <li class="px-3 text-uppercase pb-2 pb-lg-0" v-for="(item, index) in store.headerLinks">

              <router-link :to="{ name: item.routeName }" @click="getActive(index)"
                :class="{ 'active': $route.name == item.routeName }">
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
      currentIndex: 0
    };
  },
  methods: {
    getActive(index) {
      this.currentIndex = index
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
        padding-bottom: 17px;
        border-bottom: 3px solid $secondary;
        color: $secondary;
      }
    }
  }
}

.active {
  padding-bottom: 18px;
  border-bottom: 2px solid $secondary;
  color: $secondary !important;
}

@media screen and (max-width:991px) {

  .drop-menu {
    z-index: 1010;
    padding-top: 1rem;
    margin-top: 8px;
    text-align: center;

    li a {
      text-decoration: none;
      font-size: 1rem;
      color: white;

      &:hover {
        padding-bottom: 0px !important;
        border-bottom: 0px solid $secondary !important;
        color: $secondary;
      }
    }
  }


  .active {
    padding-bottom: 0px;
    border-bottom: 0px solid $secondary;
    color: $secondary !important;
  }
}
</style>