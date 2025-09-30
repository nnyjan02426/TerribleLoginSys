<script setup>
import { ref } from 'vue';
import SignUp from './components/SignUp.vue';
import Login from './components/Login.vue';

const isSignUp = ref(false);
function toggle() {
  isSignUp.value = !isSignUp.value
}
</script>

<template>
  <h1>Terrible Login System</h1>
  <div v-if="isSignUp" class="form">
    <SignUp />
    <button @click="toggle">I don't have an account</button>
  </div>
  <div v-else class="form">
    <Login />
    <button @click="toggle">I already have an account</button>
  </div>
</template>

<style scoped></style>
