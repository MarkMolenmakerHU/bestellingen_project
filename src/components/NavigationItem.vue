<template>
  <router-link :to="path" class="navigation-item">
    <i class="fa-solid" :class="prefix_icon" style="color: var(--color-primary)"/>
    <span class="title">{{name}}</span>
    <i class="fa-solid fa-greater-than"/>
  </router-link>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    // The name of the navigation item
    name: {
      type: String,
      required: true,
    },
    // The path of the navigation item
    path: {
      type: String,
      required: true,
    },
    // The icon of the navigation item
    prefix_icon: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
  .navigation-item {
    width: 90%;
    margin: .5em auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1em 1fr 1em;
    background-color: #fff;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-text);
    font-size: 1em;
    text-align: left;
  }
  .navigation-item .title {
    margin: 0 1em;
  }
  .navigation-item i {
    font-size: 1.2em;
  }
</style>