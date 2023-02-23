<template>
  <div class="header">
    <router-link to="/"><i class="fa-solid fa-house"/></router-link>
  </div>
  <router-view class="view"/>
  <div class="footer"></div>
</template>

<style>
:root {
  --color-primary: #f79300;
  --color-primary-light: #ff9700;
  --color-primary-dark: #ea8c00;
  --color-secondary: #696969;
  --color-background: #f3efeb;
  --color-text: #000;
  --color-text-secondary: #525252;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header i {
  color: var(--color-background);
  font-size: 2em;
  margin-right: .5em;
}

.footer {
  width: 100%;
  height: 5vh;
  position: fixed;
  bottom: 0;
  background-color: var(--color-primary);
}

.view {
  overflow: auto;
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

.button {
  width: 90%;
  margin: 1em auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  text-decoration: none;
  color: var(--color-text);
  font-size: 1em;
  text-align: center;
}
.orange {
  background-color: var(--color-primary);
  color: var(--color-background);
}
</style>
