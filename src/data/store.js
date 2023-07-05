import { reactive } from "vue";

export const store = reactive({
<<<<<<< HEAD
  imageBaseUrl: "http://localhost:8000",
  apiUrl: "http://127.0.0.1:8000/api",
  types: [],
=======
  imgStartUrl: 'http://localhost:8000',
  apiURL: 'http://127.0.0.1:8000/api',
  restaurants: [],
  currentPage: 1,
  lastPage: null,
>>>>>>> create-card-restaurant
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
