<script setup>
import { ref } from 'vue';
import { apiFetch } from '@/server/api';

const username = ref('');
const password = ref('');

const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const emit = defineEmits(["logged-in"])

async function onSubmit() {
  errorMsg.value = '';
  successMsg.value = '';

  if(!username.value || !password.value) {
    errorMsg.value = "Please enter the required fields.";
    return;
  }
  loading.value = true;

  try {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })
    successMsg.value = `Welcome, ${data?.user?.username}!`;
    emit("logged-in", data?.username)
  } catch (e) {
    errorMsg.value = e.message;
  } finally {
    loading.value = false;
  }
}

function onUsernameInput(e) {
  username.value = e.target.value
}
function onPasswordInput(e) {
  password.value = e.target.value
}
</script>

<template>
  <h2>Login</h2>
  <form @submit.prevent="onSubmit">
    <label for="username">Username: </label> <br>
    <input type="text" id="username" v-model="username">
    <br>
    <label for="password">Password: </label> <br>
    <input type="text" id="password" v-model="password">
    <br>
    <button :disabled="loading">{{ loading ? 'Logging in...' : 'Login'}}</button>
  </form>

  <p v-if="errorMsg" style="color:red">Login Error: {{ errorMsg }}</p>
  <p v-if="successMsg" style="color:green">{{ successMsg }}</p>
  <!-- <p>{{ username }} {{ password }}</p> -->
</template>

<style scoped></style>

