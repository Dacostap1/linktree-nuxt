<template>
  <div
    id="AddLinkOverlay"
    class="fixed left-0 top-0 z-40 h-full w-full bg-white px-5"
  >
    <div class="flex w-full items-center justify-start py-[8px]">
      <button type="button" @click="close()" class="rounded-full">
        <Icon
          name="material-symbols:arrow-back-sharp"
          size="35"
          color="#676B5F"
        />
      </button>

      <div class="pl-8 text-lg font-semibold">Add New Link</div>
    </div>

    <div class="pt-10 text-2xl font-semibold">Enter URL</div>

    <form
      @submit.prevent="submit()"
      class="flex w-full items-center gap-4 pt-4"
    >
      <div class="w-full">
        <TextInput
          class="w-full"
          placeholder="Name"
          v-model:input="name"
          inputType="text"
          :error="errors && errors.name ? errors.name[0] : ''"
        />

        <div class="py-1"></div>

        <TextInput
          class="w-full"
          placeholder="URL"
          v-model:input="url"
          inputType="text"
          :error="errors && errors.url ? errors.url[0] : ''"
        />
      </div>

      <button
        type="submit"
        @click="addLink()"
        class="rounded-full bg-[#EFF0EA] p-2"
      >
        <Icon
          name="material-symbols:arrow-forward-sharp"
          size="25"
          color="#676B5F"
        />
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { addLinkOverlay } = storeToRefs(userStore);

const helpers = useHelpers();

onMounted(() => {
  helpers.hidePageOverflow(true, "AdminPage");
});

const close = () => (addLinkOverlay.value = false);

const name = ref("");
const url = ref("");
const errors = ref(null);

const addLink = async () => {
  try {
    await userStore.addLink(name.value, url.value);

    setTimeout(() => {
      name.value = "";
      url.value = "";
      addLinkOverlay.value = false;
    }, 200);
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};

onUnmounted(() => {
  helpers.hidePageOverflow(false, "AdminPage");
  addLinkOverlay.value = false;
});
</script>
