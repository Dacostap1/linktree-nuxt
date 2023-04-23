<template>
  <AdminLayout>
    <div id="ApperancePage" class="flex h-[calc(100%-50px)] pb-4">
      <div
        class="w-full pt-14 md:w-[calc(100%-330px)] md:pt-20 lg:w-[calc(100%-500px)]"
      >
        <div class="mx-auto max-w-[750px] pb-24">
          <div id="ProfileSection">
            <div
              class="pb-4 font-semibold"
              :class="
                userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 text-xl md:mt-8'
              "
            >
              Profile
            </div>

            <div class="w-full rounded-3xl bg-white p-6">
              <div class="flex items-center justify-between gap-4">
                <img class="w-[90px] rounded-full" :src="userStore.image" />

                <div class="w-full">
                  <button
                    @click="openCropper = true"
                    class="mb-2 flex w-full items-center justify-center rounded-full bg-[#8228D9] py-3 font-semibold text-white hover:bg-[#6c21b3]"
                  >
                    Pick image
                  </button>
                </div>
              </div>

              <div class="mt-4">
                <TextInput
                  placeholder="Profile Title"
                  v-model:input="name"
                  inputType="text"
                  :max="25"
                  :error="errors && errors.name ? errors.name[0] : ''"
                />
              </div>

              <textarea
                v-model="bio"
                rows="4"
                maxlength="80"
                placeholder="Bio"
                @focus="isBioFocused = true"
                @blur="isBioFocused = false"
                :class="isBioFocused ? 'border-gray-900' : ''"
                class="mt-4 w-full resize-none rounded-xl border-2 border-[#EFF0EB] bg-[#EFF0EB] px-3 py-3.5 text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
              ></textarea>
              <div
                class="flex items-center justify-end text-[13px] text-[#676B5F]"
              >
                {{ bioLengthComputed }}/80
              </div>
            </div>
          </div>

          <div id="ThemeSection">
            <div
              class="pb-4 font-semibold"
              :class="
                userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 text-xl md:mt-8'
              "
            >
              Themes
            </div>

            <div class="w-full rounded-3xl bg-white p-6">
              <div
                class="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <div v-for="item in userStore.themes">
                  <div
                    class="aspect-[2/3] cursor-pointer rounded-lg border-2 border-dashed border-gray-500"
                    :class="
                      userStore.theme_id == item.id
                        ? 'p-2 transition-all duration-150 ease-in'
                        : 'p-0 transition-all duration-150 ease-out'
                    "
                  >
                    <div
                      @click="updateTheme(item.id)"
                      class="relative mx-auto h-full rounded-xl"
                    >
                      <div
                        class="absolute left-0 top-0 z-0 h-full w-full"
                        :class="item.color"
                      ></div>

                      <!-- ESKELETONS -->
                      <div class="relative z-10 pt-9">
                        <div
                          class="mx-auto h-12 w-12 rounded-full bg-[#EFF0EA] bg-opacity-70"
                        ></div>

                        <div
                          class="mx-auto mt-4 h-6 w-[calc(100%-20px)] rounded-full bg-[#EFF0EA] bg-opacity-70"
                        ></div>
                        <div
                          class="mx-auto mt-1 h-6 w-[calc(100%-20px)] rounded-full bg-[#EFF0EA] bg-opacity-70"
                        ></div>
                        <div
                          class="mx-auto mt-1 h-6 w-[calc(100%-20px)] rounded-full bg-[#EFF0EA] bg-opacity-70"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobilePreviewSection />
      <CropperModal
        v-if="openCropper"
        @data="data = $event"
        @close="openCropper = false"
      />
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

definePageMeta({ middleware: "authenticated" });

const name = ref("");
const bio = ref("");
const data = ref(null);
const errors = ref("");
const isBioFocused = ref(false);
const openCropper = ref(false);

onMounted(() => {
  name.value = userStore.name;
  bio.value = userStore.bio;
});

//wath no se ejecuta con el mount, watchEffect si
watch(
  [() => name.value, () => bio.value],
  async () => await updateUserDetails()
);

watch(
  () => data.value,
  async () => await updateUserImage()
);

const bioLengthComputed = computed(() => {
  return !bio.value ? 0 : bio.value.length;
});

const updateTheme = async (themeId) => {
  try {
    userStore.updateUserTheme(themeId);
  } catch (error) {
    console.log(error);
  }
};

const updateUserDetails = useDebounce(async () => {
  console.log("updateUserDetails");

  errors.value = null;

  try {
    userStore.updateUserDetails(name.value, bio.value);
  } catch (error) {
    console.log(error);
    errors = error.response.data.errors;
  }
}, 1000);

const updateUserImage = async () => {
  try {
    await userStore.uploadUserImage(data.value);

    setTimeout(() => {
      openCropper.value = false;
    }, 200);
  } catch (error) {
    openCropper.value = false;
    console.log(error);
  }
};
</script>
