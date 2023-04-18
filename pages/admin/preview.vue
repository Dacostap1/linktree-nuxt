<template>
  <div
    class="fixed h-screen w-full overflow-auto"
    :class="userStore.theme"
  ></div>

  <AdminLayout>
    <div id="PreviewAdminPage" class="relative z-10 mx-auto w-full pt-32">
      <div class="mx-auto w-full">
        <div class="mx-auto h-full w-full">
          <img
            class="mx-auto w-[120px] min-w-[120px] rounded-full"
            :src="userStore.image"
          />

          <div
            class="mt-2 text-center text-2xl font-semibold"
            :class="userStore.theme"
          >
            @dany
          </div>

          <div
            class="mb-10 mt-2 text-center text-lg font-light"
            :class="userStore.theme"
          >
            <div class="px-8">this is bio section</div>
          </div>

          <div v-for="link in fakeLinks">
            <a
              :href="link.url"
              target="_blank"
              class="relative mx-auto mt-4 flex w-[calc(100%-10px)] items-center rounded-lg border bg-white p-1"
            >
              <img
                class="aspect-square h-[55px] rounded-lg"
                :src="link.image"
              />

              <div class="absolute w-full text-center text-[20px]">
                {{ link.name }}
              </div>
            </a>
          </div>

          <div class="pb-32" />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~~/layouts/AdminLayout.vue";
import { useUserStore } from "~~/stores/user";
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
