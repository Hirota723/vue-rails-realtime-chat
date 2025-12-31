<template>
  <div>
    <h1>ApiTest</h1>
    <button @click="test">ApiTest</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");

const test = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/test");
    const data = await response.json();
    message.value = data.message;
  } catch (error) {
    console.error("API Error:", error);
  }
};
</script>
