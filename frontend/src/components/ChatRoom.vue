<template>
  <div>
    <h1>チャットルーム {{ roomId }}</h1>

    <form @submit.prevent="sendMessage">
      <div>
        <label for="sender-name">名前</label>
        <input id="sender-name" v-model="senderName" type="text" />
      </div>

      <div>
        <label for="message-content">メッセージ</label>
        <textarea id="message-content" v-model="newMessageContent" />
      </div>

      <button type="submit">送信</button>
    </form>

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
const senderName = ref("");
const newMessageContent = ref("");

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

// biome-ignore lint/correctness/noUnusedVariables: used in the template
const sendMessage = async () => {
	if (newMessageContent.value.trim() === "") return;

	try {
		await axios.post(`http://localhost:3000/rooms/${props.roomId}/messages`, {
			content: newMessageContent.value,
			sender_name: senderName.value,
		});
		newMessageContent.value = "";
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	fetchMessages();
});
</script>
