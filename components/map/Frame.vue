<template>
  <div class="map">
    <div class="map__settings">
      <MapButton
        :icon="'/icons/geoposition.svg'"
        @click.native.prevent="clickGeolocation"
      />
      <MapRadiusSettings />
    </div>
    <GMap
      ref="GMap"
      language="ru"
      :cluster="{ options: { styles: clusterStyle } }"
      :center="location"
      :options="{ fullscreenControl: false, styles: mapStyle }"
      :zoom="12"
      @init="initMap()"
    >
      <GMapMarker
        ref="GMapMarkerLocation"
        :position="location"
        :options="pins.geolocation"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <code> Ваше местоположение </code>
        </GMapInfoWindow>
      </GMapMarker>
      <GMapMarker
        ref="GMapMarkerRestaurants"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :position="{ lat: +restaurant.latitude, lng: +restaurant.longitude }"
        :options="pins.restaurants"
        @click="currentLocation = restaurant"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <code>
            lat: {{ restaurant.latitude }}, lng:
            {{ restaurant.longitude }}
          </code>
        </GMapInfoWindow>
      </GMapMarker>
      <GMapCircle ref="GMapCircle" :options="circleOptions" />
    </GMap>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mapStyleFile from "~/assets/js/mapStyle.js";

export default {
  data() {
    return {
      currentLocation: {},
      pins: {
        geolocation: { icon: { url: "/icons/user-position.svg" } },
        restaurants: { icon: { url: "/icons/rest-point.svg" } },
      },
      mapStyle: mapStyleFile,
      clusterStyle: [
        {
          url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
          width: 56,
          height: 56,
          textColor: "#fff",
        },
      ],
    };
  },
  watch: {
    "circleOptions.radius"(value) {
      this.$refs.GMapCircle.circle.setRadius(value);
      this.changeMapZoom();
      this.getListRestaurants();
    },
    "circleOptions.center"(value) {
      if (this.$refs.GMapCircle.circle) {
        this.$refs.GMapCircle.circle.setCenter(value);
        this.changeMapCenter(value);
        this.changeMapZoom();
      }
    },
    location(value) {
      if (this.$refs.GMapMarkerLocation.marker) {
        this.$refs.GMapMarkerLocation.marker.setPosition(value);
        this.getListRestaurants();
      }
    },
    restaurants(restaurants) {
      this.deleteMarkers();

      setTimeout(() => {
        if (this.$refs.GMapMarkerRestaurants) {
          this.addMarkers(restaurants);
        }
      }, 0);
    },
    activeCard(value) {
      this.changeMapCenter(value);
      this.$refs.GMap.map.setZoom(15);
    },
  },
  computed: {
    ...mapGetters({
      geolocation: "getGeolocation",
      location: "getLocation",
      restaurants: "getRestaurants",
      circleOptions: "getRadiusOptions",
      activeCard: "getLocationActiveCard",
    }),
  },
  methods: {
    ...mapMutations(["updateLocation"]),
    ...mapActions(["getListRestaurants"]),
    initMap() {
      this.changeMapZoom();

      google.maps.event.addListener(this.$refs.GMap.map, "click", (e) => {
        this.updateLocation(e.latLng.toJSON());
      });

      google.maps.event.addListener(
        this.$refs.GMapCircle.circle,
        "click",
        (e) => {
          this.updateLocation(e.latLng.toJSON());
        }
      );
    },
    clickGeolocation() {
      this.updateLocation(this.geolocation);
      this.changeMapCenter(this.geolocation);
      this.changeMapZoom();
    },
    changeMapCenter(position) {
      const mapCenter = new google.maps.LatLng(position.lat, position.lng);
      this.$refs.GMap.map.setCenter(mapCenter);
    },
    changeMapZoom() {
      const bound = this.$refs.GMapCircle.circle.getBounds();
      this.$refs.GMap.map.fitBounds(bound);
    },
    deleteMarkers() {
      for (const [key, value] of Object.entries(this.$refs)) {
        if (key.startsWith("GMapMarkerRestaurants"))
          value.forEach((comp) => {
            if (comp && comp.marker) comp.marker.setVisible(false);
          });
      }
    },
    addMarkers(restaurants) {
      for (const [key, value] of Object.entries(this.$refs)) {
        if (key.startsWith("GMapMarkerRestaurants"))
          value.forEach((comp, index) => {
            const marker = new this.$refs.GMap.google.maps.Marker({
              position: {
                lat: +restaurants[index].latitude,
                lng: +restaurants[index].longitude,
              },
              map: this.$refs.GMap.map,
              ...this.pins.restaurants,
            });

            comp.marker = marker;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.map {
  position: relative;
  margin-left: $width-sidebar;
  width: calc(100% - #{$width-sidebar});
  height: 100%;

  &__settings {
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .GMap {
    height: 100%;

    &__Wrapper {
      height: 100%;
    }

    .gmnoprint {
      display: none;
    }
  }
}
</style>
