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

          <p><strong>Email:</strong> {{ userData.email }}</p>
          <p><strong>Phone:</strong> {{ userData.phone }}</p>
          <p class="section-title">Address</p>
          <p><strong>Street:</strong> {{ userData.address.street }}</p>
          <p><strong>Suite:</strong> {{ userData.address.suite }}</p>
          <p><strong>City:</strong> {{ userData.address.city }}</p>
          <p><strong>Zipcode:</strong> {{ userData.address.zipcode }}</p>
          <p class="section-title">Company</p>
          <p><strong>Name:</strong> {{ userData.company.name }}</p>
          <p>
            <strong>Catchphrase:</strong> {{ userData.company.catchPhrase }}
          </p>
          <p><strong>Business:</strong> {{ userData.company.bs }}</p>
        </div>
      </div>

      <div class="card">
        <div class="card__header">
          <h2 class="card__title">User list</h2>
        </div>

        <div class="card__content">
          <ul class="list">
            <li class="list__item" v-for="todo of todos" :key="todo.id">
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
import { computed, onMounted, ref } from "vue";

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

async function register() {
  const username = login.value;
  const phone = phoneNumber.value;

  const users = await fetchUsers();
  const user = findUserByUsernameAndPhone(users, username, phone);
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

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const todos = ref([]);
async function fetchTodo() {
  try {
    const response = await axis.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    todos.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  register();
  fetchTodo();
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
  background-color: #519945;
  border-radius: 5px;
  border: none;
  padding: 10px 0;
  color: #fff;
  font-weight: 600;
  line-height: 21px;
  cursor: pointer;
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

.card__title {
  color: #fff;
}

.card__content {
  padding: 10px;
  background-color: #fff;
  color: #333;
}

.card .section-title {
  font-weight: bold;
  color: #555;
}

.list {
  padding: 0 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 85vh;
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
  grid-template-columns: 1fr 50px;
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
}
</style>
