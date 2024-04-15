<template>
  <div class="container">
    <div class="login">
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const login = ref("");
function loginHandler(event) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
  login.value = event.target.value;
}
const phoneNumber = ref("");
function phoneInputHandler(event) {
  event.target.value = event.target.value.replace(/[^\d+()-\s]/g, "");
}

function register() {
  console.log(login.value, phoneNumber.value);
}
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

p {
  font-size: 15px;
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
</style>
