<template>
  <div class="">
    <input
      :id="placeholder"
      :type="inputType"
      :placeholder="placeholder"
      :maxlength="String(max)"
      v-model="inputComputed"
      :class="isFocused ? 'border-gray-900' : ''"
      class="w-full rounded-xl border-2 border-[#EFF0EB] bg-[#EFF0EB] px-3 py-3.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
      @focus="isFocused = true"
      @blur="isFocused = false"
      autocomplete="off"
    />

    <span v-if="error" class="text-[14px] font-semibold text-red-500">
      {{ error }}</span
    >
  </div>
</template>

<script setup>
const emit = defineEmits(["update:input"]);
const props = defineProps([
  "input",
  "placeholder",
  "max",
  "inputType",
  "error",
]);

const { input, placeholder, max, inputType, error } = toRefs(props);

const isFocused = ref(false);

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
</script>
