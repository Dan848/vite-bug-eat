<template>
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" aria-labelledby="modalLabel" aria-modal="true" ref="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-bg-primary">
                    <h1 class="modal-title fs-5" id="modalTitle">{{ header }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="$emit('closeModal')"></button>
                </div>
                <div class="modal-body">
                    <p>{{ body }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('closeModal')">{{
                        btnOne
                    }}</button>
                    <button @click="$emit('onClick')" type="button" class="btn btn-danger delete-modal-button">{{ btnTwo
                    }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        header: String,
        body: String,
        btnOne: String,
        btnTwo: String
    },

}
</script>

<style lang="scss" scoped>
body {
    overflow: hidden;

    .fade {
        background-color: rgba(black, $alpha: 0.7);
        z-index: 1250;
    }
}
</style>