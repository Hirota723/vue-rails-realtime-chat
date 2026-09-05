import "./assets/main.css";

import ActionCable from "actioncable";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";

const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:3000/cable";
const cable = ActionCable.createConsumer(wsUrl);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.provide("cable", cable);
app.mount("#app");
