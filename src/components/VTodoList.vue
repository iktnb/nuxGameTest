<template>
  <ul class="list">
    <li class="list__item list__item--header">
      <span></span>
      <p class="list__title">Title</p>
      <p class="list__title">Status</p>
    </li>

    <VTodoListCreate
      v-if="newTodoStatus"
      @newTodo="(e) => emit('newTodo', e)"
      @cancelNewTodo="() => emit('cancelNewTodo')"
    />

    <VTodoListItem
      v-for="todo of todosList"
      :key="todo.id"
      :todo="todo"
      :favorite="favoriteIds.includes(todo.id)"
      @changeTodoStatus="(e) => emit('changeTodoStatus', e)"
      @removeTodo="(e) => emit('removeTodo', e)"
      @favoriteChange="(e) => emit('favoriteChange', e)"
    />
  </ul>
</template>

<script setup>
import VTodoListItem from "./VTodoListItem.vue";
import VTodoListCreate from "./VTodoListCreate.vue";

const props = defineProps({
  todosList: {
    type: Array,
    required: true,
  },
  newTodoStatus: {
    type: Boolean,
    required: true,
  },
  favoriteIds: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "newTodo",
  "cancelNewTodo",
  "changeTodoStatus",
  "removeTodo",
  "favoriteChange",
]);
</script>
