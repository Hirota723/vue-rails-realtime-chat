<template>
  <div>
    <h1>ApiTest</h1>
    <button @click="_test">ApiTest</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const API_URL = import.meta.env.VITE_API_URL;

const message = ref("");

const _test = async () => {
	try {
		const apiUrl = API_URL || "http://localhost:3000";
		const response = await fetch(`${apiUrl}/api/test`);

		const data = await response.json();
		message.value = data.message;
	} catch (error) {
		console.error("API Error:", error);
	}
};
</script>
