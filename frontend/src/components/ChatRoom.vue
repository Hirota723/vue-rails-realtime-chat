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
import { inject, onMounted, onUnmounted, ref } from "vue";

const API_URL = import.meta.env.VITE_API_URL;

type Message = {
	id: number;
	sender_name: string;
	content: string;
};

type CableSubscription = {
	unsubscribe: () => void;
};

type CableConsumer = {
	subscriptions: {
		create: (
			params: { channel: string; room_id: string | number },
			handlers: { received: (message: Message) => void },
		) => CableSubscription;
	};
};

const props = defineProps<{
	roomId: string | number;
}>();

const cable = inject<CableConsumer | null>("cable", null);

const messages = ref<Message[]>([]);
const senderName = ref("");
const newMessageContent = ref("");

const subscription = ref<CableSubscription | null>(null);

const fetchMessages = async () => {
	try {
		const response = await axios.get(
			`${API_URL}/rooms/${props.roomId}/messages`,
		);
		messages.value = response.data as Message[];
	} catch (error) {
		console.error(error);
	}
};

const createSubscription = () => {
	if (!cable) return;

	subscription.value = cable.subscriptions.create(
		{ channel: "RoomChannel", room_id: props.roomId },
		{
			received: (message: Message) => {
				console.log(message);
				messages.value.push(message);
			},
		},
	);
};

// biome-ignore lint/correctness/noUnusedVariables: used in the template
const sendMessage = async () => {
	if (newMessageContent.value.trim() === "") return;

	try {
		await axios.post(`${API_URL}/rooms/${props.roomId}/messages`, {
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
	createSubscription();
});

onUnmounted(() => {
	if (subscription.value) {
		subscription.value.unsubscribe();
	}
});
</script>
