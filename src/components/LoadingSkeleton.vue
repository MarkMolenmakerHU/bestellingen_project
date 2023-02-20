<template>
  <div class="loading-skeleton">
    <div class="loading-skeleton-text" />
    <div class="loading-skeleton-text" />
    <div class="loading-skeleton-text" />
  </div>
</template>

<script>
export default {
  name: "LoadingSkeleton"
}
</script>

<style scoped>
.loading-skeleton {
  width: 90%;
  margin: 1em auto;
  height: 10em;
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading-skeleton-text {
  width: 90%;
  height: 20px;
  background-color: #e0e0e0;
  margin: 10px 0;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f5f5f5;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>