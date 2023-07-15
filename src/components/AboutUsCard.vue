<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="cards-container d-flex justify-content-center">
      <div class="card card-one">
        <div class="header-card">
          <div class="avatar">
            <img :src="team.profile_img" :alt="team.name" />
          </div>
        </div>

        <h3 class="text-primary">{{ team.name }}</h3>
        <div class="desc">
          <p>Ruolo: {{ team.role }}</p>
          <hr />
          <p class="bm-desc">{{ team.description }}</p>

        </div>


        <div class="footer-card">
          <a href=""><i class="fa-solid fa-envelope"></i></a>
          <a href="team.contacts.linkedin"><i class="fa-brands fa-linkedin"></i></a>
          <a href=""><i class="fab fa-github"></i></a>
          <a href=""><i class="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </div>
  <!----------------------
   Our profile cards
------------------------>
</template>

<script>
export default {
  name: "AboutUsCard",
  props: ["team"],
};
</script>

<style lang="scss" scoped>
@use "../assets/partials/variable.scss" as *;
/*** VARS ***/

$back-col: #c5cae9;

/*** GENERAL STYLES ***/

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: "Dosis", sans-serif;
  background: $back-col;
  text-align: center;
}

/*** CARD STLES ***/

.cards-container {
  width: 793px;
  max-width: 100%;
  margin: 2rem auto;
}

.card {
  float: left;
  ;
}

.card-one {
  position: relative;
  width: 300px;

  background: #fff;
  box-shadow: 0 10px 7px -5px rgba(#000, 0.4);

  .header-card {
    position: relative;
    width: 100%;
    height: 60px;
    background: $primary;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: inherit;
    }

    &::before {
      -webkit-transform: skewY(-8deg);
      -moz-transform: skewY(-8deg);
      -ms-transform: skewY(-8deg);
      -o-transform: skewY(-8deg);
      transform: skewY(-8deg);
      -webkit-transform-origin: 100% 100%;
      -moz-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }

    &::after {
      -webkit-transform: skewY(8deg);
      -moz-transform: skewY(8deg);
      -ms-transform: skewY(8deg);
      -o-transform: skewY(8deg);
      transform: skewY(8deg);
      -webkit-transform-origin: 0 100%;
      -moz-transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      -o-transform-origin: 0 100%;
      transform-origin: 0 100%;
    }

    .avatar {
      position: absolute;
      left: 50%;
      top: 30px;
      margin-left: -50px;
      z-index: 5;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      border: 3px solid #fff;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 100px;
        height: auto;
      }
    }
  }

  h3 {
    position: relative;
    margin: 80px 0 30px;
    text-align: center;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      left: 50%;
      margin-left: -15px;
      width: 30px;
      height: 1px;
      background: #000;
    }
  }

  .desc {
    padding: 0 1rem 2rem;
    text-align: center;
    line-height: 1.5;
    color: #777;

    .bm-desc {
      height: 100px;
      overflow-y: auto;
    }
  }

  .contacts {
    width: 200px;
    max-width: 100%;
    margin: 0 auto 3rem;

    a {
      display: block;
      width: 33.333333%;
      float: left;
      text-align: center;
      color: $primary;

      &:hover {
        color: $secondary;

        .fa {
          &::before {
            color: #fff;
          }

          &::after {
            width: 100%;
            height: 100%;
          }
        }
      }

      .fa {
        position: relative;
        width: 40px;
        height: 40px;
        line-height: 39px;
        overflow: hidden;
        text-align: center;
        font-size: 1.3em;

        &:before {
          position: relative;
          z-index: 1;
        }

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          -webkit-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          background: $secondary;
          -webkit-transition: width 0.3s, height 0.3s;
          -moz-transition: width 0.3s, height 0.3s;
          -ms-transition: width 0.3s, height 0.3s;
          -o-transition: width 0.3s, height 0.3s;
          transition: width 0.3s, height 0.3s;
        }
      }

      &:last-of-type .fa {
        line-height: 36px;
      }
    }
  }

  .footer-card {
    position: relative;
    padding: 1rem;
    background: $secondary;
    text-align: center;

    a {
      padding: 0 1rem;
      color: black;
      -webkit-transition: color 0.4s;
      -moz-transition: color 0.4s;
      -ms-transition: color 0.4s;
      -o-transition: color 0.4s;
      transition: color 0.4s;

      &:hover {
        color: $primary;
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: -27px;
      left: 50%;
      margin-left: -15px;
      border: 15px solid transparent;
      border-bottom-color: $secondary;
    }
  }
}

/*** RESPONSIVE ***/

@media only screen and (max-width: 810px) {
  .card {
    float: none;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
