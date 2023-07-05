<template>
  <header class="bg-primary">
    <nav class="navbar fw-semibold container navbar-expand-lg">
      <div class="container-fluid">
        <!-- {{ --Logo --}} -->

        <a class="navbar-brand" href="/">
          <img src="" alt="logo" width="40" height="40" />
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
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- {{ --Navbar Start-- }} -->
        <div
          class="collapse navbar-collapse w-100 justify-content-between"
          id="navbarNavDropdown"
        >
          <ul class="navbar-nav mb-2 mb-lg-0 align-items-center">
            <!-- {{ --Simple Anchor Link-- }} -->
            <li
              class="nav-item text-white pe-3"
              v-for="item in store.headerLinks"
            >
              <router-link :to="{ name: item.routeName }">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
          <div class="text-center">
            <a href="">MANGIA</a>
          </div>
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

a {
  text-decoration: none;

  &:hover {
    color: $secondary;
  }
}
</style>
