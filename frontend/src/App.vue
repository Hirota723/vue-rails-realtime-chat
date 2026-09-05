<template>
  <div id="app" class="app-shell">
    <div class="page-card">
      <router-view />
    </div>
    <div class="dev-panel">
      <ApiTest />
    </div>
  </div>
</template>

<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in the template
import ApiTest from "./components/ApiTest.vue";
</script>
