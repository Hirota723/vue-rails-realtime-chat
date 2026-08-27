import { createRouter, createWebHistory } from "vue-router";
import ChatRooms from "@/components/ChatRooms.vue";

const routes = [{ path: "/", component: ChatRooms }];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
