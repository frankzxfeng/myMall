<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return true
      }
    }
  }
}
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
  }
  .check-button img {
    height: 20px;
    width: 20px;
}
  .check {
    background-color: red;
  }
</style>
