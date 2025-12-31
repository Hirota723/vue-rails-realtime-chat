<template>
  <div id="app">
    <router-view />
    <ApiTest />
  </div>
</template>

<script setup lang="ts">
import ApiTest from "./components/ApiTest.vue";
</script>
