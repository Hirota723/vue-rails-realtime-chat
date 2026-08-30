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

interface ChatRoom {
	id: number;
	name: string;
}

const chatRooms = ref<ChatRoom[]>([]);
const newRoomName = ref("");

const fetchChatRooms = async () => {
	try {
		const response = await axios.get("http://localhost:3000/rooms");
		chatRooms.value = response.data as ChatRoom[];
	} catch (error) {
		console.error(error);
	}
};

// biome-ignore lint/correctness/noUnusedVariables: used in the template
const createRoom = async () => {
	if (newRoomName.value.trim() === "") return;

	try {
		const response = await axios.post("http://localhost:3000/rooms", {
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
