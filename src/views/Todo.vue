<template>
  <div class="auth-layout">
    <VCard>
      <template #header>
        <h2>Todos</h2>

        <div class="filters">
          <VInput
            label="Title:"
            v-model.lazy.trim="filtersFields.title"
            placeholder="Enter todo title"
          />

          <VSelect
            label="User:"
            :options="usersOptions"
            v-model="filtersFields.userId"
          />
          <VSelect
            label="Status:"
            :options="completedOptions"
            v-model="filtersFields.completed"
          />
        </div>

        <button
          class="button button--small button--add"
          :class="{ transparent: newTodoStatus }"
          @click="createNewTodoHandler"
        >
          Create
        </button>
      </template>

      <VTodoList
        :todos-list="filteredTodosList"
        :favorite-ids="todosStore.favoriteIds"
        v-model:new-todo-status="newTodoStatus"
        @newTodo="addTodo"
        @cancelNewTodo="resetNewTodo"
        @changeTodoStatus="todosStore.changeTodoStatus"
        @favoriteChange="todosStore.favoriteChange"
        @removeTodo="todosStore.removeTodo"
      />
    </VCard>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useUsersStore } from "@/stores/users";
import { useTodosStore } from "@/stores/todos";

import VSelect from "../components/common/VSelect.vue";
import VInput from "../components/common/VInput.vue";
import VCard from "../components/VCard.vue";
import VTodoList from "../components/VTodoList.vue";

const usersStore = useUsersStore();
const todosStore = useTodosStore();

const newTodoStatus = ref(false);

const filtersFields = reactive({
  userId: null,
  title: null,
  completed: "all",
});

const usersOptions = computed(() => {
  return [
    {
      label: "All",
      value: null,
    },

    ...usersStore.users.map((user) => ({
      value: user.id,
      label: user.name,
    })),
  ];
});

const completedOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "done",
    label: "Completed",
  },
  {
    value: "todo",
    label: "Uncompleted",
  },
  {
    value: "favorites",
    label: "Favorites",
  },
];

const filteredTodosList = computed(() => {
  return todosStore.todos.filter((todo) => {
    const userId = filtersFields.userId;
    const title = filtersFields.title;
    const completed = filtersFields.completed;

    if (userId && userId !== todo.userId) {
      return false;
    }

    if (title && !todo.title.includes(title)) {
      return false;
    }

    if (completed === "done" && !todo.completed) {
      return false;
    }

    if (completed === "todo" && todo.completed) {
      return false;
    }

    if (
      completed === "favorites" &&
      !todosStore.favoriteIds.includes(todo.id)
    ) {
      return false;
    }

    return true;
  });
});

function createNewTodoHandler() {
  newTodoStatus.value = !newTodoStatus.value;
}

function resetNewTodo() {
  newTodoStatus.value = false;
}

function addTodo(todo) {
  todosStore.addTodo(todo);
  resetNewTodo();
}

onMounted(() => {
  todosStore.fetchTodos();
});
</script>
