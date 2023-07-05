<template>
        <div class="outer">
            <div class="inner">
                <div class="box-img w-100 h-100 d-flex justify-content-center">
                    <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="{{ restaurant.name }}" class="w-100">
                </div>
            </div>
            <div class="item py-2">
                <div class="item-name-address">
                    <h4>{{ restaurant.name }}</h4>
                    <span>{{ restaurant.address }}</span>
                </div>
                <div class="item-types-km d-flex flex-column justify-content-end">
                    <span class="type" v-for="type in restaurant.types">{{ type.name }}</span>
                    <div class="kilometers">
                        <span>Distanza: 5 km</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'RestaurantCardComponent',
    props: {
        restaurant: Object,
        imgStartUrl: String,
        isSelected: Boolean
    },
    data() {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.outer {
  width: 295px;
  height: 228px;
  border-radius: 40px;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow:
  0 3.4px 2.7px rgba(0, 0, 0, 0.022),
  0 8.7px 6.9px rgba(0, 0, 0, 0.031),
  0 17.7px 14.2px rgba(0, 0, 0, 0.039),
  0 36.5px 29.2px rgba(0, 0, 0, 0.048),
  0 100px 80px rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

.inner {
  width: 325px;
  height: 70%;
//    background: url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80') no-repeat center center/cover;
  object-fit: cover;
  border: 1px solid #f0f0f0;
  border-bottom-right-radius: 80px;
  transform: translateX(-4px) translateY(-17px) rotate(10deg);
  .box-img{
    img{
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
}

.item-name-address{
    width: 60%;
}
.item-name-address h4 {
  font-size: 1rem;
  font-weight: bold;
  color: #11313c;
}

.item-name-address span {
  font-size: 12px;
  font-weight: 500;
  color: #949a98;
}

.item-types-km {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.item-types-km span {
  font-size: 0.8rem;
  font-weight: bold;
  color: #f7736e;
  text-align: right;
}

.kilometers span{
    font-size: 0.6rem;
}

.outer:hover {
  transform: scale(1.01);
  cursor: pointer;
}
</style>