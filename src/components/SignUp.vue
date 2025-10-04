<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
function onUsernameInput(e) {
  username.value = e.target.value
}
function onPasswordInput(e) {
  password.value = e.target.value
}
</script>

<template>
  <h2>Sign Up</h2>
  <form>
    <label for="username">Username: </label> <br>
    <input type="text" id="username" v-model="username">
    <br>
    <label for="password">Password: </label> <br>
    <input type="text" id="password" v-model="password">
    <br>
    <button>Submit</button>
  </form>

  <!-- <p>{{ username }} {{ password }}</p> -->
</template>

<style scoped></style>
