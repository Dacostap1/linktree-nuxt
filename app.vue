<template>
  <VitePwaManifest />
  <div class="fixed z-[-1] h-full w-full bg-[#F3F3F1]"></div>
  <NuxtPage />

  <AddLinkOverlay v-if="isMobile && addLinkOverlay" />
  <UpdateLinkOverlay v-if="isMobile && updatedLinkId" />

  <PreviewOverlay v-if="!isMobile && isPreviewOverlay" />
</template>
<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const route = useRoute();

const userStore = useUserStore();
const { isMobile, updatedLinkId, addLinkOverlay, isPreviewOverlay, id } =
  storeToRefs(userStore);

const bgIsgray = ref(false);

const checkPath = (path) => {
  if (path == "/" || path == "/register") {
    bgIsgray.value = false;
    return;
  }

  bgIsgray.value = true;
};

onMounted(() => {
  userStore.colors = colors();
  updatedLinkId.value = 0;
  addLinkOverlay.value = false;
  isPreviewOverlay.value = false;
  isMobile.value = false;

  checkPath(route.fullPath);

  //Para detectar si estoy en movil para la PWA
  if ("ontouchstart" in window) {
    isMobile.value = true;
  }
});

const colors = () => {
  return [
    { id: 1, color: "bg-white", text: "text-black", name: "Air White" },
    { id: 2, color: "bg-gray-800", text: "text-white", name: "Lake Black" },
    {
      id: 3,
      color: "bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500",
      text: "text-white",
      name: "Purple Pie",
    },
    {
      id: 4,
      color: "bg-gradient-to-t from-gray-500 via-blue-500 to-green-500",
      text: "text-white",
      name: "Green Grass",
    },
    {
      id: 5,
      color: "bg-gradient-to-t from-orange-500 via-green-500 to-red-500",
      text: "text-white",
      name: "Traffic Lights",
    },
    {
      id: 6,
      color: "bg-gradient-to-b from-blue-800 via-blue-500 to-green-500",
      text: "text-white",
      name: "Blue Sky",
    },
    {
      id: 7,
      color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
      text: "text-white",
      name: "Soft Horizon",
    },
    {
      id: 8,
      color: "bg-gradient-to-t from-gray-800 to-emerald-500",
      text: "text-white",
      name: "Tinted Lake",
    },
  ];
};
</script>
