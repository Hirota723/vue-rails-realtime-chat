<template>
  <div>
    <h1>VueChat - チャットルーム一覧</h1>
    <ul>
      <li v-for="room in chatRooms" :key="room.id">
        <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
      </li>
    </ul>
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

const fetchChatRooms = async () => {
	try {
		const response = await axios.get("http://localhost:3000/rooms");
		chatRooms.value = response.data as ChatRoom[];
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	fetchChatRooms();
});
</script>
