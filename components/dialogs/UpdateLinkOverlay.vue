<template>
  <div
    id="UpdateLinkOverlay"
    class="fixed left-0 top-0 z-40 h-full w-full bg-white px-5"
  >
    <div class="flex w-full items-center justify-between md:hidden">
      <div class="flex w-full items-center justify-between py-[8px]">
        <button type="button" @click="close()" class="rounded-full">
          <Icon name="ic:baseline-check" size="35" color="#676B5F" />
        </button>

        <div class="flex items-center justify-between gap-8">
          <button class="flex items-center">
            <Icon name="mdi:bell-outline" size="30" color="#676B5F" />
          </button>

          <button @click="deleteLink()" class="flex items-center">
            <Icon name="carbon:trash-can" size="27" color="#676B5F" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex w-full flex-col items-center pt-12">
      <div v-show="!isName" class="flex w-full items-center justify-between">
        <div
          @click="isFocused('isName')"
          class="mr-2 cursor-pointer text-2xl font-semibold"
        >
          {{ name }}
        </div>
        <Icon
          @click="isFocused('isName')"
          class="cursor-pointer"
          name="octicon:pencil-24"
          size="25"
          color="#676B5F"
        />
      </div>
      <input
        v-show="isName"
        id="editNameInputMobile"
        type="text"
        v-model="name"
        class="w-full text-2xl font-semibold underline focus:outline-none"
      />
      <span
        v-if="errors && errors.name"
        class="font-sm w-full font-semibold text-red-500"
      >
        {{ errors.name[0] }}
      </span>
    </div>

    <div class="flex w-full items-center border-b-2 pb-6 pt-3">
      <div v-show="!isLink" class="flex w-[calc(100%-2px)] items-center">
        <div
          @click="isFocused('isLink')"
          class="mr-2 cursor-pointer truncate text-lg"
        >
          {{ url }}
        </div>
        <Icon
          @click="isFocused('isLink')"
          class="min-w-[17px] cursor-pointer"
          name="octicon:pencil-24"
          size="25"
          color="#676B5F"
        />
      </div>
      <input
        v-show="isLink"
        id="editLinkInputMobile"
        type="text"
        v-model="url"
        class="w-full text-lg underline focus:outline-none"
      />
      <span
        v-if="errors && errors.url"
        class="font-sm w-full font-semibold text-red-500"
      >
        {{ errors.url[0] }}
      </span>
    </div>

    <div id="UploadImageForLink" class="pt-6">
      <button
        @click="openCropper = true"
        class="flex w-full items-center justify-center rounded-full bg-[#8228D9] py-3 text-xl font-semibold text-white"
      >
        <Icon name="mdi:plus" class="mr-0.5" size="25" />
        Select image
      </button>

      <img
        v-if="currentLink && currentLink.image"
        class="mx-auto aspect-square object-cover pt-4"
        width="300"
        :src="currentLink.image"
      />
    </div>

    <CropperModal
      v-if="openCropper"
      :linkId="updatedLinkId"
      @data="data = $event"
      @close="openCropper = false"
    />
  </div>
</template>
<script setup>
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { updatedLinkId } = storeToRefs(userStore);

const helpers = useHelpers();

let isName = ref(false);
let isLink = ref(false);
let name = ref("");
let url = ref("");
let data = ref(null);
let currentLink = ref(null);
let openCropper = ref(false);
let errors = ref(null);

onMounted(() => {
  getLinkById();
  helpers.hidePageOverflow(true, "AdminPage");

  document.addEventListener("mouseup", function (e) {
    let editNameInput = document.getElementById("editNameInputMobile");
    if (!editNameInput.contains(e.target)) {
      editNameInput.blur();
      isName.value = false;
    }
  });

  document.addEventListener("mouseup", function (e) {
    let editLinkInput = document.getElementById("editLinkInputMobile");
    if (!editLinkInput.contains(e.target)) {
      editLinkInput.blur();
      isLink.value = false;
    }
  });
});

const getLinkById = () => {
  userStore.allLinks.forEach((link) => {
    if (updatedLinkId.value == link.id) {
      currentLink.value = link;
      name.value = link.name;
      url.value = link.url;
    }
  });
};

const close = () => (updatedLinkId.value = 0);

const updateLinkImage = async () => {
  try {
    await userStore.uploadLinkImage(currentLink.value.id, data.value);
    getLinkById(); //revisar
    setTimeout(() => (openCropper.value = false), 200);
  } catch (error) {
    console.log(error);
  }
};

const deleteLink = async () => {
  let res = confirm("Are you sure you want to delete this link?");

  try {
    if (res) {
      await userStore.deleteLink(updatedLinkId.value);
      close();
    }
  } catch (error) {
    console.log(error);
  }
};

const isFocused = (str) => {
  if (str == "isName") {
    setTimeout(() => document.getElementById("editNameInputMobile").focus());
    isName.value = true;
    isLink.value = false;
  }
  if (str == "isLink") {
    setTimeout(() => document.getElementById("editLinkInputMobile").focus());
    isName.value = false;
    isLink.value = true;
  }
};

const updateLink = useDebounce(async () => {
  try {
    await userStore.updateLink(updatedLinkId.value, name.value, url.value);
    await userStore.getAllLinks();
    getLinkById();
  } catch (error) {
    console.log(error);
  }
}, 500);

watch([() => name.value, () => url.value], () => {
  if (name.value && currentLink.value.name != name.value) {
    errors.value = null;
    updateLink();
  }
});

watch(
  () => data.value,
  async () => await updateLinkImage()
);

onUnmounted(() => {
  helpers.hidePageOverflow(false, "AdminPage");
  updatedLinkId.value = 0;
});
</script>
