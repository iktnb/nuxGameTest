<template>
  <header class="header" v-if="usersStore.isLoggedIn">
    <router-link to="/" class="header__title">Todos</router-link>
    <router-link to="/user" class="header__title"> Profile</router-link>
    <a @click="logout" class="header__title"> Logout</a>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

import { useUsersStore } from "@/stores/users";

const router = useRouter();

const usersStore = useUsersStore();

const logout = () => {
  usersStore.logout();
  router.push({ name: "Login" });
};
</script>

<style>
.header {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
  gap: 100px;
  background-color: aliceblue;
  font-weight: normal;
}

.header a {
  color: #333;
  text-decoration: none;
}

.router-link-active {
  font-weight: bold;
}

.header__logout {
  cursor: pointer;
  height: 24px;
  width: 24px;
}
</style>
