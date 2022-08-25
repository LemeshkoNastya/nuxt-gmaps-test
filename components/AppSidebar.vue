<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <a href="https://landing.mealhub.group/">
        <img :src="require(`~/assets/icons/logo.svg`)" alt="icon logo"
      /></a>
    </div>
    <div ref="cards" class="cards"><CardList ref="cardsList" /></div>
  </aside>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      positionBottom: false,
    };
  },
  watch: {
    positionBottom(value) {
      if (value) this.updatePage();
    },
    page() {
      this.getListRestaurants(true);
    },
  },
  computed: {
    ...mapGetters({
      page: "getPage",
    }),
  },
  methods: {
    ...mapMutations(["updatePage"]),
    ...mapActions(["getListRestaurants"]),
    isScroll() {
      const cardsList = document.querySelector(".cards__list");
      const height = cardsList.offsetHeight;
      const scrollTop = this.$refs.cards.scrollTop;
      const screenHeight = window.innerHeight;

      const bottomOfWindow = scrollTop + screenHeight >= height;

      if (bottomOfWindow !== this.positionBottom)
        this.positionBottom = bottomOfWindow;
    },
  },
  mounted() {
    this.$refs.cards.addEventListener("scroll", this.isScroll);
  },
};
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
