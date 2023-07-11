<template>
  <section class="container-fluid d-flex" :class="section.inverted ? 'normal' : 'coloured'">
    <div class="container">
      <div class="align-items-center justify-content-between gap-2 flex-wrap"
        :class="section.inverted ? 'd-flex flex-row-reverse' : 'row'">
        <!-- Content Col N.1 -->
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">

          <!-- Title and subtitle -->
          <div class="section-content">
            <div>
              <h2>{{ section.title }}</h2>
              <p v-if="section.subtitle" class="subtitle">{{ section.subtitle }}</p>
            </div>
            <!-- Paragraph -->
            <p class="lh-lg">
              {{ section.content }}
            </p>
          </div>

          <!-- Button -->
          <div class="d-flex justify-content-center align-items-center" v-if="Object.keys(section.routerLink).length">
            <router-link :to="{ name: section.routerLink.href }" class="text-decoration-none bm-btn">
              <button class="bm-btn">
                {{ section.routerLink.buttonText }}
              </button>
            </router-link>
          </div>
        </div>

        <!-- Image Col -->
        <div class="col d-flex justify-content-center">
          <div class="sectionImg-box">
            <img :src="section.image" :alt="section.title">
          </div>
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

section {
  padding: 3rem 0;

  // Normal section style (white background)
  &.normal {
    .section-content:hover {
      color: $primary;
      transition: 1s;
      cursor: pointer;
    }
  }


  // Section coloured style (coloured background)
  &.coloured {
    color: white;
    background-color: $primary;

    .section-content:hover {
      color: $secondary;
      transition: 1s;
      cursor: pointer;
    }
  }

  // Img col style
  .sectionImg-box {
    max-width: 350px;
    max-height: 300px;
    img {
      max-height: 100%;
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
</style>