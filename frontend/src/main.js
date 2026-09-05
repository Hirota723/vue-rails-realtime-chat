import "./assets/main.css";

import ActionCable from "actioncable";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";

const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.provide("cable", cable);
app.mount("#app");
