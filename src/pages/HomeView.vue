<template>
  <div class="container-fluid">
    <div class="container">
      <div class="box-img d-flex justify-content-center">
        <img src="public/img/eco-bg (1).png" class="" alt="" />
      </div>

      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
          <div class="form">
            <i class="fa fa-search"></i>
            <input
              type="text"
              class="form-control form-input"
              placeholder="Cerca il ristorante più vicino a te..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSection from "../components/HomeSection.vue";
export default {
  name: "HomeView",
  components: {
    HomeSection,
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
.container-fluid {
  background-color: $primary;
}
// SEARCH BAR
.form {
  position: relative;
}

.form .fa-search {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #9ca3af;
}

.form span {
  position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;
}

.left-pan {
  padding-left: 7px;
}

.left-pan i {
  padding-left: 10px;
}

.form-input {
  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
}

.form-input:focus {
  box-shadow: none;
  border: none;
}

// END SEARCH BAR
</style>
