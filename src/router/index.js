import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import RestaurantList from "../pages/Restaurant.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/restaurantlist",
      name: "restaurantList",
      component: RestaurantList,
    },
    {
      path: "/single-restaurant",
      name: "singleRestaurant",
    },
    {
      path: '/about-us',
      name: 'about-us',

    }
  ],
});

export default router;
