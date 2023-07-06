import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import RestaurantView from "../pages/RestaurantView.vue";
import AboutUs from '../pages/AboutUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/restaurantview",
      name: "restaurantView",
      component: RestaurantView,
    },
    {
      path: "/single-restaurant",
      name: "singleRestaurant",
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs

    }
  ],
});

export default router;
