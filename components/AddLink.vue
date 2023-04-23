<template>
  <div id="AddLink" class="w-full overflow-hidden rounded-3xl bg-white">
    <div class="flex items-center justify-between p-6 pb-2">
      <div class="text-[19px] font-semibold">Enter Url</div>
      <button
        @click="$emit('close')"
        class="flex items-center rounded-full p-1.5 hover:bg-[#EFF0EA]"
      >
        <Icon name="mdi:close" size="20" color="#676B5F"></Icon>
      </button>
    </div>

    <form
      @submit.prevent="submit"
      class="flex w-full items-center gap-4 p-6 pt-2"
    >
      <div class="w-full">
        <TextInput
          class="w-full"
          placeholder="Name"
          v-model:input="name"
          input-type="text"
          :error="errors && errors.name ? errors.name[0] : ''"
        ></TextInput>

        <div class="py-1"></div>
        <TextInput
          class="w-full"
          placeholder="URL"
          v-model:input="url"
          input-type="text"
          :error="errors && errors.url ? errors.url[0] : ''"
        ></TextInput>
      </div>
      <button
        type="submit"
        @click="addLink"
        :disabled="!name && !url"
        :class="
          name && url
            ? 'bg-[#8228D9] text-white hover:bg-[#6c21b3]'
            : 'bg-[#eff0ea] text-[#A7AAA2]'
        "
        class="rounded-full p-3 px-6"
      >
        Add
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

defineEmits(["close"]);

const name = ref("");
const url = ref("");
const errors = ref(null);

const addLink = async () => {
  errors.value = null;

  try {
    await userStore.addLink(name.value, url.value);

    setTimeout(() => {
      name.value = "";
      url.value = "";
      emit("close");
    }, 200);
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
