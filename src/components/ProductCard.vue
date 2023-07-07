<template>
    <li class="card py-3 my-3" v-if="product.visible == true">
        <div class="px-4">
            <h3 class="fw-bold">{{ product.name }}</h3>
            <p v-if="product.description"> {{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span>{{ product.price }} &euro;</span>
                <CounterProduct/>
            </div>
        </div>
    </li>
</template>

<script>
import CounterProduct from "../components/CounterProduct.vue";
export default {
    props: { product: Object },
    components: {
        CounterProduct,
    }
}
</script>

<style lang="scss" scoped>

</style>