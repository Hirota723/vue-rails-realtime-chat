<template>
  <div>
    <h1>VueChat - チャットルーム一覧</h1>
    <ul>
      <li v-for="room in chatRooms" :key="room.id">
        <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
      </li>
    </ul>
    <h3>チャットルーム作成</h3>
    <input type="text" v-model="newRoomName" />
    <div>
      <button @click="createRoom">作成</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

const API_URL = import.meta.env.VITE_API_URL;

type ChatRoom = {
	id: number;
	name: string;
};

const chatRooms = ref<ChatRoom[]>([]);
const newRoomName = ref("");

const fetchChatRooms = async () => {
	try {
		const response = await axios.get(`${API_URL}/rooms`);
		chatRooms.value = response.data as ChatRoom[];
	} catch (error) {
		console.error(error);
	}
};

// biome-ignore lint/correctness/noUnusedVariables: used in the template
const createRoom = async () => {
	if (newRoomName.value.trim() === "") return;

	try {
		const response = await axios.post(`${API_URL}/rooms`, {
			name: newRoomName.value,
		});
		chatRooms.value.push(response.data as ChatRoom);
		newRoomName.value = "";
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	fetchChatRooms();
});
</script>
