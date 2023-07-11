<template>
  <div class="container">
    <div class="position-relative">
      <div class="d-flex flex-nowrap row" ref="sliderContainer">
        <div class="my-col col-6 col-sm-4 col-md-3 gap-5" v-for="(type, index) in  types" @click="handleClick(type)">
          <!-- card -->
          <div class="card">
            <div class="card__image">
              <img class="img-fluid" :src="imgStartUrl + type.image" :alt="type.name" />
            </div>
          
            <div class="card__data">
              <div class="card__info text-center">
                <h5 class="text-nowrap">{{ type.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Change slide buttons -->
      <button class="prevBtn myBtn" @click="prevCard">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <button class="nextBtn myBtn" @click="nextCard">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {store} from "../data/store";
export default {
  name: 'SliderComponent',
  props: {
    types: Array,
    imgStartUrl: String,
  },
  data() {
    return {
      sliderContainer: null,
      sliderWidth: null,
      divider: null,
      store
    }
  },

  methods: {
    handleClick(type) {
      if (this.$route.name === "home") {
        store.checkboxTypes.push(type.id);
        this.$router.push({ name: "restaurantView" });
      } else {
        // Handle the existing @click behavior
        this.$emit("onClick", type.id);
      }
    },
    nextCard() {
      this.sliderContainer.scrollBy(this.sliderWidth / this.divider, 0);

      const result = this.sliderWidth / this.divider;

      if ((this.sliderContainer.scrollLeft + this.sliderWidth + 10) >= this.sliderContainer.scrollWidth) {
        this.sliderContainer.scrollLeft = 0
      }
    },
    prevCard() {
      this.sliderContainer.scrollBy(- this.sliderWidth / this.divider, 0);

      if (this.sliderContainer.scrollLeft === 0) {
        this.sliderContainer.scrollLeft = this.sliderContainer.scrollWidth
      }
    },
    handleWindowSize() {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1400) { //my-col
        this.divider = 8
      } else if ((windowWidth < 1400) && (windowWidth >= 1200)) { //my-col
        this.divider = 7
      } else if ((windowWidth < 1200) && (windowWidth >= 992)) { // my-col
        this.divider = 6
      } else if ((windowWidth < 992) && (windowWidth >= 768)) { //col-md-3
        this.divider = 4
      } else if ((windowWidth < 768) && (windowWidth >= 576)) { //col-sm-4 
        this.divider = 3
      } else { //col-6 xs
        this.divider = 2
      }

      return this.divider;
    },
    handleWindowResize() {
      this.handleWindowSize();
      this.sliderWidth = this.sliderContainer.offsetWidth;
      this.sliderContainer.scrollLeft = 0;
    },
  },
  mounted() {
    this.sliderContainer = this.$refs.sliderContainer;
    this.sliderWidth = this.sliderContainer.offsetWidth;
    window.addEventListener('resize', this.handleWindowResize);
  },
  created() {
    this.handleWindowSize();
  }
}

</script>

<style lang="scss" scoped>
@use '../assets/partials/variable.scss' as *;

//Card config


hr {
  width: 50px;
  // color: $secondary-color;
}

.myBtn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid rgb(211, 211, 211, 1);
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
  z-index: 1000;

  i {
    font-size: 15px;
  }


}

.prevBtn {
  position: absolute;
  left: -5%;
  bottom: 50%;
  translate: 0% 50%;
}

.nextBtn {
  position: absolute;
  right: -5%;
  bottom: 50%;
  translate: 0% 50%;
}

.row {
  padding: 6rem 0 1rem 0;
  overflow-x: auto;
  -ms-overflow-style:none;
  scrollbar-width:none;
  scroll-behavior: smooth;
  // overflow-y: hidden;
  // Scrollbar config
  &::-webkit-scrollbar {
    display: none;
  }
  .card {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background-color: transparent;
    border: 0;

    &:hover {
      cursor: pointer;
        .card__image {
          top: -45%;
        }
        .card__data {
          transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      }
    .card__image {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 150px;
      height: 80%;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -40%;
      z-index: 2;
      transition: all 0.3s ease-out;
      -webkit-filter: drop-shadow(5px 5px 5px #222);
      filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
    }
    .card__data {
      border-top-right-radius: 50%;
      border-top-left-radius: 50%;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: #ededed;
      padding-top: 5rem;
      transition: all 0.3s ease-out 0.1s;

      .card__info {
        padding: 0 10px;
        margin-bottom: 10px;
      }
    }
  }
}

//Media Query

@media screen and (min-width: 992px) {
  .my-col {
    width: calc(100% / 6);
  }
}

@media screen and (min-width: 1200px) {
  .my-col {
    width: calc(100% / 7);
  }
}

@media screen and (min-width: 1400px) {
  .my-col {
    width: calc(100% / 8);
  }
}

</style>