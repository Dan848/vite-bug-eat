<template>
  <div class="outer rounded-5" :class="{ 'position-relative z-1': isOpen, 'filter-unactive' : restaurant.products.length < 1}" @mouseleave="isOpen = false">
    <div class="midder">
      <div class="inner">
        <div class="box-img w-100 h-100 d-flex justify-content-center">
          <img
            :src="restaurant.image"
            :alt="restaurant.name" class="w-100" />
        </div>
      </div>
    </div>
    <div class="item py-3 pb-5">
      <div class="item-name-address">
        <h4>{{ restaurant.name }}</h4>
        <span>{{ restaurant.address }}</span>
      </div>
      <div class="item-types d-flex flex-column justify-content-center align-items-center pt-4">
        <template v-if="restaurant.types.length <= 2">
          <div v-for="(type, index) in restaurant.types" :key="index">
            {{ type.name }}
          </div>
        </template>
        <template v-else>
          <div>
            {{ restaurant.types[0].name }}
          </div>
          <div class="dropdown">
            <div class="border p-1" data-bs-toggle="dropdown" aria-expanded="false" @click="openDropdown">
              Mostra +
            </div>
            <ul class="dropdown-menu flex-column justify-content-center align-items-start p-1"
              :class="{ 'show d-flex': isOpen }" data-popper-placement="bottom-start">
              <div v-for="(type, index) in restaurant.types.slice(1)" :key="index">
                {{ type.name }}
              </div>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <div class="not-available" v-if="restaurant.products.length < 1">
      <span class="fw-bold fs-4">Presto disponibile</span> 
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurant: Object,
    imgStartUrl: String,
    isSelected: Boolean,
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openDropdown(e) {
      e.preventDefault();
      this.isOpen = !this.isOpen;
    }
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.filter-unactive{
  img{
    filter: grayscale(100%);
  }
  overflow: hidden;
  position: relative;
  box-shadow: 0 3.4px 2.7px rgba(0, 0, 0, 0.022),
  0 8.7px 6.9px rgba(0, 0, 0, 0.031),
  0 17.7px 14.2px rgba(0, 0, 0, 0.039),
  0 36.5px 29.2px rgba(0, 0, 0, 0.048),
  0 100px 80px rgba(0, 0, 0, 0.07) !important;
  &:hover{
    transform: none !important;
    cursor: not-allowed !important;
  }
  .not-available{
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 120%;
    text-align: center;
    transform: rotate(35deg);
    background-color: #bc2d3b;
    color: white;
  }
}

.outer {
  &:hover {
    transform: scale(1.05);
    transition: 500ms;
    cursor: pointer;
    box-shadow: 0px 21px 24px -15px #789f52;
  }

  width: 295px;
  height: 228px;
  border-radius: 40px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 3.4px 2.7px rgba(0, 0, 0, 0.022),
  0 8.7px 6.9px rgba(0, 0, 0, 0.031),
  0 17.7px 14.2px rgba(0, 0, 0, 0.039),
  0 36.5px 29.2px rgba(0, 0, 0, 0.048),
  0 100px 80px rgba(0, 0, 0, 0.07);


  .midder {
    width: 295px;
    height: 70%;
    border-radius: 40px;
    overflow: hidden;
  }

  .inner {
    width: 325px;
    height: 100%;
    object-fit: cover;
    border: 1px solid #f0f0f0;
    border-bottom-right-radius: 80px;
    transform: translateX(-4px) translateY(-17px) rotate(10deg);

    .box-img {
      img {
        border-bottom-right-radius: 80px;
      }
    }
  }

  .item {
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    .item-types {
      display: flex;
      flex-direction: column;
      height: 100%;

      div {
        font-size: 0.8rem;
        font-weight: bold;
        color: $primary;
        text-align: right;
      }
    }

    .item-name-address {
      width: 70%;

      h4 {
        font-size: 1rem;
        font-weight: bold;
        color: #11313c;
      }

      span {
        font-size: 12px;
        font-weight: 500;
        color: #949a98;
      }
    }
  }
}




.dropdown-menu {
  min-width: 5rem !important;
}
</style>
