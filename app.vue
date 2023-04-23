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
const helpers = useHelpers();

const userStore = useUserStore();
const { isMobile, updatedLinkId, addLinkOverlay, isPreviewOverlay } =
  storeToRefs(userStore);

const bgIsgray = ref(false);

watch(
  () => route.fullPath,
  (path) => {
    checkPath(path);
  }
);

const checkPath = (path) => {
  if (path == "/" || path == "/register") {
    bgIsgray.value = false;
    return;
  }

  bgIsgray.value = true;
};

watch(
  () => isPreviewOverlay.value,
  (val) => {
    let id = null;
    if (route.fullPath == "admin") {
      id = "AdminPage";
    } else if (route.fullPath == "admin/apperance") {
      id = "AdminPage";
    } else if (route.fullPath == "admin/settings") {
      id = "SettingsPage";
    }
    helpers.hidePageOverflow(val, id);
  }
);

onMounted(async () => {
  updatedLinkId.value = 0;
  addLinkOverlay.value = false;
  isPreviewOverlay.value = false;
  isMobile.value = false;

  checkPath(route.fullPath);

  //Para detectar si estoy en movil para la PWA
  if ("ontouchstart" in window) {
    console.log("ontouchstart");
    isMobile.value = true;
  }

  await userStore.setAxiosConfig();
});
</script>
