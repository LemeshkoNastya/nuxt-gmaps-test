<template>
  <div class="app">
    <AppHeader v-if="smallWindow" />
    <AppSidebar />
    <MapFrame />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "IndexPage",
  computed: {
    ...mapGetters({
      smallWindow: "getSmallWindow",
    }),
  },
  methods: {
    ...mapMutations(["updateSmallWindow"]),
    ...mapActions(["setGeolocation", "getListRestaurants"]),
    getGeolocation() {
      if (!navigator.geolocation) {
        this.errorGeolocation;
      } else {
        navigator.geolocation.getCurrentPosition(
          this.successGeolocation,
          this.errorGeolocation
        );
      }
    },
    successGeolocation(position) {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.setGeolocation(geolocation);
      this.getListRestaurants();
    },
    errorGeolocation() {
      alert("Невозможно получить ваше местоположение");
      this.getListRestaurants();
    },
  },
  mounted() {
    this.getGeolocation();
    this.updateSmallWindow(window.innerWidth <= 960);
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
}

.app {
  height: 100vh;
}
</style>
