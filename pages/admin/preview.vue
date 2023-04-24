<template>
  <div
    class="fixed h-screen w-full overflow-auto"
    :class="userStore.theme.color"
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
            :class="userStore.theme.text"
          >
            @{{ helpers.allLowerCaseNotcaps(userStore.name) }}
          </div>

          <div
            class="mb-10 mt-2 text-center text-lg font-light"
            :class="userStore.theme.text"
          >
            <div class="px-8">{{ userStore.bio }}</div>
          </div>

          <div v-for="link in userStore.allLinks">
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
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

definePageMeta({ middleware: "authenticated" });

const helpers = useHelpers();
</script>
