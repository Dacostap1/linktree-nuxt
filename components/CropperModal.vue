<template>
  <div class="fixed z-50 h-full">
    <div class="fixed inset-0 bg-black bg-opacity-60"></div>
    <div class="fixed inset-0 z-10 h-full overflow-auto">
      <div class="flex min-h-full flex-col items-center justify-center py-2">
        <div
          class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all"
        >
          <div class="flex items-center border-b border-b-gray-300 py-4">
            <div class="w-full text-center text-[22px] font-semibold">
              Pick Image
            </div>
            <div
              @click="$emit('close')"
              class="absolute right-3 cursor-pointer rounded-full bg-gray-200 p-1.5 hover:bg-gray-300"
            >
              <Icon name="mdi:close" size="25" />
            </div>
          </div>

          <div class="flex items-center bg-white px-4 pb-4">
            <div class="w-full">
              <div v-if="!uploadedImage" class="my-4">
                <label
                  for="file"
                  class="mb-2 flex w-full cursor-pointer items-center justify-center rounded-full bg-[#8228D9] py-3 font-semibold text-white hover:bg-[#6c21b3]"
                >
                  Upload photo
                </label>
                <input
                  type="file"
                  id="file"
                  class="hidden"
                  @change="getUploadedImage"
                />
              </div>

              <div v-if="!uploadedImage && video && video.paused" class="my-4">
                <button
                  @click="startCamera()"
                  class="mb-2 flex w-full cursor-pointer items-center justify-center rounded-full bg-[#8228D9] py-3 font-semibold text-white hover:bg-[#6c21b3]"
                >
                  Open camera
                </button>
              </div>

              <div v-show="isOpenCamera" class="pb-4">
                <video v-show="!isNewPhoto" ref="video" class="aspect-square" />
                <canvas
                  v-show="isNewPhoto"
                  ref="canvas"
                  class="aspect-square"
                />
              </div>

              <div class="mx-auto w-full max-w-lg">
                <Cropper
                  class="object-cover"
                  ref="cropper"
                  :stencil-props="{
                    movable: true,
                    resizable: true,
                    aspectRatio: 1,
                  }"
                  :resize-image="{
                    adjustStencil: false,
                  }"
                  image-restriction="stencil"
                  :src="uploadedImage"
                />
              </div>

              <div class="flex gap-4" :class="uploadedImage ? 'pt-4' : ''">
                <button
                  @click="$emit('close')"
                  type="button"
                  class="flex w-full cursor-pointer items-center justify-center rounded-full border py-3 font-semibold text-black hover:bg-gray-100 focus:outline-none focus:ring-0"
                >
                  Cancel
                </button>
                <button
                  v-if="isOpenCamera"
                  @click="takePhoto()"
                  class="flex w-full cursor-pointer items-center justify-center rounded-full bg-[#8228D9] py-3 font-semibold text-white hover:bg-[#6c21b3] focus:outline-none focus:ring-0"
                >
                  <span v-show="!isTakingPhoto">Take photo</span>
                  <Icon
                    v-show="isTakingPhoto"
                    name="eos-icons:loading"
                    size="25"
                  />
                </button>
                <button
                  v-if="uploadedImage"
                  @click="cropImage()"
                  class="flex w-full cursor-pointer items-center justify-center rounded-full bg-[#8228D9] py-3 font-semibold text-white hover:bg-[#6c21b3] focus:outline-none focus:ring-0"
                >
                  <span v-show="!isCropping">Crop Image</span>
                  <Icon
                    v-show="isCropping"
                    name="eos-icons:loading"
                    size="25"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const emit = defineEmits(["close", "data"]);

const props = defineProps({
  linkId: { type: Number, required: false },
});

const { linkId } = toRefs(props);

let file = ref(null);
let video = ref(null);
let canvas = ref(null);
let isNewPhoto = ref(null);
let isOpenCamera = ref(null);
let photoData = ref(null);
let cropper = ref(null);
let uploadedImage = ref(null);
let isTakingPhoto = ref(false);
let isCropping = ref(false);

const getUploadedImage = (e) => {
  file.value = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(e.target.files[0]);
};

const startCamera = async () => {
  isOpenCamera.value = true;

  if (navigator.mediaDevices) {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { max: 1024 },
        height: { max: 1024 },
        aspectRatio: { ideal: 1 },
      },
    });

    //Lo asignamos al ref <video>
    video.value.srcObject = stream;
    video.value.play();
  }
};

const takePhoto = () => {
  let videoLocal = video.value;
  let canvasLocal = canvas.value;

  canvasLocal.width = videoLocal.getBoundingClientRect().width;
  canvasLocal.height = videoLocal.getBoundingClientRect().height;

  let context = canvasLocal.getContext("2d");
  context.drawImage(videoLocal, 0, 0, canvasLocal.width, canvasLocal.height);
  isNewPhoto.value = true;
  photoData.value = canvasLocal.toDataURL();

  convertBlobToUrl();
};

const convertBlobToUrl = async () => {
  const blob = await (await fetch(photoData.value)).blob();

  file.value = new File([blob], "NEW_PHOTO.png", { type: blob.type });
  uploadedImage.value = URL.createObjectURL(file.value);
  isOpenCamera.value = false;
};

const cropImage = async () => {
  isCropping.value = true;

  const { coordinates } = cropper.value.getResult();

  let data = new FormData();
  data.append("image", file.value || "");
  data.append("height", coordinates.height || "");
  data.append("width", coordinates.width || "");
  data.append("left", coordinates.left || "");
  data.append("top", coordinates.top || "");
  data.append("id", linkId.value || "");

  isCropping.value = true;
  emit("data", data);
};

onUnmounted(() => {
  video.value.pause();
  video.value.currentTime = 0;
});
</script>
