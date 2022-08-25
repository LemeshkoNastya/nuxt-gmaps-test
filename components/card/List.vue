<template>
  <div class="cards__list" :class="{ cards__warm: restaurants.length === 0 }">
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
.cards {
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include for-size(tablet) {
      flex-direction: row;
    }
  }

  &__warm {
    @include for-size(tablet) {
      justify-content: center;
    }
  }
}
</style>
