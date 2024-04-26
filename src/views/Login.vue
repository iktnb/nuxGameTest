<template>
  <div class="login">
    <div class="login__header">
      <h4>Login</h4>
    </div>

    <div class="login__body">
      <VInput
        v-model="userName"
        @input="userNameHandler"
        placeholder="Username"
      />

      <VInput
        v-model="phoneNumber"
        @input="phoneInputHandler"
        placeholder="Phone number"
      />

      <VButton @click="login" class="button">Login</VButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUsersStore } from "@/stores/users";
import useCtrlAltF from "@/composables/useCtrlAltF";
import { useRouter } from "vue-router";
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";
const router = useRouter();
const userStore = useUsersStore();
const userName = ref("");
const phoneNumber = ref("");

async function login() {
  try {
    await userStore.login({
      userName: userName.value,
      phoneNumber: phoneNumber.value,
    });
    router.push({ name: "Todo" });
  } catch (error) {}
}

function userNameHandler(event) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
  login.value = event.target.value;
}

function phoneInputHandler(event) {
  event.target.value = event.target.value.replace(/[^\d+()-\s]/g, "");
}

useCtrlAltF(callYourMethod);
function callYourMethod() {
  userName.value = "Samantha";
  phoneNumber.value = "1-463-123-4447";
}
</script>
