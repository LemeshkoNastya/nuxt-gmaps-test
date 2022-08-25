<template>
  <div class="header">
    <a href="https://landing.mealhub.group/">
      <img :src="require(`~/assets/icons/logo.svg`)" alt="icon logo"
    /></a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: $height-header;
  background: #ffffff;
  box-shadow: 0px 4px 8px $color-shadow;

  @include for-size(tablet) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
