<template>
  <div class="cards__list">
    <CardListItem
      v-for="(restaurant, index) in restaurants"
      :key="restaurant.id"
      :info="restaurant"
      @click.native.prevent="clickCard(restaurant, index)"
      :class="{ cards__item_active: index === indexActiveCard }"
    />

    <CardListItem v-if="restaurants.length === 0" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      indexActiveCard: null,
    };
  },
  computed: {
    ...mapGetters({
      restaurants: "getRestaurants",
    }),
  },
  methods: {
    ...mapMutations(["updateActiveCard"]),
    clickCard(restaurant, index) {
      this.indexActiveCard = index;
      this.updateActiveCard(restaurant);
    },
  },
};
</script>

<style lang="scss">
.cards__list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
