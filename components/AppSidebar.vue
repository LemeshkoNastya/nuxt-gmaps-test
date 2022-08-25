<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <img :src="require(`~/assets/icons/logo.svg`)" alt="icon logo" />
    </div>
    <div class="cards"><CardList /></div>
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss">
.sidebar {
  position: absolute;
  left: 0;
  z-index: 1;
  width: $width-sidebar;
  height: 100%;
  background: #f2f2f2;
  box-shadow: 5px 0px 5px $color-shadow;

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    background: #ffffff;
    box-shadow: 0px 4px 8px $color-shadow;
  }

  .cards {
    height: calc(100% - 44px);
    overflow: auto;
    background: url("~/assets/icons/pattern.svg");
    background-repeat: repeat-y;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
