<template>
    <li class="card py-3 my-3">
        <div class="px-4">
            <h3>{{ product.name }}</h3>
            <p v-if="product.description"> {{ product.description }}</p>
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <span class="fw-bold">{{ product.price }} &euro;</span>
                <div class="pe-3">
                    <CounterProduct/>
                </div>
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