<template>
    <div class="loader-wrapper d-flex flex-column">
        <h1 class="text-center">L'URL digitata non esiste nel nostro sito.</h1>
        <h2 class="text-center">Sarai reindirizzato alla home.</h2>
        <div class="image">
            <img src="/img/general/loader-image.png" alt="loaderImage">
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    data() {
        return {

        }
    },
    methods: {
        getRedirected() {
            setTimeout(() => {
                this.$router.push('/');
            }, 3000);
        }
    },
    mounted() {
        this.getRedirected();
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
    background-color: #cdcdcd;
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