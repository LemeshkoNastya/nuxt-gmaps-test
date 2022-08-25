<template>
  <div class="radius-settings">
    <MapButton
      :icon="'/icons/minus.svg'"
      @click.native.prevent="changeRadius(false)"
    />
    <div class="radius-settings__value">
      Радиус: {{ radius | radiusFormat }}
    </div>
    <MapButton
      :icon="'/icons/plus.svg'"
      @click.native.prevent="changeRadius(true)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { radiusFormat } from "~/assets/js/helpers.js";

export default {
  filters: {
    radiusFormat,
  },
  computed: {
    ...mapGetters({
      radius: "getRadius",
    }),
  },
  methods: {
    ...mapActions(["changeRadius"]),
  },
};
</script>

<style lang="scss">
.radius-settings {
  display: flex;
  align-items: center;

  &__value {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    padding: 7px 9px;
    background: #ffffff;
    box-shadow: 0px 4px 8px $color-shadow;
    border-radius: $radius;
    font-size: 13px;
    line-height: 16px;
  }
}
</style>
