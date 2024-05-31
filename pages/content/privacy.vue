<script setup>
import * as dataApi from "./api/data.js";




const htmlStr = ref();
const loadPrivacy = async () => {
  const res = await dataApi.getContent("privacy");
  htmlStr.value = res.data.data;
};

onMounted(() => {
  loadPrivacy();
});
</script>

<template>
  <div
    class="bg-cover min-h-screen bg-[url('https://www.cupsfrozenyogurt.com/content/uploads/2017/10/cups-bubble-bg-white-purple-subtle.jpg')]"
  >
    <!-- header -->
    <NuxtLink :to="('/main_menu')">
      <HeaderMenu>
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">
            {{ ("การจัดการข้อมูลส่วนบุคคล") }}
          </p>
          <span
            class="mdi mdi-chevron-left text-white self-end"
            style="font-size: 25px"
          ></span>
        </div>
      </HeaderMenu>
    </NuxtLink>
    <div v-html="htmlStr?.html"></div>
  </div>
</template>
