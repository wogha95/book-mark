<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: "Noto Sans KR", sans-serif;
  background-color: #121212;
}

a:hover,
a {
  color: none;
  text-decoration: none;
}

button,
input,
textarea {
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
}

button:focus,
button:active,
input:focus,
input:active,
textarea:focus,
textarea:active {
  outline: none;
  box-shadow: none;
}

ul,
ol,
li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}
</style>
