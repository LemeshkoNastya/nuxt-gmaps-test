export const state = () => ({
  restaurants: [],
  geolocation: {
    lat: 59.931469339578584,
    lng: 30.295400903735356
  },
  location: {
    lat: 59.931469339578584,
    lng: 30.295400903735356
  },
  limit: 15,
  page: 1,
  radius: 1,
  radiusOptions: {
    radius: 1000,
    center: {
      lat: 59.931469339578584,
      lng: 30.295400903735356,
    },
    strokeColor: '#E95A8B',
    strokeWeight: 1.5,
    fillOpacity: 0,
  },
  stepRadius: [0.5, 1, 2, 3, 4, 5, 10, 15, 20, 30, 40, 50],
  activeCard: null,
})

export const mutations = {
  updateGeolocation(state, geolocation) {
    state.geolocation = geolocation;
  },
  updateLocation(state, location) {
    state.location = location;
    state.radiusOptions.center = location;
  },
  updateRestaurants(state, data) {
    state.restaurants = data;
  },
  updateRadius(state, radius) {
    state.radius = radius;
    state.radiusOptions.radius = radius * 1000;
  },
  updateActiveCard(state, card) {
    state.activeCard = card;
  },
}

export const getters = {
  getGeolocation(state) {
    return state.geolocation;
  },
  getLocation(state) {
    return state.location;
  },
  getRestaurants(state) {
    return state.restaurants;
  },
  getRadiusOptions(state) {
    return state.radiusOptions;
  },
  getRadius(state) {
    return state.radius;
  },
  getLocationActiveCard(state) {
    if (state.activeCard)
      return {
        lat: state.activeCard.latitude,
        lng: state.activeCard.longitude
      }
    return state.activeCard
  },
}

export const actions = {
  setGeolocation({
    commit
  }, geolocation) {
    commit("updateGeolocation", geolocation);
    commit("updateLocation", geolocation);
  },
  changeRadius({
    commit,
    state
  }, increase) {
    const indexStepRadius = state.stepRadius.indexOf(state.radius);
    let newIndexStepRadius = indexStepRadius;

    if (increase) newIndexStepRadius++;
    else newIndexStepRadius--;

    if ((increase && indexStepRadius < state.stepRadius.length - 1) ||
      (!increase && indexStepRadius > 0)) {
      commit("updateRadius", state.stepRadius[newIndexStepRadius]);
    }
  },
  async getListRestaurants({
    commit,
    state
  }) {
    const urlApi = "https://dev.api.mealhub.group/api/ru/search";
    const params = `?limit=${state.limit}&page=${state.page}&latitude=${state.location.lat}&longitude=${state.location.lng}&radius=${state.radius}`;

    await fetch(urlApi + params)
      .then((response) => {
        if (response.status !== 200) {
          console.log("Статус ошибки:", response.status);
          commit("updateRestaurants", []);
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.items) commit("updateRestaurants", data.items);
        else commit("updateRestaurants", []);
      })
      .catch((e) => {
        console.log("Ошибка:", e);
        commit("updateRestaurants", []);
      });
  },
}
