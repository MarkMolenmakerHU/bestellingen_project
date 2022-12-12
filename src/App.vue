<template>
  <div class="header"></div>
  <router-view/>
  <div class="footer"></div>
</template>

<style>
:root {
  --color-primary: #f79300;
  --color-secondary: #b6b6b6;
  --color-background: #f0f0f0;
  --color-text: #000;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 5vh;
  background-color: var(--color-primary);
}

.footer {
  width: 100%;
  height: 5vh;
  position: fixed;
  bottom: 0;
  background-color: var(--color-primary);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: var(--color-text);
  background-color: var(--color-background);

  width: 100%;
  height: 100%;
}
</style>
