<template>
  <aside class="sidebar">
    <AppHeader v-if="!smallWindow" />
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
      smallWindow: "getSmallWindow",
      count: "getCountRestaurants",
    }),
  },
  methods: {
    ...mapMutations(["updatePage"]),
    ...mapActions(["getListRestaurants"]),
    isScroll() {
      const cardsList = document.querySelector(".cards__list");

      if (this.smallWindow) {
        const card = document.querySelector(".cards__item");

        const scrollLeft = this.$refs.cards.scrollLeft;
        const cardsWidth = this.count * (card.offsetWidth + 9);
        const width = cardsList.offsetWidth;

        const bottomOfWindow = scrollLeft + width >= cardsWidth;

        if (bottomOfWindow !== this.positionBottom)
          this.positionBottom = bottomOfWindow;
      } else {
        const height = cardsList.offsetHeight;
        const scrollTop = this.$refs.cards.scrollTop;
        const screenHeight = window.innerHeight;

        const bottomOfWindow = scrollTop + screenHeight >= height;

        if (bottomOfWindow !== this.positionBottom)
          this.positionBottom = bottomOfWindow;
      }
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

  @include for-size(tablet) {
    bottom: 0;
    width: 100%;
    height: auto;
    background: none;
    box-shadow: none;
  }

  .cards {
    height: calc(100% - 44px);
    overflow: auto;
    background: url("~/assets/icons/pattern.svg");
    background-repeat: repeat-y;

    &::-webkit-scrollbar {
      width: 0;
    }

    @include for-size(tablet) {
      height: auto;
      background: none;
    }
  }
}
</style>
