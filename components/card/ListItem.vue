<template>
  <div v-if="info" class="cards__item">
    <img :src="image" :alt="`фото ${info.name}`" class="cards__image" />
    <div class="cards__info">
      <span class="cards__title">{{ info.name }}</span>
      <span class="cards__text">{{ address }}</span>
      <div class="cards__field">
        <div class="cards__rating">
          <svg
            v-for="star in 5"
            :key="star"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 0L9.8175 4.93691L15 5.73344L11.25 9.57413L12.135 15L7.5 12.4369L2.865 15L3.75 9.57413L0 5.73344L5.1825 4.93691L7.5 0Z"
              :fill="star <= countStar ? '#FCC32D' : '#BDBDBD'"
            />
          </svg>
          <span class="cards__text">{{ rating }}</span>
        </div>
        <span class="cards__text">Отзывов {{ reviews }}</span>
      </div>
      <div class="cards__field">
        <span class="cards__time cards__text">
          {{ opened }}
        </span>
        <span class="cards__distance cards__text">{{ distance }}</span>
      </div>
    </div>
  </div>
  <div v-else class="cards__item">
    <div class="cards__error">
      <span class="cards__text"> Упс! Ничего не нашлось </span>
      <span class="cards__text"> Попробуйте поменять условия поиска </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  computed: {
    image() {
      return this.info.image;
    },
    name() {
      return this.info.name;
    },
    address() {
      let address = "";

      const city = this.info.address.city;
      const street = this.info.address.street;
      const building = this.info.address.building;
      const floor = this.info.address.flour;

      if (city) address += city + ", ";
      if (street) address += street + ", ";
      if (building) address += building + ", ";
      if (floor) address += "этаж " + floor;

      return address;
    },
    countStar() {
      return Math.floor(this.rating);
    },
    rating() {
      return this.info.rating;
    },
    reviews() {
      return this.info.reviewsCount;
    },
    opened() {
      return this.info.opened ? "Открыто" : "Закрыто";
    },
    distance() {
      return this.info.distance;
    },
  },
};
</script>

<style lang="scss">
.cards {
  &__item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: #ffffff;
    box-shadow: 0px 5px 10px $color-shadow;
    border-radius: $radius;
    width: 328px;
    height: 110px;
    overflow: auto;
    cursor: pointer;

    &_active {
      box-shadow: 0px 5px 10px $color-shadow-active;
    }
  }

  &__image {
    width: 110px;
    min-width: 110px;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #ffffff;
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }

  &__title {
    margin-bottom: 5px;
    font-size: 12px;
    line-height: 15px;
    font-weight: bold;
    color: $gray;
  }

  &__text {
    font-size: 12px;
    line-height: 15px;
    color: $gray;
  }

  &__field {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 5px;
  }

  &__rating {
    display: flex;
    align-items: center;
    margin-right: 5px;

    .cards__text {
      margin-left: 5px;
    }
  }

  &__time {
    margin-right: 5px;

    &:before {
      content: "";
      display: block;
      background: url("~/assets/icons/watch.svg") no-repeat;
      background-size: 15px;
      width: 15px;
      height: 15px;
      float: left;
      margin: 0 7px 0 0;
    }
  }

  &__distance {
    &:before {
      content: "";
      display: block;
      background: url("~/assets/icons/person.svg") no-repeat;
      background-size: 7px 15px;
      width: 7px;
      height: 15px;
      float: left;
      margin: 0 7px 0 0;
    }
  }

  &__error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 100%;
  }
}
</style>
