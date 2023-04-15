<template>
  <div id="AuthLayout" class="flex h-screen w-full justify-between">
    <div class="w-full px-6 pt-3 lg:w-2/3 lg:min-w-[800px] lg:px-12 lg:pt-7">
      <nuxt-link to="/" class="inline-block">
        <img
          class="w-[75px] select-none lg:w-28"
          src="~/assets/images/linktree-logo.png"
          alt=""
        />
      </nuxt-link>
      <main class="w-full">
        <div class="mx-auto w-full max-w-[360px] md:max-w-[550px]">
          <slot></slot>
        </div>
      </main>
    </div>

    <div class="pointer-events-none hidden w-1/3 lg:block">
      <img
        v-if="route.fullPath == '/'"
        class="h-screen w-full select-none object-cover"
        src="~/assets/images/side1.png"
        alt=""
      />
      <img
        v-else
        class="h-screen w-full select-none object-cover"
        src="~/assets/images/side2.png"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { updatedLinkId } = storeToRefs(userStore);

const route = useRoute();

onUnmounted(() => {
  updatedLinkId.value = 0;
});
</script>
