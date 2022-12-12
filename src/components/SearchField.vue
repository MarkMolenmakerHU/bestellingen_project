<template>
  <div class="search-field">
    <!-- Search form with a field and a submit button with an search icon -->
    <form @submit.prevent="search">
      <input
        type="text"
        placeholder="Zoek een product..."
        v-model="searchQuery"
        @keyup.enter="search"
      />
      <button type="submit">Zoeken</button>
    </form>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: "SearchField",
  setup () {
    const store = useStore();

    // Search query
    const searchQuery = ref("");

    // Search function
    const search = () => {
      // If the search query is not empty
      if (searchQuery.value !== "") {
        // Set the search query in the store
        store.dispatch("fetchSearchResults", searchQuery.value);
      }
    };

    return {
      searchQuery,
      search
    };
  }
}
</script>

<style scoped>
  .search-field {
    width: 90%;
    margin: 1em auto;
  }
  .search-field form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 1em;
  }
  .search-field input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .search-field button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #fff;
    cursor: pointer;
  }
</style>