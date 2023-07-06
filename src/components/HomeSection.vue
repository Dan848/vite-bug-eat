<template>
  <section class="container-fluid d-flex" :class="section.inverted ? 'bg-inverted py-3' : 'bm-py-3'">
    <div class="container w-75">
      <div class="align-items-center flex-wrap" :class="section.inverted ? 'd-flex flex-row-reverse' : 'row'">
        <!-- Content Col N.1 -->
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <!-- Div with title and subtitle -->
          <div class="section-content">
            <div>
              <h2>{{ section.title }}</h2>
              <p v-if="section.subtitle" class="subtitle">{{ section.subtitle }}</p>
            </div>

            <p class="lh-lg">
              {{ section.content }}
            </p>
          </div>

          <div class="d-flex justify-content-center align-items-center">
            <router-link v-if="Object.keys(section.routerLink).length" :to="{ name: section.routerLink.href }"
              class="text-decoration-none bm-btn">
              <button class="bm-btn">
                {{ section.routerLink.buttonText }}
              </button>
            </router-link>
          </div>

        </div>

        <!-- Image Col -->
        <div class="col-12 col-md-6 d-flex justify-content-center" :class="section.inverted ? 'pe-5' : 'ps-5'">
          <img :src="section.image" :alt="section.title" class="sectionImg-box">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeSection',
  props: {
    'section': Object
  }

};
</script>


<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.bg-inverted {
  background-color: $primary;
  color: white;

  .section-content:hover {
    color: $secondary;
  }
}

.section-content:hover {
  color: $primary;
  transition: 1s;
  cursor: pointer;
}

.bm-py-3 {
  padding: 3rem 0;
}

.sectionImg-box {
  max-width: 400px;
}
</style>