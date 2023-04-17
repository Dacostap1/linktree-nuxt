<template>
  <div
    v-if="true"
    class="fixed right-0 mx-auto mt-[20px] hidden h-[calc(100%-20px)] w-[310px] border-l border-l-gray-300 pt-20 md:block lg:w-[500px]"
  >
    <div
      class="relative mx-auto mb-16 mt-16 flex h-[400px] w-full max-w-[200px] items-center justify-center rounded-3xl p-3 lg:h-[460px] lg:max-w-[230px]"
    >
      <img
        class="pointer-events-none absolute z-10 select-none"
        src="~/assets/images/mobile-case.png"
      />

      <div
        class="absolute z-0 h-full w-full max-w-[195px] rounded-3xl lg:max-w-[220px]"
        :class="userStore.theme"
      />

      <div class="z-10 mx-auto h-full w-full overflow-auto">
        <img
          class="mx-auto mt-8 w-[60px] min-w-[60px] rounded-full"
          src="https://picsum.photos/id/8/300/320"
        />

        <div
          class="mt-4 break-words text-center text-sm font-semibold"
          :class="userStore.theme"
        >
          @dany
        </div>

        <div
          class="mt-2 text-center text-[8px] font-semibold"
          :class="userStore.theme"
        >
          <div class="break-words px-8">this is the bio section!</div>
        </div>

        <div v-for="link in fakeLinks">
          <a
            :href="link.url"
            target="_blank"
            class="relative mx-auto mt-2 flex w-[calc(100%-10px)] items-center rounded-xl border bg-white p-1"
          >
            <img class="aspect-square h-[30px] rounded-lg" :src="link.image" />

            <div class="absolute w-full">
              <div class="mx-auto w-full max-w-[70%] text-center text-[10px]">
                {{ link.name }}
              </div>
            </div>
          </a>
        </div>

        <div class="pb-12" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const fakeLinks = [
  {
    id: 1,
    name: "fake link",
    url: "https://www.facebook.com/",
    image: "https://picsum.photos/id/8/300/320",
  },
  {
    id: 2,
    name: "fake link",
    url: "https://www.facebook.com/",
    image: "https://picsum.photos/id/8/300/320",
  },
];
</script>
