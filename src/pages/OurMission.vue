<template>
  <div class="d-flex flex-column justify-content-center align-items-center py-5">
    <div>
      <CartComponent v-if="store.cart.products.length > 0" />
    </div>
    <div class="mission-image">
      <h2 class=""> BUG-EAT Eco-Sostenibile: Ordina, Gusta e Cambia il Mondo!</h2>
    </div>
    <div class="container w-50">
      <p class="py-5 lh-lg  small ">
        Benvenuti nel sito di <span class="text-primary fw-semibold important">BUG-EAT </span>, il food-delivery più
        eco-sostenibile
        del mercato!
        Siamo fieri di abbracciare la causa della deforestazione e di fare la
        nostra parte per un futuro più <span class="text-primary important  fw-semibold">verde e sostenibile.</span> Una
        delle
        nostre
        principali preoccupazioni è l'impatto ambientale della nostra attività.
        Abbiamo adottato diverse misure per ridurre la nostra impronta <span class="text-primary important fw-semibold">
          ECOLOGICA</span>
        e preservare le foreste. Innanzitutto, utilizziamo imballaggi ecologici
        e biodegradabili per tutti i nostri ordini. <br> Questo significa che ogni
        volta che ricevete un pasto da noi, potete godervelo sapendo che il
        nostro imballaggio <span class="text-danger important fw-semibold">non</span> contribuisce all'inquinamento
        ambientale.
        <br>
        Inoltre, collaboriamo strettamente con fornitori locali che condividono
        la nostra visione eco-sostenibile. Diamo la precedenza a ingredienti
        provenienti da <span class="text-primary text-capitalize important fw-semibold">agricoltura biologica e
          sostenibile</span> ,
        riducendo così
        l'impatto della produzione alimentare sull'ambiente. Ma la nostra
        dedizione all'ambiente non si ferma qui !! . <br> <span class=" important ">Vogliamo fare ancora di più per
          creare un impatto positivo sulla società.</span> <br>
      <div class="mission-image">
        <img src="/img/ourMission/earth.jpg" alt="earth">
        <h2 class=">"> BUG-EAT Eco-Sostenibile: Ordina, Gusta e Cambia il Mondo!</h2>
      </div>
      <span class=" text-capitalize">Per ogni ordine effettuato
        tramite il nostro sito, destiniamo una percentuale del ricavato a
        progetti socialmente utili.</span> <br> Questi progetti possono includere iniziative
      per la <span class="fw-semibold important text-primary text-capitalize">riforestazione</span> , la <span
        class="fw-semibold important text-primary text-capitalize">protezione degli habitat naturali </span> e la
      <span class="fw-semibold important text-primary text-capitalize">promozione dell'agricoltura sostenibile</span> .
      <br>
      Siamo convinti che unire la
      comodità del delivery-food con un'impronta <span class="text-primary important fw-semibold"> ECOLOGICA</span>
      ridotta e
      l'impegno
      sociale sia la chiave per un <span class="text-primary important text-uppercase fw-semibold">futuro migliore</span>
      . Vogliamo
      coinvolgere i
      nostri utenti in questa missione, facendo in modo che ogni pasto
      ordinato sia un passo verso la sostenibilità ambientale e il benessere
      della comunità. Inoltre, ci impegniamo a monitorare costantemente le
      nostre pratiche e ad adottare nuove soluzioni sostenibili man mano che
      diventano disponibili.
      <span class="text-capitalize fw-semibold"> <br><br>
        <div class="mission-image ">
          <img src="/img/ourMission/tree.jpg" alt="earth" class="">

        </div>
        <div class="text-center">
          <h2 class="important fs-3"> BUG-EAT Eco-Sostenibile: Ordina, Gusta e Cambia il Mondo!</h2>
          <p class="fs-5">Ordina il tuo pasto oggi e fai la differenza
            con ogni boccone!</p>
          <router-link class="bg-primary text-light rounded p-2" to="/restaurantview"> Ordina ora </router-link>
        </div>
      </span>
      </p>

      <hr class="p-2">
      <h3>
        ECCO ALCUNE DELLE ORGANIZZAZIONI NO-PROFIT CHE COLLABORANO CON NOI!
      </h3>
      <p>
      <ul>
        <li> <span class="text-uppercase">Rainforest Foundation:</span> <a href="https://www.rainforestfoundation.org/">
            https://www.rainforestfoundation.org/</a><br>
          <span class="fst-italic "> L'organizzazione si impegna nella protezione delle foreste pluviali e
            lavora per preservare gli habitat naturali.</span>
        </li>
        <li> <span class="text-uppercase">Greenpeace:</span>
          <a href="https://www.greenpeace.org/"> https://www.greenpeace.org/</a><br>
          <span class="fst-italic "> Greenpeace è un'organizzazione ambientalista
            internazionale che si occupa di difendere l'ambiente e promuovere
            soluzioni sostenibili.</span>
        </li>
        <li> <span class="text-uppercase"> WWF:</span> <a
            href="https://www.worldwildlife.org/">https://www.worldwildlife.org/</a> <br><span class="fst-italic ">WWF
            è una
            delle più grandi organizzazioni mondiali per la conservazione della
            natura, che lavora per la protezione delle foreste, la riduzione
            dell'impatto ambientale e la promozione di pratiche sostenibili.</span> </li>
        <li> <span class="text-uppercase">TreeSisters:</span> <a
            href="https://www.treesisters.org/">https://www.treesisters.org/</a><br> <span class="fst-italic ">TreeSisters
            si impegna nella
            riforestazione e nella riparazione degli ecosistemi attraverso il
            finanziamento di progetti di piantumazione di alberi in tutto il mondo.</span> </li>
        <li> <span class="text-uppercase">Slow Food: </span><a href="https://www.slowfood.com">
            https://www.slowfood.com/</a> <br>

          <span class="fst-italic ">Slow Foodpromuove un'alimentazione sostenibile, valorizzando prodotti locali,
            agricoltura
            biologica e tradizioni culinarie che rispettano l'ambiente.</span>
        </li>
      </ul>
      <h5> Ti
        incoraggiamo a visitare i siti web di queste organizzazioni per saperne
        di più sul loro lavoro, i progetti in corso e le modalità di
        partecipazione o donazione. Contribuire a queste cause può fare davvero
        la differenza nel promuovere la sostenibilità ambientale e il benessere
        delle comunità.</h5>
      </p>
    </div>
  </div>
</template>
<script>
import { store } from "../data/store";
import CartComponent from "../components/CartComponent.vue";
export default {
  data() {
    return {
      store
    };
  },
  mounted() {
    store.cart = JSON.parse(localStorage.getItem("cart")) || store.cart;
    store.checkboxTypes = [];
    store.searchName = "";
  },
  components: { CartComponent }
};
</script>
<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.important {
  color: $primary;
  font-size: 18px;
}

ul {
  list-style: none;

  li {
    padding: 1.3rem;
  }
}

.mission-image {
  img {
    width: 70%;
    border-radius: 80px;
    margin-bottom: 3rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
