<template>
    <div>
        <div class="container">
            <div class="position-relative">
                <div class="d-flex flex-nowrap row" ref="sliderContainer">
                    <div class="col-6 col-md-4 col-lg-2 gap-5" v-for="(type, index) in  types ">
                        <!-- <div class="card">
                            <div class="card-image rounded-top-4">
                                <img :src="imageBaseUrl + type.image" :alt="type.name">
                            </div>

                            <div class="card-body rounded-bottom-4">
                                <p class="p-0 m-0">{{ type.name }}</p>
                            </div>
                        </div> -->

                        <article class="card">
                            <div class="card__image">
                                <img class="img-fluid" :src="imageBaseUrl + type.image" :alt="type.name" />
                            </div>

                            <div class="card__data">
                                <div class="card__info text-center">
                                    <h2>{{ type.name }}</h2>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <!-- Change slide buttons -->
                <button class="prevBtn myBtn" @click="prevCard">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <button class="nextBtn myBtn" @click="nextCard">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SliderComponent',
    props: {
        'types': Array,
        'imageBaseUrl': String
    },
    data() {
        return {
            sliderContainer: null,
            sliderWidth: null,
        }
    },
    methods: {
        nextCard() {
            this.sliderContainer.scrollBy(this.sliderWidth / 6, 0);

            if ((this.sliderContainer.scrollLeft + this.sliderWidth + 8) >= this.sliderContainer.scrollWidth) {
                this.sliderContainer.scrollLeft = 0
            }
        },
        prevCard() {
            this.sliderContainer.scrollBy(- this.sliderWidth / 6, 0);

            if (this.sliderContainer.scrollLeft === 0) {
                this.sliderContainer.scrollLeft = this.sliderContainer.scrollWidth
            }
        }
    },
    mounted() {
        this.sliderContainer = this.$refs.sliderContainer;
        this.sliderWidth = this.sliderContainer.offsetWidth;
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/partials/variable.scss' as *;

.row {
    padding: 7rem 0;
}

//Card config

.card {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background-color: transparent;
    border: 0;

    &:hover {
        cursor: pointer;
    }
}

.card__image {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: -18%;
    z-index: 2;
    transition: all 0.3s ease-out;
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}

.card__data {
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: #ededed;
    padding-top: 10rem;
    transition: all 0.3s ease-out 0.1s;
}

.card__info {
    padding: 0 10px;
    margin-bottom: 10px;
}

.card__info h2 {
    font-size: 18px;
    font-weight: 800;
}

.card__info p {
    font-size: 10px;
    line-height: 14px;
    color: #a2a2a2;
}

.card__action {
    display: grid;
    grid-template: 30px / 1fr 35px;
}

.card__price {
    height: 30px;
    padding: 0 10px 0 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 800;
}

.card:hover .card__image {
    top: -20%;
}

.card:hover .card__data {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

// .card {
//     height: 100%;
//     border: 0;
//     background-color: transparent;
// }

// .card-body {
//     position: relative;
//     background-color: #ffffff;
// }



// .card-image {
//     width: 100%;
//     height: 70%;
//     object-fit: center;
//     object-position: center;
//     background-color: #afd886;
//     padding: .5rem;

//     img {
//         width: 100%;
//         height: 90%;
//     }
// }

hr {
    width: 50px;
    // color: $secondary-color;
}

.myBtn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid rgb(211, 211, 211, 1);
    color: rgb(0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    z-index: 1000;

    i {
        font-size: 15px;
    }

    &:active {
        // background-color: ;
    }
}

.prevBtn {
    position: absolute;
    left: -5%;
    bottom: 50%;
    translate: 0% 50%;
}

.nextBtn {
    position: absolute;
    right: -5%;
    bottom: 50%;
    translate: 0% 50%;
}

.row {
    overflow-x: auto;
    // overflow-y: hidden;

    // Scrollbar config
    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style:none;

    scrollbar-width:none;

    scroll-behavior: smooth;

}

.active {
    opacity: 1;
}

.deactive {
    opacity: 0;
}
</style>