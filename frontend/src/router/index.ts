import { createRouter, createWebHistory } from "vue-router";
import ChatRoom from "@/components/ChatRoom.vue";
import ChatRooms from "@/components/ChatRooms.vue";

const routes = [
	{ path: "/", component: ChatRooms },
	{
		path: "/rooms/:id",
		component: ChatRoom,
		props: (route: any) => ({ roomId: route.params.id }),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
