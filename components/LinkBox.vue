<template>
  <div :id="`LinkBox${link.id}`" class="w-full rounded-3xl bg-white">
    <div id="MainLinkBoxSection" class="px-8 py-5">
      <div class="flex items-center justify-between py-1">
        <div class="flex w-full items-center">
          <input
            v-if="editName(selectedId, selectedStr)"
            :id="`editNameInput-${link.id}`"
            type="text"
            v-model="name"
            maxlength="18"
            class="w-full text-sm font-semibold focus:outline-none"
          />

          <div v-else class="flex w-full items-center">
            <div
              @click="
                name = link.name;
                $emit('updatedInput', { id: link.id, str: 'isName' });
              "
              class="mr-2 cursor-pointer font-semibold"
              :class="isMobile ? 'text-xl' : 'text-sm'"
            >
              {{ link.name }}
            </div>
            <Icon
              @click="$emit('updatedInput', { id: link.id, str: 'isName' })"
              class="cursor-pointer"
              name="octicon:pencil-24"
              :size="isMobile ? '23' : '17'"
              color="#676B5F"
            />
          </div>
        </div>
        <div class="flex items-center">
          <Icon
            class="cursor-pointer"
            :class="isMobile ? 'min-w-[23px]' : 'min-w-[17px]'"
            name="mdi:bell-outline"
            :size="isMobile ? '25' : '20'"
            color="#676B5F"
          />
        </div>
      </div>

      <div class="flex items-center justify-between py-1">
        <div class="flex w-full items-center">
          <input
            v-if="editLink(selectedId, selectedStr)"
            :id="`editLinkInput-${link.id}`"
            type="text"
            v-model="url"
            class="w-full text-sm focus:outline-none"
          />
          <div v-else class="flex w-[calc(100%-2px)] items-center">
            <div
              @click="
                url = link.url;
                $emit('updatedInput', { id: link.id, str: 'isLink' });
              "
              class="mr-2 cursor-pointer truncate"
              :class="isMobile ? 'text-lg' : 'text-sm'"
            >
              {{ link.url }}
            </div>
            <Icon
              @click="$emit('updatedInput', { id: link.id, str: 'isLink' })"
              class="min-w-[17px] cursor-pointer"
              :class="isMobile ? 'min-w-[23px]' : 'min-w-[17px]'"
              name="octicon:pencil-24"
              :size="isMobile ? '23' : '17'"
              color="#676B5F"
            />
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between py-1">
        <div class="relative flex w-full items-center">
          <div
            class="absolute -left-[6px] flex items-center rounded-md px-1.5 py-[2px]"
            :class="isUploadImage ? 'bg-[#8228D9]' : 'hover:bg-gray-200'"
          >
            <Icon
              @click="editImage()"
              class="cursor-pointer"
              name="icon-park-twotone:collect-picture"
              :size="isMobile ? '23' : '17'"
              :color="isUploadImage ? '#FFFFFF' : '#676B5F'"
            />
          </div>
        </div>
        <div v-if="!isMobile" class="flex items-center">
          <div class="relative flex items-center rounded-md px-1.5 py-[2px]">
            <button
              @click="
                isDelete = true;
                isUploadImage = false;
              "
              class="absolute -right-[6px] flex items-center rounded-md px-1.5 py-[2px]"
              :class="isDelete ? 'bg-[#8228D9]' : 'hover:bg-gray-200'"
            >
              <Icon
                class="cursor-pointer"
                name="carbon:trash-can"
                size="20"
                :color="isDelete ? '#FFFFFF' : '#676B5F'"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="FooterLinkDeleteSection"
      class="overflow-hidden"
      :class="[
        { 'max-h-[180px] transition-all duration-300 ease-in': isDelete },
        { 'max-h-0 transition-all duration-200 ease-out': !isDelete },
      ]"
    >
      <button
        @click="isDelete = false"
        class="relative w-full bg-[#DFE2D9] py-1.5"
      >
        <Icon
          name="mdi:close"
          class="absolute right-1 top-[6px] cursor-pointer"
          size="20"
          color="#45494A"
        />
        <div class="text-center text-sm font-bold text-[#45494A]">Delete</div>
      </button>

      <div class="flex items-center justify-center pt-3">
        Delete this forever?
      </div>

      <div class="w-full px-4 py-3">
        <div class="flex w-full items-center gap-2">
          <button
            @click="deleteLink()"
            class="flex w-full items-center justify-center rounded-full border py-3 font-semibold text-black hover:bg-gray-100"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <div
      id="FooterLinkBoxSection"
      class="overflow-hidden"
      :class="[
        { 'max-h-[180px] transition-all duration-300 ease-in': isUploadImage },
        { 'max-h-0 transition-all duration-200 ease-out': !isUploadImage },
      ]"
    >
      <div class="relative w-full bg-[#DFE2D9] py-1.5">
        <Icon
          @click="isUploadImage = false"
          name="mdi:close"
          class="absolute right-1 top-[6px] cursor-pointer"
          size="20"
          color="#45494A"
        />
        <div class="text-center text-sm font-bold text-[#45494A]">
          Add Thumbnail
        </div>
      </div>

      <div class="flex w-full items-center justify-between px-4 py-5">
        <img class="aspect-square w-[80px] rounded-lg" :src="link.image" />

        <div class="w-full pl-3">
          <button
            @click="openCropper = true"
            class="mb-2 flex w-full items-center justify-center rounded-full bg-[#8228D9] py-3 font-semibold text-white hover:bg-[#6c21b3]"
          >
            Change
          </button>
        </div>
      </div>
    </div>

    <CropperModal
      v-if="openCropper"
      :linkId="link.id"
      @data="data = $event"
      @close="openCropper = false"
    />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isMobile, updatedLinkId } = storeToRefs(userStore);

const props = defineProps({
  link: Object,
  selectedId: { type: Number, default: 0 },
  selectedStr: { type: String, default: "" },
});

const { link, selectedId, selectedStr } = toRefs(props);
const emit = defineEmits(["updatedInput"]);

let name = ref("");
let url = ref("");
let data = ref(null);
let isDelete = ref(false);
let openCropper = ref(false);
let isUploadImage = ref(false);

onMounted(() => {
  name.value = link.value.name;
  url.value = link.value.url;

  document.addEventListener("mouseup", function (e) {
    let editNameInput = document.getElementById(
      `editNameInput-${link.value.id}`
    );
    if (
      editNameInput &&
      !editNameInput.contains(e.target) &&
      selectedStr.value == "isName" &&
      link.value.id == selectedId.value
    ) {
      editNameInput.blur();
      emit("updatedInput", { id: 0, str: "" });
    }
  });

  document.addEventListener("mouseup", function (e) {
    let editLinkInput = document.getElementById(
      `editLinkInput-${link.value.id}`
    );
    if (
      editLinkInput &&
      !editLinkInput.contains(e.target) &&
      selectedStr.value == "isLink" &&
      link.value.id == selectedId.value
    ) {
      editLinkInput.blur();
      emit("updatedInput", { id: 0, str: "" });
    }
  });
});

//from loadash
const updateLink = useDebounce(async () => {
  // try {
  //   await userStore.updateLink(link.value.id, name.value, url.value);
  //   await userStore.getAllLinks();
  // } catch (error) {
  //   console.log(error);
  //   errors.value = error.response.data.errors;
  // }
}, 500);

const changeInput = (str, linkIdNameString) => {
  if (selectedId.value == link.value.id && selectedStr.value == str) {
    setTimeout(() => {
      document.getElementById(`${linkIdNameString}-${link.value.id}`).focus();
      return;
    }, 100);
  }
};

const editName = (selectedId, selectedStr) => {
  if (userStore.isMobile) {
    userStore.updatedLinkId = selectedId;
    return false;
  } else if (selectedId == link.value.id && selectedStr == "isName") {
    return true;
  }
  return false;
};

const editLink = (selectedId, selectedStr) => {
  if (userStore.isMobile) {
    userStore.updatedLinkId = selectedId;
    return false;
  } else if (selectedId == link.value.id && selectedStr == "isLink") {
    return true;
  }
  return false;
};

const editImage = () => {
  if (userStore.isMobile) {
    userStore.updatedLinkId = link.value.id;
  } else {
    isUploadImage.value = true;
    isDelete.value = false;
  }
};

const updateLinkImage = async () => {
  // try {
  //   await userStore.updateLinkImage(data.value);
  //   await userStore.getAllLinks();
  //   setTimeout(() => (openCropper.value = false), 300);
  // } catch (error) {
  //   console.log(error);
  // }
};

const deleteLink = async () => {
  let res = confirm("Are you sure you want to delete this link?");
  // try {
  //   if (res) {
  //     await userStore.deleteLink(link.value.id);
  //     await userStore.getAllLinks();
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

watch(
  () => name.value,
  () => {
    if (name.value && name.value !== link.value.name) {
      updateLink();
    }
  }
);

watch(
  () => url.value,
  () => {
    if (url.value && url.value !== link.value.url) {
      updateLink();
    }
  }
);

watch(
  () => selectedId.value,
  () => {
    if (selectedId.value) {
      changeInput("isName", "editNameInput");
      changeInput("isLink", "editLinkInput");
    }
  }
);

watch(
  () => selectedStr.value,
  () => {
    if (selectedStr.value) {
      changeInput("isName", "editNameInput");
      changeInput("isLink", "editLinkInput");
    }
  }
);

watch(
  () => updatedLinkId.value,
  (val) => {
    if (!val) {
      emit("updatedInput", { id: 0, str: "" });
    }
  }
);

watch(
  () => data.value,
  async () => await updateLinkImage()
);
</script>
