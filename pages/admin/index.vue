<template>
  <AdminLayout>
    <div id="AdminPage" class="flex h-screen pb-4">
      <div
        class="w-full pt-14 md:w-[calc(100%-330px)] md:pt-20 lg:w-[calc(100%-500px)]"
      >
        <div class="mx-auto max-w-[750px] pb-24">
          <button
            v-if="userStore.isMobile || !showAddLink"
            @click="showAddLinkFunc"
            :class="userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'"
            class="flex w-full items-center justify-center rounded-full bg-[#8228d9] py-3 font-semibold text-white hover:bg-[#6c21b3]"
          >
            <icon
              v-if="!userStore.isMobile"
              name="mdi:plus"
              class="mr-0.5"
              size="25"
            ></icon>

            <span v-if="!userStore.isMobile">Add link</span>
            <span v-if="userStore.isMobile">Add new link</span>
          </button>

          <AddLink
            v-if="!userStore.isMobile"
            @close="showAddLink = false"
            :class="[
              {
                'mb-12 mt-20 max-h-[1000px] transition-all duration-300 ease-in md:mt-8':
                  showAddLink,
              },
              {
                'max-h-0 transition-all duration-300 ease-out': !showAddLink,
              },
            ]"
          ></AddLink>

          <div v-for="link in fakeLinks" class="mt-4">
            <LinkBox
              v-if="link"
              :link="link"
              :selected-id="selectedInput.id"
              :selected-str="selectedInput.str"
              @updated-input="updatedInput"
              class="mt-6"
            ></LinkBox>
          </div>
        </div>
      </div>

      <MobileSectionDisplay></MobileSectionDisplay>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user";

definePageMeta({ middleware: "authenticated" });

const userStore = useUserStore();

const selectedInput = ref({ id: 0, str: "" });
const showAddLink = ref(false);

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

const updatedInput = (e) => {
  selectedInput.value.id = e.id;
  selectedInput.value.str = e.str;
};

const showAddLinkFunc = () => {
  if (userStore.isMobile) {
    userStore.addLinkOverlay = true;
  } else {
    showAddLink.value = true;
  }
};
</script>
