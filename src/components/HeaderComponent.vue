<template>
  <header class="bg-primary">
    <nav class="navbar fw-semibold container navbar-expand-lg">
      <div class="container-fluid">
        <!-- {{ --Logo --}} -->

        <a class="navbar-brand pb-4" href="/">
          <img src="../../public/img/general/logo-white.png" alt="logo" width="160" />
        </a>

        <!-- {{ --Burger Menù-- }} -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- {{ --Navbar Start-- }} -->
        <div class="collapse navbar-collapse w-100 justify-content-between" id="navbarNavDropdown">
          <ul class="navbar-nav mb-2 mb-lg-0 align-items-center">
            <!-- {{ --Simple Anchor Link-- }} -->
            <li class="nav-item text-white px-3 text-uppercase" v-for="item in store.headerLinks">

              <router-link :to="{ name: item.routeName }">
                {{ item.label }}
              </router-link>
            </li>
            <li class="nav-item text-white px-3 text-uppercase">
              <a href="./#mission">La nostra Mission</a>
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
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.nav-item a {
  text-decoration: none;
  padding: 10px;
  font-size: 1rem;

  &:hover {
    color: $primary;
    background-color: $secondary;
    padding: 10px;
    border-radius: 5px;
    transition: 0.5s;
  }
}

.link-effect-3 {
  a {
    padding: 10px 0;
    margin: 0 20px;
    color: #797878;
    text-shadow: none;
    position: relative;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      padding: 10px 0;
      max-width: 0;
      border-bottom: 2px solid #fff;
      color: #fff;
      content: attr(data-hover);
      -webkit-transition: max-width 0.5s;
      -moz-transition: max-width 0.5s;
      transition: max-width 0.5s;
    }

    &:hover {
      &::before {
        max-width: 100%;
      }
    }
  }
}

.navbar {
  height: 100px;
}
</style>
