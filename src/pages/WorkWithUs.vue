<template>
  <div class="d-flex flex-column justify-content-center align-items-center py-5">
    <img src="https://www.provincia.vicenza.it/immagini/work_in_porgress_.jpg/image" alt="">
    <h4 class="py-5"> Questa pagina sarà presto conclusa! </h4>
  </div>
</template>
<script>
import { store } from "../data/store";
export default {
  data() {
    return {
      store
    }
  },
  mounted() {
    store.show = false;
  }
}
</script>
<style lang="scss" scoped>
img {
  width: 100px;
}
</style>