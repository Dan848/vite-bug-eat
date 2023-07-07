<template>
    <div class="input-group">  
      <div class="input-group-button">
        <input type="submit" class="button minus" value="-" disabled="disabled">
      </div>
      <input class="input-group-field" value="0" type="number">
      <div class="input-group-button">
        <input type="submit" class="button plus" value="+">
      </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .input-group{
        width: 100px;
        input[type="number"]{
            width: 50%;
        }
    }
</style>