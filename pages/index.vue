<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="text-center text-3xl font-extrabold lg:text-5xl">
        Log in to your Linktree
      </h1>

      <form class="mt-12" @submit.prevent="login()">
        <div>
          <TextInput
            placeholder="Email: link@gmail.com"
            v-model:input="email"
            inputType="email"
            :error="errors && errors.email ? errors.email[0] : ''"
          ></TextInput>
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            :error="errors && errors.password ? errors.password[0] : ''"
          ></TextInput>
        </div>

        <div class="mt-10">
          <button
            type="submit"
            :class="
              email && password
                ? 'bg-[#8228D9] text-white hover:bg-[#6C21B3]'
                : 'bg-[#EFF0EB] text-[#A7AAA2]'
            "
            class="w-full rounded-full p-3 font-bold"
            :disabled="!email || !password"
          >
            Log in
          </button>
        </div>
      </form>

      <div class="pt-12 text-center text-[14px]">
        Don't have an account?
        <nuxt-link to="/register" class="text-[#8228D9] underline">
          Sign up
        </nuxt-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";
import { useUserStore } from "~/stores/user";

definePageMeta({ middleware: "guest" });

const userStore = useUserStore();
const router = useRouter();

const email = ref(null);
const password = ref(null);
const errors = ref(null);

onMounted(() => {
  email.value = "d4ni3l_15@hotmail.com";
  password.value = "12345678";
});

const login = async () => {
  errors.value = null;

  try {
    await userStore.getToken();
    await userStore.login(email.value, password.value);
    await userStore.getUser();
    router.push("/admin");
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
