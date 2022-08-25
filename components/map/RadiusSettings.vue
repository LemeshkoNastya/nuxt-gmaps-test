<template>
  <div class="radius-settings">
    <MapButton
      :icon="'/icons/minus.svg'"
      @click.native.prevent="changeRadius(false)"
    />
    <div class="radius-settings__value">Радиус: {{ radius }}</div>
    <MapButton
      :icon="'/icons/plus.svg'"
      @click.native.prevent="changeRadius(true)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
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

  &__value {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    padding: 7px 9px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
}
</style>
