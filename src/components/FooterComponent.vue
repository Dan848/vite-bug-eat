<template>
  <div class="bm-footer">
    <!-- Footer -->
    <footer class="text-center text-lg-start text-muted pt-4">


      <!-- Section: Social media -->
      <!-- <section class="d-flex justify-content-center justify-content-lg-between p-4">
        <div class="div"></div> -->
      <!-- Right -->
      <!-- <div>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="me-4 link-secondary">
            <i class="fab fa-github"></i>
          </a>
        </div> -->
      <!-- Right -->
      <!-- </section> -->


      <!-- Section: Social media -->

      <!-- Section: Links  -->
      <section class="text-white">
        <div class="container text-center text-md-start mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fa-solid fa-bowl-food me-3 text-secondary"></i>Bug-Eat
              </h6>
              <p>
                Il gusto a portata di click! Benvenuti nel nostro sito di food
                delivery, dove potrete scoprire un'ampia selezione di piatti
                deliziosi consegnati direttamente a casa vostra. Soddisfate i
                vostri desideri culinari con la comodità e la rapidità di un
                semplice click. Buon appetito!
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 link-container">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="http://localhost:5174/restaurantview">i nostri ristoranti</a>
              </p>
              <p>
                <a href="http://localhost:5174/about-us">Chi siamo</a>
              </p>
              <p>
                <a href="http://localhost:5174/ourMission">La nostra mission</a>
              </p>
              <p>
                <a href="http://localhost:5174/workWithUs">Lavora con noi</a>
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3 text-secondary"></i> Italy</p>
              <p>
                <i class="fas fa-envelope me-3 text-secondary"></i>
                bugmaker@gmail.com
              </p>
              <p>
                <i class="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88
              </p>
              <p>
                <i class="fas fa-print me-3 text-secondary"></i> + 01 234 567 89
              </p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div class="text-center p-4 text-white">
        <ul class="copyright d-flex justify-content-center">
          <li class="admin">
            © 2023 Copyright:
            <a class="fw-bold text-white" href="#">B-Maker.com</a><span> | </span>
            <a class="" href="http://localhost:8000/admin">Area Riservata</a>
          </li>
        </ul>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;

.bm-footer {
  background-color: $primary;
}

.link-container {
  p {
    a {
      color: white;

      &:hover {
        color: $secondary;
      }
    }
  }
}

.admin {
  a:last-child {
    color: white;

    &:hover {
      color: $secondary;
      text-decoration: underline;
    }
  }
}

li {
  list-style: none;
}
</style>
