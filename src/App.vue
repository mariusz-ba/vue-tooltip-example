<template>
  <div class="app">
    <button
      @click="showList = !showList"
    >
      {{ showList ? 'Hide' : 'Show' }}
    </button>
    <div
      v-if="showList"
      class="app__list"
    >
      <div
        v-tooltip='{
          content: `
            <div class="app__tooltip-container">
              <img
                class="app__tooltip-image"
                src="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="nie"
              />
              <b>${item.title}</b>
            </div>
          `,
          align: "center"
        }'
        class="app__list-item"
        v-for="(item, index) in items"
        :key="index"
      >{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { tooltip } from './utils/vue/directives/directives';

export default {
  name: 'app',
  directives: {
    tooltip
  },
  data() {
    return {
      items: (new Array(200)).fill(0).map((val, index) => ({ title: 'Hello World #' + index })),
      showList: true
    }
  }
};
</script>

<style lang="scss">
@import './utils/vue/directives/directives.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

.app {
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__list-item {
    position: relative;
    width: 100px;
    height: 100px;
    background: #ebebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    margin-right: 20px;
    text-align: center;
  }

  &__tooltip-container {

  }

  &__tooltip-image {
    width: 100%;
    height: auto;
  }
}
</style>
