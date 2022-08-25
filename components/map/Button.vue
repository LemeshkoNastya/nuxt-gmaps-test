<template>
  <button class="map__button">
    <img :src="require(`~/assets${icon}`)" :alt="`icon ${icon}`" />
  </button>
</template>

<script>
export default {
  props: ["icon"],
};
</script>

<style lang="scss">
.map__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
