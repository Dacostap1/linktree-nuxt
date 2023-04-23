<template>
  <div
    id="PreviewOverlay"
    class="fixed left-0 top-0 z-30 h-full w-full overflow-auto md:hidden"
    :class="userStore.theme.color"
  >
    <div
      id="PreviewOverlayTopNav"
      class="fixed z-10 flex w-full items-center justify-between"
    >
      <div
        class="flex w-full items-center justify-between border-b bg-white px-2 py-[8px] pl-4"
      >
        <div class="flex w-full items-center justify-start">
          <button @click="userStore.isPreviewOverlay = false">
            <img
              class="w-[23px] min-w-[23px] select-none"
              src="~/assets/images/linktree-logo-icon.png"
            />
          </button>
        </div>

        <div class="flex items-center justify-between gap-3">
          <button
            class="flex items-center rounded-full p-2 text-sm font-semibold hover:bg-gray-100"
          >
            <Icon
              name="healthicons:megaphone-outline"
              class="mr-0.5"
              size="22"
            />
          </button>

          <button
            class="flex items-center rounded-full bg-gray-100 px-3 py-2 font-semibold"
          >
            <Icon name="mdi:lightning-bolt" class="mr-0.5" size="18" />
            Upgrade
          </button>

          <button
            class="flex items-center rounded-full border px-3 py-2 font-semibold hover:bg-gray-100"
          >
            <Icon name="teenyicons:upload-solid" class="mr-1.5" size="18" />
            Share
          </button>
        </div>
      </div>
    </div>

    <div
      id="PreviewOverlayContentSection"
      class="relative mx-auto h-full w-full pt-24"
    >
      <div class="mx-auto mb-16 w-full p-3">
        <div class="z-10 mx-auto h-full w-full overflow-auto">
          <img
            class="mx-auto w-[100px] min-w-[100px] rounded-full"
            :src="userStore.image"
          />

          <div
            class="mt-4 text-center text-xl font-semibold"
            :class="userStore.theme"
          >
            @{{ helpers.allLowerCaseNotcaps(userStore.name) }}
          </div>

          <div class="mt-2 text-center font-light" :class="userStore.theme">
            <div class="px-8">{{ userStore.bio }}</div>
          </div>

          <div v-for="link in userStore.allLinks">
            <a
              :href="link.url"
              target="_blank"
              class="relative mx-auto mt-4 flex w-[calc(100%-10px)] items-center rounded-lg border bg-white p-1"
            >
              <img
                class="aspect-square h-[45px] rounded-lg"
                :src="link.image"
              />

              <div class="absolute w-full text-center text-[16px]">
                {{ link.name }}
              </div>
            </a>
          </div>
          <div class="pb-28" />
        </div>
      </div>
    </div>

    <div
      id="PreviewButton"
      class="fixed bottom-10 flex w-full items-center justify-center"
    >
      <button
        @click="userStore.isPreviewOverlay = false"
        class="flex items-center justify-center rounded-full bg-[#DFE2D9] p-2.5"
      >
        <Icon name="mdi:close" size="30" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const helpers = useHelpers();

onUnmounted(() => (userStore.isPreviewOverlay = false));
</script>
