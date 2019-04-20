<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #ecf0f5;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fa {
  width: 14px;
  text-align: center;
  height: 14px;
}
</style>
