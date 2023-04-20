<template>
  <div id="AdminLayout" class="fixed z-30 w-full">
    <div
      v-if="!userStore.isMobile"
      id="TopNav"
      class="flex w-full items-center justify-between md:px-2.5 md:pt-2.5"
    >
      <div
        class="flex w-full items-center justify-between border-b bg-white px-2 py-[8px] pl-4 md:rounded-full md:pl-6 md:shadow-sm"
      >
        <div class="flex w-full max-w-[500px] items-center justify-start">
          <nuxt-link to="/admin">
            <img
              class="w-[23px] min-w-[23px] select-none"
              src="~/assets/images/linktree-logo-icon.png"
              alt=""
            />
          </nuxt-link>

          <div v-for="link in links" class="hidden px-0.5 md:block lg:px-2.5">
            <nuxt-link
              :to="link.url"
              class="flex items-center rounded-lg px-1.5 py-3 text-sm font-semibold hover:bg-gray-100"
            >
              <Icon
                :name="link.icon"
                class="mr-0.5"
                size="18"
                :color="route.fullPath == link.url ? '#000000' : '#676B5F'"
              ></Icon>

              <div
                :class="
                  route.fullPath == link.url ? 'text-black' : 'text-[#676B5F]'
                "
              >
                {{ link.name }}
              </div>
            </nuxt-link>
          </div>
        </div>

        <div class="flex items-center justify-between gap-3">
          <button
            class="flex items-center rounded-full p-2 text-sm font-semibold hover:bg-gray-100"
          >
            <Icon
              name="healthicons:megaphone-outline"
              class="mr-0.5"
              size="22"
            ></Icon>
          </button>

          <button
            class="flex items-center rounded-full bg-gray-100 px-3 py-2 font-semibold"
          >
            <Icon name="mdi:flash" class="mr-0.5" size="22"></Icon>
            Upgrade
          </button>

          <button
            class="flex items-center rounded-full border px-3 py-2 font-semibold hover:bg-gray-100"
          >
            <Icon
              name="teenyicons:upload-solid"
              class="mr-0.5"
              size="22"
            ></Icon>
            Share
          </button>

          <button
            @click="!isTopNav ? openMenu('TopNav') : (isTopNav = false)"
            class="hidden rounded-full md:block"
          >
            <img
              class="w-[40px] min-w-[40px] rounded-full"
              src="https://picsum.photos/id/8/300/320"
              alt="user-image"
            />
          </button>
        </div>
      </div>

      <div
        v-if="isTopNav"
        class="absolute right-4 top-16 hidden w-full max-w-[300px] rounded-2xl border bg-white shadow-[0_5px_15px_15px_rgba(0,0,0,0.1)] md:block"
      >
        <button
          @click="logout"
          class="flex w-full items-center p-3 text-[15px] text-gray-600 hover:text-black"
        >
          <icon name="circum:logout" class="mr-6"> </icon>
          Sing out
        </button>
      </div>
    </div>

    <div
      v-if="!userStore.isMobile"
      id="SecondaryTopNav"
      class="flex w-full items-center justify-between md:hidden md:px-2.5 md:pt-2.5"
    >
      <div
        class="flex w-full items-center justify-between gap-4 bg-white shadow-sm"
      >
        <div class="flex w-full">
          <div v-for="link in linksSecondaryNav" class="w-1/4">
            <nuxt-link
              :to="link.url"
              :class="
                link.url == route.fullPath ? 'border-b-2 border-black' : ''
              "
              class="relative my-[1px] flex h-full w-full justify-center border-t-black px-1.5 py-[1px] text-sm font-semibold hover:bg-gray-100"
            >
              <button class="relative pt-[6px]">
                <icon
                  v-if="link.icon"
                  :name="link.icon"
                  size="20"
                  :color="link.url == route.fullPath ? '#000000' : '#676B5F'"
                >
                </icon>
                <img
                  v-else
                  class="w-[22px] min-w-[22px] rounded-full"
                  :src="link.img"
                  alt=""
                />

                <div
                  class="relative text-[13px] text-[#676B5F]"
                  :class="link.img ? '-left-[5px]' : ' '"
                >
                  <span
                    :class="
                      link.url == route.fullPath
                        ? 'text-black'
                        : 'text-[#676B5F]'
                    "
                    >{{ link.name }}</span
                  >
                </div>
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!userStore.isMobile"
      id="PreviewButton"
      class="fixed bottom-10 flex w-full items-center justify-center"
    >
      <button
        @click="userStore.isPreviewOverlay = true"
        class="flex items-center rounded-full bg-[#DFE2D9] px-5 py-2.5 text-[17px] font-semibold md:hidden"
      >
        <icon name="icon-park-outline:preview-open" class="mr-2" size="20" />
        Preview
        {{ userStore.isPreviewOverlay }}
      </button>
    </div>

    <div
      v-if="userStore.isMobile"
      id="TopNavMobile"
      class="fixed flex w-full items-center justify-between bg-[#f3f3f1] px-2.5"
    >
      <div class="flex w-full items-center justify-between py-[8px]">
        <div
          class="flex w-full max-w-[500px] items-center justify-between text-3xl font-bold"
        >
          {{ currentMobilePage() }}
        </div>

        <div class="flex items-center justify-between gap-3">
          <button
            class="flex items-center rounded-full bg-gray-200 px-3 py-2 text-[18px] font-semibold"
          >
            Upgrade
            <Icon name="mdi:flash" class="ml-1" size="20"></Icon>
          </button>

          <button
            class="flex items-center rounded-full px-3 py-2 font-semibold hover:bg-gray-200"
          >
            <Icon name="ph:share-network" class="mr-0.5" size="23"></Icon>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="z-0 w-full px-2.5">
    <slot></slot>
  </div>

  <!-- Botton Navigation Bar to Mobile -->
  <div
    v-if="userStore.isMobile"
    id="BottomNav"
    class="fixed bottom-0 z-20 flex w-full bg-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.4)]"
    :class="userStore.isMobile ? 'h-[70px]' : 'h-[60px]'"
  >
    <div class="flex w-full">
      <div v-for="link in linksMobile" class="w-1/5">
        <button
          class="relative flex h-full w-full justify-center px-1.5 py-1 text-sm font-semibold hover:bg-gray-100"
          :class="link.url == route.fullPath ? 'border-t-2 border-t-black' : ''"
        >
          <NuxtLink :to="link.url" class="relative h-[35px]">
            <Icon
              v-if="link.icon"
              :name="link.icon"
              class="mr-0.5 mt-[2px]"
              size="25"
              :color="route.fullPath == link.url ? '#000000' : '#676B5F'"
            />
            <img
              v-else
              class="mt-[2px] w-[25px] min-w-[25px] rounded-full"
              :src="link.img"
            />
            <div
              class="relative text-[13px]"
              :class="link.img ? '-left-[4px]' : ''"
            >
              <span
                :class="
                  route.fullPath == link.url
                    ? 'text-[#000000]'
                    : 'text-[#676B5F]'
                "
              >
                {{ link.name }}
              </span>
            </div>
          </NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const isTopNav = ref(false);

//process.client valida que se ejecute en la web y no ssr
const windowWidth = ref(process.client ? window.innerWidth : "");
const isSecondaryTopNav = ref(false);

onMounted(() => {
  //La diferencia con mediaQuery es que podemos disparar acciones js
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth;
  });
});

watch(
  () => windowWidth.value,
  () => {
    if (windowWidth.value <= 767) {
      isTopNav.value = false;
    }
  }
);

const currentMobilePage = () => {
  switch (route.fullPath) {
    case "/admin":
      return "Links";
    case "/admin/apperance":
      return "Apperance";
    case "/admin/preview":
      return "Preview";
    case "/admin/more":
      return "More";

    default:
      return "";
  }
};

const openMenu = (str) => {
  if (str == "TopNav") {
    console.log("test");
    isTopNav.value = true;
  } else if (str == "SecondaryTopNav") {
    isSecondaryTopNav.value = true;
  } else {
    router.push("/admin/settings");
  }
};

const logout = async () => {
  let res = confirm("Are you sure you want to sign out?");
  if (!res) return;

  try {
    await userStore.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

const links = ref([
  { name: "Links", url: "/admin", icon: "icon-park-outline:hamburger-button" },
  {
    name: "Apperance",
    url: "/admin/apperance",
    icon: "fluent:shapes-48-regular",
  },
  { name: "Analytics", url: "/", icon: "tabler:brand-google-analytics" },
  { name: "Settings", url: "/", icon: "material-symbols:settings" },
]);

const linksSecondaryNav = ref([
  { name: "Links", url: "/admin", icon: "icon-park-outline:hamburger-button" },
  {
    name: "Apperance",
    url: "/admin/apperance",
    icon: "fluent:shapes-48-regular",
  },
  { name: "Analytics", url: "/", icon: "tabler:brand-google-analytics" },
  {
    name: "More",
    url: "/admin/more",
    icon: "",
    img: "https://picsum.photos/id/8/300/320",
  },
]);

const linksMobile = ref([
  {
    name: "Links",
    url: "/admin",
    icon: "icon-park-outline:hamburger-button",
    img: "",
  },
  {
    name: "Apperance",
    url: "/admin/apperance",
    icon: "fluent:shapes-48-regular",
    img: "",
  },
  {
    name: "Preview",
    url: "/admin/preview",
    icon: "icon-park-outline:preview-open",
    img: "",
  },
  {
    name: "Analytics",
    url: "/",
    icon: "tabler:brand-google-analytics",
    img: "",
  },
  { name: "More", url: "/admin/more", icon: "", img: userStore.image },
]);
</script>
