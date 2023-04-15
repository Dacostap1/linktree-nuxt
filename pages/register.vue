<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="text-center text-3xl font-extrabold lg:text-5xl">
        Create your accouent
      </h1>

      <form class="mt-12" @submit.prevent="register()">
        <div>
          <TextInput
            placeholder="Username"
            v-model:input="name"
            inputType="text"
            :errors="errors && errors.name ? errors.name[0] : ''"
          ></TextInput>
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Email: link@gmail.com"
            v-model:input="email"
            inputType="email"
            :errors="errors && errors.email ? errors.email[0] : ''"
          ></TextInput>
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            :errors="errors && errors.password ? errors.password[0] : ''"
          ></TextInput>
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Confirm password"
            v-model:input="confirmPassword"
            inputType="password"
            :errors="errors && errors.password ? errors.password[0] : ''"
          ></TextInput>
        </div>

        <div class="mt-10">
          <button
            type="submit"
            :class="
              name && email && password && confirmPassword
                ? 'bg-[#8228D9] text-white hover:bg-[#6C21B3]'
                : 'bg-[#EFF0EB] text-[#A7AAA2]'
            "
            class="w-full rounded-full p-3 font-bold"
            :disabled="!name || !email || !password || !confirmPassword"
          >
            Create account
          </button>
        </div>
      </form>

      <div class="pt-12 text-center text-[14px]">
        Already have an account?
        <nuxt-link to="/" class="text-[#8228D9] underline"> Log in </nuxt-link>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errors = ref(null);

const register = () => {};
</script>

<style scoped></style>
