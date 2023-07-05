import { reactive } from "vue";

export const store = reactive({
  headerLinks: [
    {
      label: "Home",
      routeName: "home",
    },
    {
      label: "Ordina",
      routeName: "restaurantList",
    },
    {
      label: "Contatti",
      routeName: "contatti",
    },
    {
      label: "Lavora con Noi",
      routeName: "lavora-con-noi",
    },
  ],
});
