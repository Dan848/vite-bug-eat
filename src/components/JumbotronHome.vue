<template>
    <div class="jumbotron d-flex justify-content-center py-5">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <img src="public/img/bees.gif" class="jumbo-logo" alt="" />
            <div class="pt-5">
                <h2> Qualcosa ronza in giro... </h2>
                <p> ...sono i nostri rider! </p>
            </div>
        </div>
    </div>

    <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-6">
            <div class="form">
                <i class="fa fa-search"></i>
                <input type="text" class="form-control form-input" placeholder="Cerca il ristorante più vicino a te..." />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'JumbotronHome'
}
</script>

<style lang="scss" scoped></style>