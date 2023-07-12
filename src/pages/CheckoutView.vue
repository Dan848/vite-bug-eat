<template>
    <div class="container mt-5">
        <div class="row justify-content-between">
            <div class="col-6 bg-primary text-white rounded-5">
                <div
                    class="cart py-2 px-3 flex-column">
                    <!-- Cart Title -->
                    <!-- <i class="fa-solid fa-xmark fs-4 fw-bolder d-md-none"
                    @click="cartOpen = false">
                    </i> -->
                    <h3 class="text-center fw-bold mt-3 pb-0 px-3">Riepilogo ordine</h3>
                    <!-- <div class="h6 text-center" :class="{'d-none' : !cart.restaurant.name}">Presso: <span class="fw-medium">{{ cart.restaurant.name }}</span></div> -->
                    <!-- <hr class="mb-2" :class="{'d-none' : !cart.products.length}" /> -->
                    <ul class="list-unstyled overflow-y-auto cart-products container-fluid">
                    <!-- Single Product -->
                    <li
                        class="py-2 row align-items-center">
                        <div class="col-4">Cazzo Servito Freddo con cipolla</div>
                        <div class="col-4">
                            4
                        </div>
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div class="">40.00€</div>
                        </div>
                    </li>
                    <li
                        class="py-2 row align-items-center">
                        <div class="col-4">Pappa Calda</div>
                        <div class="col-4">
                            5
                        </div>
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div class="">50.00€</div>
                        </div>
                    </li>
                    <li
                        class="py-2 row align-items-center">
                        <div class="col-4">Culo di Peppe</div>
                        <div class="col-4">
                            4
                        </div>
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div class="">37.90€</div>
                        </div>
                    </li>
                    <li
                        class="py-2 row align-items-center">
                        <div class="col-4">Corona di Michele</div>
                        <div class="col-4">
                            2
                        </div>
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div class="">7.00€</div>
                        </div>
                    </li>
                    <li
                        class="py-2 row align-items-center">
                        <div class="col-4">Ventilatore di Vito</div>
                        <div class="col-4">
                            4
                        </div>
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div class="">10.00€</div>
                        </div>
                    </li>
                    <li
                        class="py-2 row align-items-center">
                        <div class="col-4">La mia borraccia</div>
                        <div class="col-4">
                            4
                        </div>
                        <div class="col-4 pe-1 text-end text-nowrap d-flex justify-content-end">
                        <div class="">99.00€</div>
                        </div>
                    </li>

                    </ul>
                    <!-- Cart Total -->
                    <hr class="my-2 px-2" />
                    <div class="py-1 px-2 d-flex justify-content-between align-items-center fw-bold mb-2">
                    <div>Totale</div>
                    <div>123€</div>
                    </div>
                    <!-- Cart Pay Button -->
                    <div class="d-flex flex-column justify-content-center align-items-center  mb-2">
                    <!-- <button class="btn btn-primary rounded-5 fw-bold text-white mb-3">
                        Vai al pagamento
                    </button> -->
                    <router-link :to="{ name: 'restaurantView'}">
                        <div class="text-center text-decoration-underline small px-2 text-white" @click="clearLocalStorage">
                            Annulla e torna indietro
                        </div>
                    </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>