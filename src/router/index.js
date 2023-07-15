import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import SingleRestaurant from "../pages/SingleRestaurant.vue";
import RestaurantView from "../pages/RestaurantView.vue";
import AboutUs from "../pages/AboutUs.vue";
import OurMission from "../pages/OurMission.vue";
import CheckoutView from "../pages/CheckoutView.vue";
import NotFound from '../pages/NotFound.vue'

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
      path: "/restaurants/:slug",
      name: "single-restaurant",
      component: SingleRestaurant,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/about-us",
      name: "about-us",
      component: AboutUs,
    },
    {
      path: "/ourMission",
      name: "ourMission",
      component: OurMission,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    },
  ],
  //Scroll when it Changes Routes
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
