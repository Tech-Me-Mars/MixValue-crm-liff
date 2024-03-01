<script setup>
import * as dataApi from "./api/data.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localPath = useLocalePath();

const htmlStr = ref();
const loadPrivacy = async () => {
  const res = await dataApi.getPrivacyPersonal();
  htmlStr.value = res.data.data.html;
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
    <NuxtLink :to="localPath('/main_menu')">
      <HeaderMenu>
        <div class="flex justify-between items-center w-full">
          <p class="text-2xl text-white mx-auto">
            {{ $t("นโยบายความเป็นส่วนตัว") }}
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
