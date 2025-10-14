<script setup>
import { ref } from 'vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';

const isSignUp = ref(false);
const user = ref(null);

function toggle() { isSignUp.value = !isSignUp.value }
function onLoggedIn(u) { user.value = u }
</script>

<template>
  <h1>Terrible Login System</h1>
  <p v-if="user">Logged in as: <strong>{{ user.username }}</strong></p>

  <div v-if="isSignUp" class="form">
    <SignUp />
    <button @click="toggle">I already have an account</button>
  </div>
  <div v-else class="form">
    <Login @logged-in="onLoggedIn"/>
    <button @click="toggle">I don't have an account</button>
  </div>
</template>

<style scoped></style>
