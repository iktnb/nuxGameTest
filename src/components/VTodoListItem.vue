<template>
  <li class="list__item">
    <FavoriteIcon
      class="list__icon"
      @click="() => emit('favoriteChange', todo)"
      :class="{
        'list__icon--favorite': favorite,
      }"
      :favorite="favorite"
    />
    <p class="list__title">{{ todo.title }}</p>

    <span
      @click="() => emit('changeTodoStatus', todo)"
      :class="`list__badge list__badge ${todo.completed ? 'todo' : 'done'}`"
    >
      {{ todo.completed ? "Done" : "Todo" }}
    </span>

    <TrashcanIcon
      class="list__item--trashcan"
      @click="() => emit('removeTodo', todo)"
    />
  </li>
</template>

<script setup>
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";
import TrashcanIcon from "@/components/icons/TrashcanIcon.vue";

const emit = defineEmits(["changeTodoStatus", "removeTodo", "favoriteChange"]);

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
  },
});
</script>
