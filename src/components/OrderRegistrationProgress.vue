<template>
  <div class="order-registration-progress">
    <router-link to="./assembly" class="progress-bar" active-class="active"/>
    <router-link to="./information" class="progress-bar" active-class="active"/>
    <router-link to="./overview" class="progress-bar" active-class="active"/>
  </div>
</template>

<script>
export default {
  name: "OrderRegistrationProgress"
}
</script>

<style scoped>
  .order-registration-progress {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 1em;
    padding: 1em 0 0 0;
    margin: 0 auto;
  }
  .progress-bar {
    width: 33%;
    height: .5em;
    background-color: var(--color-secondary);
    margin: 0 .5em;
  }
  .active {
    background-color: var(--color-primary);
  }
</style>