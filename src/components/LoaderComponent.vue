<template>
    <div class="loader-wrapper">
        <div class="image">
            <img src="/img/general/loader-image.png" alt="loaderImage">
        </div>
    </div>
</template>

<script>
import { store } from "../data/store";
export default {
    name: 'LoaderComponent',
    data() {
        return {
            store
        }
    },
    mounted() {
        document.body.classList.add('overflow-hidden');
    },
    unmounted() {
        document.body.classList.remove('overflow-hidden');
    }

}
</script>

<style lang="scss" scoped>
.loader-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ededed;
}

.image {
    border-radius: 150px;
    animation: loaderSize 2s linear infinite;

    img {
        height: 250px;
        width: 250px;
    }
}

@keyframes loaderSize {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>