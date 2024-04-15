<template>
  <div class="page">
    <div v-if="!isAuth" class="login">
      <div class="login__header">
        <h4>description</h4>
      </div>

      <div class="login__body">
        <p>description</p>

        <div class="field">
          <input
            v-model="login"
            @input="loginHandler"
            type="text"
            id="login"
            placeholder="Username"
          />
        </div>

        <div class="field">
          <input
            v-model="phoneNumber"
            @input="phoneInputHandler"
            type="text"
            id="login"
            placeholder="Phone number"
          />
        </div>

        <button @click="register" class="button">Register</button>
      </div>
    </div>

    <div v-else class="auth-layout">
      <div class="card">
        <div class="card__header">
          <h2 class="card__title">{{ userData.name }}</h2>
        </div>
        <div class="card__content">
          <p><strong>Username:</strong> {{ userData.username }}</p>
          <p>
            <strong>Email:</strong>
            <a href="mailto:{{ userData.email }}">{{ userData.email }}</a>
          </p>
          <p>
            <strong>Phone:</strong>
            <a href="tel:{{ userData.phone }}">{{ userData.phone }}</a>
          </p>
          <p class="section-title">Address:</p>
          <p><strong>Street:</strong> {{ userData.address.street }}</p>
          <p><strong>Suite:</strong> {{ userData.address.suite }}</p>
          <p><strong>City:</strong> {{ userData.address.city }}</p>
          <p><strong>Zipcode:</strong> {{ userData.address.zipcode }}</p>
          <p class="section-title">Company:</p>
          <p><strong>Name:</strong> {{ userData.company.name }}</p>
          <p>
            <strong>Catchphrase:</strong> {{ userData.company.catchPhrase }}
          </p>
          <p><strong>Business:</strong> {{ userData.company.bs }}</p>
        </div>
      </div>

      <div class="card">
        <div class="card__header flex items-center">
          <h2 class="card__title">User list</h2>
          <button
            class="button button--small button--add"
            v-if="!newTotoStatus"
            @click="createNewTodoHandler"
          >
            Create
          </button>
        </div>

        <div class="card__content">
          <div class="filters">
            <div class="filters__wrapper">
              <label for="title-filter">Title:</label>
              <input
                id="title-filter"
                class="filters__field"
                v-model="filtersFields.title"
                type="text"
              />
            </div>

            <div class="filters__wrapper">
              <label for="user-filter">User id:</label>
              <select
                id="user-filter"
                class="filters__field"
                v-model="filtersFields.userId"
              >
                <option :value="null">All</option>
                <option v-for="user of users" :key="id" :value="user.id">
                  {{ user.id }}
                </option>
              </select>
            </div>
            <div class="filters__wrapper">
              <label for="todo-filter">Status:</label>
              <select
                id="todo-filter"
                class="filters__field"
                v-model="filtersFields.completed"
              >
                <option value="all">All</option>
                <option value="done">Completed</option>
                <option value="todo">Uncompleted</option>
                <option value="favorites">Favorites</option>
              </select>
            </div>
          </div>

          <ul class="list">
            <li class="list__item list__item--header">
              <p class="list__title">Title</p>
              <p class="list__title">Status</p>
            </li>
            <li class="list__item list__item--new" v-if="newTotoStatus">
              <span></span>
              <input
                v-model.trim="todo.title"
                class="list__field"
                type="text"
                @keyup.enter="addTodo"
                @keyup.esc="resetNewTodo"
              />

              <span
                @click="() => (todo.completed = !todo.completed)"
                :class="`list__badge list__badge--new ${
                  todo.completed ? 'todo' : 'done'
                }`"
              >
                {{ todo.completed ? "Done" : "Todo" }}
              </span>
              <button
                :disabled="todo.title.length < 1"
                @click="addTodo"
                class="button button--small"
              >
                Save
              </button>
            </li>
            <li class="list__item" v-for="todo of todos" :key="todo.id">
              <FavoriteIcon
                class="list__icon"
                :class="{
                  'list__icon--favorite': favoriteIds.includes(todo.id),
                }"
                :favorite="favoriteIds.includes(todo.id)"
                @click="toggleFavorite(todo.id)"
              />
              <p class="list__title">{{ todo.title }}</p>

              <span :class="`list__badge ${todo.completed ? 'todo' : 'done'}`">
                {{ todo.completed ? "Done" : "Todo" }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axis from "axios";
import { computed, onMounted, ref, reactive, watchEffect } from "vue";

import FavoriteIcon from "./components/FavoriteIcon.vue";

const login = ref("Samantha");
function loginHandler(event) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
  login.value = event.target.value;
}
const phoneNumber = ref("1-463-123-4447");
function phoneInputHandler(event) {
  event.target.value = event.target.value.replace(/[^\d+()-\s]/g, "");
}

const userData = ref(null);
const isAuth = computed(() => userData.value);

const users = ref([]);
async function register() {
  const username = login.value;
  const phone = phoneNumber.value;

  await fetchUsers();
  const user = findUserByUsernameAndPhone(users.value, username, phone);
  if (!user) {
    alert("Login or phone number is incorrect");
    return;
  }
  userData.value = user;
  fetchTodo();
}

function findUserByUsernameAndPhone(users, username, phone) {
  return users.find(
    (user) => user.username === username && user.phone === phone
  );
}

async function fetchUsers() {
  try {
    const response = await axis.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

const todos = ref([]);
async function fetchTodo() {
  try {
    const response = await axis.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: {
          userId: filtersFields.userId,
          id:
            filtersFields.completed === "favorites" ? favoriteIds.value : null,

          title: filtersFields.title || null,
          completed:
            filtersFields.completed === "all" ||
            filtersFields.completed === "favorites"
              ? null
              : filtersFields.completed === "done",
        },
      }
    );

    todos.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
const filtersFields = reactive({
  userId: null,
  title: null,
  completed: "all",
});

watchEffect(() => {
  fetchTodo();
});

const favoriteIds = ref([]);
function toggleFavorite(todoId) {
  const index = favoriteIds.value.indexOf(todoId);
  if (index === -1) {
    favoriteIds.value.push(todoId);
  } else {
    favoriteIds.value.splice(index, 1);
  }

  setFavoriteIdsToLocalStorage();
}

function setFavoriteIdsToLocalStorage() {
  localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds.value));
}

function getFavoriteIdsFromLocalStorage() {
  const favoriteIdsFromLocalStorage = localStorage.getItem("favoriteIds");
  if (favoriteIdsFromLocalStorage) {
    favoriteIds.value = JSON.parse(favoriteIdsFromLocalStorage);
  }
}

const newTotoStatus = ref(false);

function createNewTodoHandler() {
  newTotoStatus.value = !newTotoStatus.value;
}
const todo = reactive({
  title: "",
  completed: false,
});

function resetNewTodo() {
  todo.title = "";
  todo.completed = false;
  newTotoStatus.value = false;
}

async function addTodo() {
  if (todo.title.length < 1) return;

  try {
    const { data } = await axis.post(
      "https://jsonplaceholder.typicode.com/todos",
      todo
    );

    todos.value.unshift(data);
    resetNewTodo();
  } catch (error) {
    console.error(error);
  }
}
onMounted(() => {
  register();
  fetchTodo();
  getFavoriteIdsFromLocalStorage();
});
</script>

<style scoped>
h4 {
  font-family: Roboto;
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.025em;
  color: #5f5f5f;
}

p {
  font-size: 15px;
}

.auth-layout {
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  gap: 20px;
}

@media (max-width: 1024px) {
  .auth-layout {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #c3c3c3;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0 0 30px 0;
  width: 447px;

  color: #5f5f5f;
  font-size: 17px;
  line-height: 21px;
}

.login__header {
  text-align: center;
  background-color: #a5a5a5;
  padding: 15px 0;
}

.login__body {
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.field {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  color: #353535;
  font-size: 17px;
}

.field::placeholder {
  color: #353535;
  opacity: 1;
  font-size: 17px;
}

.button {
  font-family: inherit;
  background-color: #519945;
  border-radius: 5px;
  border: none;
  padding: 10px 0;
  color: #fff;
  font-weight: 600;
  line-height: 21px;
  cursor: pointer;
}

.button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.button--small {
  padding: 2px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
}
.button--add {
  background-color: #519945;
  width: 100px;
  text-decoration: solid;
  text-transform: uppercase;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  max-height: 95vh;
  margin: 20px;
  gap: 10px;
  overflow: hidden;
}

.card__header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.card__title {
  color: #fff;
}

.card__content {
  padding: 10px;
  background-color: #fff;
  color: #333;
  height: fit-content;
}

.card .section-title {
  font-weight: bold;
  color: #555;
  margin-top: 10px;
}

.list {
  display: block;
  padding: 0 10px;
  max-height: calc(100vh - 200px);
  overflow-x: hidden;
  overflow-y: auto;
}

.list__item {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  color: #333;
  font-size: 17px;
  line-height: 21px;
  margin: 5px 0;
  border-bottom: 1px solid #e3e3e3;
  display: grid;
  grid-template-columns: 24px 1fr 50px;
  gap: 10px;
  transition: all 0.3s;
}

.list__item:hover {
  background-color: #f0f0f0;
  transform: scale(1.01);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.list__item:last-child {
  border-bottom: none;
}

.list__badge {
  padding: 2px;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  text-align: center;
}

.list__badge--new {
  cursor: pointer;
}

.list__badge.done {
  background-color: #f00;
}

.list__badge.todo {
  background-color: #519945;
}

.list__title {
  font-size: 17px;
  line-height: 21px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list__icon {
  opacity: 0;
  transition: all 0.3s;

  @media (max-width: 1024px) {
    opacity: 1;
  }
}

.list__icon--favorite {
  opacity: 1;
}

.list__item:hover .list__icon {
  opacity: 1;
}

.list__item--new {
  display: grid;
  grid-template-columns: 24px 1fr 50px 50px;
  align-items: center;
  gap: 10px;
}

.list__item--header {
  display: grid;
  grid-template-columns: 1fr 50px 50px;
  padding: 10px;

  color: #fff;
  font-size: 17px;
  line-height: 21px;
  font-weight: 600;
  transition: none;
}

.list__field {
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  color: #353535;
  font-size: 17px;
  width: 100%;
  border: 1px solid #e3e3e3;
}

.list__item--header:hover {
  transform: none;
  background-color: #fff;
  box-shadow: none;
}

.filters {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;

  @media screen and (max-width: 1024px) {
    padding: 5px;
    justify-content: flex-start;
  }
}

.filters__field {
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  color: #353535;
  font-size: 17px;
  width: 150px;
  border: 1px solid #e3e3e3;

  @media (max-width: 1024px) {
    width: 100px;
    font-size: 14px;
  }
}

.filters__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.list__checkbox-whapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
