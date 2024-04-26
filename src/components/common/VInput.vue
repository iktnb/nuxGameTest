<template>
  <div class="field">
    <label v-if="props.label" class="field__label">{{ props.label }}</label>
    <input
      type="text"
      class="field__input"
      :placeholder="placeholder"
      v-model="value"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
