<template>
  <div class="home">
    <SearchField />
    <NavigationItem path="/order/register" name="Bestelling Registreren" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchField from "@/components/SearchField.vue";
import NavigationItem from "@/components/NavigationItem.vue";

export default {
  name: 'Home',
  components: {
    NavigationItem,
    SearchField
  }
}
</script>

<style scoped>
.home {
  /* Fill the space between the header and footer */
  height: calc(100% - 10vh);
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
}
</style>