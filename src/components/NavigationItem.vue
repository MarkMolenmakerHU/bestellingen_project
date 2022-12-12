<template>
  <router-link :to="path" class="navigation-item">
    <span class="title">{{name}}</span>
    <span class="icon">></span>
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
  }
}
</script>

<style scoped>
  .navigation-item {
    width: 90%;
    margin: 1em auto;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-text);
  }
  .navigation-item .title {
    font-size: 1em;
  }
  .navigation-item .icon {
    font-weight: bold;
  }
</style>