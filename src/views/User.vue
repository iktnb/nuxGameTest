<template>
  <VCard v-if="userData">
    <template #header>
      <h2 class="card__title">{{ userData.name }}</h2>
    </template>

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
    <p><strong>Catchphrase:</strong> {{ userData.company.catchPhrase }}</p>
    <p><strong>Business:</strong> {{ userData.company.bs }}</p>
  </VCard>
</template>

<script setup>
import { computed } from "vue";
import { useUsersStore } from "@/stores/users";
import VCard from "@/components/VCard.vue";
const userStore = useUsersStore();
const userData = computed(() => userStore.currentUser);
</script>
