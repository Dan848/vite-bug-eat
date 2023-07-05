import { reactive } from "vue";

export const store = reactive({
  imageBaseUrl: "http://localhost:8000",
  apiUrl: "http://127.0.0.1:8000/api",
  restaurants: [],
  types: [],
  headerLinks: [
    {
      label: "Home",
      routeName: "home",
    },
    {
      label: "Ordina",
      routeName: "restaurantList",
    },
    // {
    //   label: "Contatti",
    //   routeName: "contatti",
    // },
    // {
    //   label: "Lavora con Noi",
    //   routeName: "lavora-con-noi",
    // },
  ],
});
