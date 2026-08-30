<template>
  <div>
    <h1>チャットルーム {{ roomId }}</h1>

    <ul>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.sender_name }}:</strong> {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

type Message = {
	id: number;
	sender_name: string;
	content: string;
};

const props = defineProps<{
	roomId: string | number;
}>();

const messages = ref<Message[]>([]);

const fetchMessages = async () => {
	try {
		const response = await axios.get(
			`http://localhost:3000/rooms/${props.roomId}/messages`,
		);
		messages.value = response.data as Message[];
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	fetchMessages();
});
</script>
