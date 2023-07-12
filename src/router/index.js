import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import SingleRestaurant from "../pages/SingleRestaurant.vue";
import RestaurantView from "../pages/RestaurantView.vue";
import AboutUs from '../pages/AboutUs.vue';
import WorkWithUs from '../pages/WorkWithUs.vue';
import OurMission from '../pages/OurMission.vue';
import CheckoutView from '../pages/CheckoutView.vue';

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
      path: "/orders/:id",
      name: "checkout",
      component: CheckoutView,
      meta: {
        hideHeaderFooter: true
      }
    },
    {
      path: "/about-us",
      name: "about-us",
      component: AboutUs,
    },
    {
      path: "/workWithUs",
      name: "workWithUs",
      component: WorkWithUs,
    },
    {
      path: "/ourMission",
      name: "ourMission",
      component: OurMission,
    },
  ],
  //Scroll when it Changes Routes
  scrollBehavior (to, from, savedPosition){
    return { top: 0}
  },
});

export default router;
