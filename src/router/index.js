import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import RestaurantList from "../pages/Restaurant.vue";
import SingleRestaurant from "../pages/SingleRestaurant.vue";

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
      path: "/restaurants/:slug",
      name: "single-restaurant",
      component: SingleRestaurant,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
