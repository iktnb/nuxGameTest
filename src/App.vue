<template>
  <div class="page">
    <VHeader />

    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import VHeader from "@/components/VHeader.vue";
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();

const router = useRouter();

onMounted(() => {
  console.log("I WORK");
  const user = userStore.readFromLocalStorage();
  if (user) {
    userStore.login(user);
  } else {
    router.push({ name: "Login" });
  }
});
</script>

<style>
#app {
  max-height: 100vh;
  overflow: hidden;
}

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
  width: 100%;
  gap: 20px;
}
.field {
  background-color: transparent;
  border-radius: 5px;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.field__label {
  font-size: 17px;
  line-height: 21px;
  color: #ffffff;
}

.field__input {
  border-radius: 5px;
  padding: 4px;
  color: #353535;
  font-size: 18px;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  width: 100%;
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

.card__content {
  padding: 10px;
  background-color: #fff;
  color: #333;
  height: fit-content;
}

.list {
  display: block;
  padding: 0 10px;
  height: 100%;
  max-height: 75vh;
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
  grid-template-columns: 24px 1fr 50px 50px;
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
  cursor: pointer;
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
  background-color: #353535;
}

.list__item--new:hover {
  background-color: #353535;
}

.transparent {
  opacity: 0;
}

.list__item--header {
  display: grid;
  grid-template-columns: 24px 1fr 50px 50px;
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
  gap: 10px;
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

.list__item--trashcan {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
</style>
