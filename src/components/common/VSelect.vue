<template>
  <div class="field">
    <label for="field__label" v-if="props.label">{{ props.label }}</label>
    <select id="todo-filter" class="field__input" v-model="value">
      <option
        v-for="{ value, label } of props.options"
        :key="value"
        :value="value"
      >
        {{ label }}
      </option>
    </select>
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
  options: {
    type: Array,
    default: () => [],
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
