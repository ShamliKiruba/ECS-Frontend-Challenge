<template>
  <div id="app">
    <BooksFilter/>
  </div>
</template>

<script>
import BooksFilter from './components/BooksFilter.vue'
import WebStorage from './common/WebStorage.js'

export default {
  name: 'app',
  components: {
    BooksFilter
  },
  created() {
    WebStorage.setCollection('CART', []);
  }
}
</script>

<style>
@import './assets/bulma.min.css';

html, body{
  margin: 0;
  height: 1500px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
