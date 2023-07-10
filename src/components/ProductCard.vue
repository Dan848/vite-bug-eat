<template>
    <li class="py-3 my-3 px-4 rounded-5" :id="'product-' + product.id">
        <h3 class="fw-bold">{{ product.name }}</h3>
        <p class="text-" v-if="product.description"> {{ product.description }}</p>
        <div class="d-flex justify-content-between align-items-center">
            <div>{{ product.price }}€</div>
            <!-- <CounterProduct/> -->
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
    li {
        border: 1px solid #495f34;
        transition: 0.3s;
        &:hover {
            cursor: pointer;
            background-color: #ededed;
        }
    }
</style>