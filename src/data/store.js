import { reactive } from "vue";

export const store = reactive({
  imgStartUrl: 'http://localhost:8000',
  apiURL: 'http://127.0.0.1:8000/api',
  restaurants: [],
  types: [],
  currentPage: 1,
  lastPage: null,
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
  sections: [
  {
    title: "Ci impegniamo a salvaguardare l’ambiente...",
    content: "...adottando pratiche virtuose lungo tutta la catena “dal campo al vassoio”, partendo dalla scelta dei fornitori e arrivando fino alla gestione dei rifiuti, passando per una politica di risparmio energetico e per l’adozione di packaging a impatto zero.",
    subtitle: "",
    image: "/img/eco-images/firstEco.png",
    inverted: false,
    routerLink: {}
  },
  {
    title: "Bug-Eat si impegna per un modello di crescita socialmente responsabile ed ecologico.",
    content: "Per noi, il cambiamento viene dall'interno: la nostra cultura interna determina l'impatto del core business. Siamo un fattore abilitante per la crescita delle piccole imprese e un'opportunità per i corrieri di generare entrate in modo rapido e accessibile. Sebbene la nostra tecnologia sia gratuita per cause senza scopo di lucro, ne facciamo buon uso anche per ridurre la nostra impronta di carbonio.",
    subtitle: "",
    image: "/img/eco-images/secondEco.png",
    inverted: true,
    routerLink: {}
  },
  {
    title: "La sostenibilità è una delle anime di Bug-Eat, da sempre.",
    content: "È il criterio di riferimento costante nella creazione dei prodotti, nella progettazione dei punti vendita ed è ispirazione per le campagne di mobilitazione dove i Soci sono parte propositiva e attiva.",
    subtitle: "",
    image: "/img/eco-images/thirdEco.png",
    inverted: false,
    routerLink: {}
  },
  {
    title: "Aiutamo le nostre amiche a sei zampe!",
    content: "Ciascun ordine effettuato su Bug-Eat contribuirà alla ricerca e allo sviluppo di nuovi metodi volti a preservare la sicurezza e il benessere della popolazione di api in Italia. Sostenendo Bug-Eat, stai supportando attivamente gli sforzi per proteggere questi preziosi insetti e preservare l'importante ruolo che svolgono nel nostro ecosistema. ",
    subtitle: "",
    image: "/img/eco-images/fourthEco.png",
    inverted: true,
    routerLink: {}
  }
]  
});
