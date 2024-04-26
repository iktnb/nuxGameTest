<template>
  <li class="list__item list__item--new">
    <span></span>
    <input
      v-focus
      v-model.trim="todo.title"
      class="list__field"
      placeholder="Enter todo title"
      type="text"
      @keyup.enter="() => emit('newTodo', todo)"
      @keyup.esc="() => emit('cancelNewTodo')"
    />

    <span
      @click="() => (todo.completed = !todo.completed)"
      :class="`list__badge list__badge--new ${
        todo.completed ? 'todo' : 'done'
      }`"
    >
      {{ todo.completed ? "Done" : "Todo" }}
    </span>
    <VButton
      :disabled="todo.title.length < 1"
      @click="() => emit('newTodo', todo)"
      class="button--small"
    >
      Save
    </VButton>
  </li>
</template>

<script setup>
import { reactive } from "vue";

import VButton from "@/components/common/VButton.vue";

const emit = defineEmits(["newTodo", "cancelNewTodo"]);

const todo = reactive({
  title: "",
  completed: false,
});

const vFocus = {
  mounted: (el) => el.focus(),
};
</script>
