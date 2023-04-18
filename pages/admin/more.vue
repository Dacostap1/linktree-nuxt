<template>
  <AdminLayout>
    <div
      id="MorePage"
      class="flex"
      :class="userStore.isMobile ? 'pt-24' : 'pt-32'"
    >
      <div class="w-full rounded-md bg-white">
        <button
          @click="logout()"
          class="flex w-full items-center p-3 text-gray-600 hover:text-black"
          :class="userStore.isMobile ? 'text-[20px]' : 'text-[15px]'"
        >
          <Icon
            name="circum:logout"
            class="mr-6"
            :size="userStore.isMobile ? '22' : '15'"
          />
          Sign out
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const router = useRouter();

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener("resize", function () {
    windowWidth.value = window.innerWidth;
  });
});

const logout = async () => {
  let res = confirm("Are you sure you want to sign out?");
};

//Si es mayor redirigir para solo tener en la vista un único boton Sing out
watch(
  () => windowWidth.value,
  () => {
    if (windowWidth.value >= 767) {
      router.push("/admin");
    }
  }
);
</script>
