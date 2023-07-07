<template>
  <header class="bg-primary">
    <nav class="navbar fw-semibold container navbar-expand-xl">
      <div class="container-fluid">
        <!-- {{ --Logo --}} -->

        <a class="navbar-brand pb-4" href="/">
          <img
            class="pt-2"
            src="../../public/img/general/logo-white.png"
            alt="logo"
            width="160"
          />
        </a>

        <!-- {{ --Burger Menù-- }} -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="show = !show"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- {{ --Navbar Start-- }} -->
        <div
          class="drop-menu collapse navbar-collapse justify-content-between bg-primary"
          id="navbarNavDropdown"
          :class="{ show: show }"
        >
          <ul class="navbar-nav mb-2 mb-lg-0 align-items-center">
            <!-- {{ --Simple Anchor Link-- }} -->
            <li
              class="nav-item text-white px-3 text-uppercase mt-3"
              v-for="item in store.headerLinks"
            >
              <router-link :to="{ name: item.routeName }">
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
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.nav-item a {
  text-decoration: none;
  margin: 20px;
  font-size: 1rem;

  &:hover {
    padding-bottom: 1rem;
    border-bottom: 2px solid $secondary;
    color: $secondary;
  }
}

.navbar {
  height: 100px;
}

.drop-menu {
  margin-top: -13px;
  padding: 15px 0px 15px 0px;
}
</style>
